import { Link } from "@tanstack/react-router";
import { Github, Instagram, Sparkles, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent-blue/30 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-9 w-9 rounded-lg bg-gradient-brand grid place-items-center shadow-glow">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="font-display font-bold text-xl">D Nest</span>
              </div>
              <p className="text-muted-foreground max-w-md mb-6">
                Try before you buy with AI. A luxury shopping experience for fashion and furniture, powered by intelligence.
              </p>
              <form className="flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition"
                />
                <button className="shrink-0 bg-gradient-brand text-white font-semibold rounded-xl px-5 py-3 text-sm shadow-glow hover:scale-[1.02] transition-transform">
                  Subscribe
                </button>
              </form>
            </div>

            <FooterCol title="Shop" links={[
              { to: "/fashion", label: "Fashion" },
              { to: "/furniture", label: "Furniture" },
              { to: "/shop", label: "All Products" },
              { to: "/wishlist", label: "Wishlist" },
            ]} />
            <FooterCol title="Company" links={[
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/ai-tryon", label: "AI Try-On" },
              { to: "/profile", label: "Profile" },
            ]} />
          </div>

          <div className="relative mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} D Nest. Crafted with intelligence.</p>
            <div className="flex items-center gap-2">
              <SocialIcon><Twitter className="h-4 w-4" /></SocialIcon>
              <SocialIcon><Instagram className="h-4 w-4" /></SocialIcon>
              <SocialIcon><Github className="h-4 w-4" /></SocialIcon>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-9 w-9 grid place-items-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/40 transition-colors">
      {children}
    </button>
  );
}
