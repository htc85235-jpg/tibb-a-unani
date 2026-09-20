const FEATURES = [
  {
    t: "Free Shipping",
    d: "On every order, all over Pakistan",
    icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7zM7 18a2 2 0 104 0 2 2 0 00-4 0zM17 18a2 2 0 104 0 2 2 0 00-4 0z",
  },
  {
    t: "Easy Returns",
    d: "7-day hassle-free return promise",
    icon: "M4 10a8 8 0 0114-3M20 14a8 8 0 01-14 3M18 3v4h-4M6 21v-4h4",
  },
  {
    t: "Support Online",
    d: "Hakeem guidance on WhatsApp daily",
    icon: "M12 21c5 0 9-3.8 9-8.5S17 4 12 4 3 7.8 3 12.5 7 21 12 21zM8.5 11h.01M15.5 11h.01M9 15c.8.7 1.9 1 3 1s2.2-.3 3-1",
  },
];

export default function FeaturesRow() {
  return (
    <section className="border-y border-slate-100 py-10" aria-label="Store features">
      <div className="container-x grid gap-8 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.t} className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d={f.icon} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span>
              <span className="block font-display text-lg font-bold text-slate-900">{f.t}</span>
              <span className="block text-sm text-slate-500">{f.d}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
