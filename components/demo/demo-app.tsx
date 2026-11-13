"use client";

// The whole demo on one screen: the caller's phone and the owner's office.
// This file runs the clock (ringing, the missed call, the replies arriving);
// the steps themselves are pure, in lib/demo/conversation.ts.

import { useEffect, useRef, useState } from "react";
import { business } from "@/lib/demo/business";
import { answer, miss, newRun, openFollowUp, ring } from "@/lib/demo/conversation";
import { callerNames } from "@/lib/demo/script";
import type { Channel, Run } from "@/lib/demo/types";
import { demoStore, useDemoState } from "@/lib/demo/use-demo";
import { DemoBanner } from "./banner";
import { Office } from "./office";
import { Phone } from "./phone";

const RING_MS = 2800;
const NO_ANSWER_MS = 1600;
const TYPING_MS = 900;

const steps = ["Call", "Missed", "Follow-up", "Lead in"] as const;

function stepOf(run: Run | null): number {
  if (!run || run.phase === "setup" || run.phase === "ringing") return 0;
  if (run.phase === "missed") return 1;
  if (run.phase === "followup") return 2;
  return 3;
}

export function DemoApp() {
  const state = useDemoState();
  const [channel, setChannel] = useState<Channel>("text");
  const [run, setRun] = useState<Run | null>(null);
  const [shown, setShown] = useState(0);
  const [incoming, setIncoming] = useState(false);
  const [tab, setTab] = useState<"phone" | "office">("phone");
  const [unseen, setUnseen] = useState(false);
  const leadSaved = useRef<Run | null>(null);

  const callerName = run?.callerName ?? callerNames[state.calls % callerNames.length];

  // Ringing → missed. The owner hears about the missed call at once.
  useEffect(() => {
    if (run?.phase !== "ringing") return;
    const t = setTimeout(() => {
      demoStore().missedCall(run.callerName, run.channel);
      setUnseen(true);
      setRun(miss(run));
    }, RING_MS);
    return () => clearTimeout(t);
  }, [run]);

  // Missed → the follow-up. Text and email arrive by themselves; a voice
  // callback rings, and the caller answers it.
  useEffect(() => {
    if (run?.phase !== "missed") return;
    const t = setTimeout(() => {
      if (run.channel === "voice") setIncoming(true);
      else setRun(openFollowUp(run));
    }, NO_ANSWER_MS);
    return () => clearTimeout(t);
  }, [run]);

  // Reveal the transcript one line at a time; the business "types" first.
  useEffect(() => {
    if (!run || shown >= run.transcript.length) return;
    const next = run.transcript[shown];
    const t = setTimeout(() => setShown((n) => n + 1), next.from === "caller" ? 0 : TYPING_MS);
    return () => clearTimeout(t);
  }, [run, shown]);

  // A finished follow-up becomes a lead, once per call.
  useEffect(() => {
    if (run?.phase !== "done" || shown < run.transcript.length || leadSaved.current === run) return;
    leadSaved.current = run;
    demoStore().addLead(run);
    setUnseen(true);
  }, [run, shown]);

  function start() {
    setShown(0);
    setIncoming(false);
    setRun(ring(newRun(channel, callerName)));
  }

  function again() {
    setRun(null);
    setShown(0);
    setIncoming(false);
  }

  function reset() {
    demoStore().reset();
    again();
    setUnseen(false);
  }

  function showTab(next: "phone" | "office") {
    setTab(next);
    if (next === "office") setUnseen(false);
  }

  const step = stepOf(run);

  return (
    <>
      <DemoBanner onReset={reset} />
      <main id="main" className="mx-auto w-full max-w-[90rem] flex-1 px-4 pt-5 pb-16 sm:px-6">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-headline">A missed call at {business.name}</h1>
          <p className="max-w-[60ch] text-body text-ink-muted">
            You play the caller. Call after hours, miss the call, answer the follow-up, and watch the lead land in the owner&apos;s office.
          </p>
        </div>

        <ol className="mt-4 flex flex-wrap gap-2 text-micro" aria-label="Where you are">
          {steps.map((label, i) => (
            <li
              key={label}
              aria-current={i === step ? "step" : undefined}
              className={`rounded-full px-3 py-1.5 font-semibold ${i < step ? "bg-answered-soft text-answered" : i === step ? "bg-ink text-paper" : "bg-sunk text-ink-muted"}`}
            >
              {i + 1}. {label}
            </li>
          ))}
        </ol>

        <div role="tablist" aria-label="Demo view" className="mt-5 grid grid-cols-2 gap-1 rounded-full bg-sunk p-1 lg:hidden">
          {(
            [
              ["phone", "Caller's phone"],
              ["office", "Owner's office"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`panel-${id}`}
              onClick={() => showTab(id)}
              className={`relative min-h-11 rounded-full text-label ${tab === id ? "bg-surface text-ink shadow-sm" : "text-ink-muted"}`}
            >
              {label}
              {id === "office" && unseen && tab !== "office" && (
                <span className="absolute top-2.5 right-4 size-2.5 rounded-full bg-tile" aria-label="New alert" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-8 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-start">
          <section
            id="panel-phone"
            aria-label="Caller's phone"
            className={`${tab === "phone" ? "" : "hidden"} lg:sticky lg:top-4 lg:block`}
          >
            <Phone
              run={run}
              channel={channel}
              callerName={callerName}
              shown={shown}
              incoming={incoming}
              onChannel={setChannel}
              onCall={start}
              onAnswerCallback={() => {
                setIncoming(false);
                setRun((r) => (r ? openFollowUp(r) : r));
              }}
              onReply={(id) => setRun((r) => (r ? answer(r, id) : r))}
              onAgain={again}
              onSeeOffice={() => showTab("office")}
            />
          </section>
          <section id="panel-office" aria-label="Owner's office" className={`${tab === "office" ? "" : "hidden"} lg:block`}>
            <Office state={state} onMove={(id, stage) => demoStore().move(id, stage)} />
          </section>
        </div>
      </main>
    </>
  );
}
