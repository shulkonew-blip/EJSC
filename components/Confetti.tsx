"use client";

import { useMemo } from "react";

const COLORS = ["#FFCC00", "#00A651", "#006633", "#FFF7D6", "#E6B400"];

/** Micro-confettis vert/jaune, purement décoratifs. */
export default function Confetti({ count = 70 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const duration = 2.4 + Math.random() * 1.8;
        const size = 6 + Math.random() * 7;
        const color = COLORS[i % COLORS.length];
        const rounded = Math.random() > 0.5;
        return { id: i, left, delay, duration, size, color, rounded };
      }),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * (p.rounded ? 1 : 1.6),
            backgroundColor: p.color,
            borderRadius: p.rounded ? "9999px" : "2px",
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}
