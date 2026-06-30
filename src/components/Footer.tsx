'use client';

import { GitBranch, Link2, Mail, ArrowUp } from 'lucide-react';
import { portfolioData } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="container-portfolio flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div>
          <div className="font-bold text-white mb-1">Siddhesh Tawde</div>
          <div className="text-[#475569] text-xs">Cloud Support Engineer · Mumbai</div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5">
          {[
            { icon: GitBranch, href: portfolioData.github, label: 'GitHub' },
            { icon: Link2, href: portfolioData.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${portfolioData.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="text-[#475569] hover:text-[#94A3B8] transition-colors" title={label}>
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 text-xs text-[#475569] hover:text-[#94A3B8] transition-colors"
        >
          <ArrowUp size={12} /> Back to top
        </button>
      </div>

      <div className="container-portfolio mt-6 pt-6 border-t border-white/5">
        <p className="text-[#334155] text-xs text-center">
          © {new Date().getFullYear()} Siddhesh Tawde. Built with Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
