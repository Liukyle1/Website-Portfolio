"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects, statusConfig, type Project } from "@/lib/projects";

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "right" ? 340 : -340,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f1f0ff]">
              Projects
            </h2>
            <p className="text-[#64748b] mt-3 max-w-lg">
              A selection of things I&apos;ve built — from hardware to full-stack applications.
            </p>
          </div>
          {/* Scroll controls */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-lg border border-[#2a2a45] text-[#64748b] hover:text-white hover:border-[#7c3aed] hover:bg-[rgba(124,58,237,0.08)] transition-all duration-200"
              aria-label="Scroll left"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-lg border border-[#2a2a45] text-[#64748b] hover:text-white hover:border-[#7c3aed] hover:bg-[rgba(124,58,237,0.08)] transition-all duration-200"
              aria-label="Scroll right"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div ref={scrollRef} className="scroll-container pb-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Featured count */}
        <div className="mt-6 flex items-center gap-2 text-sm text-[#64748b]">
          <span>{projects.length} projects</span>
          <span className="w-px h-4 bg-[#2a2a45]" />
          <a
            href="https://github.com/repos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7c3aed] hover:text-[#a78bfa] transition-colors"
          >
            View all on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status];
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="glass-card flex-shrink-0 w-72 md:w-80 p-6 flex flex-col gap-4 hover:border-[#7c3aed]/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.12)] transition-all duration-300 group cursor-pointer"
    >
      {/* Status row */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {status.label}
        </span>
        {/* Arrow hint on hover */}
        <span className="text-[#64748b] group-hover:text-[#a78bfa] transition-colors text-xs flex items-center gap-1">
          View
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      </div>

      {/* Cover image */}
      <div className="w-full h-36 rounded-lg overflow-hidden bg-gradient-to-br from-[#1a1a28] to-[#0f0f1e] border border-[#2a2a45] group-hover:border-[#7c3aed]/30 transition-colors relative">
        {(project.coverImage || project.images[0]) ? (
          <Image
            src={project.coverImage || project.images[0]}
            alt={project.title}
            fill
            className="object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-[#f1f0ff] mb-2 group-hover:text-[#a78bfa] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[#64748b] leading-relaxed">{project.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs rounded bg-[#1a1a28] border border-[#2a2a45] text-[#94a3b8]"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
