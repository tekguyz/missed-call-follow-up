"use client";

// The owner's office, on paper: the alerts and the pipeline board.

import { useEffect, useState } from "react";
import { business, channelLabel, stages } from "@/lib/demo/business";
import { shownWhen } from "@/lib/demo/format";
import type { DemoState } from "@/lib/demo/store";
import type { Lead, Stage } from "@/lib/demo/types";
import { ArrowRightIcon, BellIcon, PinIcon } from "../icons";
import { KeywindLogo } from "../logo";

/** Re-render once a minute, so "Just now" moves on. */
function useNow(): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export function Office({ state, onMove }: { state: DemoState; onMove: (id: string, stage: Stage) => void }) {
  const now = useNow();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <KeywindLogo />
        <p className="text-label font-normal text-ink-muted">{business.owner}&apos;s office · the owner&apos;s view</p>
      </div>
      <Alerts state={state} now={now} />
      <Board leads={state.leads} now={now} onMove={onMove} />
    </div>
  );
}

function Alerts({ state, now }: { state: DemoState; now: Date }) {
  const alerts = state.alerts.slice(0, 3);
  return (
    <section aria-labelledby="alerts-h" className="rounded-none border border-line bg-surface p-4 sm:p-5">
      <h2 id="alerts-h" className="flex items-center gap-2 font-display text-title">
        <BellIcon className="text-tile-text" /> Alerts to {business.owner}&apos;s phone
      </h2>
      <ul className="mt-3 flex flex-col divide-y divide-line" aria-live="polite">
        {alerts.map((a) => (
          <li key={a.id} className="arrive flex items-start gap-3 py-3 first:pt-1 last:pb-0">
            <span className={`mt-1.5 size-2.5 shrink-0 rounded-none ${a.leadId ? "bg-answered" : "bg-tile"}`} aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="text-label">{a.title}</p>
              <p className="text-label font-normal text-ink-muted">{a.body}</p>
            </div>
            <span className="shrink-0 text-micro text-ink-muted">{shownWhen(a, now)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Board({ leads, now, onMove }: { leads: readonly Lead[]; now: Date; onMove: (id: string, stage: Stage) => void }) {
  return (
    <section aria-labelledby="board-h">
      <h2 id="board-h" className="font-display text-title">
        Lead pipeline
      </h2>
      <p className="text-label font-normal text-ink-muted">Every follow-up lands in New. In a real setup it can go to the CRM the business already uses.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stages.map((s, i) => {
          const inStage = leads.filter((l) => l.stage === s.id);
          const next = stages[i + 1];
          return (
            <div key={s.id} className="flex flex-col gap-3 rounded-none bg-sunk p-3">
              <h3 className="flex items-center justify-between px-1 text-label">
                {s.label}
                <span className="rounded-none bg-surface px-2 text-micro text-ink-muted">{inStage.length}</span>
              </h3>
              {inStage.length === 0 && <p className="px-1 pb-2 text-micro text-ink-muted">Nothing here yet.</p>}
              {inStage.map((lead) => (
                <LeadCard key={lead.id} lead={lead} now={now} next={next} onMove={onMove} />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LeadCard({ lead, now, next, onMove }: { lead: Lead; now: Date; next?: { id: Stage; label: string }; onMove: (id: string, stage: Stage) => void }) {
  const [blocked, setBlocked] = useState(false);
  const urgent = lead.urgency.startsWith("Today");
  return (
    <article className={`arrive relative overflow-hidden rounded-none border bg-surface p-3.5 ${lead.mine ? "border-answered" : "border-line"}`}>
      {lead.mine && <span className="hairline-draw absolute inset-x-0 top-0 h-1 bg-answered" aria-hidden />}
      <div className="flex items-start justify-between gap-2">
        <p className="text-label">{lead.name}</p>
        <span className="shrink-0 text-micro text-ink-muted">{shownWhen(lead, now)}</span>
      </div>
      {lead.mine && <p className="text-micro font-semibold text-answered">Your call</p>}
      <p className="mt-1 text-label font-normal">{lead.issue}</p>
      <p className="mt-1 flex items-center gap-1 text-micro text-ink-muted">
        <PinIcon width={14} height={14} /> {lead.area}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5 text-micro">
        <span className={`rounded-none px-2 py-0.5 ${urgent ? "bg-tile-soft text-tile-text" : "bg-sunk text-ink-muted"}`}>{lead.urgency}</span>
        <span className="rounded-none bg-answered-soft px-2 py-0.5 text-answered">By {channelLabel[lead.channel].toLowerCase()}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {next && (
          <button
            type="button"
            onClick={() => onMove(lead.id, next.id)}
            className="inline-flex min-h-11 items-center gap-1 rounded-none border border-line px-3 text-micro font-semibold hover:bg-sunk"
          >
            Move to {next.label} <ArrowRightIcon width={14} height={14} />
          </button>
        )}
        <button type="button" onClick={() => setBlocked(true)} className="inline-flex min-h-11 items-center rounded-none px-3 text-micro font-semibold text-ink-muted hover:bg-sunk">
          Call back
        </button>
      </div>
      {blocked && (
        <p className="mt-1 text-micro text-ink-muted" role="status">
          Not available in the demo.
        </p>
      )}
    </article>
  );
}
