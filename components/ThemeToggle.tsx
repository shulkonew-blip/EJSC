"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/** Bouton de bascule clair/sombre. Dark par défaut, choix mémorisé. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    const root = document.documentElement;
    root.classList.toggle("light", next);
    try {
      localStorage.setItem("ejsc-theme", next ? "light" : "dark");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={light ? "Activer le mode sombre" : "Activer le mode clair"}
      title={light ? "Mode sombre" : "Mode clair"}
      className={`grid h-11 w-11 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition hover:text-gold ${className}`}
    >
      {/* Évite l'écart d'hydratation : on rend une icône neutre avant montage */}
      {mounted && light ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}
