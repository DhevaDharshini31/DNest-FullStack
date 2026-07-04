import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const wished = wishlist.includes(product.id);
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };
  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
      className="group relative"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.2s" }}
        className="relative"
      >
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="block glass rounded-3xl overflow-hidden hover-lift"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {product.trending && (
              <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-gradient-brand text-white px-2.5 py-1 rounded-full shadow-glow">
                Trending
              </span>
            )}
            {product.originalPrice && (
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-black px-2.5 py-1 rounded-full">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}

            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
              <button
                onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                className={`h-10 w-10 grid place-items-center rounded-full glass-strong ${wished ? "text-primary" : ""}`}
                aria-label="Wishlist"
              >
                <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); addToCart(product); }}
                className="flex-1 mx-2 h-10 rounded-full bg-gradient-brand text-white text-xs font-semibold shadow-glow flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
              </button>
              <div className="h-10 w-10 grid place-items-center rounded-full glass-strong">
                <Eye className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span className="uppercase tracking-wider font-medium">{product.brand}</span>
              <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-primary text-primary" />{product.rating}</span>
            </div>
            <h3 className="font-semibold truncate">{product.name}</h3>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-bold">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
