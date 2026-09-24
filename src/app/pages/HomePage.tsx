import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import { getAllArticles } from '../data/articles';

export function HomePage() {
  const articles = getAllArticles().slice(0, 2);
  const featuredProjects = projects.filter((p) => !p.isPlaceholder).slice(0, 2);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24 border-b border-border">
        <div className="max-w-3xl space-y-6">
          {/* Status badge - technical, plain */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Available for AI/ML engineering roles</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Om Karmuse — AI/ML Developer building NLP &amp; LLM systems that hold up in production.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl font-normal">
            Specialized in retrieval-augmented generation (RAG), LangChain orchestration, vector search latency optimization, and deploying quantized local models that deliver deterministic performance.
          </p>

          {/* Primary CTA Buttons & Direct Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {/* Primary CTA: Solid black button with white text */}
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-sm hover:bg-neutral-800 transition-colors"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary Action: Read Articles */}
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-100 text-foreground text-sm font-medium rounded-sm border border-neutral-200 hover:bg-neutral-200 transition-colors"
            >
              <span>Read Articles</span>
            </Link>

            {/* Plain text link connectors */}
            <div className="flex items-center gap-4 text-xs font-medium text-neutral-600 pl-2 pt-1 sm:pt-0">
              <a
                href="https://github.com/chargedleo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 hover:text-black transition-colors underline underline-offset-4 decoration-neutral-300"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
              <a
                href="https://www.linkedin.com/in/omkarmuse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 hover:text-black transition-colors underline underline-offset-4 decoration-neutral-300"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
              <a
                href="mailto:omkarmuse@gmail.com"
                className="inline-flex items-center gap-0.5 hover:text-black transition-colors underline underline-offset-4 decoration-neutral-300"
              >
                <span>Email</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Currently & About Teaser Grid */}
      <section className="max-w-5xl mx-auto px-6 py-14 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Currently */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
              Currently
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              Evaluating local inference latency across DeepSeek reasoning checkpoints, building reproducible Dockerized RAG pipelines with FAISS, and experimenting with deterministic state simulation in game development.
            </p>
          </div>

          {/* About Teaser */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
              Background
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              B.Tech in Artificial Intelligence &amp; Data Science from VIIT Pune (CPI 7.95). Former software engineering intern at Byline Learning Solutions, focused on systems that prioritize accuracy and measurable latency over hype.
            </p>
            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:opacity-70 transition-opacity"
              >
                <span>Read full background</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Teaser */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-b border-border">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Featured Systems
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Production architectures evaluated against real latency and accuracy benchmarks.
            </p>
          </div>
          <Link
            to="/projects"
            className="text-xs font-semibold text-neutral-700 hover:text-black inline-flex items-center gap-1 transition-colors"
          >
            <span>All projects</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 md:p-7 border border-border bg-white rounded-xs hover:border-black transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {project.title}
                </h3>
                {project.metrics && (
                  <span className="text-xs font-mono text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-xs w-fit">
                    {project.metrics}
                  </span>
                )}
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-100">
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-neutral-500">
                  {project.stack.map((tech) => (
                    <span key={tech} className="after:content-['·'] last:after:content-none after:ml-3">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-black hover:opacity-70 transition-opacity"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Writing Teaser */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Technical Writing
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Field notes, architecture breakdowns, and engineering perspectives.
            </p>
          </div>
          <Link
            to="/articles"
            className="text-xs font-semibold text-neutral-700 hover:text-black inline-flex items-center gap-1 transition-colors"
          >
            <span>All articles</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="divide-y divide-border">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className="group block py-6 hover:bg-neutral-50/60 -mx-4 px-4 transition-colors rounded-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:underline underline-offset-4 decoration-neutral-400">
                  {article.frontmatter.title}
                </h3>
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 shrink-0">
                  <span>{article.frontmatter.date}</span>
                  {article.frontmatter.readTime && (
                    <>
                      <span>·</span>
                      <span>{article.frontmatter.readTime}</span>
                    </>
                  )}
                </div>
              </div>
              <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                {article.frontmatter.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
