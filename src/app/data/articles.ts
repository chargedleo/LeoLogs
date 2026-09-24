import type { ComponentType } from 'react';

export interface ArticleFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  readTime?: string;
}

export interface ArticleEntry {
  frontmatter: ArticleFrontmatter;
  slug: string;
  path: string;
  Component: ComponentType<any>;
}

// Auto-discover all article files under content/articles/*.mdx
const rawArticleFiles = import.meta.glob<{
  frontmatter: ArticleFrontmatter;
  default: ComponentType<any>;
}>('/content/articles/*.mdx', { eager: true });

export function getAllArticles(): ArticleEntry[] {
  const entries = Object.entries(rawArticleFiles);

  const articles: ArticleEntry[] = entries.map(([path, mod]) => {
    const rawFm = mod.frontmatter || (mod as any).meta || {};
    const filenameMatch = path.match(/\/([^/]+)\.mdx$/);
    const fallbackSlug = filenameMatch ? filenameMatch[1] : '';
    const slug = rawFm.slug || fallbackSlug;

    return {
      frontmatter: {
        title: rawFm.title || 'Untitled Article',
        date: rawFm.date || '',
        excerpt: rawFm.excerpt || '',
        slug,
        readTime: rawFm.readTime || '5 min read',
      },
      slug,
      path,
      Component: mod.default,
    };
  });

  // Sort newest first
  return articles.sort((a, b) => {
    const timeA = new Date(a.frontmatter.date).getTime();
    const timeB = new Date(b.frontmatter.date).getTime();
    return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
  });
}

export function getArticleBySlug(slug: string): ArticleEntry | undefined {
  const all = getAllArticles();
  return all.find((item) => item.slug === slug);
}
