"use client";
/* Client-side commerce store — cart, wishlist, account & orders.
   Persisted in localStorage (dummy/demo phase; can be swapped for a real backend later). */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products, bySlug, Product } from "./products";

export type CartLine = { slug: string; qty: number };
export type OrderItem = { slug: string; name: string; qty: number; price: number };
export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  name: string;
  phone: string;
  address: string;
  city: string;
  subscribe: boolean;
};

type Store = {
  cart: CartLine[];
  wishlist: string[];
  account: { name: string; email: string } | null;
  orders: Order[];
  addToCart: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartDetail: { product: Product; qty: number }[];
  subtotal: number;
  toggleWish: (slug: string) => void;
  inWish: (slug: string) => boolean;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  placeOrder: (o: Omit<Order, "id" | "date">) => Order;
  hydrated: boolean;
};

const Ctx = createContext<Store | null>(null);
const KEY = "tibb-store-v1";

type Persist = { cart: CartLine[]; wishlist: string[]; account: Store["account"]; orders: Order[] };

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [account, setAccount] = useState<Store["account"]>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw) as Persist;
        /* eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage */
        setCart(d.cart || []);
        /* eslint-disable-next-line react-hooks/set-state-in-effect */
        setWishlist(d.wishlist || []);
        /* eslint-disable-next-line react-hooks/set-state-in-effect */
        setAccount(d.account || null);
        /* eslint-disable-next-line react-hooks/set-state-in-effect */
        setOrders(d.orders || []);
      }
    } catch {}
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, account, orders }));
    } catch {}
  }, [cart, wishlist, account, orders, hydrated]);

  const api = useMemo<Store>(() => {
    const cartDetail = cart
      .map((l) => ({ product: bySlug(l.slug), qty: l.qty }))
      .filter((x): x is { product: Product; qty: number } => !!x.product);
    const subtotal = cartDetail.reduce((s, x) => s + x.product.price * x.qty, 0);
    const cartCount = cart.reduce((s, x) => s + x.qty, 0);
    return {
      cart,
      wishlist,
      account,
      orders,
      hydrated,
      cartDetail,
      subtotal,
      cartCount,
      addToCart: (slug, qty = 1) =>
        setCart((c) => {
          const ex = c.find((l) => l.slug === slug);
          return ex ? c.map((l) => (l.slug === slug ? { ...l, qty: Math.min(99, l.qty + qty) } : l)) : [...c, { slug, qty }];
        }),
      setQty: (slug, qty) =>
        setCart((c) => (qty <= 0 ? c.filter((l) => l.slug !== slug) : c.map((l) => (l.slug === slug ? { ...l, qty: Math.min(99, qty) } : l)))),
      removeFromCart: (slug) => setCart((c) => c.filter((l) => l.slug !== slug)),
      clearCart: () => setCart([]),
      toggleWish: (slug) => setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug])),
      inWish: (slug) => wishlist.includes(slug),
      signIn: (name, email) => setAccount({ name, email }),
      signOut: () => setAccount(null),
      placeOrder: (o) => {
        const order: Order = {
          ...o,
          id: "TU-" + String(1000 + orders.length + 1),
          date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        };
        setOrders((x) => [order, ...x]);
        setCart([]);
        return order;
      },
    };
  }, [cart, wishlist, account, orders, hydrated]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside provider");
  return s;
}

export const allProducts = products;
