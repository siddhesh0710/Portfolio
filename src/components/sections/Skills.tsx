'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '@/lib/utils';

const categoryColor: Record<string, string> = {
  Cloud: '#38BDF8',
  DevOps: '#06B6D4',
  Linux: '#22C55E',
  Networking: '#818CF8',
  Monitoring: '#F59E0B',
  Virtualization: '#F97316',
};

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} className="py-48 border-t border-white/5">
      <div className="container-portfolio">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-16"
        >
          Skills
        </motion.h2>

        <div className="space-y-10">
          {Object.entries(portfolioData.skills).map(([category, skills], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <div className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: categoryColor[category] }}>
                {category}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {skills.map(skill => (
                  <span key={skill} className="tag hover:text-white hover:border-white/20 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
