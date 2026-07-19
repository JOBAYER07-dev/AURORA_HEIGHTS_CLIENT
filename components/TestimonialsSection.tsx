"use client";

const TESTIMONIALS = [
  {
    name: "Alastair & Evelyn Vance",
    quote: "Purchasing the Malibu Sentinel was a transformative experience. Aurora Heights captures coastal beauty through glass and limestone, mirroring the organic rhythm of the ocean.",
    property: "The Malibu Sentinel",
  },
  {
    name: "Dr. Kenzo Tange",
    quote: "The attention to raw wood structural details and minimalist alignment is breathtaking. A true masterclass in architectural restraint and luxury integration.",
    property: "Tokyo Minimalist Residence",
  },
  {
    name: "Charlotte de Rais",
    quote: "Every afternoon the sun illuminates the living salon in a way that feels curated by light itself. Effortless luxury and custom smart tech interface perfectly.",
    property: "Manhattan Sky Penthouse",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-[#fcfbfa] border-t border-luxury-sand/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] text-gold-600 uppercase block">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-luxury-charcoal leading-tight tracking-wide">
            Voices of <span className="italic font-normal text-gold-700">Aurora Heights</span>
          </h2>
          <p className="text-sm font-light text-luxury-charcoal/60 leading-relaxed max-w-xl">
            Hear from our global patrons who have found their sanctuary in our exclusive signature estates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-white border border-luxury-sand/20 rounded-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6 hover:border-gold-500/20 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-gold-500 text-xs tracking-wider">★★★★★</div>
                <p className="font-serif italic text-xs text-luxury-charcoal/80 leading-relaxed font-light">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-6 border-t border-luxury-sand/20 space-y-1">
                <span className="font-semibold text-xs text-luxury-charcoal block">{t.name}</span>
                <span className="text-[10px] text-gold-700 font-medium uppercase tracking-wider block">
                  Purchased {t.property}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
