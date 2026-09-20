const BADGES = [
  { t: "Guaranteed Results", icon: "M9 12l2 2 4-5M12 22a10 10 0 110-20 10 10 0 010 20z" },
  { t: "100% Natural / Herbal", icon: "M12 21c5 0 7-4 7-9-4 0-7 1-7 4 0-3-3-4-7-4 0 5 2 9 7 9zM12 8c0-3 2-5 5-6 0 3-2 6-5 6zM12 8c0-3-2-5-5-6 0 3 2 6 5 6z" },
  { t: "Fast Delivery", icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7zM7 18a2 2 0 104 0 2 2 0 00-4 0zM17 18a2 2 0 104 0 2 2 0 00-4 0z" },
  { t: "Tested & Trusted", icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4zM9 12l2 2 4-4" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-slate-100 py-9" aria-label="Why buy from us">
      <div className="container-x grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
        {BADGES.map((b) => (
          <div key={b.t} className="flex flex-col items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d={b.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span className="font-display text-sm font-bold text-slate-800 sm:text-base">{b.t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
