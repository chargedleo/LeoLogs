import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun, Moon, Search, Menu, X, Feather, ChevronDown,
} from 'lucide-react';
import { Button } from './ui/button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles' },
  {
    label: 'Categories',
    href: '/categories',
    children: [
      { label: 'Artificial Intelligence', href: '/articles?category=artificial-intelligence' },
      { label: 'Programming', href: '/articles?category=programming' },
      { label: 'Machine Learning', href: '/articles?category=machine-learning' },
      { label: 'Technology', href: '/articles?category=technology' },
      { label: 'Web Development', href: '/articles?category=web-development' },
      { label: 'Personal', href: '/articles?category=personal' },
    ],
  },
  { label: 'About', href: '/authors/alex-chen' },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  useEffect(() => { setMobileOpen(false); setSearchOpen(false); }, [location.pathname]);

  const isDark = mounted && theme === 'dark';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-card/95 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Feather className="w-4 h-4 text-primary-foreground" />
              </div>
              <span
                className="text-foreground"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}
              >
                devlog
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                link.children ? (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() => setCategoriesOpen(v => !v)}
                      onBlur={() => setTimeout(() => setCategoriesOpen(false), 200)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                        location.pathname.startsWith('/articles')
                          ? 'text-primary bg-accent'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {categoriesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-52 bg-card border border-border rounded-xl shadow-lg overflow-hidden py-1"
                        >
                          {link.children.map(child => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                      location.pathname === link.href
                        ? 'text-primary bg-accent'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(v => !v)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              {mounted && (
                <button
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}
              <Link to="/articles" className="hidden md:block">
                <Button size="sm" className="h-8 px-4 text-xs" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                  Start Writing
                </Button>
              </Link>
              <button
                className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border bg-card/95 backdrop-blur-md overflow-hidden"
            >
              <div className="max-w-3xl mx-auto px-4 py-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search articles, topics, authors…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border-0 outline-none text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border bg-card/95 backdrop-blur-md overflow-hidden"
            >
              <nav className="px-4 py-4 space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.href || link.label}
                    to={link.href || '/articles'}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      location.pathname === (link.href || '/articles')
                        ? 'text-primary bg-accent'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
