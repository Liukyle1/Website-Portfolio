"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);
const isYouTube = (src: string) => src.includes("youtube.com") || src.includes("youtu.be");
const getYouTubeId = (src: string) => {
  const match = src.match(/[?&]v=([^&]+)/) || src.match(/youtu\.be\/([^?]+)/);
  return match ? match[1] : "";
};

interface Props {
  images: string[];
  title: string;
}

const placeholderGradients = [
  "linear-gradient(135deg, #1a1035 0%, #2a1050 100%)",
  "linear-gradient(135deg, #0f1a2e 0%, #0a2a4a 100%)",
  "linear-gradient(135deg, #1a0f2e 0%, #2a0a4a 100%)",
];

export default function ProjectGallery({ images, title }: Props) {
  const isPlaceholder = images.length === 0;
  const slideCount = isPlaceholder ? 3 : images.length;

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slideCount);
  }, [slideCount]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slideCount) % slideCount);
  }, [slideCount]);

  // Auto-rotate — stops when user interacts
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const handleArrow = (fn: () => void) => {
    setIsPaused(true);
    fn();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      setIsPaused(true);
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[#2a2a45] h-64 md:h-[440px]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides track */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {Array.from({ length: slideCount }).map((_, i) => (
          <div key={i} className="min-w-full h-full flex-shrink-0 relative">
            {!isPlaceholder ? (
              isYouTube(images[i]) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(images[i])}`}
                  allowFullScreen
                  className="w-full h-full"
                  style={{ border: "none" }}
                />
              ) : isVideo(images[i]) ? (
                <video
                  src={images[i]}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={images[i]}
                  alt={`${title} — photo ${i + 1}`}
                  fill
                  className="object-contain"
                />
              )
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-3"
                style={{ background: placeholderGradients[i % placeholderGradients.length] }}
              >
                <div
                  className="w-16 h-16 rounded-2xl border border-[#2a2a45] flex items-center justify-center"
                  style={{ background: "rgba(124,58,237,0.08)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <p className="text-[#2a2a45] text-sm">Photo {i + 1} — coming soon</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={() => handleArrow(prev)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#09090f]/80 backdrop-blur-sm border border-[#2a2a45] text-[#94a3b8] hover:text-white hover:border-[#7c3aed] hover:bg-[rgba(124,58,237,0.12)] transition-all duration-200"
        aria-label="Previous photo"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => handleArrow(next)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#09090f]/80 backdrop-blur-sm border border-[#2a2a45] text-[#94a3b8] hover:text-white hover:border-[#7c3aed] hover:bg-[rgba(124,58,237,0.12)] transition-all duration-200"
        aria-label="Next photo"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setIsPaused(true); setCurrent(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-[#7c3aed]"
                : "w-1.5 bg-[#2a2a45] hover:bg-[#7c3aed]/50"
            }`}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-[#09090f]/80 backdrop-blur-sm border border-[#2a2a45] text-xs text-[#64748b]">
        {current + 1} / {slideCount}
      </div>
    </div>
  );
}
