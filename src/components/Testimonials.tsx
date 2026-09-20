"use client";
import { useEffect, useState } from "react";
import Stars from "./Stars";

const REVIEWS = [
  { name: "Ayesha K., Lahore", text: "Khamira Gilo ki quality bilkul purane dawakhanay jaisi hai. Packaging bhi neat thi aur delivery sirf do din mein pohanch gayi. Bohat shukriya!", rating: 5 },
  { name: "Muhammad Iqbal, Islamabad", text: "Walid sahab ke liye majoon mangwaya tha. Unhone bataya ke zaiqa aur asar dono purane zamane ki dawa jaise hain. InshaAllah dobara order karunga.", rating: 5 },
  { name: "Sana R., Karachi", text: "Order se pehle Hakeem sahib ne WhatsApp par dosage ki poori guidance di. Products fresh hain aur asli jari bootiyon se bante hain. Recommended!", rating: 5 },
  { name: "Bilal A., Faisalabad", text: "Cash on delivery ne pehli order par bharosa asaan bana diya. Ab Sharbat Faulad ki teesri bottle use kar raha hoon, result acha hai.", rating: 4 },
  { name: "Dr. Farah T., Rawalpindi", text: "Main composition khud check karti hoon — formulations classical aur clean hain, koi faltu cheez shamil nahi. Patients ko herbal option ke tor par bataya hai.", rating: 5 },
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
