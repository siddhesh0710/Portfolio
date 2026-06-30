'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '@/lib/utils';

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" ref={ref} className="py-48 border-t border-white/5">
      <div className="container-portfolio">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-16"
        >
          Certifications
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-5">
          {portfolioData.certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="card p-6"
            >
              <div className="text-2xl mb-4">{cert.icon}</div>
              <div className="text-white font-semibold mb-1">{cert.title}</div>
              <div className="text-[#475569] text-xs mb-4">{cert.issuer} · {cert.year}</div>
              <p className="text-[#64748B] text-sm leading-relaxed mb-4">{cert.description}</p>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
