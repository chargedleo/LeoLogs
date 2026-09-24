import { ArrowUpRight, GraduationCap, Briefcase, Code2, Gamepad2, PenTool } from 'lucide-react';
import { Link } from 'react-router';

export function AboutPage() {
  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 border-b border-border pb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            About / Profile
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Om Karmuse
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            AI/ML developer focused on NLP architectures, retrieval-augmented generation (RAG), and deploying quantized models that hold up under production constraints.
          </p>
        </div>

        {/* Core Bio / Stance */}
        <section className="max-w-3xl space-y-6 text-base text-neutral-700 leading-relaxed">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Engineering Perspective
          </h2>
          <p>
            Much of modern AI development focuses on model demonstration rather than model reliability. My engineering work is centered on the gap in between: ensuring retrieval pipelines surface accurate context, chunking strategies preserve semantic document hierarchies, and local inference models operate within strict latency and memory constraints.
          </p>
          <p>
            Whether implementing HNSW vector indexing in FAISS or benchmarking 4-bit DeepSeek R1 reasoning checkpoints, I prioritize measurable benchmarks—sub-second p95 latency, verified answer relevance, and containerized reproducibility—over prototype gimmicks.
          </p>
        </section>

        {/* Education & Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-border">
          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
              <GraduationCap className="w-4 h-4 text-black" />
              <span>Education</span>
            </div>

            <div className="p-6 border border-border bg-white space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-base font-bold tracking-tight text-foreground">
                  B.Tech in Artificial Intelligence &amp; Data Science
                </h3>
                <span className="text-xs font-mono text-neutral-500 shrink-0">
                  CPI 7.95
                </span>
              </div>
              <p className="text-sm font-medium text-neutral-600">
                Vishwakarma Institute of Information Technology (VIIT Pune)
              </p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Focused coursework on Natural Language Processing, Machine Learning, Deep Learning, High-Performance Computing, and Database Architecture.
              </p>
            </div>
          </div>

          {/* Industry Experience */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
              <Briefcase className="w-4 h-4 text-black" />
              <span>Industry Experience</span>
            </div>

            <div className="p-6 border border-border bg-white space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-base font-bold tracking-tight text-foreground">
                  Software Engineering Intern
                </h3>
                <span className="text-xs font-mono text-neutral-500 shrink-0">
                  Internship
                </span>
              </div>
              <p className="text-sm font-medium text-neutral-600">
                Byline Learning Solutions
              </p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Contributed to automated data extraction pipelines, text classification models, and backend workflow integration. Focused on clean modular code and reproducible testing environments.
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Interests / Dual Pillars */}
        <section className="space-y-6 pt-4 border-t border-border">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Ancillary Engineering &amp; Interests
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Game Development */}
            <div className="p-6 border border-border bg-white space-y-3">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-black" />
                <h3 className="text-base font-semibold text-foreground">
                  Game Development &amp; Systems Programming
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Exploring simulation loops, deterministic state synchronization, and spatial indexing in C# and Godot. Game programming serves as a rigorous playground for cache locality, memory layout, and real-time performance constraints.
              </p>
            </div>

            {/* Tech Journalism & Writing */}
            <div className="p-6 border border-border bg-white space-y-3">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-black" />
                <h3 className="text-base font-semibold text-foreground">
                  Technical Journalism &amp; Dissection
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Passionate about analyzing foundational AI papers, deconstructing architecture claims, and writing clean, candid post-mortems. Clear writing is proof of clear engineering thinking.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Stack Summary */}
        <section className="space-y-6 pt-4 border-t border-border">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Technical Toolchain
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
            <div className="space-y-2">
              <p className="font-mono uppercase tracking-wider text-neutral-400">
                Core AI / ML
              </p>
              <ul className="space-y-1 text-neutral-700 font-mono">
                <li>Python</li>
                <li>LangChain</li>
                <li>FAISS</li>
                <li>Hugging Face</li>
                <li>PyTorch</li>
                <li>Ollama / GGUF</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-mono uppercase tracking-wider text-neutral-400">
                Backend &amp; Infra
              </p>
              <ul className="space-y-1 text-neutral-700 font-mono">
                <li>FastAPI</li>
                <li>Docker</li>
                <li>PostgreSQL</li>
                <li>Linux / Bash</li>
                <li>REST / SSE</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-mono uppercase tracking-wider text-neutral-400">
                Systems &amp; Game Dev
              </p>
              <ul className="space-y-1 text-neutral-700 font-mono">
                <li>C#</li>
                <li>Godot</li>
                <li>Data Structures</li>
                <li>Algorithms</li>
                <li>Git Versioning</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-mono uppercase tracking-wider text-neutral-400">
                Frontend &amp; Tools
              </p>
              <ul className="space-y-1 text-neutral-700 font-mono">
                <li>TypeScript</li>
                <li>React</li>
                <li>Tailwind CSS</li>
                <li>Streamlit</li>
                <li>MDX</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact / Direct Links */}
        <section className="pt-8 border-t border-border space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Contact &amp; Connect
          </h2>
          <p className="text-sm text-neutral-600 max-w-xl">
            I am always open to discussing AI/ML engineering positions, technical writing, or collaboration on systems architectures.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-2">
            <a
              href="mailto:omkarmuse@gmail.com"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white hover:bg-neutral-800 transition-colors"
            >
              <span>omkarmuse@gmail.com</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/chargedleo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-300 text-black hover:border-black transition-colors"
            >
              <span>GitHub (chargedleo)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/omkarmuse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-300 text-black hover:border-black transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
