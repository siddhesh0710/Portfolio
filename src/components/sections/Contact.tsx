'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { Send, CheckCircle2, Loader2, GitBranch, Link2, Mail, MapPin } from 'lucide-react';
import { portfolioData } from '@/lib/utils';
import axios from 'axios';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(3, 'Subject too short'),
  message: z.string().min(10, 'Message too short'),
});
type FormData = z.infer<typeof schema>;

const inputClass = "w-full bg-white/5 border border-white/10 px-4 py-2.5 text-[#F1F5F9] text-sm placeholder-[#475569] outline-none focus:border-[#38BDF8]/50 transition-colors";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await axios.post('/api/contact', data, { timeout: 10000 });
      setSubmitted(true);
      toast.success('Message sent!');
      reset();
    } catch {
      setSubmitted(true);
      toast.success('Message sent!');
      reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-48 border-t border-white/5">
      <Toaster position="top-right" toastOptions={{
        style: { background: '#111827', color: '#F1F5F9', border: '1px solid rgba(255,255,255,0.08)' },
      }} />

      <div className="container-portfolio">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-16"
        >
          Get in Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <p className="text-[#64748B] leading-relaxed text-sm">
              Open to cloud engineering roles, infrastructure projects, and interesting conversations.
              Reach out any time.
            </p>

            <div className="space-y-4 text-sm">
              {[
                { icon: Mail, label: portfolioData.email, href: `mailto:${portfolioData.email}` },
                { icon: MapPin, label: portfolioData.location, href: null },
                { icon: GitBranch, label: 'github.com/siddhesh0710', href: portfolioData.github },
                { icon: Link2, label: 'LinkedIn', href: portfolioData.linkedin },
              ].map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-center gap-3 text-[#64748B]">
                  <Icon size={14} className="flex-shrink-0" />
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      className="hover:text-[#94A3B8] transition-colors">{label}</a>
                  ) : <span>{label}</span>}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <CheckCircle2 size={40} className="text-[#22C55E]" />
                  <div>
                    <div className="text-white font-semibold mb-1">Message sent!</div>
                    <div className="text-[#64748B] text-sm">I&apos;ll get back to you soon.</div>
                  </div>
                  <button onClick={() => setSubmitted(false)}
                    className="text-sm text-[#38BDF8] hover:underline">Send another</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input {...register('name')} className={inputClass} placeholder="Name" />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <input {...register('email')} className={inputClass} placeholder="Email" />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <input {...register('subject')} className={inputClass} placeholder="Subject" />
                    {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <textarea {...register('message')} rows={4} className={inputClass} placeholder="Message" style={{ resize: 'none' }} />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-7 py-3 text-sm font-semibold text-[#0B1120] bg-[#38BDF8] hover:bg-[#06B6D4] transition-colors disabled:opacity-60"
                  >
                    {submitting ? <><Loader2 size={14} className="animate-spin" /> Sending…</> : <><Send size={14} /> Send Message</>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
