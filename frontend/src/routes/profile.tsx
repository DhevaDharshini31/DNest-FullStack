import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Package, Settings, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — D Nest" }, { name: "description", content: "Manage your D Nest profile, orders and settings." }] }),
  component: ProfilePage,
});

const tabs = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

function ProfilePage() {
  const { wishlistCount, cartCount } = useStore();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("orders");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative grid sm:grid-cols-[auto_1fr_auto] items-center gap-6">
          <div className="h-20 w-20 rounded-3xl bg-gradient-brand grid place-items-center shadow-glow">
            <User className="h-8 w-8 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold">Welcome back, Alex</h1>
            <p className="text-sm text-muted-foreground">alex@dnest.ai · Member since 2026</p>
          </div>
          <div className="flex gap-2">
            <Stat n={cartCount} label="Cart" />
            <Stat n={wishlistCount} label="Wish" />
            <Stat n={12} label="Orders" />
          </div>
        </div>
      </div>

      <div className="mt-6 glass rounded-2xl p-2 flex gap-1 w-fit">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`relative px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition ${tab === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {tab === t.id && <motion.span layoutId="profile-tab" className="absolute inset-0 rounded-xl bg-gradient-brand-soft border border-primary/40" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
            <t.icon className="relative h-4 w-4" />
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "orders" && (
          <div className="grid gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass rounded-2xl p-5 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-brand-soft grid place-items-center"><Package className="h-5 w-5 text-primary" /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">Order #DN-{2026000 + n}</div>
                  <div className="text-xs text-muted-foreground">Delivered · 2 items · ₹{n * 499}</div>
                </div>
                <button className="text-sm font-semibold text-primary">View</button>
              </div>
            ))}
          </div>
        )}
        {tab === "wishlist" && (
          <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
            View your wishlist on the <a href="/wishlist" className="text-primary">wishlist page</a>.
          </div>
        )}
        {tab === "settings" && (
          <div className="glass rounded-2xl p-6 grid gap-4 max-w-lg">
            <Field label="Name" value="Alex Chen" />
            <Field label="Email" value="alex@dnest.ai" />
            <Field label="Phone" value="+91 90000 00000" />
            <button className="rounded-full bg-gradient-brand text-white font-semibold px-6 py-3 text-sm shadow-glow flex items-center gap-2 w-fit">
              <Sparkles className="h-4 w-4" /> Save changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="glass rounded-2xl px-4 py-2 text-center min-w-[64px]">
      <div className="text-lg font-bold">{n}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input defaultValue={value} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition" />
    </label>
  );
}
