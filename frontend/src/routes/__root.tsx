import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StoreProvider } from "@/lib/store";

function NotFoundComponent() {
  return (
    <Shell>
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-7xl font-bold text-gradient-brand">404</h1>
          <h2 className="mt-4 text-xl font-semibold">Lost in the nest</h2>
          <p className="mt-2 text-sm text-muted-foreground">This page drifted somewhere else. Let's get you home.</p>
          <div className="mt-6">
            <Link to="/" className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow">
              Go home
            </Link>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <Shell>
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold">This page didn't load</h1>
          <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again or head home.</p>
          <div className="mt-6 flex justify-center gap-2">
            <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow">Try again</button>
            <a href="/" className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold">Go home</a>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "D Nest — Try Before You Buy with AI" },
      { name: "description", content: "D Nest is a premium AI shopping experience. Virtually try on fashion and preview furniture in your space before you buy." },
      { name: "author", content: "D Nest" },
      { property: "og:title", content: "D Nest — AI Fashion & Furniture" },
      { property: "og:description", content: "Try on outfits and preview furniture with AI. Shop luxury fashion and furniture with confidence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0d0a1a" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Shell>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 0.8, 0.2, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Shell>
      </StoreProvider>
    </QueryClientProvider>
  );
}
