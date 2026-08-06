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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-zinc-950/90 border-b border-zinc-800/80 py-3 mb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <div
          id="nav-brand"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded-lg p-0.5"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && scrollToSection('hero')}
        >
          <div className="w-8 h-8 rounded-lg bg-lime-400 text-black font-heading font-black text-sm flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            AK
          </div>
          <div>
            <span className="font-heading font-extrabold text-base text-white group-hover:text-lime-300 transition-colors tracking-tight">
              Anish<span className="text-lime-400">develops</span>
            </span>
            <span className="text-[11px] text-zinc-400 font-sans block -mt-1 font-medium">Full-Stack & AI Engineer</span>
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 font-sans text-sm font-medium text-zinc-300">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-white focus-visible:text-lime-400 focus-visible:outline-none transition"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="hover:text-white focus-visible:text-lime-400 focus-visible:outline-none transition"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="hover:text-white focus-visible:text-lime-400 focus-visible:outline-none transition"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-white focus-visible:text-lime-400 focus-visible:outline-none transition"
          >
            Contact
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
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition font-sans text-xs font-medium flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            title="Start Interactive Onboarding Tour"
          >
            <HelpCircle className="w-3.5 h-3.5 text-lime-400" />
            <span className="hidden sm:inline">Interactive Tour</span>
          </button>

          {/* Hire Me CTA */}
          <a
            href="mailto:anishdevelops@gmail.com"
            onClick={() => soundEffects.playClick()}
            className="px-4 py-1.5 rounded-lg bg-lime-400 text-black font-sans font-bold text-xs hover:bg-lime-300 transition shadow-sm flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
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
            className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 space-y-3 font-sans text-sm text-zinc-300 overflow-hidden"
          >
            <button
              onClick={() => scrollToSection('about')}
              className="w-full text-left py-2 hover:text-lime-400 transition"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="w-full text-left py-2 hover:text-lime-400 transition"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full text-left py-2 hover:text-lime-400 transition"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full text-left py-2 hover:text-lime-400 transition"
            >
              Contact
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

