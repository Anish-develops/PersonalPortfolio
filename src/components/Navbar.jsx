import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Sparkles, Code2, Download, Menu, X, HelpCircle } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const Navbar = ({ onStartTour }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    soundEffects.playClick();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-zinc-950/85 border-b border-zinc-800/80 py-3 mb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <div
          id="nav-brand"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded-lg p-0.5"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && scrollToSection('hero')}
        >
          <div className="w-8 h-8 rounded-lg bg-lime-400 text-black font-mono font-black flex items-center justify-center shadow-brutal-green-sm group-hover:rotate-6 transition-transform">
            AK
          </div>
          <div>
            <span className="font-heading font-black text-lg text-white group-hover:text-lime-300 transition-colors">
              ANISH<span className="text-lime-400">.DEV</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-mono block -mt-1">Full-Stack & AI Engine</span>
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-zinc-300">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-lime-400 focus-visible:text-lime-400 focus-visible:outline-none transition flex items-center gap-1"
          >
            <span className="text-zinc-500">01.</span> About
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="hover:text-lime-400 focus-visible:text-lime-400 focus-visible:outline-none transition flex items-center gap-1"
          >
            <span className="text-zinc-500">02.</span> Skills
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="hover:text-lime-400 focus-visible:text-lime-400 focus-visible:outline-none transition flex items-center gap-1"
          >
            <span className="text-zinc-500">03.</span> Projects
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-lime-400 focus-visible:text-lime-400 focus-visible:outline-none transition flex items-center gap-1"
          >
            <span className="text-zinc-500">04.</span> Contact
          </button>
        </nav>

        {/* Action Buttons & Tour Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Onboarding Tour Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onStartTour();
            }}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-lime-400/40 text-lime-400 hover:bg-lime-400/10 hover:border-lime-400 transition font-mono text-xs flex items-center gap-1.5 shadow-brutal-green-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            title="Start Interactive Onboarding Tour"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tour Guide</span>
          </button>

          {/* Hire Me CTA */}
          <a
            href="mailto:anishdevelops@gmail.com"
            onClick={() => soundEffects.playClick()}
            className="px-3.5 py-1.5 rounded-lg bg-lime-400 text-black font-mono font-bold text-xs hover:bg-lime-300 transition shadow-brutal-green-sm flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Hire Anish</span>
          </a>

          {/* Mobile Menu Toggle Toggle */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition"
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 space-y-3 font-mono text-sm text-zinc-300 overflow-hidden"
          >
            <button
              onClick={() => scrollToSection('about')}
              className="w-full text-left py-2 hover:text-lime-400 transition flex items-center gap-2"
            >
              <span className="text-lime-400">01.</span> About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="w-full text-left py-2 hover:text-lime-400 transition flex items-center gap-2"
            >
              <span className="text-lime-400">02.</span> Skills
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full text-left py-2 hover:text-lime-400 transition flex items-center gap-2"
            >
              <span className="text-lime-400">03.</span> Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full text-left py-2 hover:text-lime-400 transition flex items-center gap-2"
            >
              <span className="text-lime-400">04.</span> Contact
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartTour();
              }}
              className="w-full text-left py-2 text-lime-400 font-bold flex items-center gap-2 border-t border-zinc-800 pt-3"
            >
              <HelpCircle className="w-4 h-4 text-lime-400" /> Replay Portfolio Tour
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

