'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { portfolioData } from '@/lib/utils';

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState<string>('exp-1');

  return (
    <section id="experience" ref={ref} className="py-48 border-t border-white/5">
      <div className="container-portfolio">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-16"
        >
          Experience
        </motion.h2>

        <div className="space-y-4">
          {portfolioData.experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="card overflow-hidden"
            >
              {/* Header */}
              <button
                className="w-full text-left px-7 py-6 flex items-start justify-between gap-4"
                onClick={() => setOpen(open === exp.id ? '' : exp.id)}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold">{exp.role}</span>
                    <span className="flex items-center gap-1 text-[#22C55E] text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                      Current
                    </span>
                  </div>
                  <div className="text-[#38BDF8] text-sm mb-1">{exp.company}</div>
                  <div className="text-[#475569] text-xs">{exp.period} · {exp.location}</div>
                </div>
                <ChevronDown
                  size={16}
                  className="text-[#475569] mt-1 flex-shrink-0 transition-transform"
                  style={{ transform: open === exp.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {/* Body */}
              <AnimatePresence>
                {open === exp.id && (
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-7 pb-7 border-t border-white/5 pt-5 space-y-5">
                      <ul className="space-y-3">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex gap-3 text-sm text-[#94A3B8] leading-relaxed">
                            <span className="text-[#38BDF8] mt-1.5 flex-shrink-0">·</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map(t => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
