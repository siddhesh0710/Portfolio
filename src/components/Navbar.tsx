'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certs' },
  { href: '#terminal', label: 'Terminal' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(11,17,32,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container-portfolio flex items-center justify-between h-20">

        {/* Logo */}
        <button onClick={() => scrollTo('#hero')} className="font-bold text-lg tracking-tight group">
          <span className="gradient-text">Siddhesh</span>
          <span className="text-white/30 font-normal text-sm ml-1 group-hover:text-white/50 transition-colors">/ cloud</span>
        </button>

        {/* Desktop nav links */}
        <div
          className="hidden md:flex items-center"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '8px 12px',
            gap: '4px',
          }}
        >
          {navLinks.map(link => {
            const active = activeSection === link.href.slice(1);
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative transition-all duration-200"
                style={{
                  color: active ? '#ffffff' : '#64748B',
                  fontSize: '14px',
                  fontWeight: 500,
                  padding: '8px 12px',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#CBD5E1'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#64748B'; }}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0"
                    style={{
                      background: 'rgba(56,189,248,0.12)',
                      boxShadow: '0 0 12px rgba(56,189,248,0.15)',
                      border: '1px solid rgba(56,189,248,0.2)',
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {/* Resume button */}
          <a
            href="/Siddhesh_Tawde_Resume.pdf"
            download="Siddhesh Tawde"
            className="hidden sm:flex items-center gap-2 text-sm font-bold tracking-wide transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #38BDF8, #06B6D4)',
              color: '#0B1120',
              boxShadow: '0 0 16px rgba(56,189,248,0.25)',
              padding: '10px 24px',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(56,189,248,0.5)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(56,189,248,0.25)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <Download size={14} />
            Resume
          </a>

          <button className="md:hidden text-[#64748B] hover:text-white transition-colors" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden border-t"
            style={{ background: 'rgba(11,17,32,0.98)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="container-portfolio py-4 flex flex-col gap-1">
              {navLinks.map(link => {
                const active = activeSection === link.href.slice(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-left px-3 py-2.5 text-sm transition-all flex items-center gap-2"
                    style={{
                      color: active ? '#38BDF8' : '#94A3B8',
                      background: active ? 'rgba(56,189,248,0.07)' : 'transparent',
                    }}
                  >
                    {active && <span className="w-1 h-1 rounded-full bg-[#38BDF8]" />}
                    {link.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
