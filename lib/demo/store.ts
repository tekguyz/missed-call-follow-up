// The demo store: the one place that owns the pipeline, the owner's alerts
// and every change a visitor makes (ADR 0001). Screens read and write only
// through it, so a real backend can replace it later.
//
// It saves the visitor's actions, not the whole board, and replays them over
// the sample data on each load. Saved data carries a version. Missing, broken
// or old data means "no changes", and the store never throws on it. Blocked
// storage (some browsers inside a frame) falls back to memory.

import { channelLabel, stages } from "./business";
import { toLead } from "./conversation";
import { callerNames } from "./script";
import { sampleAlerts, sampleLeads } from "./sample";
import type { Alert, Channel, Lead, Result, Run, Stage } from "./types";

export type KeyValueStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export type DemoState = { leads: readonly Lead[]; alerts: readonly Alert[]; calls: number };

export type DemoStore = {
  getState(): DemoState;
  subscribe(listener: () => void): () => void;
  /** The owner's first alert: a call was missed and the follow-up went out. */
  missedCall(callerName: string, channel: Channel): Result;
  /** A finished follow-up becomes a New lead, and the owner is alerted. */
  addLead(run: Run): Result;
  move(leadId: string, stage: Stage): Result;
  nextCallerName(): string;
  reset(): void;
};

export const demoStorageKey = "missed-call-demo";
const version = 1;

type Action =
  | { type: "missed"; id: string; at: string; callerName: string; channel: Channel }
  | { type: "lead"; lead: Lead; alertId: string }
  | { type: "move"; leadId: string; stage: Stage };

const ok: Result = { ok: true };
const no = (reason: string): Result => ({ ok: false, reason });
const stageIds = new Set<string>(stages.map((s) => s.id));
const channelIds = new Set<string>(Object.keys(channelLabel));

function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

const str = (v: unknown): v is string => typeof v === "string" && v.length > 0;

/** Only well-formed actions survive a load. */
function isAction(a: unknown): a is Action {
  if (!a || typeof a !== "object") return false;
  const x = a as Record<string, unknown>;
  if (x.type === "move") return str(x.leadId) && str(x.stage) && stageIds.has(x.stage);
  if (x.type === "missed") return str(x.id) && str(x.at) && str(x.callerName) && str(x.channel) && channelIds.has(x.channel);
  if (x.type === "lead") {
    const l = x.lead as Record<string, unknown> | undefined;
    return (
      str(x.alertId) &&
      !!l &&
      ["id", "name", "issue", "area", "urgency", "at"].every((k) => str(l[k])) &&
      str(l.channel) &&
      channelIds.has(l.channel)
    );
  }
  return false;
}

function build(actions: readonly Action[]): DemoState {
  const leads: Lead[] = sampleLeads.map((l) => ({ ...l }));
  const alerts: Alert[] = sampleAlerts.map((a) => ({ ...a }));
  let calls = 0;
  for (const action of actions) {
    switch (action.type) {
      case "missed":
        calls++;
        alerts.unshift({
          id: action.id,
          at: action.at,
          title: `Missed call from ${action.callerName}`,
          body: `Follow-up sent by ${channelLabel[action.channel].toLowerCase()}. You'll get the details when they reply.`,
        });
        break;
      case "lead": {
        const lead = { ...action.lead, stage: "new" as const, mine: true };
        leads.unshift(lead);
        alerts.unshift({
          id: action.alertId,
          at: lead.at,
          title: `New lead: ${lead.issue}`,
          body: `${lead.name}, ${lead.area}. ${lead.urgency}. Came in by ${channelLabel[lead.channel].toLowerCase()}.`,
          leadId: lead.id,
        });
        break;
      }
      case "move": {
        const lead = leads.find((l) => l.id === action.leadId);
        if (lead) lead.stage = action.stage;
        break;
      }
    }
  }
  return { leads, alerts, calls };
}

function load(storage: KeyValueStorage): Action[] {
  try {
    const raw = storage.getItem(demoStorageKey);
    if (!raw) return [];
    const saved = JSON.parse(raw) as { v?: unknown; actions?: unknown };
    if (saved?.v !== version || !Array.isArray(saved.actions)) return [];
    return saved.actions.filter(isAction);
  } catch {
    return [];
  }
}

export function createStore(storage: KeyValueStorage, now: () => Date = () => new Date()): DemoStore {
  let actions = load(storage);
  let state = build(actions);
  const listeners = new Set<() => void>();

  function commit(action: Action) {
    actions = [...actions, action];
    state = build(actions);
    try {
      storage.setItem(demoStorageKey, JSON.stringify({ v: version, actions }));
    } catch {
      // Storage is blocked or full: the change still lives in memory.
    }
    listeners.forEach((l) => l());
  }

  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    missedCall(callerName, channel) {
      if (!callerName.trim() || !channelIds.has(channel)) return no("That call can't be placed.");
      commit({ type: "missed", id: newId("alert"), at: now().toISOString(), callerName, channel });
      return ok;
    },
    addLead(run) {
      try {
        const lead = toLead(run, newId("lead"), now().toISOString());
        commit({ type: "lead", lead, alertId: newId("alert") });
        return ok;
      } catch {
        return no("Finish the follow-up first.");
      }
    },
    move(leadId, stage) {
      if (!stageIds.has(stage)) return no("That stage doesn't exist.");
      if (!state.leads.some((l) => l.id === leadId)) return no("That lead doesn't exist.");
      commit({ type: "move", leadId, stage });
      return ok;
    },
    nextCallerName: () => callerNames[state.calls % callerNames.length],
    reset() {
      actions = [];
      state = build(actions);
      try {
        storage.removeItem(demoStorageKey);
      } catch {
        // Nothing saved to forget.
      }
      listeners.forEach((l) => l());
    },
  };
}
