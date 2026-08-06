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
      badge: 'Real-time Sandbox'
    },
    {
      id: 'drawing',
      title: 'Realtime Multiplayer Drawing Game',
      tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      description: 'Built a low-latency drawing game with synchronized canvas interactions and live chat using WebSockets.',
      illustration: <DrawingIllustration accentColor="#a3e635" />,
      badge: 'Low-Latency Sockets'
    },
    {
      id: 'streaming',
      title: 'Video Streaming Backend System',
      tech: ['Node.js', 'Express.js', 'MongoDB', 'Cloudinary'],
      description: 'Architected a scalable backend with JWT authentication, media uploads, and complex data relationships.',
      illustration: <StreamingIllustration accentColor="#a3e635" />,
      badge: 'Scalable Microservice'
    },
    {
      id: 'moonsafe',
      title: 'MoonSafe Women Safety Application',
      tech: ['React Native', 'Python'],
      description: 'Developed an application enabling SOS alerts, live location sharing, and AI-triggered automation workflows for rapid emergency response.',
      illustration: <MoonSafeIllustration accentColor="#a3e635" />,
      badge: 'AI Emergency Automation'
    }
  ];

  return (
    <div id="projects-grid" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Featured Projects
          </h2>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Production-grade systems, real-time architectures, and AI workflows. Click any card to launch its interactive sandbox simulator.
          </p>
        </div>
        <span className="px-3 py-1 rounded-lg font-sans text-xs bg-zinc-900 text-lime-400 border border-zinc-800 flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          4 Interactive Sandboxes Ready
        </span>
      </div>

      {/* Grid of Interactive Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <motion.div
            key={proj.id}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="bg-zinc-950/90 border border-zinc-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all group hover:border-zinc-700 cursor-pointer relative overflow-hidden"
            onClick={() => {
              soundEffects.playClick();
              if (onNotifyOnboarding) onNotifyOnboarding('sandbox_launched');
              onSelectProject(proj);
            }}
          >
            {/* Top Bar with Badge & Launch Action */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-sans font-medium uppercase bg-zinc-900 text-lime-400 border border-zinc-800">
                {proj.badge}
              </span>
              <button
                className="flex items-center gap-1 text-xs font-sans font-medium text-zinc-400 group-hover:text-white transition"
              >
                <span>Launch Demo</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-lime-400" />
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

            {/* Tech Stack Pills */}
            <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
              {proj.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-sans bg-zinc-900 text-zinc-300 border border-zinc-800/80 group-hover:border-zinc-700 transition"
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
