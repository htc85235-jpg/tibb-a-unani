"use client";
import { useState } from "react";

export default function Accordion({ items }: { items: { title: string; body: string[] }[] }) {
  const [open, setOpen] = useState<number | null>(0);
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`text-slate-400 transition ${open === i ? "rotate-180" : ""}`}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {open === i && (
            <div className="space-y-2 px-5 pb-5 text-sm leading-6 text-slate-600">
              {it.body.map((b, k) => <p key={k}>{b}</p>)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
