"use client";
import { useEffect, useRef, useState } from "react";
import Stars from "./Stars";

/* NOTE: reviews may only mention products from the real catalog
   (Joint Sukoon Oil, Prozon Premium Prostate Support, Men's Vitality Support,
   Donkey Oil & Golden Capsule, Pine Height, Sperm Plus Tablets) — no retired/dummy product names. */
const REVIEWS = [
  { name: "Ayesha K., Lahore", text: "Joint Sukoon Oil ki quality bilkul purane dawakhanay jaisi hai. Packaging bhi neat thi aur delivery sirf do din mein pohanch gayi. Bohat shukriya!", rating: 5 },
  { name: "Muhammad Iqbal, Islamabad", text: "Walid sahab ke liye majoon mangwaya tha. Unhone bataya ke zaiqa aur asar dono purane zamane ki dawa jaise hain. InshaAllah dobara order karunga.", rating: 5 },
  { name: "Sana R., Karachi", text: "Order se pehle Hakeem sahib ne WhatsApp par dosage ki poori guidance di. Products fresh hain aur asli jari bootiyon se bante hain. Recommended!", rating: 5 },
  { name: "Bilal A., Faisalabad", text: "Cash on delivery ne pehli order par bharosa asaan bana diya. Ab Men's Vitality Support ki teesri bottle use kar raha hoon, result acha hai.", rating: 4 },
  { name: "Dr. Farah T., Rawalpindi", text: "Main composition khud check karti hoon — formulations classical aur clean hain, koi faltu cheez shamil nahi. Patients ko herbal option ke tor par bataya hai.", rating: 5 },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const n = REVIEWS.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef<number | null>(null);

  /* auto-rotate keeps running; reset the clock after a manual jump so it never flips right after a click */
  const restart = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setI((v) => (v + 1) % n), 6000);
  };
  useEffect(() => {
    timer.current = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [n]);

  const manual = (d: number) => { setI((v) => (v + d + n) % n); restart(); };

  return (
    <section className="bg-brand-50/60 py-14" aria-label="Customer testimonials">
      <div className="container-x text-center">
        <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">What Our Customers Say</h2>
        <div className="relative mx-auto mt-8 max-w-2xl">
          {/* left / right arrows — visitors can browse reviews in both directions */}
          <button
            aria-label="Previous review"
            onClick={() => manual(-1)}
            className="absolute -left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-brand-600 hover:text-white lg:-left-14 lg:h-10 lg:w-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div
            className="card p-7 sm:p-9"
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 40) manual(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <Stars rating={REVIEWS[i].rating} size={18} />
            <p key={i} aria-live="polite" className="fade-up mt-4 min-h-20 text-[15px] leading-7 text-slate-700">“{REVIEWS[i].text}”</p>
            <p className="mt-4 text-sm font-bold text-brand-700">{REVIEWS[i].name}</p>
          </div>
          <button
            aria-label="Next review"
            onClick={() => manual(1)}
            className="absolute -right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-brand-600 hover:text-white lg:-right-14 lg:h-10 lg:w-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="mt-5 flex items-center justify-center gap-2">
            {REVIEWS.map((_, k) => (
              <button
                key={k}
                aria-label={`Show review ${k + 1}`}
                onClick={() => { setI(k); restart(); }}
                className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-brand-600" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
