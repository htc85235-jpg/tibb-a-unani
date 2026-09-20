export default function AboutSection() {
  return (
    <section id="about" className="py-14" aria-label="About us">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl">
          <img src="/images/about.png" alt="Traditional herbal dispensary" className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">About us</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Three Generations of Hikmat, One Promise of Purity
          </h2>
          <p className="mt-5 leading-7 text-slate-600">
            Tibb-a-Unani began as the family dispensary of a village Hakeem who believed that nature, used
            wisely, heals gently. Today the same family prepares classical Unani remedies — majoons, khamiras,
            sharbats and oils — in small, carefully supervised batches.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            Every herb is sourced from trusted growers, every batch is lab tested for purity, and every
            formulation follows the classical texts without shortcuts. No chemicals, no hidden ingredients —
            only honest hikmat, delivered to your doorstep with Cash on Delivery anywhere in Pakistan.
          </p>
          <a href="/pages/contact/" className="btn-primary mt-7">Talk to Our Hakeem</a>
        </div>
      </div>
    </section>
  );
}
