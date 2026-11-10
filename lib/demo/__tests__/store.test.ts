import { beforeEach, describe, expect, it } from "vitest";
import { answer, miss, newRun, openFollowUp, ring } from "../conversation";
import { questions } from "../script";
import { sampleLeads } from "../sample";
import { createStore, demoStorageKey, type KeyValueStorage } from "../store";

function memory(): KeyValueStorage & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => void data.set(k, v),
    removeItem: (k) => void data.delete(k),
  };
}

function finishedRun(name = "Dana R.") {
  let run = openFollowUp(miss(ring(newRun("text", name))));
  for (const q of questions) run = answer(run, q.options[0].id);
  return run;
}

const now = () => new Date("2026-11-10T23:42:00.000Z");

describe("demo store", () => {
  let storage: ReturnType<typeof memory>;
  beforeEach(() => {
    storage = memory();
  });

  it("opens on the sample pipeline", () => {
    const store = createStore(storage, now);
    expect(store.getState().leads).toHaveLength(sampleLeads.length);
    expect(store.getState().alerts.length).toBeGreaterThan(0);
  });

  it("alerts the owner the moment a call is missed", () => {
    const store = createStore(storage, now);
    store.missedCall("Dana R.", "voice");
    const top = store.getState().alerts[0];
    expect(top.title).toContain("Missed call from Dana R.");
    expect(top.body).toContain("callback");
  });

  it("puts a finished follow-up at the top of New and alerts the owner", () => {
    const store = createStore(storage, now);
    const result = store.addLead(finishedRun());
    expect(result.ok).toBe(true);
    const { leads, alerts } = store.getState();
    expect(leads[0]).toMatchObject({ name: "Dana R.", stage: "new", mine: true });
    expect(alerts[0].leadId).toBe(leads[0].id);
    expect(alerts[0].title).toBe(`New lead: ${questions[0].options[0].label}`);
  });

  it("refuses an unfinished follow-up", () => {
    const store = createStore(storage, now);
    const result = store.addLead(newRun("text", "Dana R."));
    expect(result.ok).toBe(false);
    expect(store.getState().leads).toHaveLength(sampleLeads.length);
  });

  it("moves a lead between stages, and refuses a made-up stage or lead", () => {
    const store = createStore(storage, now);
    expect(store.move("s-1", "called").ok).toBe(true);
    expect(store.getState().leads.find((l) => l.id === "s-1")?.stage).toBe("called");
    expect(store.move("s-1", "lost" as never).ok).toBe(false);
    expect(store.move("nope", "won").ok).toBe(false);
  });

  it("keeps the visitor's changes in this browser, and replays them", () => {
    const first = createStore(storage, now);
    first.addLead(finishedRun());
    first.move("s-1", "won");
    const again = createStore(storage, now);
    expect(again.getState().leads.filter((l) => l.mine)).toHaveLength(1);
    expect(again.getState().leads.find((l) => l.id === "s-1")?.stage).toBe("won");
  });

  it("hands out the next sample caller name in turn", () => {
    const store = createStore(storage, now);
    const a = store.nextCallerName();
    store.missedCall(a, "text");
    expect(store.nextCallerName()).not.toBe(a);
  });

  it("reset brings back the sample pipeline and forgets the save", () => {
    const store = createStore(storage, now);
    store.addLead(finishedRun());
    store.reset();
    expect(store.getState().leads).toHaveLength(sampleLeads.length);
    expect(storage.data.has(demoStorageKey)).toBe(false);
  });

  it("treats broken or old saves as no changes", () => {
    for (const bad of ["not json", JSON.stringify({ v: 0, actions: [] }), JSON.stringify({ v: 1, actions: "x" }), JSON.stringify({ v: 1, actions: [{ type: "move", leadId: 1 }] })]) {
      storage.setItem(demoStorageKey, bad);
      const store = createStore(storage, now);
      expect(store.getState().leads).toHaveLength(sampleLeads.length);
    }
  });

  it("works when the browser blocks storage", () => {
    const blocked: KeyValueStorage = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
      removeItem: () => {
        throw new Error("blocked");
      },
    };
    const store = createStore(blocked, now);
    expect(store.addLead(finishedRun()).ok).toBe(true);
    expect(store.getState().leads.filter((l) => l.mine)).toHaveLength(1);
  });

  it("tells subscribers about each change, with a new state object", () => {
    const store = createStore(storage, now);
    const before = store.getState();
    let calls = 0;
    const stop = store.subscribe(() => calls++);
    store.move("s-1", "called");
    expect(calls).toBe(1);
    expect(store.getState()).not.toBe(before);
    stop();
    store.move("s-1", "new");
    expect(calls).toBe(1);
  });
});
