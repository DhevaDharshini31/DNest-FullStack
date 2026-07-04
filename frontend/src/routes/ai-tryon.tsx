import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Camera, Loader2, Sparkles, Upload, Wand2 } from "lucide-react";
import { useRef, useState } from "react";
import { Blobs, SectionTitle } from "@/components/visual";

export const Route = createFileRoute("/ai-tryon")({
  head: () => ({
    meta: [
      { title: "AI Try-On — D Nest" },
      { name: "description", content: "Upload a photo and try on any outfit or preview any piece of furniture with AI." },
    ],
  }),
  component: TryOnPage,
});

function TryOnPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const input = useRef<HTMLInputElement>(null);

  const onFile = (f: File) => {
    setPhoto(URL.createObjectURL(f));
    setState("loading");
    setTimeout(() => setState("done"), 2400);
  };

  return (
    <div className="relative">
      <section className="relative px-4 pt-8 pb-16 overflow-hidden">
        <Blobs />
        <div className="relative mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="AI Try-On Studio"
            title={<>See yourself in it. Before you buy it.</>}
            desc="Upload a photo and D Nest's AI overlays any garment or stages any piece of furniture — photorealistic, in seconds."
          />

          <div className="mt-14 grid lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="glass-strong rounded-3xl p-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Camera className="h-4 w-4 text-primary" /> 1. Upload your photo</h3>
              {!photo && (
                <label onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) onFile(f); }}
                  className="block cursor-pointer rounded-2xl border-2 border-dashed border-white/15 bg-white/5 hover:border-primary/60 hover:bg-primary/5 transition p-14 text-center">
                  <input ref={input} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <div className="text-sm font-semibold">Drop your photo here</div>
                  <div className="text-xs text-muted-foreground mt-1">or click to browse</div>
                </label>
              )}
              {photo && (
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img src={photo} alt="You" className="w-full h-full object-cover" />
                </div>
              )}
              {photo && (
                <button onClick={() => { setPhoto(null); setState("idle"); }} className="mt-3 text-xs text-muted-foreground hover:text-foreground">Upload another</button>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="glass-strong rounded-3xl p-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Wand2 className="h-4 w-4 text-primary" /> 2. AI result</h3>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 grid place-items-center">
                {state === "idle" && (
                  <div className="text-center px-6">
                    <Sparkles className="h-10 w-10 mx-auto text-primary/70 mb-3" />
                    <p className="text-sm text-muted-foreground">Upload a photo to see the magic. Then open any product to try it on you.</p>
                  </div>
                )}
                {state === "loading" && (
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 mx-auto text-primary animate-spin mb-3" />
                    <div className="text-sm font-semibold">Generating…</div>
                  </div>
                )}
                {state === "done" && photo && (
                  <div className="relative w-full h-full">
                    <img src={photo} alt="Result" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent mix-blend-overlay" />
                    <div className="absolute bottom-4 left-4 right-4 glass-strong rounded-2xl p-3 text-xs">
                      Open any <span className="text-primary font-semibold">product page</span> and hit Try-On to render an outfit on this photo.
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
