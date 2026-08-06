import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Maximize2, Minus, X, CornerDownLeft, Sparkles, Move } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const TerminalAbout = ({ onRunCommand, accentColor = '#a3e635', onNotifyOnboarding }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: 'Anish OS v2.4 (x86_64-pc-linux-gnu)' },
    { type: 'sys', text: 'Type "help" or click quick commands below to explore.' },
    { type: 'cmd', text: 'cat about.txt' },
    {
      type: 'out',
      lines: [
        '⚡ Full-stack engineer with proven expertise in building scalable, real-time systems using React and Node.js.',
        '🎓 B.Tech Computer Science student (Expected May 2027) at Guru Gobind Singh Indraprastha University with a 9.1 CGPA.',
        '🏆 SIH semifinalist and accomplished national hackathon participant.',
        '🤖 Actively engaged with emerging AI technologies through IBM\'s Agentic AI program and Google\'s generative AI workshops.',
        '💻 Committed to writing efficient, maintainable code and solving complex architectural problems.'
      ]
    }
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    soundEffects.playCyberKey();
    if (onNotifyOnboarding) onNotifyOnboarding('terminal_used');
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...history, { type: 'cmd', text: cmdStr }];

    if (cleanCmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (cleanCmd === 'help') {
      newHistory.push({
        type: 'out',
        lines: [
          'Available Commands:',
          '  cat about.txt  - View bio & background',
          '  skills         - List technical stack',
          '  projects       - View highlighted systems',
          '  contact        - Display email & phone details',
          '  whoami         - View current session info',
          '  clear          - Clear terminal buffer'
        ]
      });
    } else if (cleanCmd === 'cat about.txt' || cleanCmd === 'about') {
      newHistory.push({
        type: 'out',
        lines: [
          '⚡ Full-stack engineer with proven expertise in building scalable, real-time systems using React and Node.js.',
          '🎓 B.Tech Computer Science student (Expected May 2027) at Guru Gobind Singh Indraprastha University with a 9.1 CGPA.',
          '🏆 SIH semifinalist and accomplished national hackathon participant.',
          '🤖 Actively engaged with emerging AI technologies through IBM\'s Agentic AI program and Google\'s generative AI workshops.',
          '💻 Committed to writing efficient, maintainable code and solving complex architectural problems.'
        ]
      });
    } else if (cleanCmd === 'skills') {
      newHistory.push({
        type: 'out',
        lines: [
          'Languages: Java, C++, JavaScript, Python',
          'Frontend: React.js, Next.js, HTML5, CSS3, Tailwind CSS',
          'Backend: Node.js, Express.js, REST APIs, Socket.io, JWT Authentication',
          'Tools: Git, GitHub, Docker, Postman, Linux, Vercel, Cloudinary',
          'Core CS: DSA, OOP, DBMS, Computer Networks'
        ]
      });
    } else if (cleanCmd === 'contact') {
      newHistory.push({
        type: 'out',
        lines: [
          '📧 Email: contact@anishdevelops.me',
          '📞 Phone: +91 7065692440',
          '📍 Location: New Delhi, Delhi, India'
        ]
      });
    } else if (cleanCmd === 'whoami') {
      newHistory.push({
        type: 'out',
        lines: ['guest@anish-portfolio (~/about-me) [Permission: READ_ONLY]']
      });
    } else {
      newHistory.push({
        type: 'out',
        lines: [`zsh: command not found: ${cleanCmd}. Type "help" for command list.`]
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  return (
    <motion.div
      id="about-terminal"
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      dragElastic={0.05}
      className={`relative w-full rounded-xl bg-zinc-950/90 border-2 border-zinc-700/80 shadow-2xl overflow-hidden font-mono text-xs hover:border-lime-400/80 transition-colors ${
        isMaximized ? 'fixed inset-4 z-50 max-w-none' : 'max-w-full'
      }`}
    >
      {/* Terminal Title Bar (Drag Handle) */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 cursor-grab active:cursor-grabbing select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition cursor-pointer" onClick={() => setIsMinimized(!isMinimized)} />
          <div className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition cursor-pointer" onClick={() => setIsMinimized(!isMinimized)} />
          <div className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
          <span className="text-[11px] text-zinc-400 font-mono ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-lime-400" />
            anish@dev-machine: ~/about-me (zsh)
          </span>
        </div>

        <div className="flex items-center gap-3 text-zinc-500 text-[10px]">
          <span className="hidden sm:flex items-center gap-1 text-zinc-500">
            <Move className="w-3 h-3" /> Drag me anywhere
          </span>
          <button onClick={() => setIsMaximized(!isMaximized)} className="hover:text-white">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Window Body */}
      {!isMinimized && (
        <div className="p-4 sm:p-5 h-80 sm:h-96 flex flex-col justify-between scanline bg-zinc-950/95">
          {/* Scrollable Command Output */}
          <div className="overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-zinc-800 flex-1">
            {history.map((item, index) => (
              <div key={index} className="space-y-1">
                {item.type === 'sys' && (
                  <div className="text-zinc-500 text-[11px] italic"># {item.text}</div>
                )}
                {item.type === 'cmd' && (
                  <div className="flex items-center gap-2 text-lime-400 font-semibold">
                    <span className="text-cyan-400">anish@dev:~$</span>
                    <span>{item.text}</span>
                  </div>
                )}
                {item.type === 'out' && (
                  <div className="pl-4 border-l-2 border-zinc-800 space-y-1 text-zinc-300">
                    {item.lines.map((line, i) => (
                      <p key={i} className="leading-relaxed">{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Command Prompt Input */}
          <div className="pt-3 border-t border-zinc-800/80">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">anish@dev:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type 'help', 'skills', or 'clear'..."
                className="flex-1 bg-transparent text-lime-300 font-mono text-xs focus:outline-none placeholder:text-zinc-600"
              />
              <button type="submit" className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-lime-400 hover:bg-zinc-700 transition">
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Command Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-zinc-900">
              <span className="text-[10px] text-zinc-500 mr-1 self-center">Quick Run:</span>
              {['cat about.txt', 'skills', 'projects', 'contact', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="px-2 py-0.5 rounded text-[10px] bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-lime-400 hover:text-lime-400 transition"
                >
                  ${cmd}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
