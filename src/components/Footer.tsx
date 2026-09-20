"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr("Please enter a valid email address."); return; }
    setErr(""); setDone(true);
  };

  return (
    <footer className="mt-auto border-t border-slate-100 bg-brand-950 text-brand-100">
      <div className="container-x grid gap-10 py-12 md:grid-cols-3 lg:grid-cols-4">
        {/* About */}
        <div className="lg:col-span-2">
          <p className="font-display text-2xl font-bold text-white">
            TIBB<span className="text-brand-300">-A-</span>UNANI
          </p>
          <p className="mt-1 text-xs font-semibold tracking-[0.22em] text-brand-300">{site.sub.toUpperCase()}</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-brand-100/80">
            We prepare time-tested Unani remedies the classical way — pure herbs, slow methods and lab-tested
            batches. From our family of Hakims to your home, {site.tagline.toLowerCase()}.
          </p>
          <p className="mt-4 text-sm text-brand-100/70">
            {site.address}<br />{site.phone} · {site.email}
          </p>
        </div>

        {/* Information */}
        <nav aria-label="Information">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Information</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="transition hover:text-white" href="/collections/bestsellers/">Best Sellers</Link></li>
            <li><Link className="transition hover:text-white" href="/policies/privacy-policy/">Privacy Policy</Link></li>
            <li><Link className="transition hover:text-white" href="/policies/shipping-policy/">Shipping Policy</Link></li>
            <li><Link className="transition hover:text-white" href="/policies/refund-policy/">Refund Policy</Link></li>
            <li><Link className="transition hover:text-white" href="/policies/terms-of-service/">Terms of Service</Link></li>
            <li><Link className="transition hover:text-white" href="/policies/contact-information/">Contact Information</Link></li>
            <li><Link className="transition hover:text-white" href="/policies/legal-notice/">Legal Notice</Link></li>
          </ul>
        </nav>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Subscribe to get 10% OFF</h3>
          {done ? (
            <p className="pop-in mt-4 rounded-lg bg-brand-900 p-3 text-sm text-brand-100">
              Subscribed! Use code <b className="text-white">WELCOME10</b> for 10% off your first order.
            </p>
          ) : (
            <form className="mt-4" onSubmit={subscribe} noValidate>
              <label className="sr-only" htmlFor="nl-email">Email</label>
              <input
                id="nl-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email *"
                className="w-full rounded-lg border border-brand-700 bg-brand-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-brand-300/70 focus:border-brand-400"
              />
              {err && <p className="mt-1.5 text-xs text-red-300">{err}</p>}
              <button type="submit" className="btn-primary mt-3 w-full bg-brand-500 hover:bg-brand-400">
                Sign Up
              </button>
              <p className="mt-3 text-xs leading-5 text-brand-100/60">
                By subscribing you agree to our <Link className="underline" href="/policies/terms-of-service/">terms and conditions</Link> and{" "}
                <Link className="underline" href="/policies/privacy-policy/">privacy policy</Link>.
              </p>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-brand-900 py-4 text-center text-xs text-brand-100/60">
        © {new Date().getFullYear()} {site.name} · All rights reserved
      </div>
    </footer>
  );
}
