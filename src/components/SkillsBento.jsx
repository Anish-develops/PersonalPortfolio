import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Server, Wrench, BookOpen, Search, Check } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const SkillsBento = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skillsData = [
    {
      category: 'Languages',
      icon: Code,
      color: 'text-lime-400 border-lime-400/40 bg-lime-400/10',
      shadow: 'shadow-brutal-green-sm',
      skills: ['Java', 'C++', 'JavaScript', 'Python']
    },
    {
      category: 'Frontend',
      icon: Terminal,
      color: 'text-purple-400 border-purple-400/40 bg-purple-400/10',
      shadow: 'shadow-brutal-purple-sm',
      skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS']
    },
    {
      category: 'Backend',
      icon: Server,
      color: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
      shadow: 'shadow-brutal-white-sm',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'Socket.io', 'JWT Authentication']
    },
    {
      category: 'Tools',
      icon: Wrench,
      color: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
      shadow: 'shadow-brutal-green-sm',
      skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Linux', 'Vercel', 'Cloudinary']
    },
    {
      category: 'Core CS',
      icon: BookOpen,
      color: 'text-rose-400 border-rose-400/40 bg-rose-400/10',
      shadow: 'shadow-brutal-purple-sm',
      skills: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'DBMS', 'Computer Networks']
    }
  ];

  const categories = ['ALL', 'Languages', 'Frontend', 'Backend', 'Tools', 'Core CS'];

  return (
    <div id="skills-grid" className="bg-zinc-950/90 border-2 border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
      {/* Subtle Background Accent Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-lime-400/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <span className="text-lime-400 font-mono">//</span> Technical Arsenal
          </h2>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Funky, production-tested skill matrix & core computer science competencies.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-48">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-lime-400"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundEffects.playClick();
              setActiveCategory(cat);
            }}
            className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
              activeCategory === cat
                ? 'bg-lime-400 text-black font-bold shadow-brutal-green-sm scale-105'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Pill Tags Matrix */}
      <div className="space-y-5">
        {skillsData
          .filter(group => activeCategory === 'ALL' || group.category === activeCategory)
          .map((group, groupIdx) => {
            const IconComp = group.icon;
            const filteredSkills = group.skills.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

            if (filteredSkills.length === 0) return null;

            return (
              <div key={groupIdx} className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-semibold">
                  <IconComp className="w-4 h-4 text-lime-400" />
                  <span>{group.category}</span>
                  <span className="text-zinc-600 text-[10px]">({filteredSkills.length})</span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {filteredSkills.map((skill, idx) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          soundEffects.playClick();
                          setSelectedSkill(isSelected ? null : skill);
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-mono border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-lime-400 text-black border-lime-400 font-bold shadow-brutal-green'
                            : 'bg-zinc-900/90 text-zinc-200 border-zinc-800 hover:border-lime-400/80 hover:text-lime-300 hover:shadow-brutal-green-sm'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                        <span>{skill}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>

      {/* Selected Skill Toast Info */}
      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-3 rounded-lg bg-zinc-900 border border-lime-400/50 text-xs font-mono text-lime-300 flex items-center justify-between"
        >
          <span>Active Tag: <strong className="text-white">{selectedSkill}</strong> verified in production architecture.</span>
          <button
            onClick={() => setSelectedSkill(null)}
            className="text-zinc-400 hover:text-white underline text-[11px]"
          >
            Clear selection
          </button>
        </motion.div>
      )}
    </div>
  );
};
