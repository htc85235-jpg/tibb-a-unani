export default function UrduBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-900 py-16" aria-label="Unani wisdom">
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "url(/images/hero1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div className="container-x relative text-center">
        <p dir="rtl" lang="ur" className="font-display text-3xl font-bold leading-relaxed text-white sm:text-4xl">
          حکمتِ یونانی، صحتِ مکمل
        </p>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-300">
          The Wisdom of Unani Tibb — Pure, Natural, Timeless
        </p>
        <a href="#about" className="btn-outline mt-8 border-brand-300 text-brand-100 hover:bg-brand-800">
          Watch Our Story
        </a>
      </div>
    </section>
  );
}
