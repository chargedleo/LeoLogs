import { useParams, Link } from 'react-router';
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { getArticleBySlug } from '../data/articles';

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center space-y-6">
        <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">
          404 / Missing Entry
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Article Not Found
        </h1>
        <p className="text-sm text-neutral-600 max-w-md mx-auto">
          The article you are looking for does not exist or may have been renamed.
        </p>
        <div>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to articles</span>
          </Link>
        </div>
      </div>
    );
  }

  const { frontmatter, Component } = article;

  return (
    <article className="w-full py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            to="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-black transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 border-b border-border pb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 opacity-60" />
              <time dateTime={frontmatter.date}>{frontmatter.date}</time>
            </span>
            {frontmatter.readTime && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 opacity-60" />
                  <span>{frontmatter.readTime}</span>
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
            {frontmatter.title}
          </h1>

          {frontmatter.excerpt && (
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              {frontmatter.excerpt}
            </p>
          )}
        </header>

        {/* Article Body - Typographic styles, monochrome code blocks */}
        <div className="article-body space-y-6 text-base text-neutral-800 leading-relaxed font-normal">
          <Component />
        </div>

        {/* Article Footer & Author Signature */}
        <footer className="pt-12 mt-16 border-t border-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Author
              </p>
              <p className="text-sm font-semibold text-foreground">
                Om Karmuse
              </p>
              <p className="text-xs text-neutral-500">
                AI/ML Developer · Pune, India
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href="https://github.com/chargedleo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-600 hover:text-black underline underline-offset-4 decoration-neutral-300 transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://www.linkedin.com/in/omkarmuse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-600 hover:text-black underline underline-offset-4 decoration-neutral-300 transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="mailto:omkarmuse@gmail.com"
                className="inline-flex items-center gap-1 text-neutral-600 hover:text-black underline underline-offset-4 decoration-neutral-300 transition-colors"
              >
                <span>Email</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center text-xs">
            <Link
              to="/articles"
              className="inline-flex items-center gap-1.5 font-semibold text-black hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>More articles</span>
            </Link>
            <Link
              to="/projects"
              className="font-semibold text-black hover:opacity-70 transition-opacity"
            >
              View engineered systems →
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
