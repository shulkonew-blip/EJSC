"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Image from "next/image";
import { X, Send, Sparkles, MessageCircle } from "lucide-react";
import { CLUB } from "@/lib/clubData";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING =
  "Bonjour 👋 Je suis l'Agent Étoile ⚽️💚 Posez-moi vos questions sur l'École de Football, l'Académie de Performance, les inscriptions ou comment réserver un test pour votre enfant !";

const SUGGESTIONS = [
  "Comment inscrire mon enfant ?",
  "C'est quoi l'Académie ?",
  "Où êtes-vous situés ?",
  "À partir de quel âge ?",
];

/** Réponse de secours si l'API n'est pas joignable (ex: `npm run dev` sans backend). */
function localFallback(q: string): string {
  const t = q.toLowerCase();
  if (/(adress|où|ou |situ|lieu|venir|map|localis)/.test(t))
    return "Nous sommes au 10 Bd Omar Al Khayam, Étg RC Club Étoile H/H, Casablanca 20200 🇲🇦. Venez nous rencontrer !";
  if (/(prix|tarif|coût|cout|combien|cher|paiement)/.test(t))
    return `Pour les informations d'inscription et de tarifs, contactez notre secrétariat sur WhatsApp au ${CLUB.phonesMobile[0].display}, ou remplissez le formulaire d'admission de la page 💚`;
  if (/(acad[ée]mie|détection|detection|performance|niveau|select)/.test(t))
    return "L'Académie de Performance, c'est la voie haute performance, accessible dès ~U9 sur détection et test technique. Elle tourne toute l'année ⚽️ Souhaitez-vous réserver un test ?";
  if (/(école|ecole|petit|débutant|debutant|loisir|école de foot)/.test(t))
    return "L'École de Football Élite est ouverte à tous les âges (U5 à U20), toute l'année : éveil athlétique, technique, discipline et plaisir du jeu 💛 Les places sont limitées !";
  if (/(âge|age|ans|quel age|catégorie|categorie|u\d)/.test(t))
    return "L'École accueille dès 5 ans (U5). L'Académie est accessible dès ~U9 sur test. Donnez-moi l'âge de votre enfant et je vous oriente !";
  if (/(inscri|inscription|test|admission|rejoindre|comment)/.test(t))
    return `C'est simple : remplissez le formulaire d'admission de la page (bouton « Réserver un cours d'essai »), ou écrivez-nous sur WhatsApp au ${CLUB.phonesMobile[0].display}. Le secrétariat vous recontacte sous 24h ✅`;
  if (/(contact|téléphone|telephone|whatsapp|numéro|numero|email|mail|appel)/.test(t))
    return `Téléphone fixe : ${CLUB.phonesFixe.map(p => p.display).join(" / ")} · Mobile & WhatsApp : ${CLUB.phonesMobile.map(p => p.display).join(" / ")} · Email : ${CLUB.email} 💚`;
  return `Belle question ! Pour une réponse précise, contactez notre secrétariat au ${CLUB.phonesMobile[0].display} (WhatsApp) ou remplissez le formulaire d'admission. Je peux aussi vous parler de l'École, de l'Académie et des inscriptions ⚽️`;
}

export default function AgentEtoile() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [vh, setVh] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Détecte le mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Gère la hauteur réelle du viewport (clavier mobile) via visualViewport
  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    const update = () => setVh(vv ? vv.height : window.innerHeight);
    update();
    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);
    return () => {
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
    };
  }, [open]);

  // Bloque le scroll du body quand le panneau plein écran est ouvert (mobile)
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isMobile]);

  // Auto-scroll vers le bas
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  // Met à jour le contenu du DERNIER message (l'assistant en cours de frappe)
  const updateLast = (content: string) =>
    setMessages((m) => {
      const copy = [...m];
      copy[copy.length - 1] = { role: "assistant", content };
      return copy;
    });

  // Effet machine à écrire pour la réponse de secours (mode hors-ligne)
  async function streamLocal(text: string) {
    setLoading(false);
    setMessages((m) => [...m, { role: "assistant", content: "" }]);
    const words = text.split(" ");
    let acc = "";
    for (let i = 0; i < words.length; i++) {
      acc += (i ? " " : "") + words[i];
      updateLast(acc);
      await sleep(26 + Math.random() * 38);
    }
  }

  async function sendMessage(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const nextMessages: Msg[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    const started = Date.now();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
      });
      if (!res.ok || !res.body) throw new Error("no stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let first = true;

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        acc += chunk;
        if (first) {
          first = false;
          // Petit temps de "réflexion" humain : on garde les points ~600ms
          const elapsed = Date.now() - started;
          if (elapsed < 600) await sleep(600 - elapsed);
          setLoading(false);
          setMessages((m) => [...m, { role: "assistant", content: acc }]);
        } else {
          updateLast(acc);
        }
      }

      if (first) {
        // Aucun token reçu -> secours
        await streamLocal(localFallback(content));
      } else if (!acc.trim()) {
        updateLast(localFallback(content));
      }
    } catch {
      // Pas de backend (ex. `npm run dev`) -> réponse de secours streamée
      const elapsed = Date.now() - started;
      if (elapsed < 600) await sleep(600 - elapsed);
      await streamLocal(localFallback(content));
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Hauteur du panneau : sur mobile on colle à visualViewport pour que
  // l'input reste TOUJOURS visible au-dessus du clavier.
  const panelStyle =
    isMobile && vh ? ({ height: `${vh}px` } as const) : undefined;

  return (
    <>
      {/* Bouton flottant — visible mobile & desktop */}
      {!(open && isMobile) && (
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir l'Agent Étoile"
          className="keep-dark group fixed bottom-5 right-5 z-[70] flex items-center gap-3 rounded-full border border-gold/40 bg-gradient-to-br from-[#0c1018] to-[#05070a] p-3 sm:py-3 sm:pl-3 sm:pr-5 shadow-[0_8px_40px_-6px_rgba(255,204,0,0.45)] backdrop-blur-xl transition-transform duration-300 hover:scale-105 active:scale-95"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold to-[#b88a00]">
            <Image
              src="/images/logo.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-glow opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[#05070a] bg-emerald-glow" />
            </span>
          </span>
          <span className="hidden flex-col items-start leading-tight sm:flex">
            <span className="text-sm font-extrabold text-white">
              Agent Étoile
            </span>
            <span className="text-[11px] font-semibold text-emerald-glow">
              En ligne · 24h/24
            </span>
          </span>
        </button>
      )}

      {/* Panneau de chat */}
      {open && (
        <div
          style={panelStyle}
          className="keep-dark fixed z-[80] flex flex-col overflow-hidden border border-white/10 bg-[#070b11] shadow-2xl
                     inset-x-0 top-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:top-auto sm:h-[min(620px,calc(100vh-7rem))] sm:w-[400px] sm:rounded-3xl"
        >
          {/* En-tête */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-gradient-to-r from-emerald/30 to-transparent px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5 ring-1 ring-gold/30">
                <Image
                  src="/images/logo.png"
                  alt="EJSC"
                  width={26}
                  height={26}
                  className="h-6 w-6 object-contain"
                />
              </span>
              <div className="leading-tight">
                <p className="flex items-center gap-2 text-[15px] font-extrabold text-white">
                  Agent Étoile
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                </p>
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-glow">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-glow" />
                  En ligne · réponse immédiate
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-[#05070a] px-4 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-md bg-gold text-[#05070a] font-medium"
                      : "rounded-bl-md border border-white/10 bg-white/[0.04] text-zinc-100"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 animate-bounce rounded-full bg-emerald-glow"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions (seulement au début) */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold transition hover:bg-gold hover:text-[#05070a]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Saisie — toujours visible au-dessus du clavier */}
          <form
            onSubmit={onSubmit}
            className="flex shrink-0 items-center gap-2 border-t border-white/10 bg-[#070b11] px-3 py-3"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message…"
              enterKeyHint="send"
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Envoyer"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold text-[#05070a] transition hover:shadow-gold-glow disabled:opacity-40"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      {/* Voile : ferme le chat en cliquant dehors (sombre sur mobile, invisible sur PC) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden
          className="fixed inset-0 z-[75] bg-black/60 sm:bg-transparent"
        />
      )}
    </>
  );
}
