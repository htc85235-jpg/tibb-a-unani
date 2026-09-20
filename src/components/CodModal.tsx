"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { rs } from "@/lib/format";
import QtyStepper from "./QtyStepper";

export default function CodModal({ product, open, onClose }: { product: Product; open: boolean; onClose: () => void }) {
  const router = useRouter();
  const { placeOrder } = useStore();
  const [qty, setQty] = useState(1);
  const [f, setF] = useState({ name: "", phone: "", address: "", city: "" });
  const [subscribe, setSubscribe] = useState(false);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      /* eslint-disable-next-line react-hooks/set-state-in-effect -- reset form when modal opens */
      setQty(1);
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setErrs({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;

  const subtotal = product.price * qty;
  const total = subtotal; // free shipping

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  const complete = () => {
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = "Full name is required";
    if (!/^0?[0-9]{10}$/.test(f.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a valid phone number (e.g. 0300 1234567)";
    if (!f.address.trim()) e.address = "Complete address is required";
    if (!f.city.trim()) e.city = "City is required";
    setErrs(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    const order = placeOrder({
      items: [{ slug: product.slug, name: product.name, qty, price: product.price }],
      subtotal,
      shipping: 0,
      total,
      name: f.name.trim(),
      phone: f.phone.trim(),
      address: f.address.trim(),
      city: f.city.trim(),
      subscribe,
    });
    router.push(`/order-confirmation/?id=${order.id}`);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-8" role="dialog" aria-modal="true" aria-label="Cash on delivery order">
      <div className="pop-in w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-slate-900">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" stroke="#178a4c" strokeWidth="1.8" strokeLinejoin="round" /></svg>
            CASH ON DELIVERY
          </h3>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="p-5">
          {/* item */}
          <div className="card flex items-center gap-3 p-3">
            <div className="relative">
              <img src={product.img} alt={product.name} className="h-14 w-14 rounded-lg border border-slate-100 object-cover" />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-[10px] font-bold text-white">{qty}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-800">{product.name}</p>
              <p className="text-sm font-bold text-brand-700">{rs(product.price)}</p>
            </div>
            <QtyStepper qty={qty} onChange={setQty} small />
          </div>

          {/* totals */}
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
            <div className="flex justify-between py-0.5"><span className="text-slate-600">Subtotal</span><span className="font-semibold">{rs(subtotal)}</span></div>
            <div className="flex justify-between py-0.5"><span className="text-slate-600">Shipping</span><span className="font-semibold text-brand-700">Free</span></div>
            <div className="mt-1.5 flex justify-between border-t border-slate-200 pt-2 text-base"><span className="font-bold">Total</span><span className="font-bold">{rs(total)}</span></div>
          </div>

          {/* shipping method */}
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-500">Shipping method</p>
          <label className="mt-2 flex cursor-pointer items-center justify-between rounded-xl border-2 border-sale bg-white px-4 py-3">
            <span className="flex items-center gap-3">
              <input type="radio" name="ship" defaultChecked className="h-4 w-4 accent-brand-600" />
              <span className="text-sm font-bold text-slate-800">Free shipping</span>
            </span>
            <span className="text-sm font-bold text-brand-700">Free</span>
          </label>

          {/* address */}
          <p className="mt-5 text-center text-sm font-bold text-slate-700">Enter your shipping address</p>
          <div className="mt-3 space-y-3">
            {([
              ["name", "Full Name", "text", "Amjad Khan"],
              ["phone", "Phone Number", "tel", "0300 1234567"],
            ] as const).map(([k, label, type, ph]) => (
              <div key={k}>
                <label className="field-label" htmlFor={`cod-${k}`}>{label} <span className="text-sale">*</span></label>
                <input id={`cod-${k}`} type={type} value={f[k]} onChange={set(k)} placeholder={ph} className={`field ${errs[k] ? "border-sale" : ""}`} />
                {errs[k] && <p className="mt-1 text-xs text-sale">{errs[k]}</p>}
              </div>
            ))}
            <div>
              <label className="field-label" htmlFor="cod-address">Complete Address <span className="text-sale">*</span></label>
              <textarea id="cod-address" rows={2} value={f.address} onChange={set("address")} placeholder="House, street, area" className={`field ${errs.address ? "border-sale" : ""}`} />
              {errs.address && <p className="mt-1 text-xs text-sale">{errs.address}</p>}
            </div>
            <div>
              <label className="field-label" htmlFor="cod-city">City <span className="text-sale">*</span></label>
              <input id="cod-city" type="text" value={f.city} onChange={set("city")} placeholder="Lahore" className={`field ${errs.city ? "border-sale" : ""}`} />
              {errs.city && <p className="mt-1 text-xs text-sale">{errs.city}</p>}
            </div>
            <label className="flex items-start gap-2 text-xs leading-5 text-slate-600">
              <input type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} className="mt-0.5 h-3.5 w-3.5 accent-brand-600" />
              Subscribe to stay updated with new products and offers!
            </label>
          </div>

          <button onClick={complete} disabled={busy} className="btn-primary mt-5 w-full bg-brand-600 py-3.5 text-base disabled:opacity-60">
            {busy ? "PLACING ORDER…" : `COMPLETE ORDER — ${rs(total)}`}
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">Pay in cash when your parcel arrives. No advance payment.</p>
        </div>
      </div>
    </div>
  );
}
