import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogCard } from '../components/BlogCard';
import { articles, categories, allTags } from '../data/mockData';

const ITEMS_PER_PAGE = 9;

export function BlogListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const categoryParam = searchParams.get('category') || 'all';
  const tagParam = searchParams.get('tag') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedTag, setSelectedTag] = useState(tagParam);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...articles];
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(a => {
        const cat = categories.find(c => c.id === a.categoryId);
        return cat?.slug === selectedCategory;
      });
    }
    if (selectedTag) {
      result = result.filter(a => a.tags.includes(selectedTag));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [selectedCategory, selectedTag, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (slug === 'all') params.delete('category');
    else params.set('category', slug);
    setSearchParams(params);
  };

  const handleTagSelect = (tag: string) => {
    const next = selectedTag === tag ? '' : tag;
    setSelectedTag(next);
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (next) params.set('tag', next);
    else params.delete('tag');
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">The archive</span>
          <h1
            className="text-foreground mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em' }}
          >
            All Articles
          </h1>
          <p className="text-muted-foreground max-w-xl">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''} on AI, engineering, and technology. Search, filter, and explore.
          </p>
        </motion.div>

        {/* Search + filter toggle */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles, tags, topics…"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(v => !v)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
              showFilters ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {(selectedTag || selectedCategory !== 'all') && (
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            )}
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {[{ id: 'all', slug: 'all', name: 'All' }, ...categories].map(cat => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                selectedCategory === cat.slug
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {'icon' in cat && <span className="mr-1">{cat.icon}</span>}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tag chips (shown when filters open) */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="py-4 border-t border-b border-border mb-6">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Filter by tag</p>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagSelect(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedTag === tag
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {(selectedTag || selectedCategory !== 'all') && (
                  <button
                    onClick={() => { setSelectedTag(''); setSelectedCategory('all'); setPage(1); }}
                    className="mt-3 text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filter chips */}
        {(selectedTag || selectedCategory !== 'all') && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory !== 'all' && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                {categories.find(c => c.slug === selectedCategory)?.name}
                <button onClick={() => handleCategoryChange('all')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedTag && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                #{selectedTag}
                <button onClick={() => handleTagSelect(selectedTag)}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3
              className="text-foreground mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
            >
              No articles found
            </h3>
            <p className="text-muted-foreground text-sm mb-6">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedTag(''); }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <AnimatePresence mode="popLayout">
                {paginated.map((article, i) => (
                  <motion.div
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <BlogCard article={article} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      page === p
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
