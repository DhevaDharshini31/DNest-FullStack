import { createFileRoute } from "@tanstack/react-router";
import { ShopLayout } from "@/components/ShopLayout";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — D Nest" },
      { name: "description", content: "Explore the full D Nest collection of AI-ready fashion and furniture." },
    ],
  }),
  component: () => <ShopLayout eyebrow="All products" title="The full collection" desc="Every piece, curated. Every piece, tryable with AI." />,
});
