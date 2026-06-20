"use client";

import { useEffect, useState } from "react";

/** Fine barre de progression dorée en haut de page (feedback fluide au scroll). */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[90] h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-emerald-glow via-gold to-emerald-glow transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%`, boxShadow: "0 0 12px rgba(255,204,0,0.6)" }}
      />
    </div>
  );
}
