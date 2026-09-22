"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { bySlug, prevNext, related, alsoBought } from "@/lib/products";
import Breadcrumbs from "@/components/Breadcrumbs";
import Price from "@/components/Price";
import Stars from "@/components/Stars";
import CodModal from "@/components/CodModal";
import Accordion from "@/components/Accordion";
import ProductCard from "@/components/ProductCard";
import StatsBand from "@/components/StatsBand";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import { policies } from "@/lib/policies";

export default function ProductView({ slug }: { slug: string }) {
  const p = bySlug(slug);
  const [cod, setCod] = useState(false);
  const [viewing, setViewing] = useState(p?.viewing ?? 0);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!p) return;
    /* eslint-disable-next-line react-hooks/set-state-in-effect -- seed live viewer count for this product */
    setViewing(p.viewing);
    const t = setInterval(() => setViewing((v) => Math.max(3, Math.min(60, v + (Math.random() > 0.5 ? 1 : -1)))), 4000);
    return () => clearInterval(t);
  }, [p]);

  if (!p) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Product not found</h1>
        <Link href="/collections/all/" className="btn-primary mt-5">Browse Catalog</Link>
      </div>
    );
  }

  const { prev, next } = prevNext(p.slug);
  const shipPolicy = policies.find((x) => x.slug === "shipping-policy")!;
  const refundPolicy = policies.find((x) => x.slug === "refund-policy")!;

  return (
    <>
      <div className="container-x py-6">
        <div className="flex items-center justify-between gap-4">
          <Breadcrumbs trail={[{ label: p.name }]} />
          <div className="hidden items-center gap-1 sm:flex">
            <Link href={`/products/${prev.slug}/`} aria-label={`Previous product: ${prev.name}`} className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-brand-400 hover:text-brand-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </Link>
            <Link href="/collections/all/" aria-label="All products" className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-brand-400 hover:text-brand-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" stroke="currentColor" strokeWidth="1.7" /></svg>
            </Link>
            <Link href={`/products/${next.slug}/`} aria-label={`Next product: ${next.name}`} className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-brand-400 hover:text-brand-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          {/* gallery */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              <button aria-label="Zoom image" onClick={() => setZoom(true)} className="overflow-hidden rounded-lg border-2 border-brand-500">
                <img src={p.img} alt={p.name} className="h-16 w-16 object-cover" />
              </button>
              <div className="overflow-hidden rounded-lg border border-slate-200 opacity-70">
                <img src="/images/hero2.png" alt={`${p.name} in context`} className="h-16 w-16 object-cover" />
              </div>
            </div>
            <div className="relative flex-1 overflow-hidden rounded-xl bg-brand-50/40">
              <img src={p.img} alt={p.name} className="aspect-square w-full cursor-zoom-in object-cover" onClick={() => setZoom(true)} />
              <button
                aria-label="Zoom image"
                onClick={() => setZoom(true)}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition hover:scale-105"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M11 4a7 7 0 105.2 11.7L21 21M11 8v6M8 11h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
          </div>

          {/* info */}
          <div>
            <div className="flex items-center gap-2">
              <Stars rating={p.rating} size={17} />
              <span className="text-sm font-bold text-slate-800">{p.rating}</span>
              <span className="text-sm text-slate-400">({p.reviews} Reviews)</span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">{p.name}</h1>
            <div className="mt-3"><Price price={p.price} compareAt={p.compareAt} size="lg" /></div>
            <p className="mt-1 text-xs text-slate-400">Inclusive of all taxes · Pack size {p.size}</p>

            {p.inStock ? (
              <>
                <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-sale">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 4-3 5-3 9a3 3 0 106 0c0-2-1-3-1-3s3 1 3 4a5 5 0 01-10 0c0-5 4-6 5-10z" /></svg>
                  {p.sold24} sold in last 24 hours
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-800 text-white">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" /></svg>
                  </span>
                  {viewing} peoples are viewing this right now
                </p>
              </>
            ) : (
              <p className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-500">Out of stock — new batch coming soon</p>
            )}

            <p className="mt-4 leading-7 text-slate-600">{p.short}</p>
            {p.urdu && <p dir="rtl" lang="ur" className="mt-2 text-lg font-semibold text-brand-700">{p.urdu}</p>}

            {p.inStock && (
              <button onClick={() => setCod(true)} className="btn-primary mt-6 w-full rounded-xl bg-brand-600 py-3.5 text-base shadow-sm shadow-brand-900/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 8h12l1 12H5L6 8zm3 0V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                Buy with Cash on Delivery
              </button>
            )}

            <div className="mt-7">
              <Accordion
                items={[
                  { title: "Shipping and Returns", body: shipPolicy.body.slice(0, 2) },
                  { title: "Return Policies", body: refundPolicy.body.slice(0, 2) },
                ]}
              />
            </div>
          </div>
        </div>

        {/* description */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">Description</h2>
            {p.description.map((d, i) => <p key={i} className="mt-3 leading-7 text-slate-600">{d}</p>)}
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">Benefits & Dosage</h2>
            <ul className="mt-3 space-y-2">
              {p.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-1 shrink-0 text-brand-600"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl bg-brand-50 p-4 text-sm leading-6 text-brand-900"><b>Dosage:</b> {p.dosage}</p>
          </div>
        </div>
      </div>

      {/* pairs well with */}
      <section className="py-12" aria-label="Pairs well with">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold text-slate-900">Pairs well with</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related(p).map((r) => <ProductCard key={r.slug} p={r} />)}
          </div>
        </div>
      </section>

      <StatsBand />

      {/* people also bought */}
      <section className="py-12" aria-label="People also bought">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold text-slate-900">People Also Bought</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {alsoBought(p).map((r) => <ProductCard key={r.slug} p={r} />)}
          </div>
        </div>
      </section>

      <TrustBadges />
      <Testimonials />

      {/* zoom modal */}
      {zoom && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-6" onClick={() => setZoom(false)} role="dialog" aria-modal="true" aria-label="Zoomed product image">
          <img src={p.img} alt={p.name} className="pop-in max-h-[85vh] max-w-full rounded-xl object-contain" />
          <button aria-label="Close zoom" className="absolute right-5 top-5 rounded-full bg-white/90 p-2 text-slate-700">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
      )}

      <CodModal product={p} open={cod} onClose={() => setCod(false)} />
    </>
  );
}
