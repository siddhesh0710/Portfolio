'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import Terminal from '@/components/sections/Terminal';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

// Subtle background only — no cursor
const SubtleBackground = dynamic(() => import('@/components/SubtleBackground'), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Suspense fallback={null}>
        <SubtleBackground />
      </Suspense>

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Terminal />
      <Contact />
      <Footer />
    </main>
  );
}
