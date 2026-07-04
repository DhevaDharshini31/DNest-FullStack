import { createFileRoute } from "@tanstack/react-router";
import { ShopLayout } from "@/components/ShopLayout";

export const Route = createFileRoute("/furniture")({
  head: () => ({
    meta: [
      { title: "Furniture — D Nest" },
      { name: "description", content: "Shop sculptural furniture with AI room preview." },
      { property: "og:title", content: "Furniture — D Nest" },
      { property: "og:description", content: "Preview furniture inside your own room before purchase." },
    ],
  }),
  component: () => (
    <ShopLayout
      eyebrow="Furniture"
      title="Place it before you buy it."
      desc="Sculptural furniture staged inside your own space with AI."
      category="furniture"
    />
  ),
});
