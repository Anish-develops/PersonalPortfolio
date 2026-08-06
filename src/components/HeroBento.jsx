import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Award,
  GraduationCap,
  Sparkles,
  Terminal,
  Volume2,
  VolumeX,
  Binary
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const HeroBento = ({
  matrixActive,
  setMatrixActive,
  soundEnabled,
  setSoundEnabled,
  onNotifyOnboarding
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = 'anishdevelops@gmail.com';
  const phone = '+91 7065692440';
  const location = 'New Delhi, Delhi';

  const handleCopy = (text, type) => {
    soundEffects.playSuccess();
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }

    // Trigger confetti celebratory effect
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#a3e635', '#c084fc', '#ffffff']
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Main Name & Hero Card (2 Cols on LG) */}
      <div className="md:col-span-2 lg:col-span-2 bg-zinc-950/90 border-2 border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between hover:border-lime-400/80 transition-colors group">
        {/* Decorative Grid & Accent Glow */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-lime-400/10 blur-3xl pointer-events-none" />

        <div className="space-y-4 relative z-10">
          {/* Status Badge & Controls */}
          <div id="hero-controls" className="flex items-center justify-between gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 font-mono text-xs shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Full-Stack & AI Roles</span>
            </div>

            {/* Audio & Matrix Toggles */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  soundEffects.enabled = !soundEnabled;
                  setSoundEnabled(!soundEnabled);
                  if (!soundEnabled) soundEffects.playClick();
                  if (onNotifyOnboarding) onNotifyOnboarding('sfx_toggled');
                }}
                title="Toggle Web Audio SFX"
                className={`p-1.5 rounded-lg border text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 ${
                  soundEnabled
                    ? 'bg-lime-400/20 text-lime-400 border-lime-400/50'
                    : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  setMatrixActive(!matrixActive);
                  if (onNotifyOnboarding) onNotifyOnboarding('sfx_toggled');
                }}
                title="Toggle Cyber Matrix Rain"
                className={`p-1.5 rounded-lg border text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                  matrixActive
                    ? 'bg-purple-400/20 text-purple-400 border-purple-400/50'
                    : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                }`}
              >
                <Binary className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Name & Tagline */}
          <div className="space-y-1">
            <div className="text-xs font-mono text-lime-400 uppercase tracking-widest flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Full-Stack Engineer & AI Architect</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white font-heading tracking-tight leading-none group-hover:text-lime-300 transition-colors">
              Anish Kumar
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 font-mono pt-1">
              Full-stack engineer <span className="text-lime-400">|</span> AI Builder <span className="text-purple-400">|</span> Digital Creator
            </p>
          </div>
        </div>

        {/* Contact Info Pills & Actions */}
        <div className="pt-6 mt-6 border-t border-zinc-800/80 space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {/* Email Button */}
            <button
              onClick={() => handleCopy(email, 'email')}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-lime-400 text-zinc-200 hover:text-lime-400 transition flex items-center gap-1.5 shadow-brutal-green-sm"
            >
              <Mail className="w-3.5 h-3.5 text-lime-400" />
              <span>{email}</span>
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
            </button>

            {/* Phone Button */}
            <button
              onClick={() => handleCopy(phone, 'phone')}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-purple-400 text-zinc-200 hover:text-purple-400 transition flex items-center gap-1.5 shadow-brutal-purple-sm"
            >
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              <span>{phone}</span>
              {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
            </button>

            {/* Location Tag */}
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Education & Academic Excellence Tile */}
      <div className="bg-zinc-950/90 border-2 border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between hover:border-purple-400/80 transition-colors group relative overflow-hidden">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-purple-950 text-purple-400 border border-purple-800">
              <GraduationCap className="w-5 h-5" />
            </span>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800">
              Expected May 2027
            </span>
          </div>

          <h3 className="text-base font-bold text-white font-heading">Academic Record</h3>
          
          <div className="space-y-1">
            <p className="text-xs text-zinc-200 font-sans font-semibold">
              B.Tech Computer Science
            </p>
            <p className="text-[11px] text-zinc-400 font-sans">
              Guru Gobind Singh Indraprastha University
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800/80">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-mono text-zinc-400">Cumulative CGPA</span>
            <span className="text-3xl font-black font-mono text-lime-400 shadow-brutal-green-sm px-2 py-0.5 rounded bg-zinc-900 border border-lime-400/40">
              9.1
            </span>
          </div>
        </div>
      </div>

      {/* Hackathons & Achievements Tile */}
      <div className="bg-zinc-950/90 border-2 border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between hover:border-lime-400/80 transition-colors group relative overflow-hidden">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-lime-950 text-lime-400 border border-lime-800">
              <Award className="w-5 h-5" />
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-lime-950 text-lime-400 border border-lime-800 uppercase">
              National Level
            </span>
          </div>

          <h3 className="text-base font-bold text-white font-heading">Achievements</h3>

          <div className="space-y-2 text-xs text-zinc-300 font-sans leading-relaxed">
            <div className="flex items-start gap-2">
              <span className="text-lime-400 font-mono font-bold">▶</span>
              <span><strong>SIH Semifinalist</strong> & national hackathon conqueror.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400 font-mono font-bold">▶</span>
              <span><strong>IBM Agentic AI</strong> & Google Generative AI program builder.</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Competitive Coding</span>
          <span className="text-lime-400 font-bold">Top Tier</span>
        </div>
      </div>
    </div>
  );
};
