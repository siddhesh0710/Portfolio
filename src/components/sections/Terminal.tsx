'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '@/lib/utils';

interface Line { type: 'input' | 'output' | 'error'; text: string; }

export default function Terminal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Line[]>([
    { type: 'output', text: "Type 'help' to see available commands." },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const run = (cmd: string) => {
    const t = cmd.trim().toLowerCase();
    const next: Line[] = [...history, { type: 'input', text: `$ ${cmd}` }];
    if (t === 'clear') { setHistory([{ type: 'output', text: "Terminal cleared." }]); return; }
    if (t === '') { setHistory(next); return; }
    if (t in portfolioData.terminalCommands) {
      next.push({ type: 'output', text: portfolioData.terminalCommands[t as keyof typeof portfolioData.terminalCommands] });
    } else {
      next.push({ type: 'error', text: `Command not found: '${cmd}'. Type 'help'.` });
    }
    setHistory(next);
    setCmdHistory(p => [cmd, ...p]);
    setHistoryIdx(-1);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { run(input); setInput(''); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const i = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(i); setInput(cmdHistory[i] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = Math.max(historyIdx - 1, -1);
      setHistoryIdx(i); setInput(i === -1 ? '' : cmdHistory[i] || '');
    }
  };

  const quick = ['help', 'whoami', 'skills', 'projects', 'contact', 'clear'];

  return (
    <section id="terminal" ref={ref} className="py-48 border-t border-white/5">
      <div className="container-portfolio">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-3"
        >
          Terminal
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="text-[#64748B] text-sm mb-10"
        >
          Explore the portfolio via CLI — type a command or click a shortcut.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="card overflow-hidden max-w-3xl"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <span className="text-[#475569] text-xs font-mono ml-2">siddhesh@portfolio ~ </span>
          </div>

          {/* Output */}
          <div
            className="p-4 h-64 overflow-y-auto font-mono text-sm"
            style={{ background: '#0D1117' }}
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, i) => (
              <div key={i} className="mb-0.5 leading-relaxed whitespace-pre-wrap"
                style={{ color: line.type === 'input' ? '#38BDF8' : line.type === 'error' ? '#F87171' : '#94A3B8' }}>
                {line.text}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#22C55E]">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                className="flex-1 bg-transparent text-[#F1F5F9] outline-none caret-[#38BDF8]"
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div ref={bottomRef} />
          </div>

          {/* Quick buttons */}
          <div className="px-4 py-2.5 border-t border-white/5 flex flex-wrap gap-2 bg-white/[0.02]">
            {quick.map(cmd => (
              <button
                key={cmd}
                onClick={() => { run(cmd); inputRef.current?.focus(); }}
                className="tag hover:text-white hover:border-white/20 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
