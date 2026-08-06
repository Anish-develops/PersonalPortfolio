import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Terminal, Image, Sparkles, Cpu, Palette } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const ExtracurricularsBento = () => {
  const items = [
    {
      title: 'AI-Powered Resume Builder',
      subtitle: 'IBM Agentic AI Program',
      icon: Bot,
      desc: 'Architected autonomous multi-agent workflows for automated resume optimization and ATS parsing.',
      tag: 'IBM Agentic AI',
      accent: 'text-purple-400 border-purple-500/30 bg-purple-500/10'
    },
    {
      title: 'Customized Arch Linux Setups',
      subtitle: 'Hyprland & Wayland Configs',
      icon: Terminal,
      desc: 'Crafted minimal, riced Linux desktop environments with automated dotfiles and custom Wayland keybindings.',
      tag: 'Arch + Hyprland',
      accent: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
    },
    {
      title: 'Digital Design & Photo Editing',
      subtitle: 'Adobe Photoshop Advanced',
      icon: Palette,
      desc: 'Designing sleek UI prototypes, brutalist graphics, and high-contrast digital media using Adobe Photoshop.',
      tag: 'Adobe Photoshop',
      accent: 'text-lime-400 border-lime-500/30 bg-lime-500/10'
    }
  ];

  return (
    <div className="bg-zinc-950/90 border-2 border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
          <span className="text-purple-400 font-mono">//</span> Extracurriculars & Hobbies
        </h2>
        <span className="text-xs font-mono text-zinc-500">Beyond Code</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              onClick={() => soundEffects.playClick()}
              className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-lime-400/80 transition-all flex flex-col justify-between group shadow-sm hover:shadow-brutal-green-sm cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg border ${item.accent}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white font-heading group-hover:text-lime-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>{item.subtitle}</span>
                <span className="text-lime-400 group-hover:underline">Explore →</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
