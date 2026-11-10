import { describe, expect, it } from "vitest";
import { answer, currentQuestion, miss, newRun, openFollowUp, ring, toLead } from "../conversation";
import { questions } from "../script";

function finished(channel: "text" | "email" | "voice" = "text") {
  let run = openFollowUp(miss(ring(newRun(channel, "Dana R."))));
  for (const q of questions) run = answer(run, q.options[0].id);
  return run;
}

describe("conversation", () => {
  it("goes setup, ringing, missed, follow-up", () => {
    const run = newRun("text", "Dana R.");
    expect(run.phase).toBe("setup");
    expect(ring(run).phase).toBe("ringing");
    expect(miss(ring(run)).phase).toBe("missed");
    const follow = openFollowUp(miss(ring(run)));
    expect(follow.phase).toBe("followup");
    expect(follow.transcript).toHaveLength(1);
    expect(follow.transcript[0].from).toBe("business");
  });

  it("will not skip a phase", () => {
    const run = newRun("text", "Dana R.");
    expect(miss(run)).toBe(run);
    expect(openFollowUp(run)).toBe(run);
    expect(answer(run, "leak")).toBe(run);
  });

  it("asks each question once, in order, then closes", () => {
    let run = openFollowUp(miss(ring(newRun("text", "Dana R."))));
    for (const q of questions) {
      expect(currentQuestion(run)?.id).toBe(q.id);
      run = answer(run, q.options[1].id);
    }
    expect(currentQuestion(run)).toBeNull();
    expect(run.phase).toBe("done");
    // greeting + (reply + next prompt) per question, last prompt is the close
    expect(run.transcript.filter((t) => t.from === "caller")).toHaveLength(questions.length);
    expect(run.transcript.at(-1)?.from).toBe("business");
  });

  it("ignores an option that is not on the current question", () => {
    const run = openFollowUp(miss(ring(newRun("text", "Dana R."))));
    expect(answer(run, "not-a-choice")).toBe(run);
  });

  it("greets differently on each channel", () => {
    const first = (c: "text" | "email" | "voice") =>
      openFollowUp(miss(ring(newRun(c, "Dana R.")))).transcript[0].text;
    expect(new Set([first("text"), first("email"), first("voice")]).size).toBe(3);
  });

  it("turns a finished run into a New lead with the caller's answers", () => {
    const run = finished("voice");
    const lead = toLead(run, "lead-1", "2026-11-10T23:42:00.000Z");
    expect(lead).toMatchObject({
      id: "lead-1",
      name: "Dana R.",
      channel: "voice",
      stage: "new",
      mine: true,
      at: "2026-11-10T23:42:00.000Z",
      issue: questions[0].options[0].label,
      area: questions[1].options[0].label,
      urgency: questions[2].options[0].label,
    });
  });

  it("will not make a lead from an unfinished run", () => {
    expect(() => toLead(newRun("text", "Dana R."), "x", "now")).toThrow();
  });
});
