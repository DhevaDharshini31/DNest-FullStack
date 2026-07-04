import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Camera, CreditCard, Heart, Home, Search, ShieldCheck, Shirt, Sparkles, Sofa, Star, Truck, Wand2, Zap } from "lucide-react";
import { useRef } from "react";
import { Blobs, Grid, SectionTitle } from "@/components/visual";
import { ProductCard } from "@/components/ProductCard";
import { products, reviews } from "@/lib/products";

export const Route = createFileRoute("/")({ component: Home_ });

function Home_() {
  return (
    <div className="relative">
      <Hero />
      <Problems />
      <Solution />
      <Fashion />
      <Furniture />
      <WhyDNest />
      <Trending />
      <Reviews />
      <Newsletter />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center overflow-hidden -mt-24 pt-24">
      <Blobs />
      <Grid />
      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center py-16">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            AI Fashion & Furniture Experience
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.02] tracking-tight"
          >
            <span className="text-gradient">See It.</span><br />
            <span className="text-gradient">Try It.</span><br />
            <span className="text-gradient-brand">Love It.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Experience fashion and furniture with AI before making your purchase.
            Upload your photo, virtually try outfits, preview furniture in your room, and shop with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/ai-tryon" className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow hover:scale-[1.03] transition-transform">
              <Sparkles className="h-4 w-4" /> Start AI Try-On
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors">
              🛍 Explore Collection
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="mt-10 flex items-center gap-6 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-primary text-primary" /> 4.9 · 12k reviews</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Secure checkout</div>
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Free shipping</div>
          </motion.div>
        </div>

        <HeroVisual />
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground tracking-widest uppercase animate-pulse-glow">
        Scroll ↓
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative h-[560px] hidden lg:block">
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-72 h-96 rounded-3xl overflow-hidden glass-strong shadow-elegant"
      >
        <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Fashion" />
        <div className="absolute bottom-3 left-3 right-3 glass-strong rounded-2xl p-3">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Try-On</div>
          <div className="text-sm font-semibold">Midnight Silk Blazer</div>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [2, -1, 2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: -2 }}
        className="absolute bottom-0 left-0 w-80 h-72 rounded-3xl overflow-hidden glass-strong shadow-elegant"
      >
        <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Furniture" />
        <div className="absolute bottom-3 left-3 right-3 glass-strong rounded-2xl p-3">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Room Preview</div>
          <div className="text-sm font-semibold">Voro Lounge Chair</div>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-strong rounded-2xl p-4 shadow-glow w-56"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-brand grid place-items-center"><Wand2 className="h-4 w-4 text-white" /></div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Engine</div>
            <div className="text-sm font-semibold">Generating…</div>
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} className="h-full bg-gradient-brand" />
        </div>
      </motion.div>
    </motion.div>
  );
}

const problems = [
  { title: "Wrong fit", desc: "40% of online purchases end in a return because size and fit are impossible to judge." },
  { title: "Can it live here?", desc: "Furniture rarely looks in your room the way it looks on the store page." },
  { title: "Endless scrolling", desc: "Millions of products and none of them show how they'll actually feel." },
];

function Problems() {
  return (
    <section className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="The problem"
          title={<>Shopping online is broken.</>}
          desc="Photos don't tell you if it fits. Renderings don't tell you if it belongs. We built D Nest to change that."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl p-8 hover-lift"
            >
              <div className="text-5xl font-display font-bold text-gradient-brand mb-4">0{i + 1}</div>
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle eyebrow="The solution" title={<>Meet the AI that shops with you.</>} desc="One intelligent layer over every product — so you can try it, place it, and feel it, before you decide." />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {[
            { icon: Camera, title: "Upload once", desc: "Snap a photo — a full-length shot or a corner of your room." },
            { icon: Wand2, title: "AI generates", desc: "Our engine dresses you or stages your space in seconds." },
            { icon: Heart, title: "Buy with confidence", desc: "You've already seen how it looks. Checkout with zero doubt." },
          ].map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative glass-strong rounded-3xl p-8 hover-lift">
              <div className="h-14 w-14 rounded-2xl bg-gradient-brand grid place-items-center shadow-glow mb-6">
                <s.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Fashion() {
  return (
    <section className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80" className="rounded-3xl aspect-[3/4] object-cover glass shadow-elegant" alt="" />
            <img src="https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=600&q=80" className="rounded-3xl aspect-[3/4] object-cover glass shadow-elegant mt-8" alt="" />
          </div>
          <div className="absolute -bottom-6 -right-6 glass-strong rounded-2xl p-4 shadow-glow max-w-[220px]">
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">Fashion Try-On</span></div>
            <p className="text-xs text-muted-foreground mt-1">Photorealistic outfit rendering in under 8 seconds.</p>
          </div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium mb-4"><Shirt className="h-3.5 w-3.5 text-primary" /> AI Fashion</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient leading-tight">Try on outfits without leaving your couch.</h2>
          <p className="mt-4 text-muted-foreground text-lg">Upload one photo and see how every piece drapes on your body — before adding it to cart.</p>
          <ul className="mt-6 space-y-3">
            {["Photorealistic garment fitting", "Any pose, any lighting", "Save looks to your closet"].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm"><div className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />{f}</li>
            ))}
          </ul>
          <Link to="/fashion" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow">
            Explore fashion <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Furniture() {
  return (
    <section className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium mb-4"><Sofa className="h-3.5 w-3.5 text-primary" /> AI Furniture</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient leading-tight">Preview furniture inside your room.</h2>
          <p className="mt-4 text-muted-foreground text-lg">Snap a corner of your space and place any piece into it. Scale, angle, and light — perfectly matched.</p>
          <ul className="mt-6 space-y-3">
            {["Automatic scale detection", "True-to-life materials", "Compare pieces side by side"].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm"><div className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />{f}</li>
            ))}
          </ul>
          <Link to="/furniture" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow">
            Explore furniture <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
          <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80" className="rounded-3xl aspect-[4/3] w-full object-cover glass shadow-elegant" alt="" />
          <div className="absolute -top-6 -left-6 glass-strong rounded-2xl p-4 shadow-glow max-w-[220px]">
            <div className="flex items-center gap-2"><Home className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">Room Preview</span></div>
            <p className="text-xs text-muted-foreground mt-1">See it in your space before it ships.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const features = [
  { icon: Sparkles, title: "AI Fashion Try-On", desc: "Every outfit, on you." },
  { icon: Home, title: "Furniture Preview", desc: "Every piece, in your room." },
  { icon: Heart, title: "Wishlist", desc: "Curate the pieces you love." },
  { icon: Search, title: "Smart Search", desc: "Find anything in seconds." },
  { icon: Zap, title: "Fast Checkout", desc: "One tap. Done." },
  { icon: Sparkles, title: "Premium Recommendations", desc: "Tuned to your taste." },
  { icon: ShieldCheck, title: "Secure Payments", desc: "Bank-grade encryption." },
  { icon: CreditCard, title: "Flexible Payments", desc: "Pay your way." },
];

function WhyDNest() {
  return (
    <section className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Why D Nest" title={<>Built for the way you actually shop.</>} desc="Every feature exists to remove doubt from the moment you tap 'buy'." />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
              className="glass rounded-2xl p-6 hover-lift">
              <div className="h-10 w-10 rounded-xl bg-gradient-brand-soft border border-primary/30 grid place-items-center mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trending() {
  const trending = products.filter((p) => p.trending).slice(0, 4);
  return (
    <section className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <SectionTitle eyebrow="Featured" title={<>Trending this week.</>} center={false} />
          <Link to="/shop" className="text-sm font-semibold inline-flex items-center gap-1 hover:text-primary transition-colors">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Loved by shoppers" title={<>People don't return what they've already tried on.</>} />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl p-8 hover-lift">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-primary text-primary" />)}
              </div>
              <p className="text-lg leading-relaxed">"{r.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={r.avatar} className="h-10 w-10 rounded-full object-cover" alt="" />
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="relative py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative glass-strong rounded-4xl p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-60" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">Get early access.</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Be first to try new AI features, private collections, and members-only pricing.</p>
            <form className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="you@domain.com"
                className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-full px-5 py-3.5 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition" />
              <button className="rounded-full bg-gradient-brand text-white font-semibold px-6 py-3.5 text-sm shadow-glow hover:scale-[1.02] transition-transform">
                Join waitlist
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
