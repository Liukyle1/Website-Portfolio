import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, statusConfig } from "@/lib/projects";
import ProjectGallery from "@/components/ProjectGallery";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? `${project.title} — Kyle Liu` : "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const status = statusConfig[project.status];

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Top nav bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090f]/80 backdrop-blur-xl border-b border-[#2a2a45]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#a78bfa] transition-colors duration-200 group"
          >
            <svg
              className="group-hover:-translate-x-0.5 transition-transform duration-200"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Portfolio
          </Link>

          <span className="gradient-text font-semibold text-sm">portfolio</span>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border mb-4 ${status.color}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {status.label}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#f1f0ff] mb-3">
              {project.title}
            </h1>
            <p className="text-[#94a3b8] text-lg max-w-xl">{project.description}</p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-medium hover:bg-[#6d28d9] transition-all duration-200 hover:scale-105"
                style={{ boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub Repo
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#2a2a45] text-[#94a3b8] text-sm font-medium hover:text-white hover:border-[#7c3aed] hover:bg-[rgba(124,58,237,0.08)] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Site
              </a>
            )}
          </div>
        </div>

        {/* Gallery */}
        <ProjectGallery images={project.images} title={project.title} />

        {/* Description + tags */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Long description */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-[#f1f0ff] mb-4">About this project</h2>
            <p className="text-[#94a3b8] leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Tech stack */}
          <div>
            <h2 className="text-lg font-semibold text-[#f1f0ff] mb-4">Tech stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm rounded-lg bg-[#1a1a28] border border-[#2a2a45] text-[#94a3b8]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-[#2a2a45] flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm text-[#64748b] hover:text-[#a78bfa] transition-colors group"
          >
            <svg
              className="group-hover:-translate-x-0.5 transition-transform"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            All projects
          </Link>

          {/* Prev / Next project */}
          <div className="flex items-center gap-4">
            {(() => {
              const idx = projects.findIndex((p) => p.slug === slug);
              const prev = projects[idx - 1];
              const next = projects[idx + 1];
              return (
                <>
                  {prev && (
                    <Link
                      href={`/projects/${prev.slug}`}
                      className="text-sm text-[#64748b] hover:text-[#a78bfa] transition-colors"
                    >
                      ← {prev.title}
                    </Link>
                  )}
                  {next && (
                    <Link
                      href={`/projects/${next.slug}`}
                      className="text-sm text-[#64748b] hover:text-[#a78bfa] transition-colors"
                    >
                      {next.title} →
                    </Link>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </main>
    </div>
  );
}
