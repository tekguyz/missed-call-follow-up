"use client";

// The caller's phone, drawn at night (DESIGN.md, The idea). It shows the
// visitor's one call: pick the channel, call, miss, the follow-up, done.

import { useEffect, useRef, type ReactNode } from "react";
import { business, channels } from "@/lib/demo/business";
import { currentQuestion } from "@/lib/demo/conversation";
import { emailSubject } from "@/lib/demo/script";
import type { Channel, Run, Turn } from "@/lib/demo/types";
import { ChevronLeftIcon, MailIcon, PhoneIcon, PhoneIncomingIcon, PhoneMissedIcon, TextIcon } from "../icons";
import { PhoneFrame } from "../phone-frame";

const channelIcon: Record<Channel, ReactNode> = {
  text: <TextIcon />,
  email: <MailIcon />,
  voice: <PhoneIncomingIcon />,
};

type Props = {
  run: Run | null;
  channel: Channel;
  callerName: string;
  shown: number;
  incoming: boolean;
  onChannel: (c: Channel) => void;
  onCall: () => void;
  onAnswerCallback: () => void;
  onReply: (optionId: string) => void;
  onAgain: () => void;
  onSeeOffice: () => void;
};

export function Phone(props: Props) {
  return (
    // As tall as the window allows below the page header, up to 22rem wide,
    // so the whole phone shows at 1440 x 900; the thread scrolls inside.
    <PhoneFrame widthClass="w-[clamp(16rem,calc((100dvh-14.5rem)*0.4615),22rem)]">
      <Screen {...props} />
    </PhoneFrame>
  );
}

function Screen(props: Props) {
  const { run } = props;
  if (!run || run.phase === "setup") return <Setup {...props} />;
  if (run.phase === "ringing") return <Calling />;
  if (run.phase === "missed") return props.incoming && run.channel === "voice" ? <IncomingCallback onAnswer={props.onAnswerCallback} /> : <NoAnswer />;
  return <FollowUp {...props} run={run} />;
}

function Setup({ channel, callerName, onChannel, onCall }: Props) {
  return (
    <div className="phone-scroll flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pt-3 pb-4">
      <p className="text-micro text-on-night-muted">You are the caller: {callerName}</p>
      <h2 className="mt-1 font-display text-title">Call {business.name}</h2>
      <p className="mt-2 text-label font-normal text-on-night-muted">
        It is after hours, so nobody will pick up. First, pick how {business.shortName} follows up.
      </p>
      <fieldset className="mt-5 flex flex-col gap-2">
        <legend className="sr-only">How {business.name} follows up</legend>
        {channels.map((c) => (
          <label
            key={c.id}
            className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-box border px-3.5 py-2.5 transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-tile ${
              channel === c.id ? "border-on-night-muted bg-night-raised" : "border-night-line hover:bg-night-raised"
            }`}
          >
            <input type="radio" name="channel" value={c.id} checked={channel === c.id} onChange={() => onChannel(c.id)} className="peer sr-only" data-screen-ok="taps: the whole 56px row is its label, so the row is the tap target" />
            <span aria-hidden className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-on-night-muted transition-colors peer-checked:border-tile-on-night peer-checked:[&>span]:scale-100">
              <span className="size-2.5 scale-0 rounded-full bg-tile-on-night transition-transform duration-150 motion-reduce:transition-none" />
            </span>
            <span className="text-on-night-muted">{channelIcon[c.id]}</span>
            <span className="flex flex-col">
              <span className="text-label">{c.label}</span>
              <span className="text-micro text-on-night-muted">{c.hint}</span>
            </span>
          </label>
        ))}
      </fieldset>
      <button
        type="button"
        onClick={onCall}
        className="mt-auto inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-box bg-tile text-label text-white transition-colors hover:bg-tile-deep active:bg-tile-deep"
      >
        <PhoneIcon /> Call {business.name}
      </button>
    </div>
  );
}

function Calling() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center" role="status">
      <span className="ring-pulse flex size-24 items-center justify-center rounded-full bg-tile text-white">
        <PhoneIcon width={36} height={36} />
      </span>
      <div>
        <p className="font-display text-title">{business.name}</p>
        <p className="mt-1 text-label font-normal text-on-night-muted">Ringing…</p>
      </div>
    </div>
  );
}

function NoAnswer() {
  return (
    <div className="arrive flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center" role="status">
      <span className="flex size-20 items-center justify-center rounded-full bg-night-raised text-tile-on-night">
        <PhoneMissedIcon width={32} height={32} />
      </span>
      <p className="font-display text-title">No answer</p>
      <p className="text-label font-normal text-on-night-muted">The call went unanswered. Watch what happens next.</p>
    </div>
  );
}

function IncomingCallback({ onAnswer }: { onAnswer: () => void }) {
  return (
    <div className="arrive flex flex-1 flex-col items-center justify-between px-6 pt-16 pb-10 text-center" role="status">
      <div>
        <p className="text-label font-normal text-on-night-muted">Incoming call</p>
        <p className="mt-2 font-display text-headline">{business.name}</p>
        <p className="mt-1 text-label font-normal text-on-night-muted">Calling you back</p>
      </div>
      <button type="button" onClick={onAnswer} className="ring-pulse flex size-20 items-center justify-center rounded-full bg-answered text-white" aria-label="Answer the callback">
        <PhoneIcon width={32} height={32} />
      </button>
    </div>
  );
}

function FollowUp({ run, shown, onReply, onAgain, onSeeOffice }: Props & { run: Run }) {
  const turns = run.transcript.slice(0, shown);
  const typing = shown < run.transcript.length;
  const question = typing ? null : currentQuestion(run);
  const finished = run.phase === "done" && !typing;
  const replyWord = run.channel === "voice" ? "Say" : "Reply";
  const thread = useRef<HTMLDivElement>(null);

  // Keep the newest line in view, like a real messages app.
  useEffect(() => {
    const el = thread.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown, typing, finished]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <FollowUpHeader channel={run.channel} />
      <div ref={thread} data-screen-ok="scroll-inside: the drawn phone scrolls its messages like a real phone" className="phone-scroll flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3.5 py-3" aria-live="polite">
        {turns.map((t, i) => (
          <Bubble key={i} turn={t} channel={run.channel} />
        ))}
        {typing && (
          <p className="arrive text-micro text-on-night-muted" aria-label={`${business.name} is replying`}>
            {run.channel === "voice" ? "Speaking…" : "Typing…"}
          </p>
        )}
      </div>
      <div className="shrink-0 border-t border-night-line px-3.5 pt-3 pb-2">
        {question && (
          <div className="arrive">
            <p className="text-micro text-on-night-muted">
              {replyWord} as the caller:
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {question.options.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => onReply(o.id)}
                  className="min-h-11 rounded-box bg-night-raised px-3.5 text-label text-on-night transition-colors hover:bg-night-line active:bg-night-line"
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        )}
        {finished && (
          <div className="arrive flex flex-col gap-2">
            <p className="text-label text-answered-on-night">The lead is in {business.shortName}&apos;s pipeline.</p>
            <button type="button" onClick={onSeeOffice} className="min-h-11 rounded-box bg-on-night text-label text-ink transition-colors hover:bg-sunk lg:hidden">
              See it in {business.owner}&apos;s office
            </button>
            <button type="button" onClick={onAgain} className="min-h-11 rounded-box bg-night-raised text-label text-on-night transition-colors hover:bg-night-line active:bg-night-line">
              Call again as someone else
            </button>
          </div>
        )}
        {!question && !finished && <p className="min-h-11 text-micro text-on-night-muted">&nbsp;</p>}
      </div>
    </div>
  );
}

// The app bar of a real phone: a back arrow, then who it is from. Drawn,
// not a control, so the back arrow is hidden from assistive tech.
const back = <ChevronLeftIcon aria-hidden width={22} height={22} className="shrink-0 text-tile-on-night" />;

function FollowUpHeader({ channel }: { channel: Channel }) {
  if (channel === "email") {
    return (
      <div className="flex shrink-0 items-start gap-1.5 border-b border-night-line px-2.5 pt-1 pb-2.5">
        {back}
        <div className="min-w-0">
          <p className="text-micro text-on-night-muted">Inbox · from {business.name}</p>
          <p className="text-label">{emailSubject}</p>
        </div>
      </div>
    );
  }
  if (channel === "voice") {
    return (
      <div className="flex shrink-0 flex-col items-center gap-1 border-b border-night-line px-4 pt-1 pb-2.5 text-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-answered text-white">
          <PhoneIcon width={18} height={18} />
        </span>
        <div>
          <p className="text-label">{business.name}</p>
          <p className="text-micro text-on-night-muted">On a call · automated callback</p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex shrink-0 flex-col items-center gap-1 border-b border-night-line px-4 pt-1 pb-2.5 text-center">
      <span className="absolute top-2 left-2.5">{back}</span>
      <span className="flex size-10 items-center justify-center rounded-full bg-night-raised font-display text-label">K</span>
      <div>
        <p className="text-label">{business.name}</p>
        <p className="text-micro text-on-night-muted">Text message</p>
      </div>
    </div>
  );
}

function Bubble({ turn, channel }: { turn: Turn; channel: Channel }) {
  const mine = turn.from === "caller";
  if (channel === "email") {
    return (
      <div className={`arrive rounded-box px-3.5 py-3 text-label font-normal ${mine ? "ml-6 bg-night-raised" : "bg-paper text-ink"}`}>
        <p className={`mb-1 text-micro font-semibold ${mine ? "text-on-night-muted" : "text-ink-muted"}`}>{mine ? "You" : business.name}</p>
        {turn.text}
      </div>
    );
  }
  if (channel === "voice") {
    return (
      <p className="arrive text-label font-normal">
        <span className={`block text-micro font-semibold ${mine ? "text-on-night-muted" : "text-answered-on-night"}`}>
          {mine ? "You said" : `${business.shortName} assistant`}
        </span>
        {turn.text}
      </p>
    );
  }
  return (
    <p
      className={`arrive max-w-[85%] rounded-bubble px-3.5 py-2.5 text-label font-normal ${
        mine ? "self-end rounded-br-tag bg-night-raised" : "self-start rounded-bl-tag bg-bubble-out text-white"
      }`}
    >
      {turn.text}
    </p>
  );
}
