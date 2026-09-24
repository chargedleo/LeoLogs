import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/articles', label: 'Articles' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xs border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          <span className="w-2 h-2 rounded-full bg-black inline-block" />
          <span>Om Karmuse</span>
          <span className="text-xs text-muted-foreground font-mono font-normal ml-1 border-l border-border pl-2 hidden sm:inline">
            AI / ML
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative py-1 font-medium transition-colors ${
                  active
                    ? 'text-foreground font-semibold'
                    : 'text-neutral-500 hover:text-foreground'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black" />
                )}
              </Link>
            );
          })}

          <a
            href="https://github.com/chargedleo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-foreground transition-colors ml-2"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground hover:bg-neutral-100 rounded-md transition-colors"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-white px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`text-sm py-2 font-medium transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-foreground font-semibold'
                  : 'text-neutral-500 hover:text-foreground'
              }`}
            >
              Home
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm py-2 font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-foreground font-semibold'
                    : 'text-neutral-500 hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/chargedleo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm py-2 font-medium text-neutral-500 hover:text-foreground transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
