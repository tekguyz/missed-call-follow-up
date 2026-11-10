// How a time shows on screen. Sample items carry a label ("Yesterday"); the
// visitor's carry a real time, shown relative to now.

export function shownWhen(item: { when?: string; at?: string }, now: Date): string {
  if (item.when) return item.when;
  if (!item.at) return "";
  const at = new Date(item.at);
  if (Number.isNaN(at.getTime())) return "";
  const minutes = Math.floor((now.getTime() - at.getTime()) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (at.toDateString() === now.toDateString()) {
    return `Today, ${at.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
  }
  return "Earlier";
}
