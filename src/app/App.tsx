import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ArticlesListingPage } from './pages/ArticlesListingPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-neutral-200">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
          <Route path="/articles" element={<Layout><ArticlesListingPage /></Layout>} />
          <Route path="/articles/:slug" element={<Layout><ArticleDetailPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 text-center space-y-4">
      <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">
        Error 404
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Page Not Found
      </h1>
      <p className="text-sm text-neutral-600 max-w-sm">
        The route you followed does not exist or has been restructured.
      </p>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center px-5 py-2.5 bg-black text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
        >
          Return to home
        </Link>
      </div>
    </div>
  );
}
