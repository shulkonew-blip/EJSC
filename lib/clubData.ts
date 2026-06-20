// ╔══════════════════════════════════════════════════════════════════╗
// ║   SOURCE UNIQUE DES INFOS DU CLUB                                  ║
// ║   Édite UNIQUEMENT ce fichier : le site ET le chatbot se mettent   ║
// ║   à jour ensemble. Tout ce qui est ⚠️ PLACEHOLDER est à remplacer. ║
// ╚══════════════════════════════════════════════════════════════════╝

export interface PhoneEntry {
  display: string; // affiché, ex. "06 79 59 67 47"
  tel: string; // lien, ex. "+212679596747"
}

export interface ProgramData {
  frequency: string; // ex. "2 séances / semaine" (✅ vérifié)
  schedule: string[]; // jours & heures — ⚠️ PLACEHOLDER
  matchInfo: string; // format des matchs (✅ vérifié)
  price: string; // ⚠️ PLACEHOLDER
  priceNote?: string; // ⚠️ PLACEHOLDER
}

export const CLUB = {
  name: "Étoile de la Jeunesse Sportive de Casablanca",
  short: "EJSC",
  foundedYear: 1942,

  // —— Coordonnées (✅ vérifiées) ——
  address: "10 Bd Omar Al Khayam, Étg RC Club Étoile H/H, Casablanca 20200",
  mapsQuery: "10 Bd Omar Al Khayam Club Etoile Casablanca",
  email: "info@etoileclub.ma",
  phonesFixe: [
    { display: "06 79 59 67 47", tel: "+212679596747" },
    { display: "06 69 01 94 91", tel: "+212669019491" },
  ] as PhoneEntry[],
  phonesMobile: [
    { display: "06 66 99 91 64", tel: "+212666999164" },
    { display: "06 66 99 91 53", tel: "+212666999153" },
  ] as PhoneEntry[],
  whatsapp: "212666999164", // pour les liens wa.me

  // —— Réseaux sociaux ⚠️ PLACEHOLDER ——
  instagramFollowers: "11K", // ⚠️ vrai chiffre
  social: {
    instagram: "https://www.instagram.com/etoilejeunesse/", // ✅
    facebook: "https://web.facebook.com/etoilecasa/", // ✅
  },

  // —— Tests d'admission ⚠️ PLACEHOLDER ——
  testInfo: "Tests d'admission sur rendez-vous, le secrétariat fixe la date.",

  // —— FRISE HISTORIQUE ⚠️ PLACEHOLDER (sauf 1942) ——
  // Remplace les années/titres par les vrais moments forts du club.
  milestones: [
    { year: "1942", title: "La naissance d'une légende", text: "Fondation de l'Étoile au cœur de Casablanca." }, // ✅ vérifié
    { year: "1959", title: "Champions du Maroc", text: "L'Étoile remporte la Botola, sommet de son histoire." },
    { year: "2016", title: "L'école des talents", text: "Création de l'académie et de l'école avec une nouvelle philosophie de formation." },
    { year: "Aujourd'hui", title: "Une communauté en feu", text: "Des centaines de jeunes formés et une famille de supporters fidèles." }, // ⚠️ ajuste le chiffre
  ],

  // —— Catégorie d'âge la plus jeune où l'Académie est accessible ——
  academyMinU: 9, // ✅ ajuste si besoin

  // —— PROGRAMMES (✅ fréquence & matchs vérifiés / ⚠️ horaires & tarifs à remplir) ——
  programs: {
    ecole: {
      frequency: "2 séances / semaine",
      schedule: ["Mardi : 17h00 – 18h30", "Samedi : 10h00 – 11h30"], // ⚠️ PLACEHOLDER
      matchInfo: "Matchs internes, entre les équipes de l'Étoile",
      price: "Sur demande", // (non affiché sur le site)
      priceNote: "par trimestre",
    } as ProgramData,
    academie: {
      frequency: "3 séances / semaine",
      schedule: [
        "Lundi : 18h00 – 20h00",
        "Mercredi : 18h00 – 20h00",
        "Vendredi : 18h00 – 20h00",
      ], // ⚠️ PLACEHOLDER
      matchInfo: "Matchs officiels contre des équipes extérieures",
      price: "Sur demande", // (non affiché sur le site)
      priceNote: "par trimestre",
    } as ProgramData,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────
//  SAISON DYNAMIQUE — calculée à partir de la date du jour.
//  Le site ne se périmera jamais : chaque été, la saison avance seule.
// ─────────────────────────────────────────────────────────────────────
export interface SeasonInfo {
  startYear: number; // ex. 2026
  endYear: number; // ex. 2027  (référence pour le calcul des catégories U)
  currentLabel: string; // ex. "2026 / 2027"  (saison en cours)
  recruitmentLabel: string; // ex. "2027 / 2028"  (saison de recrutement à venir)
}

export function getSeason(reference: Date = new Date()): SeasonInfo {
  const y = reference.getFullYear();
  const m = reference.getMonth(); // 0 = janvier
  // Une saison de foot démarre l'été (cutoff : juin). À partir de juin,
  // on bascule sur la nouvelle saison.
  const startYear = m >= 5 ? y : y - 1;
  const endYear = startYear + 1;
  return {
    startYear,
    endYear,
    currentLabel: `${startYear} / ${endYear}`,
    recruitmentLabel: `${endYear} / ${endYear + 1}`,
  };
}
