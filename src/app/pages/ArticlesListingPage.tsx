import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { getAllArticles } from '../data/articles';

export function ArticlesListingPage() {
  const articles = getAllArticles();

  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 space-y-14">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 border-b border-border pb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            Writing / Field Notes
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Articles &amp; Technical Notes
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed font-normal">
            Essays, architecture breakdowns, and post-mortems on LLM orchestration, evaluation metrics, and systems engineering.
          </p>
        </div>

        {/* Articles List - Text-first, generous whitespace */}
        <div className="divide-y divide-border">
          {articles.map((article) => (
            <article key={article.slug} className="py-8 first:pt-0 group">
              <Link
                to={`/articles/${article.slug}`}
                className="block space-y-3"
              >
                {/* Meta Row: Date + Read time */}
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
                  <time dateTime={article.frontmatter.date}>
                    {article.frontmatter.date}
                  </time>
                  {article.frontmatter.readTime && (
                    <>
                      <span>·</span>
                      <span>{article.frontmatter.readTime}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-black group-hover:underline underline-offset-4 decoration-neutral-400 transition-colors">
                  {article.frontmatter.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-3xl">
                  {article.frontmatter.excerpt}
                </p>

                {/* Read prompt */}
                <div className="pt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-black group-hover:opacity-70 transition-opacity">
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
