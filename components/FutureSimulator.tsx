"use client";

import { useMemo, useState } from "react";
import {
  Sparkles,
  Target,
  ArrowRight,
  Trophy,
  Dumbbell,
  Brain,
  Smile,
  Footprints,
  Globe2,
  CalendarCheck,
  Lock,
  CheckCircle2,
  Clock,
  Swords,
  Moon,
} from "lucide-react";
import { categoryFromAge } from "@/lib/category";
import {
  ecoleScheduleFor,
  academieScheduleFor,
  RAMADAN_NOTE,
} from "@/lib/schedule";
import { CLUB, getSeason } from "@/lib/clubData";
import Reveal from "./Reveal";

const MIN_AGE = 5;
// Recrutement jusqu'à la catégorie U19 (18 ans max) : le curseur s'arrête à 18.
const MAX_AGE = 18;
const ACADEMY_MIN_U = CLUB.academyMinU;

export default function FutureSimulator() {
  const [age, setAge] = useState(8);

  const info = useMemo(() => categoryFromAge(age), [age]);
  const academyEligible = info.academyEligible;
  const ecoleSched = useMemo(() => ecoleScheduleFor(info.uNumber), [info.uNumber]);
  const acadSched = useMemo(
    () => academieScheduleFor(info.uNumber),
    [info.uNumber]
  );
  const season = getSeason();
  const pct = ((age - MIN_AGE) / (MAX_AGE - MIN_AGE)) * 100;

  const ecoleImg = "/images/ecole-coach.jpg";
  const academieImg = "/images/academie-groupe.jpg";

  return (
    <section
      id="simulateur"
      className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-28"
    >
      {/* lueur d'ambiance — discrète */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[130px]"
      />

      {/* En-tête */}
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          <Target className="h-3.5 w-3.5" /> Le simulateur d&apos;avenir
        </span>
        <h2 className="mt-6 font-display text-[clamp(2rem,6vw,3.75rem)] uppercase leading-[0.95] text-white">
          Quel est l&apos;âge de votre
          <span className="text-gradient-gold"> futur champion</span> ?
        </h2>
        <p className="mt-4 text-zinc-400">
          Réglez le curseur : nous vous montrons la voie idéale. Nos deux
          parcours sont ouverts{" "}
          <span className="font-semibold text-white">toute l&apos;année</span>.
        </p>
      </Reveal>

      {/* Console de réglage */}
      <Reveal delay={120} className="mt-10 sm:mt-14">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.015] p-6 shadow-2xl sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
            {/* Âge + catégorie */}
            <div className="flex items-center gap-5">
              <span className="relative grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-deep font-display text-[2rem] leading-none text-[#05070a] sm:h-24 sm:w-24 sm:text-4xl">
                {info.label}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[#05070a] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-300 ring-1 ring-white/15">
                  Catégorie
                </span>
              </span>
              <div>
                <p className="font-display text-3xl uppercase leading-none text-white sm:text-4xl">
                  {age} ans
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  Groupe{" "}
                  <span className="font-semibold text-gold">{info.group}</span>
                </p>
                <p className="text-sm text-zinc-500">
                  Saison {season.currentLabel}
                </p>
              </div>
            </div>

            {/* Curseur */}
            <div className="flex-1">
              <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-zinc-400">
                <span>Faites glisser pour ajuster l&apos;âge</span>
                <span className="text-gold">{age} ans</span>
              </div>
              <div className="relative py-2">
                <div className="pointer-events-none absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-white/10" />
                <div
                  className="pointer-events-none absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full transition-all duration-200"
                  style={{
                    width: `${pct}%`,
                    background: "linear-gradient(90deg, #00A651, #FFCC00)",
                    boxShadow: "0 0 10px rgba(255,204,0,0.25)",
                  }}
                />
                <input
                  type="range"
                  min={MIN_AGE}
                  max={MAX_AGE}
                  step={1}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="ejsc-range relative w-full bg-transparent"
                  aria-label="Âge de l'enfant"
                />
              </div>
              <div className="mt-2 flex justify-between text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                <span>5 ans</span>
                <span>11 ans</span>
                <span>18 ans</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Les deux voies */}
      <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-2">
        {/* École */}
        <Reveal delay={80}>
          <ProgramCard
            image={ecoleImg}
            recommended={!academyEligible}
            recommendedLabel="Idéal pour votre enfant"
            available
            badge="Ouvert toute l'année"
            badgeIcon={<CalendarCheck className="h-3.5 w-3.5" />}
            badgeTone="border-emerald-glow/40 bg-emerald/15 text-emerald-glow"
            title="École de Football Élite"
            tagline="De U5 à U16, la base de tout grand joueur. Horaires affichés pour la catégorie sélectionnée."
            frequency={ecoleSched ? ecoleSched.frequency : "—"}
            schedule={
              ecoleSched
                ? ecoleSched.lines
                : [
                    `L'École accueille jusqu'à la catégorie U16. À ${info.label}, c'est l'Académie qui prend le relais.`,
                  ]
            }
            matchInfo={
              ecoleSched
                ? ecoleSched.matchInfo
                : "Catégorie orientée vers l'Académie de Performance."
            }
            ramadanNote={ecoleSched ? RAMADAN_NOTE : undefined}
            note="Inscriptions ouvertes, places limitées pour garantir la qualité de l'encadrement."
            noteTone="text-emerald-glow"
            focus={[
              { icon: <Sparkles className="h-4 w-4" />, text: "Éveil athlétique & motricité" },
              { icon: <Footprints className="h-4 w-4" />, text: "Maîtrise technique pure" },
              { icon: <Smile className="h-4 w-4" />, text: "Discipline & plaisir du jeu" },
            ]}
            cta="Réserver une place à l'École"
            accent="emerald"
          />
        </Reveal>

        {/* Académie */}
        <Reveal delay={160}>
          <ProgramCard
            image={academieImg}
            recommended={academyEligible}
            recommendedLabel={`Accessible dès ${info.label}`}
            available={academyEligible}
            badge={
              academyEligible
                ? "Sélection ouverte · sur détection"
                : `Se débloque dès U${ACADEMY_MIN_U}`
            }
            badgeIcon={
              academyEligible ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <Lock className="h-3.5 w-3.5" />
              )
            }
            badgeTone={
              academyEligible
                ? "border-gold/40 bg-gold/15 text-gold"
                : "border-white/20 bg-black/70 text-white"
            }
            title="Académie de Performance"
            tagline="La voie du très haut niveau, sur détection et test technique."
            frequency={acadSched ? acadSched.frequency : CLUB.programs.academie.frequency}
            schedule={
              acadSched
                ? acadSched.lines
                : [
                    `L'Académie se vise à partir de U${ACADEMY_MIN_U}. Horaires précis dévoilés à la détection.`,
                  ]
            }
            matchInfo={
              acadSched ? acadSched.matchInfo : CLUB.programs.academie.matchInfo
            }
            ramadanNote={acadSched ? RAMADAN_NOTE : undefined}
            note={
              academyEligible
                ? `À ${info.label}, votre enfant peut passer la détection dès maintenant.`
                : `L'Académie se vise dès U${ACADEMY_MIN_U}. En attendant, l'École forge les fondations du futur champion.`
            }
            noteTone={academyEligible ? "text-gold" : "text-zinc-400"}
            focus={[
              { icon: <Brain className="h-4 w-4" />, text: "Tactique de niveau professionnel" },
              { icon: <Dumbbell className="h-4 w-4" />, text: "Préparation physique avancée" },
              { icon: <Globe2 className="h-4 w-4" />, text: "Mental de gagnant & visibilité" },
            ]}
            cta={academyEligible ? "Passer la détection" : "Découvrir l'Académie"}
            accent="gold"
            dimmed={!academyEligible}
          />
        </Reveal>
      </div>

      <p className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-center text-sm text-zinc-500">
        <Trophy className="h-4 w-4 shrink-0 text-gold" />
        Aucun prix en ligne. Réservez un test, le secrétariat vous guide
        personnellement.
      </p>
    </section>
  );
}

/* ---------- Carte programme ---------- */

interface ProgramCardProps {
  image: string;
  recommended: boolean;
  recommendedLabel: string;
  available: boolean;
  badge: string;
  badgeIcon: React.ReactNode;
  badgeTone: string;
  title: string;
  tagline: string;
  frequency: string;
  schedule: readonly string[];
  matchInfo: string;
  ramadanNote?: string;
  note: string;
  noteTone: string;
  focus: { icon: React.ReactNode; text: string }[];
  cta: string;
  accent: "emerald" | "gold";
  dimmed?: boolean;
}

function ProgramCard({
  image,
  recommended,
  recommendedLabel,
  badge,
  badgeIcon,
  badgeTone,
  title,
  tagline,
  frequency,
  schedule,
  matchInfo,
  ramadanNote,
  note,
  noteTone,
  focus,
  cta,
  accent,
  dimmed,
}: ProgramCardProps) {
  const ring = accent === "gold" ? "ring-gold/35" : "ring-emerald-glow/35";
  const glow =
    accent === "gold"
      ? "shadow-[0_0_45px_-20px_rgba(255,204,0,0.35)]"
      : "shadow-[0_0_45px_-20px_rgba(0,166,81,0.35)]";

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#070b11] transition-all duration-300 ${
        recommended ? `ring-1 ${ring} ${glow}` : ""
      } ${dimmed ? "opacity-95" : ""}`}
    >
      {/* Ruban recommandé */}
      {recommended && (
        <span
          className={`absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[#05070a] ${
            accent === "gold" ? "bg-gold" : "bg-emerald-glow"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          {recommendedLabel}
        </span>
      )}

      {/* Bandeau image */}
      <div className="relative h-40 overflow-hidden sm:h-48">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b11] via-[#070b11]/30 to-transparent" />
        <span
          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide backdrop-blur-md ${badgeTone}`}
        >
          {badgeIcon}
          {badge}
        </span>
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <h3 className="font-display text-2xl uppercase leading-none text-white sm:text-[1.7rem]">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">{tagline}</p>

        {/* Points forts */}
        <ul className="mt-5 space-y-2.5">
          {focus.map((f) => (
            <li
              key={f.text}
              className="flex items-center gap-3 text-sm text-zinc-200"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/5 text-zinc-300 ring-1 ring-white/10">
                {f.icon}
              </span>
              {f.text}
            </li>
          ))}
        </ul>

        {/* Rythme & matchs — ligne fine, sans boîte */}
        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-zinc-200">
            <Clock className="h-4 w-4 text-gold/80" />
            {frequency}
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {schedule.map((s) => (
              <li
                key={s}
                className="flex items-start gap-2 text-sm text-zinc-300"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/25" />
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-start gap-2 text-sm text-zinc-300">
            <Swords className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
            {matchInfo}
          </p>
          {ramadanNote && (
            <p className="mt-3 flex items-start gap-2 rounded-lg border border-gold/20 bg-gold/[0.06] px-3 py-2 text-xs leading-snug text-gold/90">
              <Moon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {ramadanNote}
            </p>
          )}
        </div>

        {/* pousse la note + le bouton vers le bas, en bloc solidaire */}
        <div className="mt-auto" />

        <p className={`pt-5 text-sm font-semibold leading-snug ${noteTone}`}>
          {note}
        </p>

        <a
          href="#admission"
          className={`group/btn mt-5 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide transition ${
            accent === "gold"
              ? "bg-gold text-[#05070a] hover:shadow-gold-glow"
              : "bg-emerald text-white hover:shadow-emerald-glow"
          }`}
        >
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
