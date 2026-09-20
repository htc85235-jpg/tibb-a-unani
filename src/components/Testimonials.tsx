"use client";
import { useEffect, useState } from "react";
import Stars from "./Stars";

const REVIEWS = [
  { name: "Ayesha K., Lahore", text: "The Khamira Gilo quality is exactly like the old dawakhanas used to make. Packaging was neat and delivery took only two days.", rating: 5 },
  { name: "Muhammad Iqbal, Islamabad", text: "Ordered the majoon for my father. He says the taste and effect both remind him of his childhood remedies. Will order again.", rating: 5 },
  { name: "Sana R., Karachi", text: "Hakeem sahib guided me on WhatsApp about dosage before I even ordered. Products are fresh and genuinely herbal.", rating: 5 },
  { name: "Bilal A., Faisalabad", text: "Cash on delivery made it easy to trust the first order. Now I am on my third bottle of Sharbat Faulad.", rating: 4 },
  { name: "Dr. Farah T., Rawalpindi", text: "As a doctor I check compositions carefully — clean, classical formulations with nothing unnecessary added. Recommended to my patients as a herbal option.", rating: 5 },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const n = REVIEWS.length;
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);

  return (
    <section className="bg-brand-50/60 py-14" aria-label="Customer testimonials">
      <div className="container-x text-center">
        <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">What Our Customers Say</h2>
        <div className="relative mx-auto mt-8 max-w-2xl">
          <div className="card p-7 sm:p-9">
            <Stars rating={REVIEWS[i].rating} size={18} />
            <p key={i} className="fade-up mt-4 min-h-20 text-[15px] leading-7 text-slate-700">“{REVIEWS[i].text}”</p>
            <p className="mt-4 text-sm font-bold text-brand-700">{REVIEWS[i].name}</p>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2">
            {REVIEWS.map((_, k) => (
              <button
                key={k}
                aria-label={`Show review ${k + 1}`}
                onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-brand-600" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
