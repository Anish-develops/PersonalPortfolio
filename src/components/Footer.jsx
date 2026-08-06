import React from 'react';
import { Terminal, Heart, Code2, HelpCircle } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const Footer = ({ onStartTour }) => {
  return (
    <footer className="mt-16 border-t border-zinc-800/80 py-8 bg-zinc-950/90 font-sans text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>© {new Date().getFullYear()} Anish Kumar. All rights reserved.</span>
        </div>

        {onStartTour && (
          <button
            onClick={() => {
              soundEffects.playClick();
              onStartTour();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition font-medium"
          >
            <HelpCircle className="w-3.5 h-3.5 text-lime-400" />
            <span>Replay Interactive Tour</span>
          </button>
        )}

        <div className="flex items-center gap-3 text-zinc-400 flex-wrap justify-center font-medium">
          <a
            href="mailto:contact@anishdevelops.me"
            className="hover:text-white transition"
          >
            contact@anishdevelops.me
          </a>
          <span>•</span>
          <span>+91 7065692440</span>
          <span>•</span>
          <span>New Delhi</span>
        </div>
      </div>
    </footer>
  );
};
