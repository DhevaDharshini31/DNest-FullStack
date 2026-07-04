import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Cart — D Nest" }, { name: "description", content: "Review your D Nest cart and checkout." }],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, removeFromCart, setQty, cartTotal } = useStore();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const discount = applied ? Math.round(cartTotal * 0.1) : 0;
  const shipping = cartTotal > 500 ? 0 : 49;
  const total = Math.max(0, cartTotal - discount) + shipping;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-gradient">Your cart</h1>
      <p className="text-muted-foreground mt-2">{cart.length} {cart.length === 1 ? "item" : "items"} · secured checkout</p>

      {cart.length === 0 ? (
        <div className="mt-16 glass-strong rounded-3xl p-16 text-center">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-white/5 grid place-items-center mb-4"><ShoppingBag className="h-6 w-6 text-muted-foreground" /></div>
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground mt-1">Discover something you'll love.</p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow">Browse collection</Link>
        </div>
      ) : (
        <div className="mt-10 grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div key={item.product.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }}
                  className="glass rounded-2xl p-4 grid grid-cols-[96px_1fr_auto] gap-4 items-center">
                  <Link to="/product/$id" params={{ id: item.product.id }} className="block">
                    <img src={item.product.image} alt={item.product.name} className="h-24 w-24 rounded-xl object-cover" />
                  </Link>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{item.product.brand}</div>
                    <Link to="/product/$id" params={{ id: item.product.id }} className="font-semibold truncate hover:text-primary">{item.product.name}</Link>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.size && <>Size {item.size} · </>}
                      {item.color && <>Color <span className="inline-block h-3 w-3 rounded-full align-middle" style={{ background: item.color }} /></>}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-full glass-strong">
                        <button className="h-8 w-8 grid place-items-center hover:bg-white/5 rounded-l-full" onClick={() => setQty(item.product.id, item.qty - 1)} aria-label="Decrease"><Minus className="h-3 w-3" /></button>
                        <motion.span key={item.qty} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="w-8 text-center text-sm font-medium">{item.qty}</motion.span>
                        <button className="h-8 w-8 grid place-items-center hover:bg-white/5 rounded-r-full" onClick={() => setQty(item.product.id, item.qty + 1)} aria-label="Increase"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors" aria-label="Remove">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₹{item.product.price * item.qty}</div>
                    <div className="text-xs text-muted-foreground">₹{item.product.price} each</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass-strong rounded-3xl p-6">
              <h3 className="font-semibold text-lg mb-4">Order summary</h3>
              <div className="flex gap-2 mb-4">
                <div className="flex items-center gap-2 flex-1 bg-white/5 border border-white/10 rounded-xl px-3">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="bg-transparent outline-none text-sm py-3 w-full" />
                </div>
                <button onClick={() => setApplied(!!coupon)} className="rounded-xl bg-white/10 hover:bg-white/15 px-4 text-sm font-semibold">Apply</button>
              </div>
              <dl className="space-y-2 text-sm">
                <Row label="Subtotal" value={`₹${cartTotal}`} />
                {applied && <Row label="Discount (10%)" value={`- ₹${discount}`} accent />}
                <Row label="Shipping" value={shipping === 0 ? "Free" : `₹${shipping}`} />
              </dl>
              <div className="border-t border-white/10 my-4" />
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-3xl font-bold text-gradient-brand">₹{total}</span>
              </div>
              <button className="mt-6 w-full h-14 rounded-2xl bg-gradient-brand text-white font-semibold shadow-glow hover:scale-[1.02] transition-transform">
                Secure checkout
              </button>
              <p className="text-xs text-muted-foreground text-center mt-3">Encrypted. Fast. Free returns for 30 days.</p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={accent ? "text-emerald-400 font-medium" : "font-medium"}>{value}</dd>
    </div>
  );
}
