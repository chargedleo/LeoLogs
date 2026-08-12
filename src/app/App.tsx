import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BlogListingPage } from './pages/BlogListingPage';
import { ArticlePage } from './pages/ArticlePage';
import { AuthorProfilePage } from './pages/AuthorProfilePage';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/articles" element={<Layout><BlogListingPage /></Layout>} />
          <Route path="/articles/:slug" element={<Layout><ArticlePage /></Layout>} />
          <Route path="/authors/:slug" element={<Layout><AuthorProfilePage /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <p
        className="text-primary mb-4"
        style={{ fontFamily: "'Times New Roman', Georgia, serif", fontWeight: 700, fontSize: '6rem', lineHeight: 1 }}
      >
        404
      </p>
      <h1
        className="text-foreground mb-3"
        style={{ fontFamily: "'Times New Roman', Georgia, serif", fontWeight: 700, fontSize: '1.75rem' }}
      >
        Page not found
      </h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Go home
      </a>
    </div>
  );
}
