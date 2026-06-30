'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { portfolioData } from '@/lib/utils';

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="py-48 border-t border-white/5">
      <div className="container-portfolio">
        <motion.h2
          variants={fade()} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-3xl font-bold text-white mb-16"
        >
          About
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Bio + info */}
          <div className="space-y-8">
            <motion.p
              variants={fade(0.1)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="text-[#94A3B8] leading-[1.85] text-base"
            >
              {portfolioData.about}
            </motion.p>

            <motion.div
              variants={fade(0.2)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="space-y-3 text-sm"
            >
              {[
                { label: 'Email', value: portfolioData.email, href: `mailto:${portfolioData.email}` },
                { label: 'Location', value: portfolioData.location, href: null },
                { label: 'GitHub', value: 'github.com/siddhesh0710', href: portfolioData.github },
              ].map(item => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-[#475569] w-20 flex-shrink-0">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-white transition-colors">{item.value}</a>
                  ) : (
                    <span className="text-[#94A3B8]">{item.value}</span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Education */}
            <motion.div variants={fade(0.3)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              <div className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-4">Education</div>
              {portfolioData.education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <div className="text-[#94A3B8] font-medium text-sm">{edu.degree}</div>
                  <div className="text-[#475569] text-sm mt-1">{edu.institution} · {edu.period} · <span className="text-[#38BDF8]">{edu.grade}</span></div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={fade(0.2)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-4 self-start"
          >
            {portfolioData.stats.map((stat, i) => (
              <div key={stat.label} className="card p-6">
                <div className="text-3xl font-bold text-white mb-2">
                  {inView ? <CountUp end={stat.value} duration={2} delay={i * 0.15} /> : 0}
                  <span className="text-[#38BDF8]">{stat.suffix}</span>
                </div>
                <div className="text-[#475569] text-xs uppercase tracking-wide leading-relaxed">{stat.label}</div>
              </div>
            ))}

            {/* Current role */}
            <div className="card p-6 col-span-2 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] mt-1.5 flex-shrink-0 animate-pulse" />
              <div>
                <div className="text-white text-sm font-semibold mb-0.5">Cloud Support Engineer</div>
                <div className="text-[#38BDF8] text-sm mb-1">Facts Online Pvt Ltd</div>
                <div className="text-[#475569] text-xs">May 2025 – Present · Mumbai</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
