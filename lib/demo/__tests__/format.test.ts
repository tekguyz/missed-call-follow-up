import { describe, expect, it } from "vitest";
import { shownWhen } from "../format";

const now = new Date(2026, 10, 10, 20, 0, 0);
const ago = (min: number) => new Date(now.getTime() - min * 60000).toISOString();

describe("shownWhen", () => {
  it("shows a sample label as it is", () => {
    expect(shownWhen({ when: "Yesterday" }, now)).toBe("Yesterday");
  });
  it("shows the visitor's times relative to now", () => {
    expect(shownWhen({ at: ago(0) }, now)).toBe("Just now");
    expect(shownWhen({ at: ago(5) }, now)).toBe("5 min ago");
    expect(shownWhen({ at: ago(90) }, now)).toMatch(/^Today, 6:30\sPM$/);
    expect(shownWhen({ at: ago(60 * 24) }, now)).toBe("Earlier");
  });
  it("shows nothing for a missing or broken time", () => {
    expect(shownWhen({}, now)).toBe("");
    expect(shownWhen({ at: "not a time" }, now)).toBe("");
  });
});
