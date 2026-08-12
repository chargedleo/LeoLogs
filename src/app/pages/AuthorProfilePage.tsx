import type { ElementType } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { Twitter, Github, Linkedin, Globe, BookOpen, ArrowRight } from 'lucide-react';
import { BlogCard } from '../components/BlogCard';
import { authors, getArticlesByAuthor } from '../data/mockData';

const HEADING_FONT = "'Times New Roman', Georgia, serif";

export function AuthorProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const author = authors.find(a => a.slug === slug) || authors[0];
  const authorArticles = getArticlesByAuthor(author.id);
  const featuredArticles = authorArticles.slice(0, 2);

  const socialLinks = [
    author.social.twitter && {
      Icon: Twitter, label: 'Twitter', href: `https://twitter.com/${author.social.twitter}`, display: `@${author.social.twitter}`,
    },
    author.social.github && {
      Icon: Github, label: 'GitHub', href: `https://github.com/${author.social.github}`, display: author.social.github,
    },
    author.social.linkedin && {
      Icon: Linkedin, label: 'LinkedIn', href: `https://linkedin.com/in/${author.social.linkedin}`, display: author.social.linkedin,
    },
    author.social.website && {
      Icon: Globe, label: 'Website', href: `https://${author.social.website}`, display: author.social.website,
    },
  ].filter(Boolean) as { Icon: ElementType; label: string; href: string; display: string }[];

  return (
    <div className="min-h-screen bg-background">
      {/* Profile header — monochromatic black with subtle dot grid */}
      <div
        className="relative overflow-hidden"
        style={{
          background: '#0A0A0A',
          minHeight: '280px',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-end gap-6"
          >
            <div className="relative">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-white/15 shadow-xl"
              />
              {/* Subtle online indicator */}
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border-2 border-[#0A0A0A]" />
            </div>
            <div className="text-white">
              <h1
                className="text-white mb-1"
                style={{ fontFamily: HEADING_FONT, fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
              >
                {author.name}
              </h1>
              <p className="text-white/60 mb-4 text-sm">{author.role}</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ Icon, label, href, display }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium hover:bg-white/20 transition-colors border border-white/10"
                  >
                    <Icon className="w-3.5 h-3.5" /> {display}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article count strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-card border border-border rounded-xl">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{author.stats.posts} articles published</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left — Bio + Social */}
          <div>
            <div className="bg-card border border-border rounded-2xl p-6 mb-6 sticky top-24">
              <h2
                className="text-foreground mb-4"
                style={{ fontFamily: HEADING_FONT, fontWeight: 700, fontSize: '1.1rem' }}
              >
                About
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{author.longBio}</p>

              <h3
                className="text-foreground mb-3"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                Connect
              </h3>
              <div className="space-y-2">
                {socialLinks.map(({ Icon, label, href, display }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted hover:bg-muted/70 text-sm text-muted-foreground hover:text-foreground transition-all group"
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{display}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Articles */}
          <div className="lg:col-span-2">
            {/* Featured posts */}
            {featuredArticles.length > 0 && (
              <div className="mb-12">
                <h2
                  className="text-foreground mb-6"
                  style={{ fontFamily: HEADING_FONT, fontWeight: 700, fontSize: '1.3rem' }}
                >
                  Featured Posts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {featuredArticles.map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <BlogCard article={article} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* All articles */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-foreground"
                  style={{ fontFamily: HEADING_FONT, fontWeight: 700, fontSize: '1.3rem' }}
                >
                  All Articles
                  <span
                    className="ml-2 text-sm text-muted-foreground"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
                  >
                    ({authorArticles.length})
                  </span>
                </h2>
              </div>

              {authorArticles.length === 0 ? (
                <div className="text-center py-16 bg-card border border-border rounded-2xl">
                  <p className="text-muted-foreground">No articles yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {authorArticles.map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                    >
                      <BlogCard article={article} variant="horizontal" />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
