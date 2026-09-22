"use client";
import Link from "next/link";
import type { Product } from "@/lib/products";
import Price from "./Price";
import Stars from "./Stars";
import { useStore } from "@/lib/store";

export default function ProductCard({ p, view = "grid" }: { p: Product; view?: "grid" | "list" }) {
  const { toggleWish, inWish } = useStore();
  const wished = inWish(p.slug);
  const off = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;

  const Heart = (
    <button
      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => { e.preventDefault(); toggleWish(p.slug); }}
      className={`absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-white/95 shadow-sm transition hover:scale-110 ${
        wished ? "border-sale text-sale" : "border-slate-200 text-slate-500"
      }`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"}>
        <path d="M12 20.5s-7.5-4.6-9.3-9A5.2 5.2 0 0112 6.6a5.2 5.2 0 019.3 4.9c-1.8 4.4-9.3 9-9.3 9z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </button>
  );

  const imgLink = (
    <Link href={`/products/${p.slug}/`} className={`relative block overflow-hidden bg-brand-50/40 ${view === "list" ? "w-36 shrink-0 self-start" : ""}`}>
      {Heart}
      {off > 0 && (
        <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-sale px-2 py-0.5 text-[10px] font-bold text-white">-{off}%</span>
      )}
      {!p.inStock && (
        <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-slate-700 px-2 py-0.5 text-[10px] font-bold text-white">Out of stock</span>
      )}
      <img
        src={p.img}
        alt={p.name}
        loading="lazy"
        className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </Link>
  );

  const body = (
    <div className={view === "list" ? "min-w-0 flex-1" : ""}>
      <Link href={`/products/${p.slug}/`} className="mt-0.5 block truncate font-display text-base font-bold text-slate-900 transition hover:text-brand-700">
        {p.name}
      </Link>
      {view === "list" && <p className="mt-1 line-clamp-2 text-sm text-slate-500">{p.short}</p>}
      <div className="mt-1 flex items-center gap-1.5">
        <Stars rating={p.rating} size={12} />
        <span className="text-xs text-slate-400">({p.reviews})</span>
      </div>
      <div className="mt-1.5">
        <Price price={p.price} compareAt={p.compareAt} />
      </div>
    </div>
  );

  return view === "list" ? (
    <div className="group card flex gap-4 p-3">{imgLink}{body}</div>
  ) : (
    <div className="group card overflow-hidden transition hover:shadow-lg hover:shadow-brand-900/5">{imgLink}<div className="p-3">{body}</div></div>
  );
}
