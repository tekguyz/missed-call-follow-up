// The made-up Sample Business the demo plays (DEMO-STANDARD.md, "Every demo
// is a made-up business"). Keywind Roofing is not a real company: the name
// was searched on 2026-11-10 and no business uses it. Never a real business
// name, and never a phone number, real or placeholder.

import type { Channel, Stage } from "./types";

export const business = {
  name: "Keywind Roofing",
  shortName: "Keywind",
  /** The owner, who gets the alerts. First name only. */
  owner: "Marisol",
  region: "South Florida",
} as const;

export const channels: readonly { id: Channel; label: string; hint: string }[] = [
  { id: "text", label: "Text", hint: "A text reaches the caller's phone." },
  { id: "email", label: "Email", hint: "For past customers, whose email is on file." },
  { id: "voice", label: "Voice callback", hint: "An automated call rings the caller back." },
];

export const stages: readonly { id: Stage; label: string }[] = [
  { id: "new", label: "New" },
  { id: "called", label: "Called back" },
  { id: "quoted", label: "Quote sent" },
  { id: "won", label: "Won" },
];

export const channelLabel: Record<Channel, string> = {
  text: "Text",
  email: "Email",
  voice: "Voice callback",
};
