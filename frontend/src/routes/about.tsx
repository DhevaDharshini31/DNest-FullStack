import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Blobs, SectionTitle } from "@/components/visual";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — D Nest" },
      { name: "description", content: "D Nest is building the AI layer for shopping. Learn our story and mission." },
      { property: "og:title", content: "About D Nest" },
      { property: "og:description", content: "The AI shopping experience for fashion and furniture." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { title: "Confidence", desc: "Every purchase should feel inevitable. AI removes the last percent of doubt." },
  { title: "Craft", desc: "We work with independent studios and heritage houses — no fast fashion, no filler." },
  { title: "Intelligence", desc: "Our models are trained to respect fit, drape, scale, and light — not just pixels." },
];

function AboutPage() {
  return (
    <div className="relative">
      <section className="relative px-4 pt-10 pb-16 overflow-hidden">
        <Blobs />
        <div className="relative mx-auto max-w-5xl text-center">
          <SectionTitle eyebrow="Our story" title={<>We're building the AI layer for shopping.</>} desc="D Nest exists so you never buy blind again. Every piece we sell can be tried on, placed in your space, and understood before it ships." />
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-strong rounded-3xl p-8 hover-lift">
              <div className="text-5xl font-display font-bold text-gradient-brand mb-4">0{i + 1}</div>
              <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl glass-strong rounded-3xl p-8 md:p-12 grid md:grid-cols-3 gap-8 text-center">
          {[
            { n: "120k+", l: "AI try-ons generated" },
            { n: "4.9★", l: "Average rating" },
            { n: "37%", l: "Lower return rate" },
          ].map((s) => (
            <div key={s.n}>
              <div className="text-5xl font-bold text-gradient-brand">{s.n}</div>
              <div className="text-sm text-muted-foreground mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
