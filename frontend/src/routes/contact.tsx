import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { Blobs, SectionTitle } from "@/components/visual";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — D Nest" },
      { name: "description", content: "Get in touch with the D Nest team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="relative">
      <section className="relative px-4 pt-10 pb-16 overflow-hidden">
        <Blobs />
        <div className="relative mx-auto max-w-4xl text-center">
          <SectionTitle eyebrow="Say hello" title={<>Let's talk.</>} desc="Whether it's a question, a partnership, or a story — we'd love to hear from you." />
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-[1fr_1.5fr] gap-6">
          <div className="grid gap-4">
            {[
              { icon: Mail, title: "Email", value: "hello@dnest.ai" },
              { icon: Phone, title: "Phone", value: "+91 90000 00000" },
              { icon: MapPin, title: "Studio", value: "Bengaluru, India" },
              { icon: MessageSquare, title: "Live chat", value: "24 / 7" },
            ].map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-5 flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-gradient-brand-soft border border-primary/30 grid place-items-center"><c.icon className="h-5 w-5 text-primary" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.title}</div>
                  <div className="font-semibold">{c.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8 grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" placeholder="Your name" />
              <Field label="Email" placeholder="you@domain.com" type="email" />
            </div>
            <Field label="Subject" placeholder="What's this about?" />
            <label className="block">
              <span className="text-xs text-muted-foreground">Message</span>
              <textarea rows={6} placeholder="Tell us more…"
                className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition resize-none" />
            </label>
            <button className="rounded-full bg-gradient-brand text-white font-semibold px-6 py-3.5 text-sm shadow-glow hover:scale-[1.02] transition-transform flex items-center gap-2 w-fit">
              <Send className="h-4 w-4" /> Send message
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition" />
    </label>
  );
}
