// Small line icons, 24px grid, drawn after Lucide (ISC license).
import type { SVGProps } from "react";

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const handset =
  "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z";

type P = SVGProps<SVGSVGElement>;
export const PhoneIcon = (p: P) => (<svg {...base} {...p}><path d={handset} /></svg>);
export const PhoneMissedIcon = (p: P) => (<svg {...base} {...p}><path d="m16 2 6 6M22 2l-6 6" /><path d={handset} /></svg>);
export const PhoneIncomingIcon = (p: P) => (<svg {...base} {...p}><path d="M16 2v6h6M22 2l-6 6" /><path d={handset} /></svg>);
export const TextIcon = (p: P) => (<svg {...base} {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>);
export const MailIcon = (p: P) => (<svg {...base} {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>);
export const BellIcon = (p: P) => (<svg {...base} {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>);
export const ArrowRightIcon = (p: P) => (<svg {...base} {...p}><path d="M5 12h14M12 5l7 7-7 7" /></svg>);
export const CheckIcon = (p: P) => (<svg {...base} {...p}><path d="M20 6 9 17l-5-5" /></svg>);
export const PinIcon = (p: P) => (<svg {...base} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>);
