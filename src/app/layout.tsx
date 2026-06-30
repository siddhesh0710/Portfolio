import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Tracker from '@/components/Tracker';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Siddhesh Tawde — Cloud Support Engineer',
  description: 'Cloud Support Engineer specializing in AWS, Linux, Docker, Terraform & DevOps automation. Building secure, scalable infrastructure.',
  keywords: ['Cloud Engineer', 'AWS', 'DevOps', 'Linux', 'Terraform', 'Docker', 'CI/CD', 'Mumbai'],
  openGraph: {
    title: 'Siddhesh Tawde — Cloud Support Engineer',
    description: 'Cloud infrastructure, automation, and DevOps engineering portfolio.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="bg-[#0B1120] text-[#F8FAFC] overflow-x-hidden">
        <Tracker />
        {children}
      </body>
    </html>
  );
}
