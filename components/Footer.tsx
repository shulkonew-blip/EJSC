import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Star,
  Smartphone,
  MessageCircle,
} from "lucide-react";
import { CLUB } from "@/lib/clubData";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#04060a]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Marque */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                <Image
                  src="/images/logo.png"
                  alt="Logo EJSC"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </span>
              <div className="leading-tight">
                <p className="font-display text-xl tracking-wide text-white">
                  EJSC
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/80">
                  Étoile de la Jeunesse Sportive
                </p>
              </div>
            </div>
            <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-zinc-400 sm:mx-0">
              Depuis 1942, l&apos;institution historique de Casablanca qui forge
              les champions de demain. L&apos;héritage, la rigueur et l&apos;ADN de
              la gagne.
            </p>
            <div className="mt-6 flex justify-center gap-3 sm:justify-start">
              <a
                href={CLUB.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:border-gold/50 hover:text-gold"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={CLUB.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:border-gold/50 hover:text-gold"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Le Club
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              <li>
                <a href="#simulateur" className="transition hover:text-gold">
                  Nos programmes
                </a>
              </li>
              <li>
                <a href="#staff" className="transition hover:text-gold">
                  Le staff
                </a>
              </li>
              <li>
                <a href="#galerie" className="transition hover:text-gold">
                  Moments de gloire
                </a>
              </li>
              <li>
                <a href="#admission" className="transition hover:text-gold">
                  Test d&apos;admission
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=10+Bd+Omar+Al+Khayam+Club+Etoile+Casablanca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-gold"
                >
                  10 Bd Omar Al Khayam, Étg RC Club Étoile H/H, Casablanca 20200
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  Fixe :{" "}
                  <a href="tel:+212679596747" className="transition hover:text-gold">
                    06 79 59 67 47
                  </a>{" "}
                  /{" "}
                  <a href="tel:+212669019491" className="transition hover:text-gold">
                    06 69 01 94 91
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  Mobile :{" "}
                  <a href="tel:+212666999164" className="transition hover:text-gold">
                    06 66 99 91 64
                  </a>{" "}
                  /{" "}
                  <a href="tel:+212666999153" className="transition hover:text-gold">
                    06 66 99 91 53
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a
                  href="mailto:info@etoileclub.ma"
                  className="transition hover:text-gold"
                >
                  info@etoileclub.ma
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#admission"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-[#05070a] transition hover:shadow-gold-glow"
              >
                <Star className="h-4 w-4" />
                Réserver un test
              </a>
              <a
                href={`https://wa.me/${CLUB.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-glow/40 bg-emerald/15 px-5 py-2.5 text-sm font-bold text-emerald-glow transition hover:bg-emerald-glow hover:text-[#05070a]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Étoile de la Jeunesse Sportive de
            Casablanca. Fondé en 1942. Tous droits réservés.
          </p>
          <p className="flex items-center gap-1.5">
            Forgé avec
            <span className="text-gold">passion</span>
            pour les champions de demain.
          </p>
        </div>
      </div>
    </footer>
  );
}
