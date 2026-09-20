"use client";
import { useMemo, useState } from "react";
import { CATEGORIES, Product } from "@/lib/products";
import ProductCard from "./ProductCard";

type Props = { title: string; items: Product[] };

const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "az", label: "Alphabetically, A-Z" },
  { key: "za", label: "Alphabetically, Z-A" },
  { key: "lohi", label: "Price, low to high" },
  { key: "hilo", label: "Price, high to low" },
];

export default function CollectionLayout({ title, items }: Props) {
  const [cats, setCats] = useState<string[]>([]);
  const [stock, setStock] = useState<"all" | "in" | "out">("all");
  const [pmax, setPmax] = useState(5000);
  const [sort, setSort] = useState("featured");
  const [cols, setCols] = useState<2 | 3 | 4 | "list">(4);
  const [drawer, setDrawer] = useState(false);

  const catCounts = useMemo(() => {
    const m: Record<string, number> = {};
    items.forEach((p) => (m[p.category] = (m[p.category] || 0) + 1));
    return m;
  }, [items]);
  const inCount = items.filter((p) => p.inStock).length;
  const outCount = items.length - inCount;

  const filtered = useMemo(() => {
    let r = items.filter(
      (p) =>
        (cats.length === 0 || cats.includes(p.category)) &&
        (stock === "all" || (stock === "in" ? p.inStock : !p.inStock)) &&
        p.price <= pmax
    );
    const s = SORTS.find((x) => x.key === sort)!.key;
    if (s === "az") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    if (s === "za") r = [...r].sort((a, b) => b.name.localeCompare(a.name));
    if (s === "lohi") r = [...r].sort((a, b) => a.price - b.price);
    if (s === "hilo") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [items, cats, stock, pmax, sort]);

  const clearAll = () => { setCats([]); setStock("all"); setPmax(5000); };
  const toggleCat = (c: string) => setCats((v) => (v.includes(c) ? v.filter((x) => x !== c) : [...v, c]));

  const gridCls =
    cols === "list"
      ? "grid gap-4"
      : `grid grid-cols-2 gap-4 ${cols === 3 ? "md:grid-cols-3" : cols === 4 ? "md:grid-cols-3 xl:grid-cols-4" : "md:grid-cols-2"}`;

  const Filters = (
    <div className="space-y-7">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Products Category</h3>
        <div className="mt-3 space-y-2">
          {CATEGORIES.filter((c) => catCounts[c]).map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
              <input type="checkbox" checked={cats.includes(c)} onChange={() => toggleCat(c)} className="h-4 w-4 accent-brand-600" />
              {c} <span className="text-slate-400">({catCounts[c]})</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Availability</h3>
        <div className="mt-3 space-y-2">
          {([["in", `In stock (${inCount})`], ["out", `Out of stock (${outCount})`]] as const).map(([k, label]) => (
            <label key={k} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
              <input type="radio" name="stock" checked={stock === k} onChange={() => setStock(k)} className="h-4 w-4 accent-brand-600" />
              {label}
            </label>
          ))}
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
            <input type="radio" name="stock" checked={stock === "all"} onChange={() => setStock("all")} className="h-4 w-4 accent-brand-600" />
            All products
          </label>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Price</h3>
        <div className="mt-3 flex items-center gap-3">
          <input type="text" aria-label="Minimum price" className="field px-2 py-1.5 text-xs" value="Rs. 0" readOnly />
          <span className="text-slate-400">—</span>
          <input type="text" aria-label="Maximum price" className="field px-2 py-1.5 text-xs" value={`Rs. ${pmax.toLocaleString()}`} readOnly />
        </div>
        <input
          type="range" min={1000} max={5000} step={50} value={pmax}
          onChange={(e) => setPmax(Number(e.target.value))}
          aria-label="Maximum price slider"
          className="mt-3 w-full accent-brand-600"
        />
      </div>
      <button onClick={clearAll} className="text-xs font-bold text-sale hover:underline">Clear all filters</button>
    </div>
  );

  return (
    <div className="container-x py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-500">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* sidebar (desktop) */}
        <aside className="hidden lg:block">{Filters}</aside>

        <div>
          {/* toolbar */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-2.5">
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-700 lg:hidden" onClick={() => setDrawer(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              Filter
            </button>
            <div className="hidden items-center gap-1.5 lg:flex" aria-label="Grid density">
              {([2, 3, 4, "list"] as const).map((c) => (
                <button
                  key={String(c)}
                  onClick={() => setCols(c)}
                  aria-label={c === "list" ? "List view" : `${c} columns`}
                  className={`rounded-md border px-2.5 py-1.5 text-xs font-bold transition ${cols === c ? "border-brand-600 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}
                >
                  {c === "list" ? "List" : c}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-slate-500">Sort by:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-brand-500">
                {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="font-display text-xl font-bold text-slate-800">No products match your filters</p>
              <button onClick={clearAll} className="btn-outline mt-4">Clear all filters</button>
            </div>
          ) : (
            <div className={gridCls}>
              {filtered.map((p) => <ProductCard key={p.slug} p={p} view={cols === "list" ? "list" : "grid"} />)}
            </div>
          )}
        </div>
      </div>

      {/* mobile filter drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <div className="pop-in absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-5 thin-scroll">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Filters</h3>
              <button onClick={() => setDrawer(false)} aria-label="Close filters" className="rounded-full p-1.5 hover:bg-slate-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </div>
            {Filters}
            <button onClick={() => setDrawer(false)} className="btn-primary mt-6 w-full">Show {filtered.length} products</button>
          </div>
        </div>
      )}
    </div>
  );
}
