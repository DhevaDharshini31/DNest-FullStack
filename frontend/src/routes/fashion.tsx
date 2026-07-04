import { createFileRoute } from "@tanstack/react-router";
import { ShopLayout } from "@/components/ShopLayout";

export const Route = createFileRoute("/fashion")({
  head: () => ({
    meta: [
      { title: "Fashion — D Nest" },
      { name: "description", content: "Shop premium fashion with AI-powered virtual try-on." },
      { property: "og:title", content: "Fashion — D Nest" },
      { property: "og:description", content: "Try on outfits with AI before you buy." },
    ],
  }),
  component: () => (
    <ShopLayout
      eyebrow="Fashion"
      title="Wear it before you buy it."
      desc="Curated outfits from independent studios and heritage houses — all AI try-on ready."
      category="fashion"
    />
  ),
});
