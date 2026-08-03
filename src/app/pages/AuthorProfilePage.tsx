import type { ElementType } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { Twitter, Github, Linkedin, Globe, BookOpen, Eye, Users, ArrowRight } from 'lucide-react';
import { BlogCard } from '../components/BlogCard';
import { NewsletterSection } from '../components/NewsletterSection';
import { authors, getArticlesByAuthor, formatViews } from '../data/mockData';

export function AuthorProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const author = authors.find(a => a.slug === slug) || authors[0];
  const authorArticles = getArticlesByAuthor(author.id);
  const featuredArticles = authorArticles.slice(0, 2);
  const recentArticles = authorArticles.slice(2);

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

  const stats: { label: string; value: string; Icon: ElementType }[] = [
    { label: 'Articles', value: String(author.stats.posts), Icon: BookOpen },
    { label: 'Total Views', value: author.stats.views, Icon: Eye },
    { label: 'Followers', value: author.stats.followers, Icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Profile header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 60%, #06B6D4 100%)',
          minHeight: '320px',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
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
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white/30 shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-emerald-400 border-2 border-white" />
            </div>
            <div className="text-white">
              <h1
                className="text-white mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.03em' }}
              >
                {author.name}
              </h1>
              <p className="text-white/75 mb-4">{author.role}</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ Icon, label, href, display }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white/90 text-xs font-medium hover:bg-white/25 transition-colors backdrop-blur-sm"
                  >
                    <Icon className="w-3.5 h-3.5" /> {display}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="grid grid-cols-3 gap-4"
        >
          {stats.map(({ label, value, Icon }) => (
            <div
              key={label}
              className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center text-center shadow-lg shadow-foreground/5"
            >
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <p
                className="text-foreground mb-0.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '1.5rem' }}
              >
                {value}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left — Bio + Social */}
          <div>
            <div className="bg-card border border-border rounded-2xl p-6 mb-6 sticky top-24">
              <h2
                className="text-foreground mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem' }}
              >
                About
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{author.longBio}</p>

              <h3
                className="text-foreground mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
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
                    <Icon className="w-4 h-4 text-primary shrink-0" />
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
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.3rem', letterSpacing: '-0.02em' }}
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
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.3rem', letterSpacing: '-0.02em' }}
                >
                  All Articles
                  <span
                    className="ml-2 text-sm text-muted-foreground"
                    style={{ fontWeight: 400 }}
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

      <NewsletterSection />
    </div>
  );
}
