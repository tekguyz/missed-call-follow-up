// What Keywind Roofing's follow-up says, on each channel. Plain, honest
// lines: no prices, no promised times, no statistics, no phone numbers.

import { business } from "./business";
import type { Channel, Option, Question } from "./types";

export const questions: readonly Question[] = [
  {
    id: "issue",
    prompt: "What's going on with your roof?",
    options: [
      { id: "leak", label: "Leak after the storm" },
      { id: "replace", label: "Quote for a new roof" },
      { id: "inspect", label: "Inspection for insurance" },
    ],
  },
  {
    id: "area",
    prompt: "Got it. What part of town is the house in?",
    options: [
      { id: "coral-springs", label: "Coral Springs" },
      { id: "pembroke-pines", label: "Pembroke Pines" },
      { id: "boca-raton", label: "Boca Raton" },
    ],
  },
  {
    id: "urgency",
    prompt: "How soon do you need someone?",
    options: [
      { id: "today", label: "Today, it's urgent" },
      { id: "week", label: "This week" },
      { id: "no-rush", label: "No rush" },
    ],
  },
];

/** The sample names the visitor calls as, one per call, in turn. */
export const callerNames = ["Dana R.", "Luis M.", "Priya S.", "Andre T.", "Keisha B."] as const;

export function greeting(channel: Channel, callerName: string): string {
  const first = callerName.split(" ")[0];
  const ask = questions[0].prompt;
  switch (channel) {
    case "text":
      return `Hi ${first}, this is ${business.name}. Sorry we missed your call, we're out on a roof. ${ask}`;
    case "email":
      return `Hi ${first}, sorry we missed your call just now. You're on file with us from your last job, so we're writing back here. ${ask} Just tap a reply.`;
    case "voice":
      return `Hi ${first}, this is an automated assistant for ${business.name}, calling back about the call we just missed. ${ask}`;
  }
}

export function closing(channel: Channel, urgency: Option | undefined): string {
  const soon =
    urgency?.id === "today"
      ? `${business.owner} has been told it's urgent and will call you back tonight.`
      : `${business.owner} has your details and will call you back to set a time.`;
  switch (channel) {
    case "text":
      return `Thanks! ${soon} Reply here any time.`;
    case "email":
      return `Thank you. ${soon} You can reply to this email any time.`;
    case "voice":
      return `Thank you. ${soon} You can hang up now. Goodbye.`;
  }
}

export const emailSubject = `Sorry we missed your call: ${business.name}`;
