'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { GitBranch, ExternalLink, ChevronDown } from 'lucide-react';
import { portfolioData } from '@/lib/utils';

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="projects" ref={ref} className="py-48 border-t border-white/5">
      <div className="container-portfolio">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-16"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-5">
          {portfolioData.projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="card overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1">
                {/* Icon + title */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-2xl">{project.icon}</span>
                  <div>
                    <div className="text-white font-semibold leading-snug mb-0.5">{project.title}</div>
                    <div className="text-[#475569] text-xs">{project.category}</div>
                  </div>
                </div>

                <p className="text-[#64748B] text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 5).map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>

                {/* Expand */}
                <AnimatePresence>
                  {open === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 mb-4 border-t border-white/5 pt-5">
                        {project.highlights.map((h, j) => (
                          <li key={j} className="flex gap-2.5 text-xs text-[#94A3B8] leading-relaxed">
                            <span className="text-[#38BDF8] flex-shrink-0 mt-0.5">·</span>{h}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href={project.github}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-white transition-colors"
                >
                  <GitBranch size={12} /> GitHub
                </a>
                <button
                  onClick={() => setOpen(open === project.id ? null : project.id)}
                  className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#94A3B8] transition-colors"
                >
                  {open === project.id ? 'Less' : 'Details'}
                  <ChevronDown size={12} style={{ transform: open === project.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
