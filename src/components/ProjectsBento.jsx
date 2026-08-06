import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal, Sparkles, Layers, Cpu } from 'lucide-react';
import {
  MeridianIllustration,
  DrawingIllustration,
  StreamingIllustration,
  MoonSafeIllustration
} from './LineArtIllustrations';
import { soundEffects } from '../utils/audio';

export const ProjectsBento = ({ onSelectProject, onNotifyOnboarding }) => {
  const projects = [
    {
      id: 'meridian',
      title: 'Meridian Collaborative Interview Platform',
      tech: ['React', 'Node.js', 'Express.js', 'Socket.io', 'MongoDB'],
      description: 'Engineered a real-time collaborative coding platform with synchronized editing and secure code execution sandbox.',
      illustration: <MeridianIllustration accentColor="#a3e635" />,
      accent: 'border-lime-400/40 hover:border-lime-400',
      badge: 'Real-time Sandbox',
      badgeColor: 'bg-lime-950 text-lime-400 border-lime-800'
    },
    {
      id: 'drawing',
      title: 'Realtime Multiplayer Drawing Game',
      tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      description: 'Built a low-latency drawing game with synchronized canvas interactions and live chat using WebSockets.',
      illustration: <DrawingIllustration accentColor="#c084fc" />,
      accent: 'border-purple-400/40 hover:border-purple-400',
      badge: 'Low-Latency Sockets',
      badgeColor: 'bg-purple-950 text-purple-400 border-purple-800'
    },
    {
      id: 'streaming',
      title: 'Video Streaming Backend System',
      tech: ['Node.js', 'Express.js', 'MongoDB', 'Cloudinary'],
      description: 'Architected a scalable backend with JWT authentication, media uploads, and complex data relationships.',
      illustration: <StreamingIllustration accentColor="#38bdf8" />,
      accent: 'border-cyan-400/40 hover:border-cyan-400',
      badge: 'Scalable Microservice',
      badgeColor: 'bg-cyan-950 text-cyan-400 border-cyan-800'
    },
    {
      id: 'moonsafe',
      title: 'MoonSafe Women Safety Application',
      tech: ['React Native', 'Python'],
      description: 'Developed an application enabling SOS alerts, live location sharing, and AI-triggered automation workflows for rapid emergency response.',
      illustration: <MoonSafeIllustration accentColor="#f43f5e" />,
      accent: 'border-rose-400/40 hover:border-rose-400',
      badge: 'AI Emergency Automation',
      badgeColor: 'bg-rose-950 text-rose-400 border-rose-800'
    }
  ];

  return (
    <div id="projects-grid" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2">
            <span className="text-lime-400 font-mono">//</span> Featured Projects
          </h2>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Production-grade systems, real-time architectures, and AI workflows. Click any card to launch the interactive sandbox simulator!
          </p>
        </div>
        <span className="px-3 py-1 rounded font-mono text-xs bg-zinc-900 text-lime-400 border border-zinc-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          4 Interactive Sandboxes Ready
        </span>
      </div>

      {/* Grid of Interactive Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <motion.div
            key={proj.id}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className={`bg-zinc-950/90 border-2 rounded-2xl p-6 shadow-2xl flex flex-col justify-between transition-all group ${proj.accent} hover:shadow-brutal-green cursor-pointer relative overflow-hidden`}
            onClick={() => {
              soundEffects.playClick();
              if (onNotifyOnboarding) onNotifyOnboarding('sandbox_launched');
              onSelectProject(proj);
            }}
          >
            {/* Top Bar with Badge & Launch Action */}
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${proj.badgeColor}`}>
                {proj.badge}
              </span>
              <button
                className="flex items-center gap-1 text-xs font-mono text-zinc-400 group-hover:text-lime-400 transition"
              >
                <span>Launch Demo</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Title & Formal Description */}
            <div className="space-y-2 mb-4">
              <h3 className="text-lg font-bold text-white font-heading group-hover:text-lime-300 transition-colors">
                {proj.title}
              </h3>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                {proj.description}
              </p>
            </div>

            {/* Custom Line-Art Illustration Preview */}
            <div className="mb-4 my-auto">
              {proj.illustration}
            </div>

            {/* Tech Stack Pills (Monospaced) */}
            <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
              {proj.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800 group-hover:border-lime-400/40 transition"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
