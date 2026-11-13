import type { ReactNode } from "react";

// A drawn phone (LOOKS.md, "Phone and browser frames"; DESIGN.md, Phone).
// Real proportions (9:19.5), device corners, a status bar with the time and
// an island, and a home bar. Every size is in container units, so the phone
// keeps its proportions at any width the caller gives it.

type Props = {
  /** Width of the phone, as Tailwind classes. The height follows the ratio. */
  widthClass: string;
  children: ReactNode;
};

export function PhoneFrame({ widthClass, children }: Props) {
  return (
    <div className={`@container mx-auto max-w-full ${widthClass}`}>
      <div className="relative aspect-[9/19.5] w-full rounded-[15cqw] bg-device p-[2.6cqw] shadow-[0_28px_56px_-28px_rgb(21_33_44/0.55)] ring-1 ring-night-line">
        {/* Side keys: action and volume on the left, power on the right. */}
        <span aria-hidden className="absolute top-[17%] -left-[0.9cqw] h-[4.5%] w-[0.9cqw] rounded-l-[0.6cqw] bg-night-line" />
        <span aria-hidden className="absolute top-[25%] -left-[0.9cqw] h-[8%] w-[0.9cqw] rounded-l-[0.6cqw] bg-night-line" />
        <span aria-hidden className="absolute top-[35%] -left-[0.9cqw] h-[8%] w-[0.9cqw] rounded-l-[0.6cqw] bg-night-line" />
        <span aria-hidden className="absolute top-[28%] -right-[0.9cqw] h-[12%] w-[0.9cqw] rounded-r-[0.6cqw] bg-night-line" />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[12.4cqw] bg-night text-on-night">
          <StatusBar />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <span aria-hidden className="mx-auto mt-[1.5cqw] mb-[2.4cqw] h-[1.3cqw] w-[34cqw] shrink-0 rounded-full bg-on-night-muted/70" />
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div aria-hidden className="relative flex h-[13cqw] shrink-0 items-center justify-between px-[8cqw] pt-[1.5cqw] text-on-night">
      <span className="w-[16cqw] text-center text-micro font-semibold tabular-nums">7:42</span>
      <span className="absolute top-[3cqw] left-1/2 h-[8.6cqw] w-[30cqw] -translate-x-1/2 rounded-full bg-device" />
      <span className="flex items-center gap-[1.4cqw]">
        <svg viewBox="0 0 18 12" className="h-[3.2cqw] w-auto fill-current">
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" opacity="0.35" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-[3.2cqw] w-auto fill-current">
          <path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.3-1.4A10.4 10.4 0 0 0 8 .5C5.2.5 2.6 1.6.7 3.4L2 4.8a8.5 8.5 0 0 1 6-2.4Z" />
          <path d="M8 6.1c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.8 6.8 0 0 0 8 4.2c-1.8 0-3.4.7-4.7 1.8l1.3 1.4C5.5 6.6 6.7 6.1 8 6.1Z" />
          <path d="M8 9.6 9.9 11.6 8 12 6.1 11.6Z" />
          <circle cx="8" cy="10.3" r="1.6" />
        </svg>
        <svg viewBox="0 0 27 13" className="h-[3.4cqw] w-auto">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="15" height="9" rx="2" fill="currentColor" />
          <path d="M25 4.5v4c.8-.3 1.5-1 1.5-2s-.7-1.7-1.5-2Z" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}
