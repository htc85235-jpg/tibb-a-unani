"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { products } from "@/lib/products";
import { rsShort } from "@/lib/format";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/collections/all/", label: "Catalog" },
  { href: "/collections/bestsellers/", label: "Best Sellers" },
  { href: "/pages/contact/", label: "Contact" },
];

/* hamburger menu: Best Sellers + Account intentionally excluded (client request); desktop nav keeps Best Sellers */
const MOBILE_NAV = [
  { href: "/", label: "Home" },
  { href: "/collections/all/", label: "Catalog" },
  { href: "/pages/contact/", label: "Contact" },
];

function Icon({ d, className = "" }: { d: string; className?: string }) {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export default function Header() {
  const { wishlist } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const mobileSearch = useRef<HTMLInputElement>(null);

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect -- close menus after navigation */
    setMenu(false);
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const matches = q.trim()
    ? products.filter((p) => (p.name + " " + p.category + " " + p.short).toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6)
    : [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) { setOpen(false); router.push(`/search/?q=${encodeURIComponent(q.trim())}`); }
  };

  /* mobile search icon: open the menu panel and focus its "I'm looking for" box */
  const openMobileSearch = () => {
    setMenu(true);
    setTimeout(() => mobileSearch.current?.focus(), 80);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      {/* all viewports: [hamburger / nav] [logo centred] [search far right] */}
      <div className="container-x grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 lg:h-20">
        {/* left: mobile hamburger + desktop nav */}
        <div className="flex items-center gap-2">
          <button className="-ml-1 lg:hidden" aria-label="Open menu" onClick={() => setMenu((v) => !v)}>
            <Icon d={menu ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
          </button>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`text-sm font-semibold transition hover:text-brand-600 ${pathname === n.href.replace(/\/$/, "") ? "text-brand-600" : "text-slate-700"}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* centre: wordmark + client emblem on its right — perfectly centred on every viewport */}
        <Link
          href="/"
          aria-label="Tibb-e-Unani — Herbal & Unani Remedies"
          className="flex items-center justify-center gap-2 leading-none sm:gap-3"
        >
          <img
            src="/images/logo-header.png"
            alt="Tibb-e-Unani — Herbal & Unani Remedies"
            className="h-7 w-auto sm:h-10 lg:h-12 xl:h-14"
          />
          <img
            src="/images/logo-emblem.png"
            alt="Tibb-e-Unani brand emblem"
            className="h-7 w-auto sm:h-10 lg:h-11 xl:h-14"
          />
        </Link>

        {/* right: search pinned to the extreme right on every viewport */}
        <div className="flex items-center justify-end">
          <div ref={box} className="relative hidden w-52 md:block lg:w-48 xl:w-60">
          <form onSubmit={submit}>
            <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              placeholder="I'm looking for…"
              aria-label="Search products"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-brand-400 focus:bg-white"
            />
          </form>
          {open && matches.length > 0 && (
            <div className="pop-in absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl">
              {matches.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}/`} className="flex items-center gap-3 px-3 py-2 transition hover:bg-brand-50" onClick={() => setOpen(false)}>
                  <img src={p.img} alt="" className="h-10 w-10 rounded-md border border-slate-100 object-cover" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-slate-800">{p.name}</span>
                    <span className="text-xs text-brand-600">{rsShort(p.price)}</span>
                  </span>
                </Link>
              ))}
              <button
                className="block w-full bg-slate-50 px-3 py-2.5 text-center text-xs font-semibold text-brand-700 transition hover:bg-brand-50"
                onClick={() => { setOpen(false); router.push(`/search/?q=${encodeURIComponent(q.trim())}`); }}
              >
                View all results
              </button>
            </div>
          )}
          </div>
          <button
            className="text-slate-700 transition hover:text-brand-600 md:hidden"
            aria-label="Search products"
            onClick={openMobileSearch}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* mobile menu + search */}
      {menu && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <form onSubmit={submit} className="mb-3 md:hidden">
            <input
              ref={mobileSearch}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="I'm looking for…"
              aria-label="Search products"
              className="field rounded-full"
            />
          </form>
          <nav className="grid gap-1" aria-label="Mobile">
            {MOBILE_NAV.map((n) => (
              <Link key={n.href} href={n.href} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-brand-50">
                {n.label}
              </Link>
            ))}
            <Link href="/pages/wishlist/" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-brand-50">
              Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
