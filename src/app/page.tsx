'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="bg-bg-primary">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-pink-dim border border-pink-border px-4 py-2 rounded-full mb-6">
              <span>✦</span>
              <span className="text-xs font-semibold text-pink-light uppercase tracking-wide">
                Exclusively for university students
              </span>
            </div>
            <h1 className="font-syne font-extrabold text-5xl lg:text-6xl leading-tight mb-6">
              Your campus,<br />
              your <span className="text-pink-primary">connections.</span>
            </h1>
            <p className="text-lg text-text-muted leading-relaxed mb-8 max-w-lg">
              UniPair is the safest, women-first dating platform built for university students. Browse profiles like a store — discover, request, and connect only when you're both ready.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/signup"
                className="px-8 py-4 bg-pink-primary hover:bg-pink-hover text-white font-medium rounded-full transition text-center"
              >
                Join for free →
              </Link>
              <button 
                onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border border-border-secondary text-text-primary hover:text-text-primary rounded-full transition"
              >
                See how it works
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-bold text-pink-primary mb-1">100%</div>
                <div className="text-sm text-text-muted">Free for women</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-primary mb-1">9</div>
                <div className="text-sm text-text-muted">Verification steps</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-primary mb-1">🔒</div>
                <div className="text-sm text-text-muted">Privacy first</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-primary mb-1">♡</div>
                <div className="text-sm text-text-muted">Women in control</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 right-0 bg-bg-tertiary border border-pink-border rounded-2xl px-4 py-2 text-xs text-pink-light font-semibold whitespace-nowrap z-10">
              🔒 Details hidden until accepted
            </div>
            <div className="bg-bg-secondary border border-border-secondary rounded-3xl overflow-hidden">
              <div className="grid grid-cols-2 gap-px">
                <div className="bg-bg-tertiary h-32 flex items-center justify-center text-5xl">👩‍💼</div>
                <div className="bg-gradient-to-br from-blue-900/30 to-black/30 h-32 flex items-center justify-center text-3xl">📚</div>
              </div>
              <div className="grid grid-cols-2 gap-px">
                <div className="bg-gradient-to-br from-purple-900/30 to-black/30 h-32 flex items-center justify-center text-3xl">🎨</div>
                <div className="bg-bg-tertiary h-32 flex items-center justify-center text-3xl">🌟</div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">Priya M., 20</h3>
                <p className="text-xs text-text-muted mb-4">
                  Mumbai University · Computer Science · 2026
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Serious', 'Offline', 'Reading', 'Art'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-pink-dim border border-pink-border text-pink-light text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-pink-primary hover:bg-pink-hover text-white font-medium py-2 rounded-full text-sm transition">
                    Send Request 💌
                  </button>
                  <button className="px-4 py-2 bg-bg-quaternary text-text-muted border border-border-primary rounded-full text-sm hover:text-text-primary transition">
                    Pass
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-border-primary" />

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20" id="how">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-12">
            <div>
              <div className="text-pink-primary text-xs font-bold uppercase tracking-wider mb-2">How it works</div>
              <h2 className="font-syne font-extrabold text-4xl leading-tight mb-4">
                Browse. Request.<br />
                Connect.
              </h2>
            </div>
            <p className="text-lg text-text-muted leading-relaxed">
              Think of it like online shopping — but for meaningful campus connections. You discover profiles, send a request, and only when she accepts does the conversation begin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                icon: '🔍',
                title: 'Browse profiles',
                desc: 'Discover verified university students. Filter by course, hobby, grad year, or what you're looking for.',
              },
              {
                num: '02',
                icon: '💌',
                title: 'Send a request',
                desc: 'Like someone? Hit "Send Request." They see your profile and decide. Zero pressure.',
              },
              {
                num: '03',
                icon: '🔓',
                title: 'Details unlock',
                desc: 'Once she accepts, contact info and full profile details are revealed to both of you.',
              },
              {
                num: '04',
                icon: '✨',
                title: 'Start connecting',
                desc: 'Chat, plan a campus hangout, or keep it casual. Your connection, your rules.',
              },
            ].map((step, i) => (
              <div key={i} className="bg-bg-secondary border border-border-primary rounded-2xl p-6 hover:border-pink-border transition">
                <div className="text-5xl font-black text-pink-primary/20 mb-3">{step.num}</div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border-primary" />

        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20" id="features">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-12">
            <div>
              <div className="text-pink-primary text-xs font-bold uppercase tracking-wider mb-2">Platform features</div>
              <h2 className="font-syne font-extrabold text-4xl leading-tight">Built different.</h2>
            </div>
            <p className="text-lg text-text-muted leading-relaxed">
              Everything about UniPair is designed around safety, authenticity, and giving women complete control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎓', title: 'University verified', desc: 'College email + student ID verification ensures everyone is genuinely a student.' },
              { icon: '♀️', title: 'Women-first design', desc: 'Completely free for women. Privacy controls designed around what women want.' },
              { icon: '💕', title: 'All relationship types', desc: 'Serious, casual, just friends, or not sure yet — no pressure, no labels.' },
              { icon: '🌍', title: 'Online & offline modes', desc: 'Set your preference — digital-only or real-world meetups on campus.' },
              { icon: '🚀', title: 'Profile boosts for men', desc: 'Free to join. Pay a small fee to boost visibility. No tricks.' },
              { icon: '🏆', title: 'Hobby & interest matching', desc: 'Match on shared passions — from chess clubs to chaos theory.' },
            ].map((feat, i) => (
              <div key={i} className="bg-bg-secondary border border-border-primary rounded-2xl p-6 hover:border-pink-border transition">
                <div className="text-3xl mb-3">{feat.icon}</div>
                <h3 className="font-bold mb-2">{feat.title}</h3>
                <p className="text-sm text-text-muted">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border-primary" />

        {/* CTA Band */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 bg-bg-secondary border-y border-border-primary grid grid-cols-1 lg:grid-cols-2 gap-12 items-center rounded-3xl my-8">
          <div>
            <h2 className="font-syne font-extrabold text-4xl leading-tight mb-4">
              Ready to find your <span className="text-pink-primary">crew?</span>
            </h2>
            <p className="text-lg text-text-muted">
              Join thousands of students already connecting on UniPair. Signup takes 5 minutes — completely free.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/signup"
              className="px-8 py-4 bg-pink-primary hover:bg-pink-hover text-white font-medium rounded-full transition text-center"
            >
              Join free →
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border border-border-secondary text-text-primary hover:text-text-primary rounded-full transition text-center"
            >
              Already have an account?
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
