"use client";

import { useEffect, useRef, useState } from "react";
import { History, GraduationCap, BadgeCheck } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  {
    icon: <History className="h-6 w-6" />,
    to: 1942,
    label: "Fondé en 1942",
    sub: "Plus de 80 ans d'histoire et de passion à Casablanca",
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    to: 20,
    prefix: "U5 à U",
    label: "Un cursus complet",
    sub: "De l'éveil athlétique à la haute performance",
  },
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    to: 100,
    suffix: "%",
    label: "Coachs certifiés",
    sub: "Des éducateurs d'élite pour une progression garantie",
  },
];

function useCountUp(target: number, run: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return value;
}

function StatCard({ stat, run }: { stat: Stat; run: boolean }) {
  const value = useCountUp(stat.to, run);
  return (
    <div className="group relative flex items-start gap-4 px-5 py-6 sm:gap-5 sm:px-9 sm:py-8">
      <span className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald to-[#0a3d22] text-gold ring-1 ring-white/10 transition group-hover:shadow-emerald-glow">
        {stat.icon}
      </span>
      <div>
        <div className="font-display text-3xl leading-none tracking-tight text-white sm:text-4xl">
          {stat.prefix}
          {value}
          {stat.suffix}
        </div>
        <div className="mt-2 text-sm font-bold uppercase tracking-wide text-gold/90">
          {stat.label}
        </div>
        <p className="mt-1 max-w-[16rem] text-sm leading-snug text-zinc-400">
          {stat.sub}
        </p>
      </div>
    </div>
  );
}

export default function LegendsBar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="palmares" className="relative z-20 -mt-px px-5 sm:px-8">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl md:grid-cols-3 md:divide-x md:divide-y-0"
      >
        {STATS.map((s) => (
          <StatCard key={s.label} stat={s} run={run} />
        ))}
      </div>
    </section>
  );
}
