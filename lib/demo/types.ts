// The words of the demo, as types. CONTEXT.md defines each term.

/** How the caller hears back. The business picks it. */
export type Channel = "text" | "email" | "voice";

/** A column on the owner's pipeline board, in order. */
export type Stage = "new" | "called" | "quoted" | "won";

export type QuestionId = "issue" | "area" | "urgency";

export type Option = { id: string; label: string };

export type Question = { id: QuestionId; prompt: string; options: readonly Option[] };

/** One line of the follow-up, as the caller sees it. */
export type Turn = { from: "business" | "caller"; text: string };

/** Where the visitor's own call is, from the button to the lead. */
export type Phase = "setup" | "ringing" | "missed" | "followup" | "done";

export type Run = {
  phase: Phase;
  channel: Channel;
  callerName: string;
  answers: Partial<Record<QuestionId, Option>>;
  transcript: Turn[];
};

export type Lead = {
  id: string;
  name: string;
  issue: string;
  area: string;
  urgency: string;
  channel: Channel;
  stage: Stage;
  /** Sample leads: a shown label, such as "Yesterday". Never a date. */
  when?: string;
  /** The visitor's own leads: when it came in (ISO). Shown as "Just now", etc. */
  at?: string;
  /** True for a lead the visitor made in this browser. */
  mine?: boolean;
};

export type Alert = {
  id: string;
  /** Same as Lead: a label for sample alerts, an ISO time for the visitor's. */
  when?: string;
  at?: string;
  title: string;
  body: string;
  leadId?: string;
};

export type Result = { ok: true } | { ok: false; reason: string };
