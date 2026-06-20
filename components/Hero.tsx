"use client";

import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { getSeason } from "@/lib/clubData";

export default function Hero() {
  const recruit = getSeason().recruitmentLabel;
  return (
    <section
      id="top"
      className="keep-dark relative flex min-h-screen w-full items-center overflow-hidden [min-height:100svh]"
    >
      {/* Image de fond (conteneur stylisé) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-worldcup.jpg')" }}
        aria-hidden
      />

      {/* Dégradé radial noir qui focalise sur la coupe + base sombre */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 62%, rgba(5,7,10,0.05) 0%, rgba(5,7,10,0.45) 38%, rgba(5,7,10,0.86) 72%, #05070a 100%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#05070a] via-[#05070a]/40 to-[#05070a]/70" aria-hidden />
      {/* Lueurs de marque */}
      <div className="pointer-events-none absolute -left-32 top-1/3 z-10 h-96 w-96 rounded-full bg-emerald/25 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-10 z-10 h-80 w-80 rounded-full bg-gold/15 blur-[120px]" aria-hidden />

      {/* Contenu */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-24 pb-16 sm:px-8">
        <div className="flex max-w-3xl flex-col items-center text-center sm:items-start sm:text-left">
          <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-black/30 px-4 py-2 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              L&apos;histoire s&apos;écrit ici · Le talent se forme chez nous
            </span>
          </div>

          <h1
            className="animate-fade-up mt-7 font-display text-[clamp(2.15rem,8.5vw,6.2rem)] uppercase leading-[0.92] tracking-tight text-white"
            style={{ animationDelay: "120ms" }}
          >
            Depuis 2016,
            <br />
            nous traçons la voie
            <br />
            de{" "}
            <span className="relative inline-block text-gradient-gold">
              l&apos;élite
              <svg
                className="absolute -bottom-3 left-0 w-full"
                viewBox="0 0 300 18"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 13C61 5 137 4 297 9"
                  stroke="#FFCC00"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>

          <p
            className="animate-fade-up mt-9 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            Rejoignez l&apos;institution historique de Casablanca. Offrez à votre
            enfant bien plus qu&apos;un entraînement :{" "}
            <span className="font-semibold text-white">
              un destin de champion
            </span>
            , un encadrement certifié et l&apos;ADN de la gagne.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href="#admission"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gold px-8 py-5 text-base font-extrabold uppercase tracking-wide text-[#05070a] shadow-gold-glow transition-transform duration-300 hover:scale-[1.03] sm:w-auto sm:text-lg"
            >
              <span className="relative z-10">
                Réserver un cours d&apos;essai {recruit}
              </span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
              {/* Brillance dynamique */}
              <span className="absolute inset-0 z-0 -translate-x-full">
                <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              </span>
            </a>

            <a
              href="#simulateur"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-5 text-base font-bold text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              Découvrir les programmes
            </a>
          </div>

          <div
            className="animate-fade-up mt-9 flex items-center gap-3 text-sm text-zinc-400"
            style={{ animationDelay: "480ms" }}
          >
            <ShieldCheck className="h-5 w-5 text-emerald-glow" />
            <span>
              Encadrement <span className="text-white">100% certifié</span> · Cursus
              U5 à U20 · Casablanca
            </span>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <a
        href="#palmares"
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-400 transition hover:text-gold sm:flex"
        aria-label="Défiler"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          Défiler
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
