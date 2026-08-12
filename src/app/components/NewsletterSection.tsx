import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, Check } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20" id="newsletter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div
          className="relative rounded-3xl overflow-hidden p-12 text-center"
          style={{
            background: '#0A0A0A',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        >
          <div className="relative z-10">
            <h2
              className="text-white mb-4"
              style={{ fontFamily: "'Times New Roman', Georgia, serif", fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: 1.2 }}
            >
              Stay at the frontier of AI & engineering
            </h2>

            <p className="text-white/60 mb-10 max-w-lg mx-auto leading-relaxed text-sm">
              Deep dives, practical tutorials, and thoughtful essays — delivered every Tuesday. No noise, just signal. Join 24,000+ engineers and researchers.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-2xl border border-white/10"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">You're subscribed!</p>
                  <p className="text-sm text-white/60">Check your inbox for a confirmation.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 outline-none focus:border-white/40 transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors shrink-0 group"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}

            <p className="mt-4 text-white/35 text-xs">No spam. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
