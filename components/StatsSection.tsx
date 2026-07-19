"use client";

import { useEffect, useState } from "react";

const STATS = [
  { value: 2, suffix: "B+", label: "Closed Transactions" },
  { value: 40, suffix: "+", label: "Signature Estates" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 15, suffix: "", label: "Countries Represented" },
];

export default function StatsSection() {
  const [counts, setCounts] = useState(STATS.map(() => 0));

  useEffect(() => {
    const duration = 1500;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounts(
        STATS.map((stat) => {
          const progress = step / steps;
          return Math.min(stat.value, Math.round(stat.value * progress));
        })
      );

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="statistics" className="py-20 bg-luxury-dark text-white border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(189,155,76,0.05),transparent)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {STATS.map((stat, idx) => (
            <div key={idx} className="space-y-3">
              <div className="font-serif text-4xl md:text-6xl font-light text-gold-400 tracking-tight">
                {idx === 0 && "$"}
                {counts[idx]}
                {stat.suffix}
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
