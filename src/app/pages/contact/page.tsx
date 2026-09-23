"use client";
import { useState } from "react";
import { site } from "@/lib/site";
import { sendContactEmail } from "@/lib/order-email";

export default function ContactPage() {
  const [f, setF] = useState({ name: "", email: "", msg: "" });
  const [agree, setAgree] = useState(false);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sendErr, setSendErr] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = "Please enter a valid email";
    if (!agree) er.agree = "Please agree to the Privacy Policy";
    setErrs(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    setSendErr(false);
    /* deliver the message to the owner's Gmail via FormSubmit */
    const ok = await sendContactEmail(f.name.trim(), f.email.trim(), f.msg);
    setBusy(false);
    if (ok) {
      setSent(true);
    } else {
      setSendErr(true);
    }
  };

  return (
    <div className="container-x py-10">
      <h1 className="font-display text-3xl font-bold text-slate-900">Contact Us</h1>
      <p className="mt-2 max-w-xl text-slate-500">
        Questions about a remedy, an order, or dosage? Send us a message — our Hakeem team replies during working hours.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="card p-6">
          {sent ? (
            <div className="pop-in py-10 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <p className="mt-4 font-display text-xl font-bold text-slate-900">Message sent!</p>
              <p className="mt-1 text-sm text-slate-500">Thank you — we will reply within one working day.</p>
              <button onClick={() => { setSent(false); setSendErr(false); setF({ name: "", email: "", msg: "" }); }} className="btn-outline mt-5">Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h2 className="font-display text-lg font-bold text-slate-900">Send us a message</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="field-label" htmlFor="ct-name">Your name <span className="text-sale">*</span></label>
                  <input id="ct-name" className={`field ${errs.name ? "border-sale" : ""}`} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
                  {errs.name && <p className="mt-1 text-xs text-sale">{errs.name}</p>}
                </div>
                <div>
                  <label className="field-label" htmlFor="ct-email">Your Email <span className="text-sale">*</span></label>
                  <input id="ct-email" type="email" className={`field ${errs.email ? "border-sale" : ""}`} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                  {errs.email && <p className="mt-1 text-xs text-sale">{errs.email}</p>}
                </div>
                <div>
                  <label className="field-label" htmlFor="ct-msg">Your message</label>
                  <textarea id="ct-msg" rows={5} className="field" value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} placeholder="Write your question here…" />
                </div>
                <div>
                  <label className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-3.5 w-3.5 accent-brand-600" />
                    I agree to the <a href="/policies/privacy-policy/" className="font-semibold text-brand-700 underline">Privacy Policy</a> of the website. <span className="text-sale">*</span>
                  </label>
                  {errs.agree && <p className="mt-1 text-xs text-sale">{errs.agree}</p>}
                </div>
                <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">{busy ? "SENDING…" : "Send"}</button>
                {sendErr && (
                  <p className="text-xs leading-5 text-sale">
                    The message could not be sent right now — please try again, or message us on WhatsApp for a faster reply.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="space-y-4">
          {([
            ["Phone / WhatsApp", site.phone],
            ["Email", site.email],
            ["Address", site.address],
            ["Working Hours", site.hours],
          ] as const).map(([k, v]) => (
            <div key={k} className="card flex items-start gap-4 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4zM4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">{k}</span>
                <span className="block text-sm font-semibold text-slate-800">{v}</span>
              </span>
            </div>
          ))}
          <p className="rounded-xl bg-brand-50 p-4 text-sm leading-6 text-brand-900">
            <b>Fastest reply:</b> message us on WhatsApp from the green button at the bottom-right — our team answers
            with product suggestions and dosage guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
