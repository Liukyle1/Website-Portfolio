"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Static background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-float"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full animate-float"
          style={{
            background:
              "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
            animationDelay: "2s",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Profile picture */}
        <div className="mb-8 flex justify-center animate-fade-in-up">
          <div
            className="w-36 h-36 rounded-full overflow-hidden bg-gradient-to-br from-[#1a1a28] to-[#0f0f1e]"
            style={{
              border: "2px solid rgba(124,58,237,0.4)",
              boxShadow: "0 0 0 4px rgba(124,58,237,0.08), 0 0 40px rgba(124,58,237,0.15)",
            }}
          >
            <Image
              src="/profile.JPG"
              alt="Kyle Liu"
              width={144}
              height={144}
              className="object-cover w-full h-full"
              style={{ objectPosition: "100% 15%" }}
            />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2a2a45] bg-[rgba(22,22,42,0.6)] backdrop-blur-sm mb-8 animate-fade-in-up">
          <span
            className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse"
            style={{ boxShadow: "0 0 8px rgba(124,58,237,0.8)" }}
          />
          <span className="text-sm text-[#94a3b8]">
            ECE &amp; CS @ Wichita State University
          </span>
        </div>

        {/* Name */}
        <h1
          className="text-6xl md:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          <span className="gradient-text">Kyle Liu</span>
        </h1>

        {/* Tagline */}
        <p
          className="text-xl md:text-2xl text-[#94a3b8] font-light mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Building at the intersection of
          <span className="text-[#a78bfa] font-medium"> hardware </span>
          and
          <span className="text-[#a78bfa] font-medium"> software</span>.
        </p>

        <p
          className="text-base text-[#64748b] max-w-xl mx-auto mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          Passionate about embedded systems, full-stack development, and creating technology that makes a real impact.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-[#7c3aed] text-white font-medium hover:bg-[#6d28d9] transition-all duration-200 violet-glow hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#experience"
            className="px-6 py-3 rounded-xl border border-[#2a2a45] text-[#94a3b8] font-medium hover:text-white hover:border-[#7c3aed] hover:bg-[rgba(124,58,237,0.08)] transition-all duration-200"
          >
            My Experience
          </a>
        </div>

        {/* Social links */}
        <div
          className="flex items-center justify-center gap-6 mt-12 animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          <a
            href="https://github.com/repos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#64748b] hover:text-[#a78bfa] transition-colors duration-200"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
          <span className="w-px h-4 bg-[#2a2a45]" />
          <a
            href="https://www.linkedin.com/in/liukyle1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#64748b] hover:text-[#a78bfa] transition-colors duration-200"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
          <span className="w-px h-4 bg-[#2a2a45]" />
          <a
            href="mailto:cs.kyleliu@gmail.com"
            className="flex items-center gap-2 text-sm text-[#64748b] hover:text-[#a78bfa] transition-colors duration-200"
          >
            <EmailIcon />
            <span>Email</span>
          </a>
        </div>
      </div>

    </section>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
