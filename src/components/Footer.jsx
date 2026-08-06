import React from 'react';
import { Terminal, Heart, Code2, HelpCircle } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const Footer = ({ onStartTour }) => {
  return (
    <footer className="mt-16 border-t border-zinc-800/80 py-8 bg-zinc-950/80 font-mono text-xs text-zinc-500">
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
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-lime-400 hover:border-lime-400 transition"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Replay Interactive Tour</span>
          </button>
        )}

        <div className="flex items-center gap-3 text-zinc-400 flex-wrap justify-center">
          <a
            href="mailto:anishdevelops@gmail.com"
            className="hover:text-lime-400 transition"
          >
            anishdevelops@gmail.com
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
