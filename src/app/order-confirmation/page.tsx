"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { waLink } from "@/lib/site";
import { useStore } from "@/lib/store";
import { rs } from "@/lib/format";

export default function OrderConfirmation() {
  const { orders, hydrated } = useStore();
  const [id, setId] = useState<string | null>(null);

  // read ?id= after hydration (avoids build-vs-client render mismatch)
  useEffect(() => {
    setId(new URLSearchParams(window.location.search).get("id"));
  }, []);

  if (!hydrated) return <div className="container-x py-20"><div className="mx-auto h-40 max-w-lg animate-pulse rounded-xl bg-slate-100" /></div>;

  const order = orders.find((o) => o.id === id) || orders[0];
  if (!order) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-slate-800">No recent order found</h1>
        <Link href="/collections/all/" className="btn-primary mt-6">Continue Shopping</Link>
      </div>
    );
  }

  const lines = order.items.map((i) => `${i.name} x${i.qty} — ${rs(i.price * i.qty)}`).join("\n");
  const waText =
    `Assalam-o-Alaikum! New order ${order.id}\n\n${lines}\n\nTotal: ${rs(order.total)} (Cash on Delivery)\n` +
    `Name: ${order.name}\nPhone: ${order.phone}\nAddress: ${order.address}, ${order.city}`;

  return (
    <div className="container-x py-14">
      <div className="mx-auto max-w-lg text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <h1 className="mt-5 font-display text-3xl font-bold text-slate-900">Thank you! Order placed.</h1>
        <p className="mt-2 text-slate-600">
          Your order <b className="text-brand-700">{order.id}</b> has been received. Pay <b>{rs(order.total)}</b> in
          cash when it arrives. We will call you shortly to confirm.
        </p>

        <div className="card mt-7 p-5 text-left">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Order {order.id} · {order.date}</p>
          <div className="mt-3 space-y-2">
            {order.items.map((i) => (
              <div key={i.slug} className="flex justify-between text-sm">
                <span className="text-slate-700">{i.name} × {i.qty}</span>
                <span className="font-semibold">{rs(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-sm">
            <p className="flex justify-between"><span className="text-slate-500">Shipping</span><span className="font-semibold text-brand-700">Free</span></p>
            <p className="flex justify-between text-base"><span className="font-bold">Total (COD)</span><span className="font-bold">{rs(order.total)}</span></p>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Deliver to: {order.name}, {order.address}, {order.city} · {order.phone}
          </p>
        </div>

        <a href={waLink(waText)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full bg-[#25D366] hover:bg-[#1fb857]">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 00-8.4 15.2L2.1 22l4.9-1.5A9.9 9.9 0 1012.04 2zm0 1.8a8.1 8.1 0 11-4.1 15.1l-.3-.2-2.9.9.9-2.8-.2-.3a8.1 8.1 0 016.6-12.7z" /></svg>
          Send Order Details on WhatsApp
        </a>
        <p className="mt-2 text-xs text-slate-400">Optional — speeds up confirmation. We already have your order.</p>
        <Link href="/collections/all/" className="btn-outline mt-4">Continue Shopping</Link>
      </div>
    </div>
  );
}
