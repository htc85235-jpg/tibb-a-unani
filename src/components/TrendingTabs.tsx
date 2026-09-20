"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { freshProducts, hotProducts, saleProducts } from "@/lib/products";

const TABS = [
  { key: "hot", label: "Hot Products", get: hotProducts },
  { key: "new", label: "New Arrivals", get: freshProducts },
  { key: "sale", label: "On Sale", get: saleProducts },
];

export default function TrendingTabs() {
  const [tab, setTab] = useState("hot");
  const active = TABS.find((t) => t.key === tab)!;
  const items = active.get();

  return (
    <section className="py-14" aria-label="Trending this week">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">Trending this week</h2>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Trending categories">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm ${
                  tab === t.key ? "bg-brand-600 text-white shadow-sm" : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div key={tab} className="fade-up mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  );
}
