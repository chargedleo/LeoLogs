import { ArrowUpRight, CheckCircle2, GitBranch, Cpu, Terminal } from 'lucide-react';
import { projects } from '../data/projects';

export function ProjectsPage() {
  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 border-b border-border pb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            Portfolio / Engineering Work
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Systems, Pipelines &amp; Architectures
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed font-normal">
            A selective index of AI/ML systems engineered with an emphasis on retrieval precision, measured inference latency, and predictable memory bounds in production.
          </p>
        </div>

        {/* Projects List - Varied Layouts */}
        <div className="space-y-12">
          {projects.map((project, index) => {
            const isPlaceholder = project.isPlaceholder;

            return (
              <article
                key={project.id}
                className={`relative p-8 transition-colors ${
                  isPlaceholder
                    ? 'border border-dashed border-neutral-300 bg-neutral-50/50'
                    : 'border border-border bg-white hover:border-black'
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-mono text-neutral-400">
                        0{index + 1}
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight text-foreground">
                        {project.title}
                      </h2>
                      {isPlaceholder && (
                        <span className="text-[11px] font-mono uppercase px-2 py-0.5 border border-neutral-300 text-neutral-600 bg-neutral-100">
                          Placeholder — Work in Progress
                        </span>
                      )}
                    </div>
                    {project.metrics && (
                      <p className="text-xs font-mono text-neutral-800 bg-neutral-100 border border-neutral-200 inline-block px-2.5 py-1">
                        {project.metrics}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 transition-colors ${
                          isPlaceholder
                            ? 'bg-neutral-200 text-neutral-600 cursor-not-allowed pointer-events-none'
                            : 'bg-black text-white hover:bg-neutral-800'
                        }`}
                      >
                        <span>{link.label}</span>
                        {!isPlaceholder && <ArrowUpRight className="w-3.5 h-3.5" />}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 max-w-4xl">
                  {project.description}
                </p>

                {/* Highlights / Technical Architecture Bullet Points */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-6 space-y-2.5 pt-4 border-t border-neutral-100">
                    <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                      Key Technical Details
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                      {project.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start gap-2.5">
                          <span className="text-neutral-400 mt-1 font-mono text-xs">▸</span>
                          <span className="leading-normal">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack - Plain text and minimal outlined tags, NOT colored badges */}
                <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-neutral-400 mr-2">
                    Stack:
                  </span>
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-neutral-800 bg-white border border-neutral-300 px-2.5 py-0.5 rounded-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
