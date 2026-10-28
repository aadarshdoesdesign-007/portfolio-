'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NotebookBackground } from '@/components/NotebookBackground';
import { MorphingArrowBadge } from '@/components/MorphingArrowBadge';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const email = 'aadarshdoesdesign@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socials = [
    {
      name: 'LinkedIn',
      handle: '/in/aadarsh-ramakrishnan-b46052293/',
      url: 'https://www.linkedin.com/in/aadarsh-ramakrishnan-b46052293/',
      color: '#00ADE6',
    },
    {
      name: 'GitHub',
      handle: '@aadarshdoesdesign',
      url: 'https://github.com/aadarshdoesdesign',
      color: '#90CD26',
    },
    {
      name: 'Email Directly',
      handle: email,
      url: `mailto:${email}`,
      color: '#FF4BB9',
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#FFFF5F] overflow-hidden">
      <NotebookBackground />
      <Navbar />

      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-5 sm:px-10 py-12 sm:py-20 w-full flex flex-col justify-center">
        <div className="space-y-10">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-black bg-[#FFFF5F] shadow-[3px_3px_0px_#000000] text-xs font-mono font-bold">
            <span>GET IN TOUCH // SAY HI</span>
            <span className="w-2 h-2 rounded-full bg-[#FF4BB9] animate-ping" />
          </div>

          {/* Main Callout Headline */}
          <h1 className="font-pacaembu text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-black leading-[1.02]">
            Lets work <br />
            <span className="underline decoration-[#00ADE6] decoration-wavy decoration-4 sm:decoration-6 underline-offset-8">together</span>.
          </h1>

          <p className="font-mooli text-lg sm:text-2xl text-black/80 max-w-2xl leading-relaxed">
            I'm always interested in hearing about select product design roles, UX collaborations, complex data visualization challenges, or academic research inquiries.
          </p>

          {/* Primary Interactive Email Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F9F3EB] border-2 border-black shadow-[6px_6px_0px_#000000] flex flex-col sm:flex-row sm:items-center justify-between gap-6 max-w-3xl">
            <div className="space-y-1">
              <span className="text-xs font-mono text-black/50 font-bold uppercase tracking-wider">
                PRIMARY EMAIL
              </span>
              <div className="font-pacaembu text-xl sm:text-3xl font-bold text-black break-all">
                {email}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={copyEmail}
                className="px-5 py-2.5 rounded-full border-2 border-black bg-white hover:bg-[#FFFF5F] text-black font-pacaembu font-bold text-sm shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer"
              >
                {copied ? '✓ Copied!' : 'Copy Email'}
              </button>

              <a
                href={`mailto:${email}`}
                className="px-5 py-2.5 rounded-full border-2 border-black bg-[#FF4BB9] text-white font-pacaembu font-bold text-sm shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000000] transition-all"
              >
                Send Mail ↗
              </a>
            </div>
          </div>

          {/* Social Channels List */}
          <div className="pt-4 space-y-4 max-w-3xl">
            <div className="text-xs font-mono text-black/50 uppercase tracking-wider">
              ONLINE PRESENCE &amp; PROFILES
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-2xl bg-white/90 border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[5px_5px_0px_#000000] hover:-translate-y-0.5 transition-all flex flex-col justify-between h-28"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-black border border-black"
                      style={{ backgroundColor: s.color }}
                    >
                      {s.name}
                    </span>
                    <span className="font-bold text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      ↗
                    </span>
                  </div>

                  <span className="font-pacaembu font-bold text-sm text-black truncate">
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Playful Peeking Character Illustrations */}
        <div className="mt-16 pt-8 border-t border-black/20 flex justify-between items-end relative overflow-hidden h-28 pointer-events-none select-none">
          {/* Peeking character 1 */}
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: [60, 0, 0, 60] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-20 rounded-t-full bg-[#FFFF5F] border-2 border-black flex flex-col items-center pt-3"
          >
            <div className="flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>
            <div className="w-3 h-1 bg-black rounded-full mt-2" />
          </motion.div>

          {/* Peeking character 2 */}
          <motion.div
            initial={{ y: 70 }}
            animate={{ y: [70, 0, 0, 70] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="w-20 h-24 rounded-t-2xl bg-[#FF4BB9] border-2 border-black flex flex-col items-center pt-4"
          >
            <div className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-white border border-black" />
              <span className="w-2 h-2 rounded-full bg-white border border-black" />
            </div>
            <span className="text-[10px] font-mono font-bold text-white mt-1">HELLO</span>
          </motion.div>

          {/* Peeking character 3 */}
          <motion.div
            initial={{ y: 55 }}
            animate={{ y: [55, 0, 0, 55] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="w-14 h-18 rounded-t-full bg-[#00ADE6] border-2 border-black flex flex-col items-center pt-2"
          >
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>
            <div className="w-2.5 h-1 border-b-2 border-black mt-1" />
          </motion.div>

          {/* Peeking character 4 */}
          <motion.div
            initial={{ y: 65 }}
            animate={{ y: [65, 0, 0, 65] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="w-18 h-22 rounded-t-3xl bg-[#90CD26] border-2 border-black flex flex-col items-center pt-3"
          >
            <div className="flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>
            <span className="text-xs font-bold mt-1">☻</span>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
