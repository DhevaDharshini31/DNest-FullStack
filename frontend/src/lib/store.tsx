import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./products";

type CartItem = { product: Product; qty: number; size?: string; color?: string };

type StoreCtx = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (p: Product, qty?: number, size?: string, color?: string) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleWishlist: (id: string) => void;
  cartCount: number;
  wishlistCount: number;
  cartTotal: number;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("dnest-cart") || "[]"); } catch { return []; }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("dnest-wish") || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("dnest-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("dnest-wish", JSON.stringify(wishlist)); }, [wishlist]);

  const value = useMemo<StoreCtx>(() => ({
    cart, wishlist,
    addToCart: (p, qty = 1, size, color) => setCart((c) => {
      const idx = c.findIndex((i) => i.product.id === p.id);
      if (idx >= 0) { const n = [...c]; n[idx] = { ...n[idx], qty: n[idx].qty + qty }; return n; }
      return [...c, { product: p, qty, size, color }];
    }),
    removeFromCart: (id) => setCart((c) => c.filter((i) => i.product.id !== id)),
    setQty: (id, qty) => setCart((c) => c.map((i) => i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i)),
    toggleWishlist: (id) => setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]),
    cartCount: cart.reduce((s, i) => s + i.qty, 0),
    wishlistCount: wishlist.length,
    cartTotal: cart.reduce((s, i) => s + i.qty * i.product.price, 0),
  }), [cart, wishlist]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore outside StoreProvider");
  return c;
}
