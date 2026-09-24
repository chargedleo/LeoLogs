import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-white mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          {/* Identity & Stance */}
          <div className="space-y-2 max-w-sm">
            <p className="text-sm font-semibold tracking-tight text-foreground">
              Om Karmuse
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              AI/ML developer building production NLP &amp; LLM retrieval architectures. 
              B.Tech in AI &amp; Data Science (VIIT Pune).
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2 text-xs">
            <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
              Pages
            </span>
            <Link to="/" className="text-neutral-500 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/projects" className="text-neutral-500 hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link to="/articles" className="text-neutral-500 hover:text-foreground transition-colors">
              Articles
            </Link>
            <Link to="/about" className="text-neutral-500 hover:text-foreground transition-colors">
              About
            </Link>
          </div>

          {/* Social / Direct Links - Plain text links, NOT icon bubbles */}
          <div className="flex flex-col space-y-2 text-xs">
            <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
              Connect
            </span>
            <a
              href="mailto:omkarmuse@gmail.com"
              className="text-neutral-500 hover:text-foreground underline underline-offset-4 decoration-neutral-300 hover:decoration-black transition-colors"
            >
              Email (omkarmuse@gmail.com)
            </a>
            <a
              href="https://github.com/chargedleo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-foreground underline underline-offset-4 decoration-neutral-300 hover:decoration-black transition-colors"
            >
              GitHub (chargedleo)
            </a>
            <a
              href="https://www.linkedin.com/in/omkarmuse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-foreground underline underline-offset-4 decoration-neutral-300 hover:decoration-black transition-colors"
            >
              LinkedIn (omkarmuse)
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Om Karmuse. All rights reserved.</p>
          <p className="font-mono text-[11px]">Static build · No tracking · Zero backend</p>
        </div>
      </div>
    </footer>
  );
}
