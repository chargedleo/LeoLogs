import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Clock, Heart, Eye, ArrowRight } from 'lucide-react';
import { Article, getAuthor, getCategory, formatDate, formatViews } from '../data/mockData';

interface BlogCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'horizontal';
}

export function BlogCard({ article, variant = 'default' }: BlogCardProps) {
  const author = getAuthor(article.authorId);
  const category = getCategory(article.categoryId);

  if (variant === 'horizontal') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-foreground/5 transition-shadow duration-300"
      >
        <Link to={`/articles/${article.slug}`} className="flex flex-col sm:flex-row gap-0">
          <div className="sm:w-64 shrink-0 overflow-hidden bg-muted">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col justify-between p-6 flex-1">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: category.color + '18', color: category.color }}
                >
                  {category.name}
                </span>
                {article.isTrending && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400 font-medium">
                    Trending
                  </span>
                )}
              </div>
              <h3
                className="text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.05rem', lineHeight: 1.35 }}
              >
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{article.excerpt}</p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2.5">
                <img src={author.avatar} alt={author.name} className="w-7 h-7 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-medium text-foreground">{author.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(article.publishedAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readingTime}m</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{article.likes}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.15 }}
        className="group flex items-start gap-4 py-4 border-b border-border last:border-0"
      >
        <Link to={`/articles/${article.slug}`} className="flex items-start gap-4 w-full">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-20 h-16 rounded-xl object-cover shrink-0 bg-muted"
          />
          <div className="flex-1 min-w-0">
            <span
              className="text-xs font-medium mb-1 block"
              style={{ color: category.color }}
            >
              {category.name}
            </span>
            <h4
              className="text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.35 }}
            >
              {article.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{formatDate(article.publishedAt)}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readingTime}m read</span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-foreground/5 transition-all duration-300 flex flex-col"
    >
      <Link to={`/articles/${article.slug}`} className="block overflow-hidden bg-muted aspect-video">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: category.color + '18', color: category.color }}
          >
            {category.name}
          </span>
          {article.isTrending && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400 font-medium">
              Trending
            </span>
          )}
        </div>

        <Link to={`/articles/${article.slug}`}>
          <h3
            className="text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.35 }}
          >
            {article.title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4 flex-1">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2.5">
            <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full object-cover" />
            <div>
              <Link
                to={`/authors/${author.slug}`}
                className="text-xs font-medium text-foreground hover:text-primary transition-colors"
              >
                {author.name}
              </Link>
              <p className="text-xs text-muted-foreground">{formatDate(article.publishedAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readingTime}m</span>
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{formatViews(article.views)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedCard({ article }: { article: Article }) {
  const author = getAuthor(article.authorId);
  const category = getCategory(article.categoryId);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-foreground/10 transition-all duration-400"
    >
      <Link to={`/articles/${article.slug}`} className="block">
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/7' }}>
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs px-3 py-1.5 rounded-full font-semibold text-white"
                style={{ background: category.color }}
              >
                {category.name}
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/20 text-white font-medium backdrop-blur-sm">
                Featured
              </span>
            </div>

            <h2
              className="text-white mb-3 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.25rem, 3vw, 2rem)', lineHeight: 1.2 }}
            >
              {article.title}
            </h2>

            <p className="text-white/75 text-sm leading-relaxed mb-5 max-w-2xl line-clamp-2">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={author.avatar} alt={author.name} className="w-9 h-9 rounded-full border-2 border-white/30 object-cover" />
                <div>
                  <p className="text-sm font-semibold text-white">{author.name}</p>
                  <p className="text-xs text-white/65">{formatDate(article.publishedAt)} · {article.readingTime} min read</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-white/80 text-sm font-medium group/btn bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 transition-colors">
                Read article
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-24 bg-muted rounded-full" />
        <div className="h-5 bg-muted rounded-lg w-3/4" />
        <div className="h-4 bg-muted rounded-lg w-full" />
        <div className="h-4 bg-muted rounded-lg w-5/6" />
        <div className="flex gap-2 pt-2">
          <div className="h-5 w-16 bg-muted rounded-md" />
          <div className="h-5 w-16 bg-muted rounded-md" />
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted" />
            <div>
              <div className="h-3 w-24 bg-muted rounded mb-1" />
              <div className="h-3 w-16 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
