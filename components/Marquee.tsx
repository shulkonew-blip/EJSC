import { Star } from "lucide-react";

const WORDS = [
  "Discipline",
  "Technique",
  "Mental de gagnant",
  "Héritage 2016",
  "Esprit d'équipe",
  "Haute performance",
  "Respect",
  "Passion",
  "Détection",
  "ADN de la gagne",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-emerald/[0.08] via-transparent to-gold/[0.06] py-5">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex shrink-0 items-center gap-8 pr-8"
            aria-hidden={dup === 1}
          >
            {WORDS.map((w) => (
              <li key={w} className="flex items-center gap-8">
                <span className="font-display text-2xl uppercase tracking-wide text-white/90 sm:text-3xl">
                  {w}
                </span>
                <Star className="h-4 w-4 shrink-0 text-gold" />
              </li>
            ))}
          </ul>
        ))}
      </div>
      {/* fondus latéraux */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#05070a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#05070a] to-transparent" />
    </div>
  );
}
