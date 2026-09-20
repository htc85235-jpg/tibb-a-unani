"use client";
import Link from "next/link";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/lib/store";

export default function WishlistPage() {
  const { wishlist, hydrated } = useStore();
  const items = allProducts.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="container-x py-10">
      <h1 className="font-display text-3xl font-bold text-slate-900">My Wishlist</h1>
      {!hydrated ? (
        <div className="mt-8 h-40 animate-pulse rounded-xl bg-slate-100" />
      ) : items.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="font-display text-2xl font-bold text-slate-800">Your wishlist is empty</p>
          <p className="mt-2 text-slate-500">Tap the heart on any product to save it here for later.</p>
          <Link href="/collections/all/" className="btn-primary mt-6">Discover Remedies</Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      )}
    </div>
  );
}
