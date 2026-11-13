import Link from "next/link";
import type { ReactNode } from "react";
import { primaryButton } from "@/components/buttons";
import { BellIcon, MailIcon, PhoneIncomingIcon, PhoneMissedIcon, PinIcon, TextIcon } from "@/components/icons";
import { ProductLogo } from "@/components/logo";
import { PhoneFrame } from "@/components/phone-frame";
import { business } from "@/lib/demo/business";

// The landing page (DEMO-STANDARD.md, "What they get"). It sells the idea by
// itself and opens the demo with one press. "Try the demo" is a plain link:
// opening the demo writes nothing on a server (ADR 0001).
// Copy rules: no prices, no statistics, no setup-time claims, no phone numbers.

const demoHref = "/demo";

const steps = [
  { title: "A call goes unanswered", body: "After hours, up on a roof, under a boat, or already on the other line." },
  { title: "The caller hears back", body: "Right away, on the channel you pick: a text, an email or an automated callback." },
  { title: "It asks what you'd ask", body: "What's wrong, where the job is, and how soon they need someone." },
  { title: "The lead lands, and you're told", body: "In your pipeline, or the CRM you already use, with an alert to your phone." },
];

const channelCards: { icon: ReactNode; title: string; body: string }[] = [
  { icon: <TextIcon />, title: "Text", body: "A short, friendly text the caller can answer when they're free." },
  { icon: <MailIcon />, title: "Email", body: "For customers already on file. Good for quotes and paperwork." },
  { icon: <PhoneIncomingIcon />, title: "Voice callback", body: "An automated call rings them back and asks the same questions out loud." },
];

const ownerGets = [
  "An alert the moment a call is missed, and another when the caller answers.",
  "Each lead with who it is, what they need, where, and how soon.",
  "A simple board: New, Called back, Quote sent, Won. Or the CRM you already use.",
];

export default function LandingPage() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-[72rem] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="inline-flex min-h-11 items-center" aria-label="Missed Call Follow-Up, home">
          <ProductLogo />
        </Link>
        <Link href={demoHref} className={`${primaryButton} max-sm:hidden`}>
          Try the demo
        </Link>
      </header>

      <main id="main" className="flex-1">
        <section className="mx-auto grid w-full max-w-[72rem] items-center gap-12 px-4 pt-8 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_26rem] lg:pt-14 lg:pb-24">
          <div>
            <p className="text-label text-tile">For HVAC, roofing and marine repair</p>
            <h1 className="mt-3 max-w-[14ch] font-display text-display">Every missed call gets an answer.</h1>
            <p className="mt-5 max-w-[52ch] text-body text-ink-muted">
              You&apos;re on a job or done for the day. When a call goes unanswered, the caller hears back right away by text, email or
              an automated callback. It asks what they need. You get an alert, and the lead waits in your pipeline.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href={demoHref} className={primaryButton}>
                Try the demo
              </Link>
              <p className="text-label font-normal text-ink-muted">One click. No signup. Nothing is sent.</p>
            </div>
          </div>
          <HeroPreview />
        </section>

        <section aria-labelledby="how" className="border-y border-line bg-surface">
          <div className="mx-auto w-full max-w-[72rem] px-4 py-16 sm:px-6">
            <h2 id="how" className="font-display text-headline">
              How it works
            </h2>
            <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex flex-col gap-2">
                  <span className={`flex size-9 items-center justify-center rounded-box font-display text-label tabular-nums ${i === 0 ? "bg-tile text-white" : "bg-answered-soft text-answered"}`}>
                    {i + 1}
                  </span>
                  <h3 className="font-display text-title">{s.title}</h3>
                  <p className="text-body text-ink-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="channel" className="mx-auto w-full max-w-[72rem] px-4 py-16 sm:px-6">
          <h2 id="channel" className="font-display text-headline">
            You pick the channel
          </h2>
          <p className="mt-2 max-w-[56ch] text-body text-ink-muted">Each business is different. Use one, or a different one for different callers.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {channelCards.map((c) => (
              <div key={c.title} className="rounded-box border border-line bg-surface p-5">
                <span className="flex size-10 items-center justify-center rounded-box bg-sunk text-ink">{c.icon}</span>
                <h3 className="mt-4 font-display text-title">{c.title}</h3>
                <p className="mt-1 text-body text-ink-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="owner" className="mx-auto grid w-full max-w-[72rem] items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 id="owner" className="font-display text-headline">
              What you see as the owner
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
              {ownerGets.map((line) => (
                <li key={line} className="flex gap-3 text-body">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-answered" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <OwnerPreview />
        </section>

        <section aria-labelledby="try" className="bg-night text-on-night">
          <div className="mx-auto flex w-full max-w-[72rem] flex-col items-start gap-5 px-4 py-16 sm:px-6">
            <h2 id="try" className="max-w-[24ch] font-display text-headline">
              See it with a made-up roofer
            </h2>
            <p className="max-w-[60ch] text-body text-on-night-muted">
              The demo plays {business.name}, a made-up roofing business in {business.region}. Call it, miss the call, answer the
              follow-up as the caller, and watch the lead land in the owner&apos;s office. Nothing is sent, and nothing leaves your
              browser.
            </p>
            <Link href={demoHref} className={primaryButton}>
              Try the demo
            </Link>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-[72rem] flex-wrap items-center justify-between gap-3 px-4 py-6 text-label font-normal text-ink-muted sm:px-6">
        <p>Missed Call Follow-Up</p>
        <p>
          Built by{" "}
          <a href="https://tekguyz.com" className="inline-flex min-h-11 items-center underline underline-offset-4">
            TEKGUYZ
          </a>
        </p>
      </footer>
    </>
  );
}

/** A still picture of the flow, drawn in the page's own parts. Decorative. */
function HeroPreview() {
  const bubbleIn = "max-w-[85%] self-start rounded-bubble rounded-bl-tag bg-bubble-out px-3.5 py-2.5 text-label font-normal text-white";
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[24rem] pb-6">
      <PhoneFrame widthClass="w-[16.5rem] sm:w-[18rem]">
        <div className="flex flex-col items-center gap-1 border-b border-night-line px-4 pt-1 pb-2.5 text-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-night-raised font-display text-label">K</span>
          <p className="text-label">{business.name}</p>
        </div>
        <div className="flex flex-col gap-2 px-3.5 py-3">
          <p className="flex items-center justify-center gap-2 py-1 text-micro font-semibold text-tile-on-night">
            <PhoneMissedIcon width={16} height={16} /> Missed call · {business.name}
          </p>
          <p className={bubbleIn}>Hi Dana, this is {business.name}. Sorry we missed your call. What&apos;s going on with your roof?</p>
          <p className="self-end rounded-bubble rounded-br-tag bg-night-raised px-3.5 py-2.5 text-label font-normal">Leak after the storm</p>
          <p className={bubbleIn}>Got it. What part of town is the house in?</p>
        </div>
      </PhoneFrame>
      <div className="absolute inset-x-0 bottom-0 rounded-box border border-line bg-surface p-4 text-ink sm:inset-x-2">
        <p className="flex items-center gap-2 text-label">
          <BellIcon width={16} height={16} className="text-tile" /> New lead: Leak after the storm
        </p>
        <p className="mt-1 text-label font-normal text-ink-muted">Dana R., Coral Springs. Today, it&apos;s urgent.</p>
      </div>
    </div>
  );
}

function OwnerPreview() {
  const cols = [
    { label: "New", cards: [["Dana R.", "Leak after the storm", "Coral Springs", true]] },
    { label: "Called back", cards: [["Renee W.", "Inspection for insurance", "Coconut Creek", false]] },
    { label: "Quote sent", cards: [["Omar H.", "Quote for a new roof", "Plantation", false]] },
  ] as const;
  return (
    <div aria-hidden className="grid grid-cols-3 gap-2 rounded-box border border-line bg-sunk p-2 sm:gap-3 sm:p-3">
      {cols.map((c) => (
        <div key={c.label} className="flex min-w-0 flex-col gap-2">
          <p className="px-1 text-micro font-semibold">{c.label}</p>
          {c.cards.map(([name, issue, area, mine]) => (
            <div key={name} className={`min-w-0 rounded-box border bg-surface p-2.5 ${mine ? "border-answered" : "border-line"}`}>
              <p className="truncate text-micro font-semibold">{name}</p>
              <p className="text-micro">{issue}</p>
              <p className="mt-1 flex items-center gap-1 truncate text-micro text-ink-muted">
                <PinIcon width={12} height={12} /> {area}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
