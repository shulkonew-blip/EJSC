// ╔══════════════════════════════════════════════════════════════════╗
// ║   HORAIRES PAR CATÉGORIE — SOURCE UNIQUE                            ║
// ║   Utilisé par le simulateur (FutureSimulator) ET par le chatbot    ║
// ║   (agentKnowledge). Si tu modifies un horaire ici, les deux se      ║
// ║   mettent à jour ensemble. Données réelles saison 2026/2027.        ║
// ╚══════════════════════════════════════════════════════════════════╝

/** Mention obligatoire : pendant le Ramadan les horaires peuvent changer. */
export const RAMADAN_NOTE =
  "Horaires susceptibles d'être modifiés pendant le mois de Ramadan.";

/** Dernière catégorie recrutée. Au-delà (plus de 18 ans), pas d'inscription. */
export const MAX_RECRUIT_U = 19;

export interface CategorySchedule {
  /** Rythme résumé, ex. "2 séances / semaine". */
  frequency: string;
  /** Lignes d'horaires prêtes à afficher. */
  lines: string[];
  /** Format des matchs. */
  matchInfo: string;
}

// ─────────────────────────────────────────────────────────────────────
//  ÉCOLE (U5 → U16) — matchs internes
// ─────────────────────────────────────────────────────────────────────
const ECOLE_MATCH = "Matchs internes, entre les équipes de l'Étoile";

// U5 / U7 / U9 partagent les mêmes créneaux.
const ECOLE_U5_U9: CategorySchedule = {
  frequency: "2 séances / semaine",
  lines: [
    "Mercredi (entraînement) — Groupe 1 : 14h30–16h00 · Groupe 2 : 16h00–17h30",
    "Samedi (match) — Groupe 1 : 10h30–11h30 · Groupe 2 : 09h30–10h30",
    "Autre créneau — Mardi (entraînement) & Vendredi (match) : 17h00–18h30",
  ],
  matchInfo: ECOLE_MATCH,
};

const ECOLE_U11: CategorySchedule = {
  frequency: "2 séances / semaine",
  lines: [
    "Mercredi (entraînement) — Groupe 1 : 14h30–16h00 · Groupe 2 : 16h00–17h30",
    "Samedi (match) — Groupe 1 : 11h30–12h30 · Groupe 2 : 10h30–11h30",
    "Autre créneau — Mardi (entraînement) & Vendredi (match) : 17h00–18h30",
  ],
  matchInfo: ECOLE_MATCH,
};

const ECOLE_U13: CategorySchedule = {
  frequency: "2 séances / semaine",
  lines: [
    "Mercredi (entraînement) — Groupe 1 : 14h30–16h00 · Groupe 2 : 16h00–17h30",
    "Samedi (match) — Groupes 1 & 2 : 11h30–12h30",
  ],
  matchInfo: ECOLE_MATCH,
};

const ECOLE_U16: CategorySchedule = {
  frequency: "2 séances / semaine",
  lines: [
    "Mercredi (entraînement) : 17h30–19h00",
    "Samedi (match) : 12h30–13h30",
  ],
  matchInfo: ECOLE_MATCH,
};

// Bandes d'âge École : on prend la 1re bande dont `upTo` couvre la catégorie U.
const ECOLE_BANDS: { upTo: number; label: string; schedule: CategorySchedule }[] =
  [
    { upTo: 5, label: "U5", schedule: ECOLE_U5_U9 },
    { upTo: 7, label: "U7", schedule: ECOLE_U5_U9 },
    { upTo: 9, label: "U9", schedule: ECOLE_U5_U9 },
    { upTo: 11, label: "U11", schedule: ECOLE_U11 },
    { upTo: 13, label: "U13", schedule: ECOLE_U13 },
    { upTo: 16, label: "U16", schedule: ECOLE_U16 },
  ];

// ─────────────────────────────────────────────────────────────────────
//  ACADÉMIE (U9 → U19, sur détection) — matchs officiels
// ─────────────────────────────────────────────────────────────────────
const ACAD_MATCH = "Matchs officiels contre des équipes extérieures";

const ACAD_U9_U11: CategorySchedule = {
  frequency: "3 séances / semaine",
  lines: [
    "Lundi & Jeudi (entraînement) : 17h30–19h00",
    "Samedi (match) : 14h00–15h30",
  ],
  matchInfo: ACAD_MATCH,
};

const ACAD_U13: CategorySchedule = {
  frequency: "3 séances / semaine",
  lines: [
    "Lundi & Jeudi (entraînement) : 19h00–20h30",
    "Samedi (match) : 15h30–17h00",
  ],
  matchInfo: ACAD_MATCH,
};

const ACAD_U15: CategorySchedule = {
  frequency: "2 entraînements / semaine + match",
  lines: [
    "Mardi & Vendredi (entraînement) : 18h30–20h00",
    "Match : selon la programmation",
  ],
  matchInfo: ACAD_MATCH,
};

const ACAD_U17: CategorySchedule = {
  frequency: "2 entraînements / semaine + match",
  lines: [
    "Mardi & Vendredi (entraînement) : 19h45–21h15",
    "Match : selon la programmation",
  ],
  matchInfo: ACAD_MATCH,
};

const ACAD_U19: CategorySchedule = {
  frequency: "2 entraînements / semaine + match",
  lines: [
    "Lundi & Jeudi (entraînement) : 20h30–22h00",
    "Match : selon la programmation",
  ],
  matchInfo: ACAD_MATCH,
};

const ACADEMIE_BANDS: { upTo: number; label: string; schedule: CategorySchedule }[] =
  [
    { upTo: 9, label: "U9", schedule: ACAD_U9_U11 },
    { upTo: 11, label: "U11", schedule: ACAD_U9_U11 },
    { upTo: 13, label: "U13", schedule: ACAD_U13 },
    { upTo: 15, label: "U15", schedule: ACAD_U15 },
    { upTo: 17, label: "U17", schedule: ACAD_U17 },
    { upTo: 19, label: "U19", schedule: ACAD_U19 },
  ];

const ACADEMY_MIN_U = 9;
const ECOLE_MAX_U = 16;

/** Horaires École pour une catégorie U. `null` si hors École (U > 16). */
export function ecoleScheduleFor(u: number): CategorySchedule | null {
  if (u > ECOLE_MAX_U) return null;
  const band = ECOLE_BANDS.find((b) => u <= b.upTo) ?? ECOLE_BANDS[0];
  return band.schedule;
}

/** Horaires Académie pour une catégorie U. `null` si trop jeune ou trop âgé. */
export function academieScheduleFor(u: number): CategorySchedule | null {
  if (u < ACADEMY_MIN_U || u > MAX_RECRUIT_U) return null;
  const band = ACADEMIE_BANDS.find((b) => u <= b.upTo);
  return band ? band.schedule : null;
}

// ─────────────────────────────────────────────────────────────────────
//  Résumé texte pour le chatbot (généré depuis les mêmes données).
// ─────────────────────────────────────────────────────────────────────
function summarizeBands(
  bands: { upTo: number; label: string; schedule: CategorySchedule }[]
): string {
  // Fusionne les bandes consécutives qui partagent exactement le même créneau.
  const out: string[] = [];
  let i = 0;
  while (i < bands.length) {
    const start = bands[i];
    let j = i;
    while (j + 1 < bands.length && bands[j + 1].schedule === start.schedule) j++;
    const range =
      i === j ? start.label : `${start.label} à ${bands[j].label}`;
    out.push(`  - ${range} : ${start.schedule.lines.join(" ; ")}.`);
    i = j + 1;
  }
  return out.join("\n");
}

/** Bloc d'horaires détaillé, injecté dans le cerveau du chatbot. */
export function scheduleSummaryText(): string {
  return [
    `ÉCOLE (catégories U5 à U${ECOLE_MAX_U}) :`,
    summarizeBands(ECOLE_BANDS),
    `ACADÉMIE (catégories U${ACADEMY_MIN_U} à U${MAX_RECRUIT_U}, sur détection) :`,
    summarizeBands(ACADEMIE_BANDS),
    `⚠️ ${RAMADAN_NOTE}`,
  ].join("\n");
}
