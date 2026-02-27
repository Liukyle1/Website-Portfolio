"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Leadership", href: "#leadership" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["projects", "experience", "leadership"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090f]/80 backdrop-blur-xl border-b border-[#2a2a45]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + nav links grouped on the left */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="#"
            className="text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity mr-4"
          >
            <span className="gradient-text font-semibold">portfolio</span>
          </a>
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-[#a78bfa] bg-[rgba(124,58,237,0.12)]"
                    : "text-[#94a3b8] hover:text-[#f1f0ff] hover:bg-[#1a1a28]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Mobile logo */}
        <a
          href="#"
          className="md:hidden text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="gradient-text font-semibold">portfolio</span>
        </a>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:cs.kyleliu@gmail.com"
            className="px-4 py-2 text-sm font-medium rounded-lg border border-[#2a2a45] text-[#94a3b8] hover:text-[#f1f0ff] hover:border-[#7c3aed] transition-all duration-200"
          >
            Contact
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#1a1a28] transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span
              className={`h-0.5 bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`h-0.5 bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#09090f]/95 backdrop-blur-xl border-b border-[#2a2a45] px-6 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-medium text-[#94a3b8] hover:text-[#a78bfa] border-b border-[#1a1a28] last:border-0 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:cs.kyleliu@gmail.com"
            className="block mt-3 py-2 text-sm font-medium text-center rounded-lg border border-[#2a2a45] text-[#94a3b8] hover:text-white"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
