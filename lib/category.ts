import { getSeason } from "./clubData";

// Le calcul des catégories est DYNAMIQUE (basé sur la saison en cours) :
// catégorie U = (année de fin de saison) − (année de naissance).
// Chaque catégorie s'entraîne avec sa catégorie voisine (groupe de 2 années,
// ex. U12–U13), comme dans le football de formation.

export interface CategoryInfo {
  /** Numéro précis, ex. 13 pour "U13". */
  uNumber: number;
  /** Libellé précis, ex. "U13". */
  label: string;
  /** Groupe d'entraînement (2 années), ex. "U12 – U13". */
  group: string;
  /** True si l'âge permet de viser l'Académie (sur détection). */
  academyEligible: boolean;
}

const MIN_U = 4;
// Dernière catégorie recrutée : U19. Au-delà de 18 ans révolus (catégorie
// supérieure à U19), le club ne sélectionne plus : pas d'inscription possible.
const MAX_U = 19;
const ACADEMY_MIN_U = 9;

/** Catégorie U "brute" (non plafonnée) à partir d'une date de naissance. */
export function rawUFromBirthdate(birthdate: string): number | null {
  if (!birthdate) return null;
  const birthYear = new Date(birthdate).getFullYear();
  if (Number.isNaN(birthYear)) return null;
  return getSeason().endYear - birthYear;
}

/** True si la personne est trop âgée pour s'inscrire (au-delà de U19). */
export function isTooOldToRegister(birthdate: string): boolean {
  const raw = rawUFromBirthdate(birthdate);
  return raw !== null && raw > MAX_U;
}

/** Catégorie à partir d'une date de naissance ("YYYY-MM-DD"). */
export function categoryFromBirthdate(birthdate: string): CategoryInfo | null {
  const raw = rawUFromBirthdate(birthdate);
  if (raw === null) return null;
  return buildCategory(clamp(raw, MIN_U, MAX_U));
}

/** Catégorie à partir d'un âge brut (slider du simulateur). */
export function categoryFromAge(age: number): CategoryInfo {
  return buildCategory(clamp(age, MIN_U, MAX_U));
}

function buildCategory(u: number): CategoryInfo {
  return {
    uNumber: u,
    label: `U${u}`,
    group: groupLabel(u),
    academyEligible: u >= ACADEMY_MIN_U,
  };
}

/** Forme le groupe de 2 années (paire basse, ex. U12–U13). */
function groupLabel(u: number): string {
  let low = u % 2 === 0 ? u : u - 1;
  if (low < MIN_U + 1) low = MIN_U + 1; // garde un plancher propre
  return `U${low} – U${low + 1}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
