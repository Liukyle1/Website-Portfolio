"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

interface LeadershipItem {
  role: string;
  organization: string;
  dates: string;
  description: string;
  impact?: string;
  images: string[]; // Add image paths here, e.g. ["/leadership/org1/img1.jpg"]
}

const leadershipItems: LeadershipItem[] = [
  {
    // Most recent — leftmost
    role: "Event Coordinator",
    organization: "Vietnamese Student Association (VSA)",
    dates: "May 2023 – May 2024",
    description:
      "Planned and executed large-scale cultural events for Wichita State's Vietnamese Student Association, coordinating volunteer teams, vendor logistics, venue arrangements, and marketing across a full academic year. Managed cross-functional planning teams and stakeholder communication to deliver consistently well-attended programs that celebrated cultural identity and built campus community.",
    impact: "50+ attendees",
    images: [
      "/leadership/vsa/DSC07368.jpeg",
      "/leadership/vsa/IMG_0017.jpeg",
      "/leadership/vsa/IMG_0562.jpeg",
      "/leadership/vsa/IMG_1343.jpeg",
      "/leadership/vsa/IMG_2773.jpeg",
    ],
  },
  {
    role: "Vice President",
    organization: "Chi Sigma Tau Fraternity Inc.",
    dates: "Oct 2022 – May 2023",
    description:
      "Mentored and guided members while coordinating workshops and training to support professional and technical development. Worked across multiple groups to plan and execute organizational strategies, demonstrating collaboration and communication at every level.",
    images: [
      "/leadership/chi-sigma-tau/IMG_0069.jpeg",
      "/leadership/chi-sigma-tau/IMG_1489.jpg",
      "/leadership/chi-sigma-tau/IMG_2048.jpg",
      "/leadership/chi-sigma-tau/IMG_5030.jpeg",
    ],
  },
];

const placeholderGradients = [
  "linear-gradient(135deg, #1a1035 0%, #2a1050 100%)",
  "linear-gradient(135deg, #0f1a2e 0%, #0a2a4a 100%)",
  "linear-gradient(135deg, #1a0f2e 0%, #2a0a4a 100%)",
];

function MiniGallery({ images }: { images: string[] }) {
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
      className="relative overflow-hidden rounded-xl border border-[#2a2a45]"
      style={{ height: "180px" }}
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
              isVideo(images[i]) ? (
                <video
                  src={images[i]}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={images[i]}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-2"
                style={{ background: placeholderGradients[i % placeholderGradients.length] }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <p className="text-[#2a2a45] text-xs">Photo {i + 1} — coming soon</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={() => handleArrow(prev)}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#09090f]/80 backdrop-blur-sm border border-[#2a2a45] text-[#94a3b8] hover:text-white hover:border-[#7c3aed] transition-all duration-200"
        aria-label="Previous"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => handleArrow(next)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#09090f]/80 backdrop-blur-sm border border-[#2a2a45] text-[#94a3b8] hover:text-white hover:border-[#7c3aed] transition-all duration-200"
        aria-label="Next"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setIsPaused(true); setCurrent(i); }}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? "w-4 bg-[#7c3aed]" : "w-1 bg-[#2a2a45] hover:bg-[#7c3aed]/50"
            }`}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#09090f]/80 backdrop-blur-sm text-[10px] text-[#64748b]">
        {current + 1}/{slideCount}
      </div>
    </div>
  );
}

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 px-6 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 50%, rgba(124,58,237,0.04), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#f1f0ff]">Leadership</h2>
          <p className="text-[#64748b] mt-3 max-w-lg">
            Roles where I&apos;ve built teams, driven initiatives, and created community.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadershipItems.map((item, i) => (
            <LeadershipCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const colors = [
  "from-violet-500/10 to-purple-500/5",
  "from-blue-500/10 to-indigo-500/5",
  "from-emerald-500/10 to-teal-500/5",
];

function LeadershipCard({ item, index }: { item: LeadershipItem; index: number }) {
  return (
    <div className="glass-card p-6 flex flex-col gap-4 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] transition-all duration-300 group relative overflow-hidden">
      {/* Background gradient accent */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#7c3aed] shrink-0" style={{ boxShadow: "0 0 8px rgba(124,58,237,0.6)" }} />
              <p className="text-xs font-medium text-[#7c3aed] uppercase tracking-widest">
                {item.dates}
              </p>
            </div>
            <h3 className="text-lg font-semibold text-[#f1f0ff] group-hover:text-[#a78bfa] transition-colors">
              {item.role}
            </h3>
            <p className="text-sm text-[#94a3b8]">{item.organization}</p>
          </div>
          {item.impact && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-[rgba(124,58,237,0.12)] border border-[#7c3aed]/30 text-[#a78bfa] whitespace-nowrap">
              {item.impact}
            </span>
          )}
        </div>

        {/* Gallery */}
        <MiniGallery images={item.images} />

        {/* Description */}
        <p className="text-sm text-[#64748b] leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}
