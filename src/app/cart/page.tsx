"use client";
import Link from "next/link";
import { useStore } from "@/lib/store";
import QtyStepper from "@/components/QtyStepper";
import { rs } from "@/lib/format";

export default function CartPage() {
  const { cartDetail, subtotal, setQty, removeFromCart, hydrated, cartCount } = useStore();

  return (
    <div className="container-x py-10">
      <h1 className="font-display text-3xl font-bold text-slate-900">Your Cart</h1>

      {!hydrated ? (
        <div className="mt-8 h-40 animate-pulse rounded-xl bg-slate-100" />
      ) : cartCount === 0 ? (
        <div className="mt-10 text-center">
          <p className="font-display text-2xl font-bold text-slate-800">Your cart is empty</p>
          <p className="mt-2 text-slate-500">Looks like you haven't added any remedies yet.</p>
          <Link href="/collections/all/" className="btn-primary mt-6">Continue Shopping</Link>
          <p className="mt-8 text-sm text-slate-500">
            Have an account? <Link href="/account/login/" className="font-bold text-brand-700 hover:underline">Log in</Link>
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {cartDetail.map(({ product: p, qty }) => (
              <div key={p.slug} className="card flex items-center gap-4 p-4">
                <img src={p.img} alt={p.name} className="h-20 w-20 rounded-lg border border-slate-100 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">{p.category}</p>
                  <Link href={`/products/${p.slug}/`} className="block truncate font-display text-lg font-bold text-slate-900 hover:text-brand-700">{p.name}</Link>
                  <p className="text-sm text-slate-500">{p.size} · {rs(p.price)}</p>
                  <button onClick={() => removeFromCart(p.slug)} className="mt-1.5 text-xs font-bold text-sale hover:underline">Remove</button>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <QtyStepper qty={qty} onChange={(q) => setQty(p.slug, q)} />
                  <p className="font-bold text-slate-900">{rs(p.price * qty)}</p>
                </div>
              </div>
            ))}
          </div>

          <aside className="card h-fit p-6">
            <h2 className="font-display text-xl font-bold text-slate-900">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span className="font-semibold">{rs(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Shipping</span><span className="font-semibold text-brand-700">Free</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base"><span className="font-bold">Total</span><span className="font-bold">{rs(subtotal)}</span></div>
            </div>
            <Link href="/checkout/" className="btn-primary mt-5 w-full">Checkout with Cash on Delivery</Link>
            <Link href="/collections/all/" className="mt-3 block text-center text-xs font-semibold text-slate-500 hover:text-brand-700">Continue shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
