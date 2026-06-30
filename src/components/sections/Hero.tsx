'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, ArrowRight, GitBranch, Link2, Mail, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { portfolioData } from '@/lib/utils';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col pt-20">

      {/* Main content — takes all available space and centers */}
      <div className="flex-1 flex items-center">
        <div className="container-portfolio w-full">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 w-full">

            {/* Left — text */}
            <div className="flex-1 max-w-2xl">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-[#22C55E] text-sm font-mono">Available for opportunities</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '1rem' }}
              >
                Siddhesh Tawde
              </motion.h1>

              {/* Typing role */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-[#38BDF8] font-mono mb-5"
                style={{ minHeight: '1.75rem' }}
              >
                <TypeAnimation
                  sequence={portfolioData.typingSequence}
                  wrapper="span"
                  cursor
                  repeat={Infinity}
                />
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[#64748B] text-lg leading-relaxed mb-8 max-w-lg"
              >
                Cloud Support Engineer at{' '}
                <span className="text-[#94A3B8]">Facts Online Pvt Ltd</span> — building
                secure, scalable infrastructure with AWS, Docker, Terraform and Linux.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                {/* Primary — Download Resume */}
                <a
                  href="/Siddhesh_Tawde_Resume.pdf"
                  download="Siddhesh Tawde"
                  className="relative flex items-center gap-3 text-base font-bold text-[#0B1120] overflow-hidden group transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #38BDF8 0%, #06B6D4 50%, #0EA5E9 100%)',
                    boxShadow: '0 0 24px rgba(56,189,248,0.35), 0 4px 16px rgba(0,0,0,0.3)',
                    padding: '14px 36px',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(56,189,248,0.55), 0 4px 20px rgba(0,0,0,0.3)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(56,189,248,0.35), 0 4px 16px rgba(0,0,0,0.3)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
                  <Download size={18} />
                  Download Resume
                </a>

                {/* Secondary — View Projects */}
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2 text-sm font-semibold text-[#94A3B8] transition-all duration-300 group"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '14px 28px',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#F1F5F9';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.3)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.06)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#94A3B8';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  View Projects
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-8"
              >
                {[
                  { icon: GitBranch, href: portfolioData.github, label: 'GitHub' },
                  { icon: Link2, href: portfolioData.linkedin, label: 'LinkedIn' },
                  { icon: Mail, href: `mailto:${portfolioData.email}`, label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#64748B] hover:text-[#94A3B8] text-sm transition-colors"
                  >
                    <Icon size={15} /> {label}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right — profile photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex-shrink-0"
            >
              <div
                className="relative overflow-hidden"
                style={{
                  width: 'clamp(260px, 28vw, 380px)',
                  height: 'clamp(260px, 28vw, 380px)',
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 0 0 8px rgba(56,189,248,0.07), 0 0 60px rgba(56,189,248,0.12)',
                }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Siddhesh Tawde"
                  fill
                  sizes="(max-width: 768px) 260px, (max-width: 1024px) 28vw, 380px"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom — stats bar pinned to bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="container-portfolio pb-10"
      >
        <div className="h-px bg-white/5 mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Quick stats */}
          <div className="flex flex-wrap items-center gap-10">
            {portfolioData.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white tabular-nums">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs text-[#475569] uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 text-[#475569] hover:text-[#94A3B8] transition-colors"
            aria-label="Scroll to about"
          >
            <span className="text-xs font-mono tracking-widest">scroll</span>
            <ChevronDown size={16} className="animate-bounce" />
          </button>
        </div>
      </motion.div>

    </section>
  );
}
