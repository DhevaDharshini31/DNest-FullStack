import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, Sparkles, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

const links = [
  { to: "/", label: "Home" },
  { to: "/fashion", label: "Fashion" },
  { to: "/furniture", label: "Furniture" },
  { to: "/ai-tryon", label: "AI Try-On" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { cartCount, wishlistCount } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav className={`glass rounded-2xl px-4 sm:px-6 py-3 flex items-center gap-4 shadow-card transition-all ${scrolled ? "shadow-glow" : ""}`}>
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="relative h-8 w-8 rounded-lg bg-gradient-brand grid place-items-center shadow-glow">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">D Nest</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1 ml-4">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {active && (
                      <motion.span layoutId="nav-active" className="absolute inset-0 rounded-lg bg-white/5 border border-white/10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                    )}
                    <span className="relative">{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-1">
            <Link to="/shop" aria-label="Search" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <Search className="h-5 w-5" />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && <Badge>{wishlistCount}</Badge>}
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <Badge>{cartCount}</Badge>}
            </Link>
            <Link to="/profile" aria-label="Profile" className="p-2 rounded-lg hover:bg-white/5 transition-colors hidden sm:inline-flex">
              <User className="h-5 w-5" />
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass rounded-2xl p-3"
            >
              <ul className="grid gap-1">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="block px-3 py-2 rounded-lg hover:bg-white/5 text-sm">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li><Link to="/profile" className="block px-3 py-2 rounded-lg hover:bg-white/5 text-sm">Profile</Link></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-gradient-brand text-[10px] font-bold text-white grid place-items-center shadow-glow">
      {children}
    </span>
  );
}
