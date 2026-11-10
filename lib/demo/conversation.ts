// The visitor's one call, as pure steps: setup → ringing → missed →
// follow-up → done. Each step returns a new Run, or the same Run when the
// step does not fit the phase, so a double tap or a stale timer does nothing.

import { closing, greeting, questions } from "./script";
import type { Channel, Lead, Question, Run } from "./types";

export function newRun(channel: Channel, callerName: string): Run {
  return { phase: "setup", channel, callerName, answers: {}, transcript: [] };
}

export function ring(run: Run): Run {
  return run.phase === "setup" ? { ...run, phase: "ringing" } : run;
}

export function miss(run: Run): Run {
  return run.phase === "ringing" ? { ...run, phase: "missed" } : run;
}

export function openFollowUp(run: Run): Run {
  if (run.phase !== "missed") return run;
  return {
    ...run,
    phase: "followup",
    transcript: [{ from: "business", text: greeting(run.channel, run.callerName) }],
  };
}

/** The question waiting for the caller's reply, or null. */
export function currentQuestion(run: Run): Question | null {
  if (run.phase !== "followup") return null;
  return questions.find((q) => !run.answers[q.id]) ?? null;
}

export function answer(run: Run, optionId: string): Run {
  const question = currentQuestion(run);
  const option = question?.options.find((o) => o.id === optionId);
  if (!question || !option) return run;

  const answers = { ...run.answers, [question.id]: option };
  const next = questions.find((q) => !answers[q.id]);
  const reply = next ? next.prompt : closing(run.channel, answers.urgency);
  return {
    ...run,
    answers,
    phase: next ? "followup" : "done",
    transcript: [...run.transcript, { from: "caller", text: option.label }, { from: "business", text: reply }],
  };
}

export function toLead(run: Run, id: string, at: string): Lead {
  const { issue, area, urgency } = run.answers;
  if (run.phase !== "done" || !issue || !area || !urgency) {
    throw new Error("A lead needs a finished follow-up.");
  }
  return {
    id,
    name: run.callerName,
    issue: issue.label,
    area: area.label,
    urgency: urgency.label,
    channel: run.channel,
    stage: "new",
    at,
    mine: true,
  };
}
