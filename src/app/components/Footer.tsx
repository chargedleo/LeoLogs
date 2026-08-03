import { Link } from 'react-router';
import { Feather, Twitter, Github, Linkedin, Rss } from 'lucide-react';

const footerLinks = {
  Content: [
    { label: 'All Articles', href: '/articles' },
    { label: 'Artificial Intelligence', href: '/articles?category=artificial-intelligence' },
    { label: 'Programming', href: '/articles?category=programming' },
    { label: 'Machine Learning', href: '/articles?category=machine-learning' },
    { label: 'Technology', href: '/articles?category=technology' },
  ],
  Community: [
    { label: 'Authors', href: '/authors/alex-chen' },
    { label: 'Newsletter', href: '/#newsletter' },
    { label: 'RSS Feed', href: '/rss' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Write for Us', href: '/write' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
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
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Long-form writing at the intersection of AI, engineering, and technology. Published by engineers, for engineers.
            </p>
            <div className="flex items-center gap-3">
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
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3
                className="text-foreground mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}
              >
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map(link => (
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
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 devlog. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with ♥ for the developer community.
          </p>
        </div>
      </div>
    </footer>
  );
}
