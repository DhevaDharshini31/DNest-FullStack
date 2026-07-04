import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — D Nest" }, { name: "description", content: "Your saved D Nest pieces." }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-gradient">Wishlist</h1>
      <p className="text-muted-foreground mt-2">{items.length} saved {items.length === 1 ? "piece" : "pieces"}</p>

      {items.length === 0 ? (
        <div className="mt-16 glass-strong rounded-3xl p-16 text-center">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-white/5 grid place-items-center mb-4"><Heart className="h-6 w-6 text-muted-foreground" /></div>
          <h2 className="text-xl font-semibold">Nothing saved yet</h2>
          <p className="text-muted-foreground mt-1">Tap the heart on any piece you love.</p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow">Browse</Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
