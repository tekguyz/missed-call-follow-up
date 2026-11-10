// The sample pipeline the demo opens on: made-up callers, first name and
// last initial only. Labels, never dates, so the board never looks stale.

import type { Alert, Lead } from "./types";

export const sampleLeads: readonly Lead[] = [
  { id: "s-1", name: "Tomás G.", issue: "Leak after the storm", area: "Margate", urgency: "Today, it's urgent", channel: "text", stage: "new", when: "This morning" },
  { id: "s-2", name: "Renee W.", issue: "Inspection for insurance", area: "Coconut Creek", urgency: "This week", channel: "email", stage: "called", when: "Yesterday" },
  { id: "s-3", name: "Omar H.", issue: "Quote for a new roof", area: "Plantation", urgency: "No rush", channel: "voice", stage: "quoted", when: "2 days ago" },
  { id: "s-4", name: "Grace L.", issue: "Loose tiles on the ridge", area: "Deerfield Beach", urgency: "This week", channel: "text", stage: "quoted", when: "Last week" },
  { id: "s-5", name: "Victor P.", issue: "Quote for a new roof", area: "Parkland", urgency: "No rush", channel: "text", stage: "won", when: "Last week" },
];

export const sampleAlerts: readonly Alert[] = [
  {
    id: "a-1",
    when: "This morning",
    title: "New lead: Leak after the storm",
    body: "Tomás G., Margate. Today, it's urgent. Came in by text.",
    leadId: "s-1",
  },
];
