"use client";
import { useState } from "react";

/* Collapsible box, closed by default, with a + / − toggle icon (matches the
   reference store's Shipping/Returns behavior: content hidden until the
   visitor taps the + icon). */
export default function Accordion({ items }: { items: { title: string; body: string[] }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
      {items.map((it, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between px-5 py-4 text-left"
          >
            <span className="font-display text-base font-bold text-slate-900">{it.title}</span>
            <span
              aria-hidden
              className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition ${open === i ? "border-brand-500 bg-brand-500 text-white" : ""}`}
            >
              {/* horizontal bar of the plus sign */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                {/* vertical bar rotates away when open -> becomes a minus */}
                <path
                  d="M6 1v10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className={`origin-center transition-transform duration-200 ${open === i ? "scale-y-0" : ""}`}
                />
              </svg>
            </span>
          </button>
          {open === i && (
            <div className="space-y-2 px-5 pb-5 text-sm leading-6 text-slate-600">
              {it.body.map((b, k) => <p key={k} dir="auto">{b}</p>)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
