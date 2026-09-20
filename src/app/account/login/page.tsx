"use client";
import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { rs } from "@/lib/format";

export default function LoginPage() {
  const { account, orders, signIn, signOut } = useStore();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [f, setF] = useState({ name: "", email: "", pass: "" });
  const [errs, setErrs] = useState<Record<string, string>>({});

  if (account) {
    return (
      <div className="container-x py-10">
        <h1 className="font-display text-3xl font-bold text-slate-900">My Account</h1>
        <div className="mt-6 grid gap-8 lg:grid-cols-[300px_1fr]">
          <div className="card h-fit p-6 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 font-display text-2xl font-bold text-brand-700">
              {account.name.trim().charAt(0).toUpperCase() || "U"}
            </span>
            <p className="mt-3 font-display text-lg font-bold text-slate-900">{account.name}</p>
            <p className="text-sm text-slate-500">{account.email}</p>
            <button onClick={signOut} className="btn-outline mt-4 w-full">Log out</button>
          </div>
          <div className="card p-6">
            <h2 className="font-display text-xl font-bold text-slate-900">Order history</h2>
            {orders.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">No orders yet. <Link className="font-semibold text-brand-700 hover:underline" href="/collections/all/">Start shopping</Link>.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="rounded-xl border border-slate-100 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-bold text-slate-800">{o.id}</p>
                      <p className="text-xs text-slate-400">{o.date}</p>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}</p>
                    <p className="mt-1 text-sm font-bold text-brand-700">{rs(o.total)} · Cash on Delivery</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (mode === "up" && !f.name.trim()) er.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = "Please enter a valid email";
    if (f.pass.length < 4) er.pass = "Password must be at least 4 characters";
    setErrs(er);
    if (Object.keys(er).length) return;
    signIn(f.name.trim() || f.email.split("@")[0], f.email.trim());
  };

  return (
    <div className="container-x py-14">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-display text-3xl font-bold text-slate-900">
          {mode === "in" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          {mode === "in" ? "Welcome back to Tibb-a-Unani." : "Track orders and check out faster."}
        </p>

        <form onSubmit={submit} noValidate className="card mt-7 space-y-4 p-6">
          {mode === "up" && (
            <div>
              <label className="field-label" htmlFor="ac-name">Full name</label>
              <input id="ac-name" className={`field ${errs.name ? "border-sale" : ""}`} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
              {errs.name && <p className="mt-1 text-xs text-sale">{errs.name}</p>}
            </div>
          )}
          <div>
            <label className="field-label" htmlFor="ac-email">Email</label>
            <input id="ac-email" type="email" className={`field ${errs.email ? "border-sale" : ""}`} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
            {errs.email && <p className="mt-1 text-xs text-sale">{errs.email}</p>}
          </div>
          <div>
            <label className="field-label" htmlFor="ac-pass">Password</label>
            <input id="ac-pass" type="password" className={`field ${errs.pass ? "border-sale" : ""}`} value={f.pass} onChange={(e) => setF({ ...f, pass: e.target.value })} />
            {errs.pass && <p className="mt-1 text-xs text-sale">{errs.pass}</p>}
          </div>
          <button type="submit" className="btn-primary w-full">{mode === "in" ? "Continue" : "Create account"}</button>
          <p className="text-center text-sm text-slate-500">
            {mode === "in" ? "New to our store?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => { setMode(mode === "in" ? "up" : "in"); setErrs({}); }} className="font-bold text-brand-700 hover:underline">
              {mode === "in" ? "Create account" : "Sign in"}
            </button>
          </p>
          <p className="rounded-lg bg-slate-50 p-3 text-center text-xs leading-5 text-slate-400">
            Demo store: accounts are stored on this device only.
          </p>
        </form>
      </div>
    </div>
  );
}
