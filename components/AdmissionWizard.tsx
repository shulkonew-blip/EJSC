"use client";

import { useMemo, useState } from "react";
import {
  User,
  Users,
  Target,
  Check,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  CalendarDays,
  Trophy,
  Heart,
  Sparkles,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { categoryFromBirthdate, isTooOldToRegister } from "@/lib/category";
import { CLUB, getSeason } from "@/lib/clubData";
import Confetti from "./Confetti";
import Reveal from "./Reveal";

const season = getSeason();

type Goal = "loisir" | "competition";

interface FormState {
  firstName: string;
  lastName: string;
  birthdate: string;
  parentName: string;
  phone: string;
  email: string;
  goal: Goal | "";
}

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  birthdate: "",
  parentName: "",
  phone: "",
  email: "",
  goal: "",
};

const STEPS = [
  { icon: <User className="h-4 w-4" />, label: "Le Joueur" },
  { icon: <Users className="h-4 w-4" />, label: "Le Tuteur" },
  { icon: <Target className="h-4 w-4" />, label: "L'Objectif" },
];

export default function AdmissionWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const category = useMemo(
    () => categoryFromBirthdate(form.birthdate),
    [form.birthdate]
  );
  // Recrutement jusqu'à la catégorie U19 (18 ans max) : au-delà, blocage.
  const tooOld = useMemo(
    () => isTooOldToRegister(form.birthdate),
    [form.birthdate]
  );

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const stepValid = useMemo(() => {
    if (step === 0)
      return (
        form.firstName.trim().length > 1 &&
        form.lastName.trim().length > 1 &&
        !!form.birthdate &&
        !tooOld
      );
    if (step === 1)
      return (
        form.parentName.trim().length > 1 &&
        form.phone.replace(/\D/g, "").length >= 8
      );
    if (step === 2) return form.goal !== "";
    return false;
  }, [step, form, tooOld]);

  const next = () => {
    if (!stepValid) {
      setTouched(true);
      return;
    }
    setTouched(false);
    if (step < 2) setStep((s) => s + 1);
    else handleSubmit();
  };

  const prev = () => {
    setTouched(false);
    setStep((s) => Math.max(0, s - 1));
  };

  const handleSubmit = () => {
    const msg = [
      `🏁 *Nouvelle Demande d'Admission — ${CLUB.short}*`,
      ``,
      `👤 *Joueur* : ${form.firstName} ${form.lastName}`,
      `📅 *Né(e) le* : ${form.birthdate}${category ? ` (${category.label})` : ""}`,
      `👨 *Parent* : ${form.parentName}`,
      `📞 *Téléphone* : ${form.phone}`,
      ...(form.email ? [`📧 *Email* : ${form.email}`] : []),
      `🎯 *Objectif* : ${form.goal === "competition" ? "Compétition & Académie" : "École & Progression"}`,
      ``,
      `💚 Envoyé depuis le site ${CLUB.short} — ${season.recruitmentLabel}`,
    ].join("\n");

    window.open(
      `https://wa.me/${CLUB.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setSubmitted(true);
  };

  const progress = submitted ? 100 : ((step + 1) / 3) * 100;

  return (
    <section
      id="admission"
      className="relative mx-auto max-w-5xl scroll-mt-20 px-5 py-14 sm:px-8 sm:py-28"
    >
      {/* lueur de fond */}
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/15 blur-[130px]" />

      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          <Sparkles className="h-3.5 w-3.5" /> Tunnel d&apos;admission ·{" "}
          {season.recruitmentLabel}
        </span>
        <h2 className="mt-6 font-display text-[clamp(2rem,6vw,3.75rem)] uppercase leading-[0.95] text-white">
          Le secrétariat
          <span className="text-gradient-gold"> de l&apos;élite</span>
        </h2>
        <p className="mt-4 text-zinc-400">
          Trois étapes, deux minutes. Notre secrétariat vous rappelle sous 24h sur
          WhatsApp pour planifier le test de votre enfant.
        </p>
      </Reveal>

      <Reveal
        delay={120}
        className="mt-8 sm:mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-2xl"
      >
        {/* Barre de progression */}
        <div className="h-1.5 w-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-emerald-glow to-gold transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {submitted ? (
          <SuccessScreen form={form} category={category?.label} />
        ) : (
          <div className="p-6 sm:p-10">
            {/* Stepper */}
            <ol className="mb-9 flex items-center gap-2 sm:gap-4">
              {STEPS.map((s, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <li key={s.label} className="flex flex-1 items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition ${
                          active
                            ? "border-gold bg-gold text-[#05070a]"
                            : done
                            ? "border-emerald-glow bg-emerald text-white"
                            : "border-white/15 bg-white/5 text-zinc-400"
                        }`}
                      >
                        {done ? <Check className="h-4 w-4" /> : s.icon}
                      </span>
                      <span
                        className={`hidden text-sm font-bold uppercase tracking-wide sm:block ${
                          active ? "text-white" : "text-zinc-500"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <span
                        className={`h-px flex-1 ${
                          done ? "bg-emerald-glow" : "bg-white/10"
                        }`}
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            {/* Étape 1 — Le Joueur */}
            {step === 0 && (
              <div className="animate-fade-in space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Prénom du joueur"
                    error={touched && form.firstName.trim().length <= 1}
                  >
                    <input
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      placeholder="Younes"
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label="Nom du joueur"
                    error={touched && form.lastName.trim().length <= 1}
                  >
                    <input
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      placeholder="El Amrani"
                      className={inputCls}
                    />
                  </Field>
                </div>
                <Field
                  label="Date de naissance"
                  icon={<CalendarDays className="h-4 w-4" />}
                  error={touched && !form.birthdate}
                >
                  <input
                    type="date"
                    value={form.birthdate}
                    max={`${season.endYear - 5}-12-31`}
                    min={`${season.endYear - 19}-01-01`}
                    onChange={(e) => set("birthdate", e.target.value)}
                    className={`${inputCls} [color-scheme:dark]`}
                  />
                </Field>

                {/* Affichage dynamique de la catégorie */}
                <div
                  className={`flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${
                    tooOld
                      ? "border-red-500/50 bg-red-500/[0.08]"
                      : category
                      ? "border-gold/40 bg-gold/[0.08]"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl font-display text-2xl ${
                      tooOld
                        ? "bg-red-500/20 text-red-300"
                        : category
                        ? "bg-gold text-[#05070a]"
                        : "bg-white/5 text-zinc-500"
                    }`}
                  >
                    {tooOld ? "19+" : category ? category.label : "U?"}
                  </span>
                  <div className="text-sm">
                    {tooOld ? (
                      <>
                        <p className="font-bold text-white">
                          Catégorie au-delà de U19
                        </p>
                        <p className="text-red-300/90">
                          Le recrutement s&apos;arrête à la catégorie U19 (18 ans
                          max). Au-delà, l&apos;inscription n&apos;est pas
                          possible.
                        </p>
                      </>
                    ) : category ? (
                      <>
                        <p className="font-bold text-white">
                          Catégorie {category.label} · saison {season.currentLabel}
                        </p>
                        <p className="text-zinc-400">
                          S&apos;entraîne avec le groupe {category.group}
                          {category.academyEligible
                            ? " · éligible Académie sur test"
                            : ""}
                        </p>
                      </>
                    ) : (
                      <p className="text-zinc-400">
                        Renseignez la date de naissance : la catégorie est
                        calculée automatiquement.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Étape 2 — Le Tuteur */}
            {step === 1 && (
              <div className="animate-fade-in space-y-5">
                <Field
                  label="Nom complet du parent / tuteur"
                  error={touched && form.parentName.trim().length <= 1}
                >
                  <input
                    value={form.parentName}
                    onChange={(e) => set("parentName", e.target.value)}
                    placeholder="Karim El Amrani"
                    className={inputCls}
                  />
                </Field>
                <Field
                  label="Téléphone / WhatsApp"
                  icon={<Phone className="h-4 w-4" />}
                  required
                  error={touched && form.phone.replace(/\D/g, "").length < 8}
                >
                  <input
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+212 6 00 00 00 00"
                    className={inputCls}
                  />
                </Field>
                <Field label="Email (optionnel)" icon={<Mail className="h-4 w-4" />}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="karim@email.com"
                    className={inputCls}
                  />
                </Field>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <ShieldCheck className="h-4 w-4 text-emerald-glow" />
                  Vos données restent confidentielles et ne servent qu&apos;à
                  planifier le test.
                </div>
              </div>
            )}

            {/* Étape 3 — Objectif */}
            {step === 2 && (
              <div className="animate-fade-in space-y-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Quel est l&apos;objectif pour votre enfant ?
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <GoalCard
                    active={form.goal === "loisir"}
                    onClick={() => set("goal", "loisir")}
                    icon={<Heart className="h-6 w-6" />}
                    title="École & Progression"
                    desc="Plaisir du jeu, épanouissement, progression technique dans un cadre structuré."
                    tone="emerald"
                  />
                  <GoalCard
                    active={form.goal === "competition"}
                    onClick={() => set("goal", "competition")}
                    icon={<Trophy className="h-6 w-6" />}
                    title="Compétition & Académie"
                    desc="Haute performance, sélection, visibilité et ambition de très haut niveau."
                    tone="gold"
                  />
                </div>
                {touched && form.goal === "" && (
                  <p className="text-sm font-semibold text-orange-400">
                    Sélectionnez un objectif pour continuer.
                  </p>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-9 flex items-center justify-between gap-4">
              <button
                onClick={prev}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300 transition enabled:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>

              {step < 2 ? (
                <button
                  onClick={next}
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#05070a] transition hover:bg-gold hover:shadow-gold-glow"
                >
                  Continuer
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  onClick={next}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gold px-6 py-4 text-sm font-extrabold uppercase tracking-wide text-[#05070a] shadow-gold-glow animate-pulse-gold sm:px-8"
                >
                  <span className="relative z-10 hidden sm:inline">
                    Déposer ma demande & recevoir la brochure
                  </span>
                  <span className="relative z-10 sm:hidden">
                    Déposer ma demande
                  </span>
                  <Sparkles className="relative z-10 h-4 w-4" />
                  <span className="absolute inset-0 -translate-x-full">
                    <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </Reveal>

      {!submitted && (
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-zinc-500">
          <MessageCircle className="h-4 w-4 text-emerald-glow" />
          Réponse garantie sous 24h · Places limitées pour la saison{" "}
          {season.recruitmentLabel}
        </p>
      )}
    </section>
  );
}

/* ---------- Sous-composants ---------- */

const inputCls =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white placeholder:text-zinc-600 outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/20";

function Field({
  label,
  children,
  icon,
  required,
  error,
}: {
  label: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  required?: boolean;
  error?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-300">
        {icon && <span className="text-gold">{icon}</span>}
        {label}
        {required && <span className="text-gold">*</span>}
      </span>
      <div className={error ? "rounded-xl ring-2 ring-orange-500/60" : ""}>
        {children}
      </div>
    </label>
  );
}

function GoalCard({
  active,
  onClick,
  icon,
  title,
  desc,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: "emerald" | "gold";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition ${
        active
          ? tone === "gold"
            ? "border-gold bg-gold/10 shadow-gold-glow"
            : "border-emerald-glow bg-emerald/15 shadow-emerald-glow"
          : "border-white/10 bg-white/[0.03] hover:border-white/25"
      }`}
    >
      <span
        className={`grid h-12 w-12 place-items-center rounded-xl transition ${
          active
            ? tone === "gold"
              ? "bg-gold text-[#05070a]"
              : "bg-emerald text-white"
            : "bg-white/5 text-gold"
        }`}
      >
        {icon}
      </span>
      <h4 className="mt-4 font-display text-xl uppercase tracking-wide text-white">
        {title}
      </h4>
      <p className="mt-1.5 text-sm leading-snug text-zinc-400">{desc}</p>
      <span
        className={`absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full border transition ${
          active
            ? "border-gold bg-gold text-[#05070a]"
            : "border-white/20 text-transparent"
        }`}
      >
        <Check className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}

function SuccessScreen({
  form,
  category,
}: {
  form: FormState;
  category?: string;
}) {
  return (
    <div className="relative animate-fade-in px-6 py-16 text-center sm:px-12 sm:py-20">
      <Confetti />
      <div className="relative z-10 mx-auto max-w-lg">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-emerald to-[#0a3d22] text-gold shadow-emerald-glow ring-1 ring-white/10">
          <Check className="h-10 w-10" strokeWidth={3} />
        </span>
        <h3 className="mt-7 font-display text-[clamp(1.8rem,5vw,2.8rem)] uppercase leading-none text-white">
          Demande enregistrée
          <br />
          <span className="text-gradient-gold">avec priorité</span>
        </h3>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-zinc-300">
          Bravo{form.parentName ? ` ${form.parentName.split(" ")[0]}` : ""} ! La
          demande pour{" "}
          <span className="font-bold text-white">
            {form.firstName || "votre enfant"}
            {category ? ` (${category})` : ""}
          </span>{" "}
          est bien reçue. Notre secrétariat vous contactera directement sur{" "}
          <span className="font-bold text-emerald-glow">WhatsApp sous 24 heures</span>{" "}
          pour planifier le test.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href={`https://wa.me/${CLUB.whatsapp}?text=${encodeURIComponent(
              `Bonjour, je viens de déposer une demande d'admission à l'Étoile pour ${
                form.firstName || "mon enfant"
              }${category ? ` (${category})` : ""}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-2xl bg-emerald px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:shadow-emerald-glow"
          >
            <MessageCircle className="h-5 w-5" />
            Écrire au club sur WhatsApp
          </a>
          <p className="text-xs text-zinc-500">
            Ou gardez votre téléphone à portée de main 📱
          </p>
        </div>
      </div>
    </div>
  );
}
