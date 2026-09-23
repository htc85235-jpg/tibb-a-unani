"use client";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100 bg-brand-950 text-brand-100">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2">
        {/* About */}
        <div>
          <p className="font-display text-2xl font-bold text-white">
            TIBB<span className="text-brand-300">-A-</span>UNANI
          </p>
          <p className="mt-1 text-xs font-semibold tracking-[0.22em] text-brand-300">{site.sub.toUpperCase()}</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-brand-100/80">
            We prepare time-tested Unani remedies the classical way — pure herbs, slow methods and lab-tested
            batches. From our family of Hakims to your home, {site.tagline.toLowerCase()}.
          </p>
          <p className="mt-4 text-sm text-brand-100/70">{site.address}</p>
        </div>

        {/* Information */}
        <nav aria-label="Information">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Information</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="transition hover:text-white" href="/policies/privacy-policy/">Privacy Policy</Link></li>
            <li><Link className="transition hover:text-white" href="/policies/shipping-policy/">Shipping Policy</Link></li>
            <li><Link className="transition hover:text-white" href="/policies/refund-policy/">Refund Policy</Link></li>
            <li><Link className="transition hover:text-white" href="/policies/terms-of-service/">Terms of Service</Link></li>
            <li><Link className="transition hover:text-white" href="/policies/contact-information/">Contact Information</Link></li>
            <li><Link className="transition hover:text-white" href="/policies/legal-notice/">Legal Notice</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-brand-900 py-4 text-center text-xs text-brand-100/60">
        © {new Date().getFullYear()} {site.name} · All rights reserved
      </div>
    </footer>
  );
}
