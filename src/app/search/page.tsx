"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function SearchPage() {
  /* read ?q= AFTER hydration — reading window.location during first render
     mismatches the build-time HTML and throws React #418 */
  const [q, setQ] = useState("");
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q") || "";
    if (initial) setQ(initial);
  }, []);
  const results = q.trim()
    ? products.filter((p) => (p.name + " " + p.category + " " + p.short + " " + p.urdu).toLowerCase().includes(q.trim().toLowerCase()))
    : [];

  return (
    <div className="container-x py-10">
      <h1 className="font-display text-3xl font-bold text-slate-900">Search</h1>
      <form className="mt-5 max-w-xl" onSubmit={(e) => e.preventDefault()}>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="I'm looking for…"
          aria-label="Search products"
          className="field rounded-full py-3"
        />
      </form>

      {q.trim() === "" ? (
        <p className="mt-8 text-slate-500">Type a product name, category or remedy type above — e.g. “majoon”, “oil”, “sharbat”.</p>
      ) : results.length === 0 ? (
        <div className="mt-10">
          <p className="font-display text-xl font-bold text-slate-800">No products found for “{q}”</p>
          <p className="mt-2 text-slate-500">Try a shorter keyword, or browse the full catalog.</p>
        </div>
      ) : (
        <>
          <p className="mt-8 text-sm text-slate-500">{results.length} result{results.length !== 1 ? "s" : ""} for “{q}”</p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </>
      )}
    </div>
  );
}
