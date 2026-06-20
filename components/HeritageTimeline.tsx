import { Star, Quote } from "lucide-react";
import { CLUB } from "@/lib/clubData";
import Reveal from "./Reveal";

export default function HeritageTimeline() {
  return (
    <section
      id="histoire"
      className="relative overflow-hidden py-14 sm:py-28"
    >
      {/* Filigrane 1942 */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <span className="select-none font-display text-[28vw] leading-none text-white/[0.025]">
          1942
        </span>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald/15 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold">
            <Star className="h-3.5 w-3.5" /> Plus de 80 ans d&apos;histoire
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,6vw,3.9rem)] uppercase leading-[0.95] text-white">
            Votre enfant ne rejoint pas un club.
            <br />
            <span className="text-gradient-gold">Il entre dans une légende.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-zinc-300">
            Depuis {CLUB.foundedYear}, des générations d&apos;enfants ont grandi
            sous nos couleurs. Demain, c&apos;est son nom qui s&apos;ajoutera à
            cette histoire.
          </p>
        </Reveal>

        {/* Frise */}
        <Reveal delay={120} className="mt-10 sm:mt-16">
          <div className="relative">
            {/* ligne dorée */}
            <div className="pointer-events-none absolute left-0 right-0 top-[42px] hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block" />

            <ol className="grid gap-8 lg:grid-cols-4 lg:gap-6">
              {CLUB.milestones.map((m, i) => (
                <li key={i} className="relative text-center lg:text-left">
                  {/* noeud */}
                  <div className="mb-5 flex items-center justify-center lg:justify-start">
                    <span className="relative grid h-[58px] w-[58px] place-items-center rounded-2xl border border-gold/30 bg-[#0a0e15] font-display text-lg text-gold shadow-[0_0_30px_-8px_rgba(255,204,0,0.6)]">
                      {i === 0 ? <Star className="h-6 w-6" /> : i + 1}
                    </span>
                  </div>
                  <p className="font-display text-3xl uppercase leading-none text-white">
                    {m.year}
                  </p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-wide text-gold/90">
                    {m.title}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-zinc-400">
                    {m.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* Citation émotionnelle */}
        <Reveal delay={200} className="mx-auto mt-20 max-w-3xl">
          <figure className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center sm:p-12">
            <Quote className="mx-auto h-8 w-8 text-gold/60" />
            <blockquote className="mt-5 font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
              «&nbsp;Le talent ne s&apos;achète pas.
              <span className="text-gradient-gold"> Il se forge ici.&nbsp;»</span>
            </blockquote>
            <figcaption className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              L&apos;Étoile de la Jeunesse Sportive de Casablanca · {CLUB.foundedYear}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
