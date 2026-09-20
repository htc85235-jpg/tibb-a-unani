"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { end: 25, suffix: "K+", label: "Orders Delivered" },
  { end: 97, suffix: " %", label: "Success Rate" },
  { end: 400, suffix: "+", label: "Natural Herbs" },
];

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [vals, setVals] = useState([0, 0, 0]);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const k = Math.min(1, (t - t0) / 1600);
            const e = 1 - Math.pow(1 - k, 3);
            setVals(STATS.map((s) => Math.round(s.end * e)));
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-brand-950 py-12" aria-label="Store statistics">
      <div className="container-x text-center">
        <h2 className="font-display text-2xl font-bold tracking-wide text-white sm:text-3xl">TRUSTED BY THOUSANDS</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div key={s.label}>
              <p className="font-display text-4xl font-bold text-brand-300 sm:text-5xl">{vals[i]}{s.suffix}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-brand-100/70 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
