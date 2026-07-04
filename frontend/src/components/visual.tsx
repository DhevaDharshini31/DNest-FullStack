import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px] animate-float-slow" />
      <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-accent-blue/25 blur-[130px] animate-float" style={{ animationDelay: "-4s" }} />
      <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-fuchsia-500/20 blur-[120px] animate-float-slow" style={{ animationDelay: "-8s" }} />
    </div>
  );
}

export function Grid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 80%)",
      }}
    />
  );
}

export function SectionTitle({
  eyebrow,
  title,
  desc,
  center = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  desc?: ReactNode;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary/90 mb-4">
          <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient leading-tight">
        {title}
      </h2>
      {desc && <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{desc}</p>}
    </motion.div>
  );
}
