"use client";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  const n = site.announcements.length;
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % n), 5000);
    return () => clearInterval(t);
  }, [n]);
  return (
    <div className="bg-brand-500 text-white">
      <div className="container-x flex items-center justify-center gap-3 py-2 text-center text-xs sm:text-sm">
        <button
          aria-label="Previous announcement"
          onClick={() => setI((v) => (v - 1 + n) % n)}
          className="opacity-80 transition hover:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <p key={i} className="fade-up font-medium">{site.announcements[i]}</p>
        <button
          aria-label="Next announcement"
          onClick={() => setI((v) => (v + 1) % n)}
          className="opacity-80 transition hover:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      </div>
    </div>
  );
}
