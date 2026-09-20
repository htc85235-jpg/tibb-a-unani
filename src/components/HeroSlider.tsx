"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    kicker: "Tibb-a-Unani",
    title: "Ancient Hikmat, Pure Healing.",
    sub: "100% Natural & Lab-Tested Herbal Remedies for the Whole Family.",
    cta: "Shop Remedies",
    img: "/images/hero1.png",
  },
  {
    kicker: "Classical Formulations",
    title: "Majoons, Khamiras & Sharbats",
    sub: "Prepared in small batches the way the old dawakhanas did — nothing artificial, ever.",
    cta: "Explore Catalog",
    img: "/images/hero2.png",
  },
  {
    kicker: "Cash on Delivery",
    title: "Nature at Your Doorstep",
    sub: "Order today, pay when the parcel reaches your hands. Delivery all over Pakistan.",
    cta: "Order Now",
    img: "/images/hero3.png",
  },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const n = SLIDES.length;
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % n), 6500);
    return () => clearInterval(t);
  }, [n]);

  return (
    <section className="relative h-[420px] overflow-hidden bg-brand-950 sm:h-[500px]" aria-label="Featured highlights">
      {SLIDES.map((s, k) => (
        <div
          key={k}
          className={`absolute inset-0 transition-opacity duration-700 ${k === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={k !== i}
        >
          <img src={s.img} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/80 via-brand-950/45 to-transparent" />
          <div className="container-x absolute inset-0 flex flex-col justify-center">
            <div key={i} className="fade-up max-w-xl text-white">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-300 sm:text-sm">{s.kicker}</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">{s.title}</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-brand-50/90 sm:text-base">{s.sub}</p>
              <Link href="/collections/bestsellers/" className="btn-primary mt-7 bg-white text-brand-800 hover:bg-brand-50">
                {s.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}
      <button
        aria-label="Previous slide"
        onClick={() => setI((v) => (v - 1 + n) % n)}
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white backdrop-blur transition hover:bg-white/30 sm:block"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={() => setI((v) => (v + 1) % n)}
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white backdrop-blur transition hover:bg-white/30 sm:block"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, k) => (
          <button
            key={k}
            aria-label={`Go to slide ${k + 1}`}
            onClick={() => setI(k)}
            className={`h-1.5 rounded-full transition-all ${k === i ? "w-7 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
}
