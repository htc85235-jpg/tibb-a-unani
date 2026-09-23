"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/lib/products";
import Link from "next/link";

export default function FeaturedProducts() {
  const [shown, setShown] = useState(12);
  const items = products.slice(0, shown);

  return (
    <section className="py-14" aria-label="Our best herbal products">
      <div className="container-x">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">Hand-picked for you</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">Our Best Herbal Products</h2>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
        {shown < products.length ? (
          <div className="mt-9 text-center">
            <button className="btn-outline" onClick={() => setShown(products.length)}>Load more</button>
          </div>
        ) : (
          <div className="mt-9 text-center">
            <Link href="/collections/all/" className="btn-outline">View Full Catalog</Link>
          </div>
        )}
      </div>
    </section>
  );
}
