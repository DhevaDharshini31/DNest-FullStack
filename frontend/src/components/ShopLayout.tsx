import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/visual";
import { products, type Product } from "@/lib/products";

type Props = {
  eyebrow: string;
  title: string;
  desc: string;
  category?: Product["category"];
};

export function ShopLayout({ eyebrow, title, desc, category }: Props) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"trending" | "price-asc" | "price-desc" | "rating">("trending");
  const [priceMax, setPriceMax] = useState(3000);
  const [sub, setSub] = useState<string | null>(null);

  const scoped = category ? products.filter((p) => p.category === category) : products;
  const subs = Array.from(new Set(scoped.map((p) => p.subcategory)));

  const filtered = useMemo(() => {
    let list = scoped.filter((p) => p.price <= priceMax);
    if (sub) list = list.filter((p) => p.subcategory === sub);
    if (q) list = list.filter((p) => (p.name + p.brand).toLowerCase().includes(q.toLowerCase()));
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: list = [...list].sort((a, b) => Number(!!b.trending) - Number(!!a.trending));
    }
    return list;
  }, [scoped, priceMax, sub, q, sort]);

  return (
    <div className="relative">
      <section className="relative px-4 pt-16 pb-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow={eyebrow} title={title} desc={desc} />
        </div>
      </section>

      <section className="px-4 sticky top-20 z-30">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-3 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[220px] bg-white/5 rounded-xl px-3 py-2 border border-white/10">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, brands…" className="bg-transparent outline-none text-sm w-full" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={() => setSub(null)} className={`text-xs px-3 py-2 rounded-full border transition ${!sub ? "bg-gradient-brand border-transparent text-white" : "border-white/10 hover:bg-white/5"}`}>All</button>
              {subs.map((s) => (
                <button key={s} onClick={() => setSub(s)} className={`text-xs px-3 py-2 rounded-full border transition ${sub === s ? "bg-gradient-brand border-transparent text-white" : "border-white/10 hover:bg-white/5"}`}>{s}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <input aria-label="Max price" type="range" min={100} max={3000} step={50} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="accent-primary w-32" />
              <span className="text-xs text-muted-foreground w-16">≤ ₹{priceMax}</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as never)} className="bg-white/5 border border-white/10 rounded-xl text-xs px-3 py-2 outline-none">
                <option value="trending">Trending</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <div className="glass rounded-3xl p-16 text-center text-muted-foreground">No products match your filters.</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
