import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Heart, Home, Image as ImageIcon, Loader2, ShoppingBag, Sparkles, Star, Truck, Undo2, Upload, Wand2, X, ZoomIn } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }): { product: Product } => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — D Nest` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — D Nest` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
          { name: "twitter:image", content: loaderData.product.image },
        ]
      : [{ title: "Product — D Nest" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white">Back to shop</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [zoom, setZoom] = useState(false);

  const related = useMemo(() => products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4), [product]);

  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <Link to={product.category === "fashion" ? "/fashion" : "/furniture"} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to {product.category}
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 grid lg:grid-cols-2 gap-10">
        <div>
          <motion.div layout className="relative glass rounded-3xl overflow-hidden aspect-[4/5] group">
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={product.images[active] || product.image}
              alt={product.name}
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => setZoom(true)}
            />
            <button className="absolute top-4 right-4 glass-strong h-10 w-10 rounded-full grid place-items-center" onClick={() => setZoom(true)} aria-label="Zoom">
              <ZoomIn className="h-4 w-4" />
            </button>
          </motion.div>
          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((im, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border transition ${active === i ? "border-primary shadow-glow" : "border-white/10 hover:border-white/30"}`}>
                  <img src={im} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {product.category === "fashion" ? <FashionTryOn productImage={product.image} /> : <RoomPreview />}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">{product.brand}</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-gradient leading-tight">{product.name}</h1>
          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" /> {product.rating} <span className="text-muted-foreground">({product.reviews})</span></span>
            <span className="text-muted-foreground">·</span>
            <span className={product.stock > 5 ? "text-emerald-400" : "text-amber-400"}>
              {product.stock > 5 ? "In stock" : `Only ${product.stock} left`}
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-bold">₹{product.price}</span>
            {product.originalPrice && <span className="text-muted-foreground line-through">₹{product.originalPrice}</span>}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          {product.sizes && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3"><span className="text-sm font-semibold">Size</span><button className="text-xs text-muted-foreground hover:text-foreground">Size guide</button></div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`min-w-12 h-11 px-3 rounded-xl border text-sm font-medium transition ${size === s ? "border-primary bg-primary/10 text-primary" : "border-white/10 hover:border-white/30"}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <span className="text-sm font-semibold">Color</span>
            <div className="mt-3 flex gap-2">
              {product.colors.map((c) => (
                <button key={c} onClick={() => setColor(c)} aria-label={c}
                  className={`h-10 w-10 rounded-full border-2 transition ${color === c ? "border-primary ring-2 ring-primary/30" : "border-white/20"}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button onClick={() => addToCart(product, 1, size, color)}
              className="h-14 rounded-2xl glass hover:bg-white/10 font-semibold flex items-center justify-center gap-2 transition">
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
            <button className="h-14 rounded-2xl bg-gradient-brand text-white font-semibold shadow-glow flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
              Buy Now
            </button>
          </div>
          <button onClick={() => toggleWishlist(product.id)}
            className={`mt-3 w-full h-12 rounded-2xl border border-white/10 hover:bg-white/5 font-medium text-sm flex items-center justify-center gap-2 transition ${wished ? "text-primary" : ""}`}>
            <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} /> {wished ? "In your wishlist" : "Add to Wishlist"}
          </button>

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
            <div className="glass rounded-xl p-3 text-center"><Truck className="h-4 w-4 mx-auto mb-1 text-primary" />Free shipping</div>
            <div className="glass rounded-xl p-3 text-center"><Undo2 className="h-4 w-4 mx-auto mb-1 text-primary" />30-day returns</div>
            <div className="glass rounded-xl p-3 text-center"><Sparkles className="h-4 w-4 mx-auto mb-1 text-primary" />AI verified</div>
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Features</h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{f}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Specifications</h3>
            <dl className="glass rounded-2xl p-5 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-white/5 py-1">
                  <dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ReviewsBlock rating={product.rating} count={product.reviews} />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">You might also like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <AnimatePresence>
        {zoom && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl grid place-items-center p-6" onClick={() => setZoom(false)}>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={product.images[active] || product.image} className="max-h-[90vh] max-w-full object-contain rounded-2xl" alt="" />
            <button className="absolute top-6 right-6 h-10 w-10 grid place-items-center rounded-full glass-strong"><X className="h-5 w-5" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReviewsBlock({ rating, count }: { rating: number; count: number }) {
  const items = [
    { name: "Priya S.", rating: 5, text: "Truly worth every rupee. The fit is exceptional.", avatar: "https://i.pravatar.cc/80?img=15" },
    { name: "Aditya R.", rating: 5, text: "AI try-on nailed the fit. Zero surprises when it arrived.", avatar: "https://i.pravatar.cc/80?img=33" },
    { name: "Nina T.", rating: 4, text: "Beautiful piece, arrived faster than expected.", avatar: "https://i.pravatar.cc/80?img=45" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="glass-strong rounded-3xl p-8 md:p-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-6xl font-bold text-gradient-brand">{rating}</div>
            <div className="flex gap-0.5 mt-2">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground"}`} />)}</div>
            <div className="text-sm text-muted-foreground mt-1">{count} verified reviews</div>
          </div>
          <div className="md:col-span-2 grid gap-4">
            {items.map((r) => (
              <div key={r.name} className="glass rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <img src={r.avatar} className="h-9 w-9 rounded-full object-cover" alt="" />
                  <div>
                    <div className="text-sm font-semibold flex items-center gap-2">{r.name} <span className="text-[10px] rounded-full bg-primary/20 text-primary px-2 py-0.5">Verified</span></div>
                    <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-primary text-primary" />)}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FashionTryOn({ productImage }: { productImage: string }) {
  const [file, setFile] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [compare, setCompare] = useState(50);
  const input = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => {
    const url = URL.createObjectURL(f);

    setFile(url);
    setState("loading");

    try {
      const formData = new FormData();

      formData.append("person", f);

      const clothBlob = await fetch(productImage).then((r) => r.blob());

      formData.append(
        "cloth",
        new File([clothBlob], "cloth.png", {
          type: clothBlob.type,
        })
      );

      const response = await fetch("http://127.0.0.1:8000/tryon", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Backend failed");
      }

      const imageBlob = await response.blob();

      const resultURL = URL.createObjectURL(imageBlob);
      setResultImage(resultURL);

      setState("done");
    } catch (err) {
      console.error(err);
      alert("AI Try-On failed");
      setState("idle");
    }
  };  

  return (
    <div className="mt-8 glass-strong rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-9 w-9 rounded-xl bg-gradient-brand grid place-items-center shadow-glow"><Wand2 className="h-4 w-4 text-white" /></div>
        <div>
          <h3 className="font-semibold">AI Virtual Try-On</h3>
          <p className="text-xs text-muted-foreground">Upload a full-length photo and see how it looks on you.</p>
        </div>
      </div>

      {!file && (
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) onFile(f); }}
          className="block cursor-pointer rounded-2xl border-2 border-dashed border-white/15 bg-white/5 hover:border-primary/60 hover:bg-primary/5 transition p-10 text-center"
        >
          <input ref={input} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
          <div className="text-sm font-semibold">Drop your photo here</div>
          <div className="text-xs text-muted-foreground mt-1">or click to browse · PNG, JPG up to 10MB</div>
        </label>
      )}

      {file && state === "loading" && (
        <div className="rounded-2xl bg-white/5 p-10 text-center">
          <Loader2 className="h-8 w-8 mx-auto text-primary animate-spin mb-3" />
          <div className="text-sm font-semibold">Generating your try-on…</div>
          <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden max-w-xs mx-auto">
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.4 }} className="h-full bg-gradient-brand" />
          </div>
        </div>
      )}

      {file && state === "done" && (
        <div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden select-none">
            <img
              src={file ?? ""}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Original"
            />
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${compare}%)` }}>
              <img
                src={resultImage ?? ""}
                className="absolute inset-0 w-full h-full object-cover"
                alt="AI Result"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 right-3 text-[10px] font-bold uppercase tracking-widest bg-gradient-brand text-white px-2 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> AI Try-On
              </div>
            </div>
            <input type="range" min={0} max={100} value={compare} onChange={(e) => setCompare(Number(e.target.value))}
              className="absolute inset-x-0 bottom-0 w-full opacity-0 h-full cursor-ew-resize" aria-label="Compare" />
            <div className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-white shadow-glow" style={{ left: `${compare}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white text-black grid place-items-center text-xs font-bold">↔</div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-emerald-400"><Check className="h-4 w-4" /> Try-on ready — drag to compare</div>
            <button onClick={() => {
              setFile(null);
              setResultImage(null);
              setState("idle");
              }} 
            className="text-xs text-muted-foreground hover:text-foreground">Try another photo</button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function RoomPreview() {
  return (
    <div className="mt-8 glass-strong rounded-3xl p-8 text-center">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-brand grid place-items-center shadow-glow mb-4">
        <Home className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold">AI Room Preview</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">Place this piece inside a photo of your own room. Launching soon in beta.</p>
      <div className="mt-5 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium">
        <ImageIcon className="h-3.5 w-3.5 text-primary" /> Coming soon
      </div>
    </div>
  );
}
