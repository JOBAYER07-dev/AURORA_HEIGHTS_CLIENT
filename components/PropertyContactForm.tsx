"use client";

import { useState } from "react";

interface PropertyContactFormProps {
  propertyTitle: string;
}

export default function PropertyContactForm({ propertyTitle }: PropertyContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState(`I would like to request a private showing of ${propertyTitle}.`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    // Simulate premium API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-gold-500/30 rounded-xl p-8 shadow-2xl text-center space-y-6 animate-[fadeIn_0.5s_ease-out]">
        <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto text-gold-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-2">
          <h4 className="font-serif text-lg text-luxury-charcoal font-semibold">Tour Requested</h4>
          <p className="text-[11px] text-luxury-charcoal/60 leading-relaxed font-light">
            Thank you, <span className="font-semibold text-luxury-charcoal">{name}</span>. An Aurora Heights elite advisor will coordinate your private viewing and reach out to you at <span className="font-semibold text-luxury-charcoal">{email}</span> within 2 hours.
          </p>
        </div>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setName("");
            setEmail("");
            setDate("");
            setMessage(`I would like to request a private showing of ${propertyTitle}.`);
          }}
          className="w-full py-3 bg-luxury-cream border border-luxury-sand text-luxury-charcoal hover:text-gold-700 hover:border-gold-500 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all duration-300 cursor-pointer active:scale-[0.98]"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-luxury-sand/30 rounded-xl p-8 shadow-[0_20px_50px_rgba(189,155,76,0.04)] space-y-6 sticky top-28">
      <div className="space-y-1">
        <span className="text-[9px] uppercase tracking-wider text-gold-600 font-bold block">
          Exclusive Viewing
        </span>
        <h4 className="font-serif text-xl font-light text-luxury-charcoal">
          Request Private Tour
        </h4>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name input */}
        <div className="space-y-1.5">
          <label className="block text-[9px] uppercase tracking-wider text-luxury-charcoal/50 font-bold">
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Charles Montgomery"
            className="w-full bg-luxury-cream/40 border border-luxury-sand/60 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/30 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all font-light"
          />
        </div>

        {/* Email input */}
        <div className="space-y-1.5">
          <label className="block text-[9px] uppercase tracking-wider text-luxury-charcoal/50 font-bold">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. charles@estate.com"
            className="w-full bg-luxury-cream/40 border border-luxury-sand/60 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/30 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all font-light"
          />
        </div>

        {/* Date input */}
        <div className="space-y-1.5">
          <label className="block text-[9px] uppercase tracking-wider text-luxury-charcoal/50 font-bold">
            Preferred Date (Optional)
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-luxury-cream/40 border border-luxury-sand/60 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all font-light cursor-pointer"
          />
        </div>

        {/* Message input */}
        <div className="space-y-1.5">
          <label className="block text-[9px] uppercase tracking-wider text-luxury-charcoal/50 font-bold">
            Special Requests
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-luxury-cream/40 border border-luxury-sand/60 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all font-light resize-none"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-luxury-charcoal hover:bg-gold-600 disabled:bg-luxury-charcoal/60 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all duration-300 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Scheduling viewing...
            </>
          ) : (
            "Request Private Tour"
          )}
        </button>
      </form>
    </div>
  );
}
