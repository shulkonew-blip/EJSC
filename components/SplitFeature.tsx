import Reveal from "./Reveal";

interface SplitFeatureProps {
  id?: string;
  image: string;
  eyebrow: string;
  eyebrowIcon: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
  bullets?: { icon: React.ReactNode; text: string }[];
  /** position de l'image */
  imageSide?: "left" | "right";
  /** teinte de la lueur de fond */
  glow?: "emerald" | "gold";
}

export default function SplitFeature({
  id,
  image,
  eyebrow,
  eyebrowIcon,
  title,
  body,
  bullets,
  imageSide = "left",
  glow = "emerald",
}: SplitFeatureProps) {
  const media = (
    <Reveal className="relative">
      <div className="group relative overflow-hidden rounded-[2rem] border border-white/10">
        <div
          className="aspect-[4/5] w-full bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-105 sm:aspect-[5/6] lg:aspect-[4/5]"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/80 via-transparent to-transparent" />
        <div
          className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
            glow === "gold"
              ? "bg-gradient-to-t from-gold/20 to-transparent"
              : "bg-gradient-to-t from-emerald/25 to-transparent"
          }`}
        />
        {/* cadre néon fin */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
      </div>
      {/* lueur diffuse */}
      <div
        className={`pointer-events-none absolute -z-10 h-2/3 w-2/3 blur-[90px] ${
          glow === "gold"
            ? "bg-gold/20 -right-10 bottom-0"
            : "bg-emerald/30 -left-10 top-0"
        }`}
        aria-hidden
      />
    </Reveal>
  );

  const content = (
    <Reveal
      delay={120}
      className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left"
    >
      <span
        className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] ${
          glow === "gold"
            ? "border-gold/40 bg-gold/10 text-gold"
            : "border-emerald-glow/40 bg-emerald/15 text-emerald-glow"
        }`}
      >
        {eyebrowIcon}
        {eyebrow}
      </span>
      <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.4rem)] uppercase leading-[0.95] text-white">
        {title}
      </h2>
      <div className="mt-6 max-w-xl text-[15px] leading-relaxed text-zinc-300 sm:text-base">
        {body}
      </div>
      {bullets && (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {bullets.map((b) => (
            <li
              key={b.text}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-zinc-200"
            >
              <span className="text-gold">{b.icon}</span>
              {b.text}
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );

  return (
    <section id={id} className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {imageSide === "left" ? (
          <>
            {media}
            {content}
          </>
        ) : (
          <>
            <div className="order-2 lg:order-1">{content}</div>
            <div className="order-1 lg:order-2">{media}</div>
          </>
        )}
      </div>
    </section>
  );
}
