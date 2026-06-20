import { ArrowRight, Heart } from "lucide-react";
import Reveal from "./Reveal";

export default function EmotionBand() {
  return (
    <section className="keep-dark relative overflow-hidden">
      {/* Image émotionnelle en fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/ecole-calin.jpg')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#05070a]/80" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 90% at 50% 50%, rgba(5,7,10,0.2) 0%, rgba(5,7,10,0.85) 70%, #05070a 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-5 py-14 text-center sm:px-8 sm:py-28">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold backdrop-blur-md">
            <Heart className="h-3.5 w-3.5" /> L&apos;investissement d&apos;une vie
          </span>
          <h2 className="mt-7 font-display text-[clamp(2.1rem,7vw,4.5rem)] uppercase leading-[0.92] text-white">
            Dans 10 ans, il se souviendra
            <br />
            <span className="text-gradient-gold">
              du jour où tout a commencé.
            </span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg">
            Aujourd&apos;hui, vous avez le choix : le laisser rêver depuis les
            tribunes, ou lui offrir sa chance sur le terrain. Les meilleures
            générations se construisent tôt,{" "}
            <span className="font-semibold text-white">
              et les places partent vite.
            </span>
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#admission"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gold px-8 py-5 text-base font-extrabold uppercase tracking-wide text-[#05070a] shadow-gold-glow transition-transform duration-300 hover:scale-[1.03] sm:w-auto"
            >
              <span className="relative z-10">Offrir sa chance à mon enfant</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 z-0 -translate-x-full">
                <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              </span>
            </a>
            <span className="text-sm font-semibold text-zinc-400">
              Sans engagement · Réponse sous 24h
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
