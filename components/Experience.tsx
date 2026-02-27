"use client";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  dates: string;
  type: "internship" | "part-time" | "full-time" | "research";
  bullets: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    // Most recent — top left
    role: "QA Automation Engineer",
    company: "National Institute for Aviation Research (NIAR)",
    location: "Wichita, KS",
    dates: "Jan 2022 – Feb 2024",
    type: "full-time",
    bullets: [
      "Automated data entry workflows for aerospace part manufacturing, cutting manual input time by 40% and reducing data entry errors by 30%.",
      "Delivered dashboards and metric summaries (throughput, rejection rates, rework rates) that helped leadership improve on-time completion of machining jobs by 15%.",
    ],
    skills: ["Automation", "Data Analysis", "Dashboards", "Aerospace", "QA"],
  },
  {
    role: "Assembly Mechanic",
    company: "AA Machining LLC",
    location: "Wichita, KS",
    dates: "Jan 2022 – Feb 2024",
    type: "full-time",
    bullets: [
      "Operated precision machinery and tools to manufacture structural and mechanical components for aircraft in accordance with FAA and OEM specifications.",
      "Performed quality inspections using calipers, micrometers, and gauges to maintain strict tolerance standards and communicated feedback to team members.",
    ],
    skills: ["Precision Machining", "Quality Inspection", "FAA Standards", "Aircraft Assembly"],
  },
  {
    // Oldest — bottom
    role: "IT Specialist",
    company: "CyberTronIT",
    location: "Wichita, KS",
    dates: "Apr 2021 – Oct 2021",
    type: "part-time",
    bullets: [
      "Troubleshot, installed, and supported software applications on Windows OS across diverse hardware configurations and mobile devices.",
      "Resolved 150+ tickets monthly with a remote support success rate of 93% and an average CSAT score of 4.7/5.",
    ],
    skills: ["Windows OS", "IT Support", "Troubleshooting", "Remote Support"],
  },
];

const typeConfig = {
  internship: { label: "Internship", color: "text-violet-400 bg-violet-400/10 border-violet-400/20" },
  "part-time": { label: "Part-time", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  "full-time": { label: "Full-time", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  research: { label: "Research", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(124,58,237,0.04), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#f1f0ff]">Experience</h2>
          <p className="text-[#64748b] mt-3 max-w-lg">
            Roles that have shaped how I think about engineering and problem-solving.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#7c3aed]/60 via-[#2a2a45] to-transparent hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const config = typeConfig[exp.type];
              return (
                <div key={i} className={`md:flex md:gap-8 ${isLeft ? "" : "md:flex-row-reverse"}`}>
                  {/* Card */}
                  <div className="md:w-1/2">
                    <div className="glass-card p-6 hover:border-[#7c3aed]/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.08)] transition-all duration-300">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-[#f1f0ff]">{exp.role}</h3>
                          <p className="text-[#a78bfa] font-medium text-sm">{exp.company}</p>
                          <p className="text-[#64748b] text-xs mt-0.5">{exp.location}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
                            {config.label}
                          </span>
                          <span className="text-xs text-[#64748b] whitespace-nowrap">{exp.dates}</span>
                        </div>
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-2 mb-4">
                        {exp.bullets.map((bullet, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7c3aed] shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 text-xs rounded bg-[#1a1a28] border border-[#2a2a45] text-[#94a3b8]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot (desktop) */}
                  <div className="hidden md:flex w-0 items-center justify-center relative">
                    <div className="absolute w-3 h-3 rounded-full bg-[#7c3aed] border-2 border-[#09090f] shadow-[0_0_12px_rgba(124,58,237,0.6)]" />
                  </div>

                  {/* Spacer */}
                  <div className="md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
