import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'motion/react';
import {
  Clock, Eye, Heart, Share2, Bookmark, Twitter,
  Linkedin, Link2, ChevronRight, MessageSquare, ThumbsUp,
  ArrowLeft, Info, Lightbulb, AlertTriangle,
} from 'lucide-react';
import { BlogCard } from '../components/BlogCard';
import { articles, getAuthor, getCategory, getRelatedArticles, comments, formatDate, formatViews, ContentBlock } from '../data/mockData';

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-border">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1a2e] border-b border-white/10">
        <span className="text-xs text-white/50 font-mono">{language}</span>
        <button
          onClick={copy}
          className="text-xs text-white/50 hover:text-white/80 transition-colors px-3 py-1 rounded-md hover:bg-white/10"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-6 bg-[#0d0d1a] overflow-x-auto">
        <code
          className="text-sm text-[#a8b5d9] leading-relaxed"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}

function BlockQuote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <blockquote className="my-8 pl-6 border-l-4 border-primary">
      <p
        className="text-foreground italic leading-relaxed mb-2"
        style={{ fontSize: '1.15rem', fontFamily: "'Space Grotesk', sans-serif" }}
      >
        "{text}"
      </p>
      {attribution && (
        <footer className="text-sm text-muted-foreground">— {attribution}</footer>
      )}
    </blockquote>
  );
}

function Callout({ text, variant }: { text: string; variant: 'info' | 'tip' | 'warning' }) {
  const map = {
    info: { Icon: Info, bg: 'bg-blue-50 dark:bg-blue-950/40', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-800 dark:text-blue-200', label: 'Note' },
    tip: { Icon: Lightbulb, bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-800 dark:text-emerald-200', label: 'Tip' },
    warning: { Icon: AlertTriangle, bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-800 dark:text-amber-200', label: 'Warning' },
  };
  const { Icon, bg, border, text: textColor, label } = map[variant];
  return (
    <div className={`my-6 flex gap-4 p-5 rounded-xl border ${bg} ${border}`}>
      <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${textColor}`} />
      <div>
        <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${textColor}`}>{label}</p>
        <p className={`text-sm leading-relaxed ${textColor}`}>{text}</p>
      </div>
    </div>
  );
}

function renderContent(blocks: ContentBlock[]) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={i} className="text-foreground leading-[1.85] mb-6" style={{ fontSize: '1.0625rem' }}>
            {block.text}
          </p>
        );
      case 'h2':
        return (
          <h2
            key={i}
            id={block.id}
            className="text-foreground mt-14 mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.65rem', letterSpacing: '-0.02em', scrollMarginTop: '5rem' }}
          >
            {block.text}
          </h2>
        );
      case 'h3':
        return (
          <h3
            key={i}
            id={block.id}
            className="text-foreground mt-10 mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.25rem', letterSpacing: '-0.01em', scrollMarginTop: '5rem' }}
          >
            {block.text}
          </h3>
        );
      case 'code':
        return <CodeBlock key={i} code={block.code} language={block.language} />;
      case 'quote':
        return <BlockQuote key={i} text={block.text} attribution={block.attribution} />;
      case 'image':
        return (
          <figure key={i} className="my-10">
            <img
              src={block.src}
              alt={block.alt}
              className="w-full rounded-2xl object-cover"
              style={{ maxHeight: '480px' }}
            />
            {block.caption && (
              <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">{block.caption}</figcaption>
            )}
          </figure>
        );
      case 'list':
        return block.ordered ? (
          <ol key={i} className="list-decimal list-outside ml-6 mb-6 space-y-2">
            {block.items.map((item, j) => (
              <li key={j} className="text-foreground leading-relaxed pl-2" style={{ fontSize: '1.0625rem' }}>{item}</li>
            ))}
          </ol>
        ) : (
          <ul key={i} className="list-none ml-0 mb-6 space-y-2">
            {block.items.map((item, j) => (
              <li key={j} className="flex gap-3 text-foreground leading-relaxed" style={{ fontSize: '1.0625rem' }}>
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        );
      case 'callout':
        return <Callout key={i} text={block.text} variant={block.variant} />;
      default:
        return null;
    }
  });
}

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug) || articles[0];
  const author = getAuthor(article.authorId);
  const category = getCategory(article.categoryId);
  const related = getRelatedArticles(article);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [activeToc, setActiveToc] = useState('');
  const [shareOpen, setShareOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!article.toc.length) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveToc(entry.target.id);
        });
      },
      { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
    );
    article.toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [article.toc, slug]);

  const handleLike = () => {
    setLiked(v => !v);
    setLikeCount(c => liked ? c - 1 : c + 1);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back nav */}
        <div className="py-4">
          <Link
            to="/articles"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden mb-10 bg-muted"
          style={{ aspectRatio: '21/8' }}
        >
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 pb-20">
          {/* Main content */}
          <main>
            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ background: category.color + '18', color: category.color }}
              >
                {category.name}
              </span>
              {article.isTrending && (
                <span className="text-xs px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400 font-medium">
                  Trending
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-foreground mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
              }}
            >
              {article.title}
            </h1>

            {/* Lead */}
            <p
              className="text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary/30 pl-5"
              style={{ fontSize: '1.1rem' }}
            >
              {article.excerpt}
            </p>

            {/* Author + meta strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-8 mb-8 border-b border-border">
              <Link to={`/authors/${author.slug}`} className="flex items-center gap-3 group">
                <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full object-cover border-2 border-border" />
                <div>
                  <p
                    className="text-foreground group-hover:text-primary transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                  >
                    {author.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{author.role}</p>
                </div>
              </Link>

              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                <span>{formatDate(article.publishedAt)}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readingTime} min read</span>
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{formatViews(article.views)} views</span>
              </div>
            </div>

            {/* Article body */}
            <div ref={contentRef} className="article-body">
              {article.content.length > 0 ? (
                renderContent(article.content)
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">Full article content is available in the featured article.</p>
                  <Link
                    to={`/articles/${articles[0].slug}`}
                    className="inline-block mt-4 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Read Featured Article
                  </Link>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
              <span className="text-sm text-muted-foreground mr-2">Tagged:</span>
              {article.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/articles?tag=${tag}`}
                  className="px-3 py-1.5 bg-muted border border-border rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Action bar */}
            <div className="flex items-center justify-between mt-8 py-5 border-t border-b border-border">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    liked
                      ? 'bg-red-50 text-red-500 dark:bg-red-950/40'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  {likeCount.toLocaleString()}
                </button>

                <button
                  onClick={() => setBookmarked(v => !v)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    bookmarked
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  {bookmarked ? 'Saved' : 'Save'}
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShareOpen(v => !v)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                {shareOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-lg p-2 w-44 z-10">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <Twitter className="w-4 h-4" /> Share on X
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <Linkedin className="w-4 h-4" /> Share on LinkedIn
                    </a>
                    <button
                      onClick={copyLink}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted w-full transition-colors"
                    >
                      <Link2 className="w-4 h-4" /> Copy link
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Author card */}
            <div className="mt-10 p-6 bg-card border border-border rounded-2xl flex flex-col sm:flex-row gap-5">
              <img src={author.avatar} alt={author.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
              <div>
                <Link
                  to={`/authors/${author.slug}`}
                  className="inline-block text-foreground hover:text-primary transition-colors mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem' }}
                >
                  {author.name}
                </Link>
                <p className="text-sm text-primary font-medium mb-3">{author.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{author.bio}</p>
                <Link
                  to={`/authors/${author.slug}`}
                  className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary font-medium hover:text-primary/80 group transition-colors"
                >
                  View all articles <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Comments */}
            <div className="mt-14">
              <h2
                className="text-foreground mb-6 flex items-center gap-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.4rem' }}
              >
                <MessageSquare className="w-5 h-5" />
                Discussion ({comments.length})
              </h2>

              <div className="space-y-6 mb-8">
                {comments.map(comment => (
                  <div key={comment.id} className="flex gap-4">
                    <img src={comment.authorAvatar} alt={comment.authorName} className="w-10 h-10 rounded-full object-cover shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="bg-muted rounded-2xl px-5 py-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-foreground"
                            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem' }}
                          >
                            {comment.authorName}
                          </span>
                          <span className="text-muted-foreground text-xs">{formatDate(comment.publishedAt)}</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{comment.content}</p>
                      </div>
                      <button className="flex items-center gap-1.5 mt-2 ml-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" /> {comment.likes} likes
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment input */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <p
                  className="text-foreground mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.95rem' }}
                >
                  Leave a comment
                </p>
                <textarea
                  placeholder="Share your thoughts…"
                  rows={3}
                  className="w-full bg-muted border-0 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 resize-none transition-all"
                />
                <div className="flex justify-end mt-3">
                  <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                    Post comment
                  </button>
                </div>
              </div>
            </div>
          </main>

          {/* Sidebar — sticky TOC */}
          <aside>
            {article.toc.length > 0 && (
              <div className="sticky top-24">
                <div className="bg-card border border-border rounded-2xl p-5 mb-6">
                  <p
                    className="text-foreground mb-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  >
                    Table of Contents
                  </p>
                  <nav className="space-y-1">
                    {article.toc.map(item => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block py-1.5 px-3 rounded-lg text-sm transition-all duration-150 leading-snug ${
                          activeToc === item.id
                            ? 'text-primary bg-accent font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        } ${item.level === 3 ? 'pl-6' : ''}`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Share sidebar */}
                <div className="bg-card border border-border rounded-2xl p-5">
                  <p
                    className="text-foreground mb-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  >
                    Share
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: 'Share on X', Icon: Twitter, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}` },
                      { label: 'Share on LinkedIn', Icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
                    ].map(({ label, Icon, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Icon className="w-4 h-4" /> {label}
                      </a>
                    ))}
                    <button
                      onClick={() => navigator.clipboard.writeText(window.location.href)}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-muted text-sm text-muted-foreground hover:text-foreground w-full transition-colors"
                    >
                      <Link2 className="w-4 h-4" /> Copy link
                    </button>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="pb-20 border-t border-border pt-16">
            <h2
              className="text-foreground mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em' }}
            >
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(a => (
                <BlogCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
