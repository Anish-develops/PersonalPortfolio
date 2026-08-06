import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Meridian Collaborative Platform Line Art Illustration
export const MeridianIllustration = ({ accentColor = '#a3e635' }) => {
  return (
    <div className="relative w-full h-44 bg-zinc-950/80 rounded-lg overflow-hidden border border-zinc-800 p-3 font-mono text-xs flex flex-col justify-between group">
      {/* Background line grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      
      {/* Editor Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 relative z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[10px] text-zinc-400 ml-2">meridian_sandbox.py</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            2 USERS SYNCED
          </span>
        </div>
      </div>

      {/* Code Split View SVG Line Art */}
      <div className="relative z-10 grid grid-cols-2 gap-2 my-2 flex-1">
        {/* User 1 Editor */}
        <div className="bg-zinc-900/90 rounded border border-zinc-800 p-2 text-[10px] text-zinc-300 relative overflow-hidden">
          <div className="text-zinc-500 mb-1"># User_1 (Anish)</div>
          <div className="text-purple-400">def <span className="text-lime-400">execute_sandbox</span>(code):</div>
          <div className="pl-3 text-zinc-400">socket.<span className="text-cyan-400">emit</span>('sync_state', code)</div>
          <div className="pl-3 text-zinc-400">return <span className="text-amber-300">Docker.run</span>(code)</div>
          {/* Animated Cursor */}
          <motion.div 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-1.5 h-3 bg-lime-400 ml-0.5 align-middle"
          />
        </div>

        {/* User 2 Cursor & Sync Stream */}
        <div className="bg-zinc-900/90 rounded border border-zinc-800 p-2 text-[10px] text-zinc-400 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="text-zinc-500 mb-1"># Execution Output</div>
            <div className="text-emerald-400 font-semibold">[SUCCESS] 200 OK</div>
            <div className="text-zinc-400 text-[9px] mt-1">Memory: 42.1MB | Latency: 12ms</div>
          </div>
          {/* Live line art graph wave */}
          <svg className="w-full h-8 stroke-lime-400/60 fill-none text-lime-400" viewBox="0 0 100 30">
            <motion.path
              d="M 0 15 Q 25 5 50 20 T 100 10"
              stroke="currentColor"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <circle cx="50" cy="20" r="3" fill="#a3e635" className="animate-pulse" />
          </svg>
        </div>
      </div>

      {/* Decorative SVG connection line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line x1="20%" y1="50%" x2="80%" y2="50%" stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      </svg>
    </div>
  );
};

// Multiplayer Drawing Game Line Art Illustration
export const DrawingIllustration = ({ accentColor = '#c084fc' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.03;

      // Draw stylized grid
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw dynamic sine curve brush stroke
      ctx.beginPath();
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';

      for (let x = 10; x < canvas.width - 10; x += 3) {
        const y = canvas.height / 2 + Math.sin(x * 0.04 + t) * 22 + Math.cos(x * 0.02 - t) * 8;
        if (x === 10) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw simulated multiplayer cursors
      const cursorX1 = canvas.width / 3 + Math.sin(t) * 25;
      const cursorY1 = canvas.height / 2 + Math.cos(t) * 15;
      ctx.fillStyle = '#a3e635';
      ctx.beginPath();
      ctx.arc(cursorX1, cursorY1, 4, 0, Math.PI * 2);
      ctx.fill();

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrame);
  }, [accentColor]);

  return (
    <div className="relative w-full h-44 bg-zinc-950/80 rounded-lg overflow-hidden border border-zinc-800 p-2 font-mono flex flex-col justify-between">
      <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-800 pb-1 z-10">
        <span className="text-purple-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          WebSocket Canvas Socket
        </span>
        <span className="text-zinc-500">60 FPS Sync</span>
      </div>
      <canvas ref={canvasRef} width={280} height={110} className="w-full h-28 block my-auto rounded bg-zinc-900/60" />
      <div className="flex items-center gap-2 justify-between text-[9px] text-zinc-400 border-t border-zinc-800/80 pt-1 z-10">
        <div className="flex gap-1">
          <span className="w-3 h-3 rounded-full bg-lime-400 inline-block border border-zinc-700" />
          <span className="w-3 h-3 rounded-full bg-purple-400 inline-block border border-zinc-700" />
          <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block border border-zinc-700" />
        </div>
        <span className="text-zinc-500 font-mono">Live Stroke Data</span>
      </div>
    </div>
  );
};

// Video Streaming Backend Line Art Illustration
export const StreamingIllustration = ({ accentColor = '#38bdf8' }) => {
  return (
    <div className="relative w-full h-44 bg-zinc-950/80 rounded-lg overflow-hidden border border-zinc-800 p-3 font-mono text-xs flex flex-col justify-between">
      <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-800 pb-1.5">
        <span className="text-cyan-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          JWT Media Microservices
        </span>
        <span className="text-zinc-500">Node.js / Express</span>
      </div>

      {/* SVG Pipeline Line Art */}
      <div className="my-auto relative">
        <svg className="w-full h-24" viewBox="0 0 300 90">
          {/* Node 1: Client */}
          <rect x="10" y="25" width="60" height="40" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          <text x="40" y="45" fill="#a1a1aa" fontSize="9" textAnchor="middle" fontFamily="monospace">Client Request</text>

          {/* Node 2: JWT Gateway */}
          <rect x="115" y="25" width="70" height="40" rx="6" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="150" y="42" fill="#38bdf8" fontSize="9" textAnchor="middle" fontFamily="monospace">JWT Gateway</text>
          <text x="150" y="54" fill="#64748b" fontSize="7" textAnchor="middle" fontFamily="monospace">Express.js</text>

          {/* Node 3: Storage */}
          <rect x="230" y="10" width="60" height="32" rx="4" fill="#18181b" stroke="#a3e635" strokeWidth="1.5" />
          <text x="260" y="30" fill="#a3e635" fontSize="8" textAnchor="middle" fontFamily="monospace">Cloudinary</text>

          {/* Node 4: DB */}
          <rect x="230" y="50" width="60" height="32" rx="4" fill="#18181b" stroke="#c084fc" strokeWidth="1.5" />
          <text x="260" y="70" fill="#c084fc" fontSize="8" textAnchor="middle" fontFamily="monospace">MongoDB</text>

          {/* Connecting animated laser paths */}
          <path d="M 70 45 L 115 45" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
          <path d="M 185 45 L 230 26" stroke="#a3e635" strokeWidth="1.5" strokeDasharray="4 2" />
          <path d="M 185 45 L 230 66" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Packet animation */}
          <motion.circle 
            r="3" 
            fill="#38bdf8"
            animate={{ cx: [70, 115], cy: [45, 45] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
          <motion.circle 
            r="3" 
            fill="#a3e635"
            animate={{ cx: [185, 230], cy: [45, 26] }}
            transition={{ repeat: Infinity, duration: 1.8, delay: 0.3, ease: 'linear' }}
          />
        </svg>
      </div>

      <div className="flex items-center justify-between text-[9px] text-zinc-500 border-t border-zinc-800/80 pt-1">
        <span>Auth: Bearer JWT</span>
        <span>Storage: HLS / Cloudinary</span>
      </div>
    </div>
  );
};

// MoonSafe Women Safety App Line Art Illustration
export const MoonSafeIllustration = ({ accentColor = '#f43f5e' }) => {
  return (
    <div className="relative w-full h-44 bg-zinc-950/80 rounded-lg overflow-hidden border border-zinc-800 p-3 font-mono text-xs flex flex-col justify-between">
      <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-800 pb-1">
        <span className="text-rose-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          AI SOS Emergency Dispatch
        </span>
        <span className="text-zinc-500">React Native / Python</span>
      </div>

      {/* Radar SOS Map Grid */}
      <div className="relative my-auto h-24 flex items-center justify-center overflow-hidden">
        {/* Radar Circles */}
        <div className="absolute w-20 h-20 rounded-full border border-rose-500/20" />
        <div className="absolute w-32 h-32 rounded-full border border-rose-500/10" />
        <div className="absolute w-44 h-44 rounded-full border border-rose-500/5" />

        {/* Pulse Sweep Line */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute w-24 h-24 origin-center pointer-events-none"
        >
          <div className="w-1/2 h-1/2 bg-gradient-to-br from-rose-500/30 to-transparent rounded-tl-full" />
        </motion.div>

        {/* SOS Location Marker */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center shadow-[0_0_12px_#f43f5e]">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <span className="text-[9px] bg-rose-950/90 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800 mt-1 font-semibold">
            LIVE SOS ALERT: 28.6139° N, 77.2090° E
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-zinc-400 border-t border-zinc-800/80 pt-1">
        <span className="text-emerald-400">✓ AI Automation Active</span>
        <span className="text-zinc-500">SMS / Live GPS Sync</span>
      </div>
    </div>
  );
};
