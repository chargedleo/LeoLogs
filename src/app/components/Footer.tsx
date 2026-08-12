import { Link } from 'react-router';
import { Feather, Twitter, Github, Linkedin, Rss } from 'lucide-react';

const contentLinks = [
  { label: 'All Articles', href: '/articles' },
  { label: 'Artificial Intelligence', href: '/articles?category=artificial-intelligence' },
  { label: 'Programming', href: '/articles?category=programming' },
  { label: 'Machine Learning', href: '/articles?category=machine-learning' },
  { label: 'Technology', href: '/articles?category=technology' },
  { label: 'Web Development', href: '/articles?category=web-development' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-foreground flex items-center justify-center">
                <Feather className="w-3.5 h-3.5 text-background" />
              </div>
              <span
                className="text-foreground"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.01em' }}
              >
                LeoLogs
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Long-form writing at the intersection of AI, engineering, and technology. Published by engineers, for engineers.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Rss, href: '#', label: 'RSS' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Content links */}
          <div>
            <h3
              className="text-foreground mb-4"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Content
            </h3>
            <ul className="space-y-2">
              {contentLinks.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2026 LeoLogs. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for the developer community.
          </p>
        </div>
      </div>
    </footer>
  );
}
