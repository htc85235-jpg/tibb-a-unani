"use client";
/* COD checkout for the whole cart — mirrors the product-level COD modal. */
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { rs } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartDetail, subtotal, placeOrder, hydrated, cartCount, account } = useStore();
  const [f, setF] = useState({ name: account?.name || "", phone: "", address: "", city: "" });
  const [subscribe, setSubscribe] = useState(false);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  if (hydrated && cartCount === 0) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-slate-800">Your cart is empty</h1>
        <Link href="/collections/all/" className="btn-primary mt-6">Continue Shopping</Link>
      </div>
    );
  }

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  const complete = () => {
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = "Full name is required";
    if (!/^0?[0-9]{10}$/.test(f.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a valid phone number (e.g. 0322 6644422)";
    if (!f.address.trim()) e.address = "Complete address is required";
    if (!f.city.trim()) e.city = "City is required";
    setErrs(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    const order = placeOrder({
      items: cartDetail.map(({ product, qty }) => ({ slug: product.slug, name: product.name, qty, price: product.price })),
      subtotal,
      shipping: 0,
      total: subtotal,
      name: f.name.trim(),
      phone: f.phone.trim(),
      address: f.address.trim(),
      city: f.city.trim(),
      subscribe,
    });
    router.push(`/order-confirmation/?id=${order.id}`);
  };

  return (
    <div className="container-x py-10">
      <h1 className="font-display text-3xl font-bold text-slate-900">Checkout — Cash on Delivery</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="card p-6">
          <p className="font-display text-lg font-bold text-slate-900">Shipping details</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="co-name">Full Name <span className="text-sale">*</span></label>
              <input id="co-name" className={`field ${errs.name ? "border-sale" : ""}`} value={f.name} onChange={set("name")} placeholder="Amjad Khan" />
              {errs.name && <p className="mt-1 text-xs text-sale">{errs.name}</p>}
            </div>
            <div>
              <label className="field-label" htmlFor="co-phone">Phone Number <span className="text-sale">*</span></label>
              <input id="co-phone" type="tel" className={`field ${errs.phone ? "border-sale" : ""}`} value={f.phone} onChange={set("phone")} placeholder="0322 6644422" />
              {errs.phone && <p className="mt-1 text-xs text-sale">{errs.phone}</p>}
            </div>
            <div>
              <label className="field-label" htmlFor="co-city">City <span className="text-sale">*</span></label>
              <input id="co-city" className={`field ${errs.city ? "border-sale" : ""}`} value={f.city} onChange={set("city")} placeholder="Lahore" />
              {errs.city && <p className="mt-1 text-xs text-sale">{errs.city}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="co-address">Complete Address <span className="text-sale">*</span></label>
              <textarea id="co-address" rows={2} className={`field ${errs.address ? "border-sale" : ""}`} value={f.address} onChange={set("address")} placeholder="House, street, area" />
              {errs.address && <p className="mt-1 text-xs text-sale">{errs.address}</p>}
            </div>
            <label className="flex items-start gap-2 text-xs leading-5 text-slate-600 sm:col-span-2">
              <input type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} className="mt-0.5 h-3.5 w-3.5 accent-brand-600" />
              Subscribe to stay updated with new products and offers!
            </label>
          </div>
          <p className="mt-5 rounded-xl bg-brand-50 p-4 text-sm text-brand-900">
            <b>Payment method:</b> Cash on Delivery — pay the courier in cash when your parcel arrives. Shipping is free.
          </p>
        </div>

        <aside className="card h-fit p-6">
          <h2 className="font-display text-xl font-bold text-slate-900">Order Summary</h2>
          <div className="mt-4 space-y-3">
            {cartDetail.map(({ product: p, qty }) => (
              <div key={p.slug} className="flex items-center gap-3">
                <img src={p.img} alt="" className="h-12 w-12 rounded-lg border border-slate-100 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-400">Qty {qty}</p>
                </div>
                <p className="text-sm font-bold">{rs(p.price * qty)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span className="font-semibold">{rs(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Shipping</span><span className="font-semibold text-brand-700">Free</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base"><span className="font-bold">Total</span><span className="font-bold">{rs(subtotal)}</span></div>
          </div>
          <button onClick={complete} disabled={busy} className="btn-primary mt-5 w-full py-3.5 disabled:opacity-60">
            {busy ? "PLACING ORDER…" : `COMPLETE ORDER — ${rs(subtotal)}`}
          </button>
        </aside>
      </div>
    </div>
  );
}
