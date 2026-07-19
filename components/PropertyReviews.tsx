"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export interface Review {
  name: string;
  rating: number;
  comment: string;
  _id?: string;
  createdAt?: string;
}

interface PropertyReviewsProps {
  propertyId: string;
  initialReviews?: Review[];
}

export default function PropertyReviews({ propertyId, initialReviews = [] }: PropertyReviewsProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  // Form states
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Compute average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!session) {
      setError("You must be logged in to submit a review.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a comment.");
      return;
    }

    setLoading(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${apiBase}/properties/${propertyId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send session cookie
        body: JSON.stringify({
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      // Append new review locally
      const newReview: Review = {
        name: session.user.name || "Anonymous",
        rating,
        comment,
        createdAt: new Date().toISOString(),
      };

      setReviews((prev) => [newReview, ...prev]);
      setSuccess(true);
      setComment("");
      setRating(5);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header and Summary stats */}
      <div className="border-t border-luxury-sand/20 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gold-600 uppercase block">
              CLIENT TESTIMONIALS
            </span>
            <h3 className="font-serif text-2xl font-light text-luxury-charcoal">
              Residency Reviews
            </h3>
          </div>
          
          {reviews.length > 0 && (
            <div className="flex items-center gap-3 bg-white border border-luxury-sand/20 rounded-lg py-2.5 px-4 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
              <span className="text-2xl font-serif font-bold text-luxury-charcoal">{avgRating}</span>
              <div className="flex flex-col">
                <div className="flex text-gold-500 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      {i < Math.round(Number(avgRating)) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className="text-[9px] text-luxury-charcoal/40 font-semibold uppercase tracking-wider block mt-0.5">
                  {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Existing Reviews List */}
        {reviews.length === 0 ? (
          <div className="bg-white border border-luxury-sand/10 rounded-xl p-8 text-center text-luxury-charcoal/50 text-xs font-light">
            No testimonials have been written for this signature estate yet.
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((rev, index) => (
              <div
                key={`rev-${index}`}
                className="bg-white border border-luxury-sand/20 rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] space-y-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-serif text-sm font-semibold text-luxury-charcoal block">
                      {rev.name}
                    </span>
                    <span className="text-[9px] text-luxury-charcoal/40 font-light block">
                      {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) : "Recent Guest"}
                    </span>
                  </div>
                  
                  {/* Stars display */}
                  <div className="flex text-gold-500 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < rev.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
                
                <p className="text-xs text-luxury-charcoal/70 leading-relaxed font-light whitespace-pre-line">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Submission Form */}
      <div className="bg-white border border-luxury-sand/20 rounded-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6">
        <h4 className="font-serif text-lg font-light text-luxury-charcoal">
          Write a Testimonial
        </h4>

        {session ? (
          <form onSubmit={handleSubmitReview} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200/50 text-red-700 text-xs rounded-sm p-4 font-light leading-relaxed">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200/50 text-green-700 text-xs rounded-sm p-4 font-light leading-relaxed">
                Testimonial submitted successfully!
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              {/* Name (Read-only) */}
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Reviewer Name
                </label>
                <input
                  type="text"
                  disabled
                  value={session.user.name || "Anonymous"}
                  className="w-full bg-luxury-cream/50 border border-luxury-sand/20 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal/50 focus:outline-none"
                />
              </div>

              {/* Star rating selector */}
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold mb-1">
                  Overall Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starVal = i + 1;
                    const isHighlighted = hoverRating !== null
                      ? starVal <= hoverRating
                      : starVal <= rating;
                    return (
                      <button
                        key={`star-selector-${starVal}`}
                        type="button"
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(null)}
                        className={`text-xl transition-all duration-150 cursor-pointer active:scale-90 ${
                          isHighlighted ? "text-gold-500 scale-105" : "text-luxury-charcoal/20"
                        }`}
                      >
                        ★
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Comment Textarea */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                Detailed Feedback
              </label>
              <textarea
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe your spatial impressions, architectural aspects, views..."
                className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-luxury-charcoal hover:bg-gold-600 text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md cursor-pointer disabled:bg-luxury-charcoal/60 flex items-center justify-center gap-2"
            >
              {loading ? "Submitting..." : "Submit Testimonial"}
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <p className="text-xs text-luxury-charcoal/50 font-light mb-4">
              You must be logged in to share feedback about this signature estate.
            </p>
            <Link
              href={`/login?redirect=/properties/${propertyId}`}
              className="inline-block px-5 py-2.5 border border-luxury-charcoal hover:border-gold-500 text-luxury-charcoal hover:text-gold-700 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer"
            >
              Sign In to Write Review
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
