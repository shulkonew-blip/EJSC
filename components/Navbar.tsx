"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, Star } from "lucide-react";
import { getSeason } from "@/lib/clubData";
import ThemeToggle from "./ThemeToggle";

const RECRUIT = getSeason().recruitmentLabel;

const LINKS = [
  { href: "#simulateur", label: "Programmes" },
  { href: "#staff", label: "Le Staff" },
  { href: "#galerie", label: "Le Club" },
  { href: "#admission", label: "Admission" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
      className={`keep-dark fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#05070a]/85 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative grid h-11 w-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition group-hover:ring-gold/50">
            <Image
              src="/images/logo.png"
              alt="Logo EJSC"
              width={34}
              height={34}
              className="h-8 w-8 object-contain"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-wide text-white">
              EJSC
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/80">
              Depuis 2016
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-semibold uppercase tracking-wider text-zinc-300 transition hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#admission"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-bold text-gold transition hover:bg-gold hover:text-[#05070a] hover:shadow-gold-glow"
          >
            <Star className="h-4 w-4" />
            Test d&apos;admission
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      </header>

      {/* Voile cliquable (ferme le menu) */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-[71] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer latéral droit */}
      <aside
        className={`keep-dark fixed right-0 top-0 z-[72] flex h-full w-[80%] max-w-xs flex-col border-l border-white/10 bg-[#070b11] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* En-tête du drawer */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 h-[72px]">
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-wide text-white">
              EJSC
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/80">
              Depuis 2016
            </span>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white"
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 font-display text-2xl tracking-wide text-white transition hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#admission"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-base font-bold text-[#05070a] shadow-gold-glow"
          >
            <Star className="h-5 w-5" />
            Réserver le test {RECRUIT}
          </a>
        </div>
      </aside>
    </>
  );
}
