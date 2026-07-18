"use client";

export default function PropertySkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-luxury-sand/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col h-full animate-pulse select-none">
      {/* Fixed aspect ratio Image Placeholder */}
      <div className="w-full aspect-[4/3] bg-zinc-200" />

      {/* Content Placeholders */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-5">
        <div className="space-y-3">
          {/* Location Tag */}
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 bg-zinc-200 rounded-full" />
            <div className="w-24 h-2.5 bg-zinc-200 rounded" />
          </div>

          {/* Title */}
          <div className="w-3/4 h-4 bg-zinc-200 rounded" />

          {/* Description Paragraph lines */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-3 bg-zinc-100 rounded" />
            <div className="w-5/6 h-3 bg-zinc-100 rounded" />
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-4 border-t border-luxury-sand/30 flex items-center justify-between gap-4">
          <div className="flex flex-col space-y-1.5">
            <div className="w-12 h-2 bg-zinc-100 rounded" />
            <div className="w-20 h-4 bg-zinc-200 rounded" />
          </div>

          {/* Button Placeholder */}
          <div className="w-24 h-8 bg-zinc-200 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
