import type { ElementType } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, Zap, BookOpen, Cpu, Code2, Globe, User, PenLine } from 'lucide-react';
import { BlogCard, FeaturedCard } from '../components/BlogCard';
import { NewsletterSection } from '../components/NewsletterSection';
import { articles, categories, authors, getAuthor } from '../data/mockData';

const categoryIcons: Record<string, ElementType> = {
  'artificial-intelligence': Cpu,
  'programming': Code2,
  'technology': Zap,
  'machine-learning': TrendingUp,
  'personal': PenLine,
  'open-source': Globe,
  'web-development': Globe,
  'ethics': BookOpen,
};

function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <span
        className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block"
      >
        {tag}
      </span>
      <h2
        className="text-foreground"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}
      >
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground mt-2 max-w-xl">{subtitle}</p>}
    </div>
  );
}

export function HomePage() {
  const featured = articles.find(a => a.isFeatured) || articles[0];
  const latest = articles.filter(a => !a.isFeatured).slice(0, 6);
  const trending = articles.filter(a => a.isTrending).slice(0, 4);
  const mainAuthor = authors[0];

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FeaturedCard article={featured} />
        </motion.div>
      </section>

      {/* Latest Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader tag="Fresh off the press" title="Latest Articles" />
          <Link
            to="/articles"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <BlogCard article={article} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 sm:hidden">
          <Link to="/articles">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
              View all articles <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SectionHeader tag="Find your focus" title="Browse by Category" subtitle="From AI research to career reflections — pick the topics that matter to you." />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => {
            const Icon = categoryIcons[cat.slug] || BookOpen;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  to={`/articles?category=${cat.slug}`}
                  className="group flex flex-col gap-3 p-5 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-200"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: cat.color + '15' }}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h3
                      className="text-foreground group-hover:text-primary transition-colors mb-0.5"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem' }}
                    >
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{cat.count} articles</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SectionHeader tag="What's hot" title="Trending Now" />
            <div className="space-y-1">
              {trending.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                >
                  <Link
                    to={`/articles/${article.slug}`}
                    className="group flex items-start gap-5 py-5 border-b border-border hover:bg-muted/40 -mx-4 px-4 rounded-xl transition-colors"
                  >
                    <span
                      className="text-5xl font-black shrink-0 select-none leading-none mt-1"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: 'var(--border)',
                        transition: 'color 0.2s',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium text-primary mb-1 block">
                        {categories.find(c => c.id === article.categoryId)?.name}
                      </span>
                      <h3
                        className="text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1rem', lineHeight: 1.35 }}
                      >
                        {article.title}
                      </h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <span>{getAuthor(article.authorId).name}</span>
                        <span>·</span>
                        <span>{article.readingTime} min read</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" />{(article.views / 1000).toFixed(1)}K views</span>
                      </p>
                    </div>
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-20 h-16 rounded-xl object-cover shrink-0 hidden sm:block"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Author Intro sidebar */}
          <div>
            <SectionHeader tag="About the author" title="Who writes here" />
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <img
                src={mainAuthor.avatar}
                alt={mainAuthor.name}
                className="w-16 h-16 rounded-2xl object-cover mb-4"
              />
              <h3
                className="text-foreground mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem' }}
              >
                {mainAuthor.name}
              </h3>
              <p className="text-sm text-primary font-medium mb-3">{mainAuthor.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{mainAuthor.bio}</p>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {Object.entries(mainAuthor.stats).map(([key, val]) => (
                  <div key={key} className="text-center p-2 bg-muted rounded-xl">
                    <p
                      className="text-foreground"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem' }}
                    >
                      {val}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">{key}</p>
                  </div>
                ))}
              </div>

              <Link
                to={`/authors/${mainAuthor.slug}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <User className="w-4 h-4" />
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />

      {/* Tags */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SectionHeader tag="Explore" title="Popular Topics" />
        <div className="flex flex-wrap gap-2">
          {['LLMs', 'Python', 'TypeScript', 'React', 'Transformers', 'RAG', 'Vector DB', 'Neural Networks', 'GPT', 'Fine-tuning', 'DevOps', 'Kubernetes', 'Open Source', 'Career', 'Writing', 'Rust', 'Embeddings', 'RLHF', 'Alignment', 'Inference', 'Prompting'].map(tag => (
            <Link
              key={tag}
              to={`/articles?tag=${tag}`}
              className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-muted transition-all duration-150"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
