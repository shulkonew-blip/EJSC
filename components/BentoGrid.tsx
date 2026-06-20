import Reveal from "./Reveal";
import { Flame, Trophy, Globe2, Swords, Shield, Users } from "lucide-react";

interface Cell {
  image: string;
  title: string;
  tag: string;
  icon: React.ReactNode;
  /** classes de span (appliquées dès sm pour une grille 3 colonnes sans trou) */
  span: string;
}

const CELLS: Cell[] = [
  {
    image: "/images/bento-flammes.jpg",
    title: "La Ferveur",
    tag: "Fumigènes vert & or, passion brute",
    icon: <Flame className="h-5 w-5" />,
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    image: "/images/bento-championship.jpg",
    title: "Petits Champions",
    tag: "La joie pure du trophée",
    icon: <Trophy className="h-5 w-5" />,
    span: "",
  },
  {
    image: "/images/bento-coupe.jpg",
    title: "Scène Internationale",
    tag: "Bannières & protocole officiel",
    icon: <Globe2 className="h-5 w-5" />,
    span: "",
  },
  {
    image: "/images/bento-drible.jpg",
    title: "L'Intensité du Duel",
    tag: "Engagement total sur le terrain",
    icon: <Swords className="h-5 w-5" />,
    span: "sm:col-span-2",
  },
  {
    image: "/images/bento-entree.jpg",
    title: "L'Entrée des Pros",
    tag: "Alignés, concentrés, en bleu",
    icon: <Shield className="h-5 w-5" />,
    span: "",
  },
  {
    image: "/images/bento-collectif.jpg",
    title: "La Force du Collectif",
    tag: "Un seul club, une seule famille",
    icon: <Users className="h-5 w-5" />,
    span: "sm:col-span-3",
  },
];

export default function BentoGrid() {
  return (
    <section
      id="galerie"
      className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-28"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          <Flame className="h-3.5 w-3.5" /> Moments de gloire
        </span>
        <h2 className="mt-6 font-display text-[clamp(2rem,6vw,3.75rem)] uppercase leading-[0.95] text-white">
          La vie du club,
          <span className="text-gradient-gold"> sans filtre</span>
        </h2>
        <p className="mt-4 text-zinc-400">
          Des émotions vraies, des victoires partagées, une histoire qui se vit
          chaque week-end.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-10 sm:mt-14">
        <div className="grid auto-rows-[150px] grid-cols-1 gap-3 sm:grid-cols-3 sm:auto-rows-[230px]">
          {CELLS.map((cell) => (
            <article
              key={cell.title}
              className={`keep-dark group relative overflow-hidden rounded-2xl border border-white/10 ${cell.span}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${cell.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/20 to-transparent" />
              <div className="absolute inset-0 bg-gold/0 mix-blend-overlay transition-colors duration-500 group-hover:bg-gold/30" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-2 group-hover:ring-gold/60" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-2.5 transition-transform duration-500 group-hover:-translate-y-1">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-black/40 text-gold ring-1 ring-white/15 backdrop-blur-sm">
                    {cell.icon}
                  </span>
                  <h3 className="font-display text-xl uppercase tracking-wide text-white sm:text-2xl">
                    {cell.title}
                  </h3>
                </div>
                <p className="mt-2 max-h-0 overflow-hidden text-sm text-zinc-200 opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100">
                  {cell.tag}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
