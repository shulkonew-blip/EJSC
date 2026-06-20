"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, MessageCircle, Clock } from "lucide-react";
import { CLUB } from "@/lib/clubData";
import Reveal from "./Reveal";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831.2018287867468!2d-7.651028071434572!3d33.55838229832724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda62d2b6959c7ff%3A0x903b533db8c6986a!2sClub%20Etoile%20De%20La%20Jeunesse%20Sportive%2C%20Casablanca!5e0!3m2!1sfr!2sma!4v1780832133749!5m2!1sfr!2sma";

export default function LocationMap() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  // On ne monte l'iframe que lorsqu'elle approche de l'écran -> aucun coût au chargement.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    CLUB.mapsQuery
  )}`;

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          <MapPin className="h-3.5 w-3.5" /> Venez nous rencontrer
        </span>
        <h2 className="mt-6 font-display text-[clamp(2rem,6vw,3.75rem)] uppercase leading-[0.95] text-white">
          Le terrain où naissent
          <span className="text-gradient-gold"> les champions</span>
        </h2>
      </Reveal>

      <Reveal delay={120} className="mt-8 sm:mt-12">
        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] lg:grid-cols-[1fr_1.4fr]">
          {/* Infos */}
          <div className="flex flex-col justify-center gap-6 p-7 text-center sm:p-10 lg:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start lg:items-start">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald to-[#0a3d22] text-gold ring-1 ring-white/10">
                <MapPin className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Adresse
                </p>
                <p className="mt-1 font-semibold text-white">{CLUB.address}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start lg:items-start">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/5 text-gold ring-1 ring-white/10">
                <Clock className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Accueil
                </p>
                <p className="mt-1 text-sm text-zinc-300">{CLUB.testInfo}</p>
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#05070a] transition hover:shadow-gold-glow"
              >
                <Navigation className="h-4 w-4" />
                Itinéraire
              </a>
              <a
                href={`https://wa.me/${CLUB.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-glow/40 bg-emerald/15 px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-emerald-glow transition hover:bg-emerald-glow hover:text-[#05070a]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Carte */}
          <div
            ref={ref}
            className="relative min-h-[300px] bg-[#0a0e15] lg:min-h-[420px]"
          >
            {show ? (
              <iframe
                src={MAP_EMBED}
                title="Localisation de l'Étoile de la Jeunesse Sportive de Casablanca"
                className="absolute inset-0 h-full w-full grayscale-[0.2] contrast-[1.05]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                <MapPin className="h-8 w-8 animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
