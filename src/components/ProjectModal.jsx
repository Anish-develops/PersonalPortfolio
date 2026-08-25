import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, RefreshCw, Send, ShieldAlert, CheckCircle2, Terminal, Code2, Cpu, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState('demo'); // 'demo' or 'architecture'

  // Keyboard shortcut ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // State for Meridian Sandbox
  const [sandboxCode, setSandboxCode] = useState(
    `// Meridian Real-Time Collaborative Editor
function processInterviewSession(candidateId, socketId) {
  const sandbox = new ExecutionSandbox({ timeout: 2000 });
  const result = sandbox.eval(\`
    const sum = (a, b) => a + b;
    console.log("Testing sum(40, 2):", sum(40, 2));
  \`);
  return { status: "PASSED", result };
}`
  );
  const [sandboxLogs, setSandboxLogs] = useState([
    '[SYSTEM] Docker Container sandbox_v2 ready.',
    '[WEBSOCKET] Connected to room #interview-7892'
  ]);
  const [isRunningSandbox, setIsRunningSandbox] = useState(false);

  // State for Drawing Game
  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState('#a3e635');
  const [isDrawing, setIsDrawing] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { user: 'Player_Alex', text: 'Guessing: Collaborative Canvas!' },
    { user: 'Player_Anish', text: 'Drawing the socket connection...' }
  ]);
  const [newChatInput, setNewChatInput] = useState('');

  // State for Video Streaming API
  const [selectedEndpoint, setSelectedEndpoint] = useState('upload');
  const [apiResponse, setApiResponse] = useState(null);
  const [isApiLoading, setIsApiLoading] = useState(false);

  // State for MoonSafe SOS
  const [sosStatus, setSosStatus] = useState('IDLE'); // 'IDLE', 'ALERTING', 'DISPATCHED'
  const [sosLogs, setSosLogs] = useState([]);

  // Handle Meridian Sandbox Execution
  const handleRunSandbox = () => {
    soundEffects.playClick();
    setIsRunningSandbox(true);
    setSandboxLogs(prev => [...prev, `[USER_RUN] Compiling code at ${new Date().toLocaleTimeString()}...`]);
    
    setTimeout(() => {
      setSandboxLogs(prev => [
        ...prev,
        '[CONTAINER] Isolated V8 execution environment allocated.',
        '[OUTPUT] Testing sum(40, 2): 42',
        '[SUCCESS] Code executed in 14ms (0 errors, memory peak 12.4MB)'
      ]);
      setIsRunningSandbox(false);
      soundEffects.playSuccess();
    }, 800);
  };

  // Drawing Game Canvas Logic
  useEffect(() => {
    if (project.id !== 'drawing' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set initial black background
    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [project.id]);

  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.beginPath();
    }
  };

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    soundEffects.playCyberKey();
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    soundEffects.playClick();
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newChatInput.trim()) return;
    soundEffects.playClick();
    setChatMessages(prev => [...prev, { user: 'You (Visitor)', text: newChatInput.trim() }]);
    setNewChatInput('');
  };

  // Handle Video API Test
  const handleTestApi = (endpoint) => {
    soundEffects.playClick();
    setSelectedEndpoint(endpoint);
    setIsApiLoading(true);

    setTimeout(() => {
      setIsApiLoading(false);
      soundEffects.playSuccess();
      if (endpoint === 'upload') {
        setApiResponse({
          status: 201,
          message: "Media uploaded successfully to Cloudinary",
          data: {
            videoId: "vid_994821a",
            url: "https://res.cloudinary.com/anishdev/video/upload/v1723/sample.mp4",
            duration: "02:45",
            resolution: "1080p",
            hlsPlaylist: "https://cdn.meridian.io/hls/vid_994821a/master.m3u8",
            format: "mp4",
            authBearer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          }
        });
      } else if (endpoint === 'auth') {
        setApiResponse({
          status: 200,
          message: "Authentication Token Generated",
          user: {
            id: "user_anish_01",
            email: "anishdevelops@gmail.com",
            role: "ADMIN_CREATOR"
          },
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFuaXNoIEt1bWFyIiwiaWF0IjoxNTE2MjM5MDIyfQ"
        });
      } else {
        setApiResponse({
          status: 200,
          totalVideos: 42,
          feed: [
            { id: "vid_1", title: "Realtime WebSocket Architecture in Node.js", views: "14.2k" },
            { id: "vid_2", title: "Building AI Agents with LangChain & React", views: "28.9k" }
          ]
        });
      }
    }, 600);
  };

  // Handle MoonSafe Trigger
  const handleTriggerSos = () => {
    soundEffects.playClick();
    setSosStatus('ALERTING');
    setSosLogs([
      '[00:00.01] SOS Button Pressed by User',
      '[00:00.04] Acquiring High-Precision GPS Lock...',
      '[00:00.12] GPS Acquired: 28.6139° N, 77.2090° E (New Delhi)'
    ]);

    setTimeout(() => {
      setSosLogs(prev => [
        ...prev,
        '[00:00.45] Dispatching SMS Alerts to Emergency Contacts (+91 7065692440)...',
        '[00:00.80] AI Workflow Triggered: Broadcasting Live Location Link to Police Grid & Guardian Contacts',
        '[00:01.10] Live Location Stream Active (Socket ID: sos_stream_8819)'
      ]);
      setSosStatus('DISPATCHED');
      soundEffects.playSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border-2 border-zinc-700 rounded-xl overflow-hidden shadow-2xl flex flex-col font-sans"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-lime-400/10 text-lime-400 border border-lime-400/30">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading tracking-tight">{project.title}</h3>
              <p className="text-xs text-zinc-400 font-mono">Interactive Live Sandbox Environment</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Project Summary Banner */}
          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 leading-relaxed">
            <p className="font-sans mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span key={idx} className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-zinc-800 text-lime-400 border border-zinc-700">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Demo Container */}
          <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
              <span className="text-xs font-mono text-lime-400 flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4" />
                LIVE DEMO SIMULATOR
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">Interactive Feature Test</span>
            </div>

            {/* Meridian Project Interactive Sandbox */}
            {project.id === 'meridian' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Code Editor */}
                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-400 text-[11px] flex justify-between">
                      <span>Collaborative Sandbox Editor</span>
                      <span className="text-lime-400">Node.js V8 Engine</span>
                    </label>
                    <textarea
                      value={sandboxCode}
                      onChange={(e) => setSandboxCode(e.target.value)}
                      rows={8}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-lime-300 font-mono text-xs focus:outline-none focus:border-lime-400 resize-none"
                    />
                    <button
                      onClick={handleRunSandbox}
                      disabled={isRunningSandbox}
                      className="flex items-center justify-center gap-2 py-2 px-4 rounded bg-lime-400 text-black font-bold font-mono hover:bg-lime-300 transition shadow-brutal-green-sm"
                    >
                      {isRunningSandbox ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-black" />}
                      Execute Sandbox Code
                    </button>
                  </div>

                  {/* Terminal Execution Logs */}
                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-400 text-[11px] flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                      Execution Output & Docker Stream
                    </label>
                    <div className="w-full h-full min-h-[160px] bg-zinc-950 border border-zinc-800 rounded p-3 font-mono text-[11px] text-zinc-300 space-y-1.5 overflow-y-auto">
                      {sandboxLogs.map((log, i) => (
                        <div key={i} className={log.includes('SUCCESS') ? 'text-emerald-400 font-semibold' : 'text-zinc-400'}>
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Drawing Game Interactive Canvas */}
            {project.id === 'drawing' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Drawing Canvas */}
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 text-[11px]">Draw on Synchronized WebSocket Canvas</span>
                      <div className="flex gap-2">
                        {['#a3e635', '#c084fc', '#38bdf8', '#ffffff'].map((color) => (
                          <button
                            key={color}
                            onClick={() => setBrushColor(color)}
                            className={`w-5 h-5 rounded-full border border-zinc-700 ${brushColor === color ? 'ring-2 ring-white scale-110' : ''}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        <button
                          onClick={clearCanvas}
                          className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:bg-zinc-700"
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <canvas
                      ref={canvasRef}
                      width={480}
                      height={200}
                      onMouseDown={startDrawing}
                      onMouseUp={stopDrawing}
                      onMouseMove={draw}
                      onMouseLeave={stopDrawing}
                      className="w-full h-48 bg-zinc-900 rounded border border-zinc-700 cursor-crosshair"
                    />
                  </div>

                  {/* WebSocket Live Chat */}
                  <div className="flex flex-col justify-between bg-zinc-950 border border-zinc-800 rounded p-3">
                    <div className="text-[11px] text-purple-400 font-bold border-b border-zinc-800 pb-1 mb-2">
                      Live WebSocket Chatroom
                    </div>
                    <div className="space-y-2 max-h-28 overflow-y-auto mb-2 text-[11px]">
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} className="text-zinc-300">
                          <span className="text-lime-400 font-bold">{msg.user}: </span>
                          <span>{msg.text}</span>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSendChat} className="flex gap-1">
                      <input
                        type="text"
                        value={newChatInput}
                        onChange={(e) => setNewChatInput(e.target.value)}
                        placeholder="Type chat message..."
                        className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-purple-400"
                      />
                      <button type="submit" className="p-1 rounded bg-purple-500 text-black hover:bg-purple-400">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Video Backend Interactive API */}
            {project.id === 'streaming' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex gap-2 border-b border-zinc-800 pb-2">
                  <button
                    onClick={() => handleTestApi('upload')}
                    className={`px-3 py-1 rounded text-xs font-mono font-medium transition ${selectedEndpoint === 'upload' ? 'bg-cyan-500 text-black font-bold' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                  >
                    POST /api/v1/videos/upload
                  </button>
                  <button
                    onClick={() => handleTestApi('auth')}
                    className={`px-3 py-1 rounded text-xs font-mono font-medium transition ${selectedEndpoint === 'auth' ? 'bg-cyan-500 text-black font-bold' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                  >
                    POST /api/v1/auth/token
                  </button>
                  <button
                    onClick={() => handleTestApi('feed')}
                    className={`px-3 py-1 rounded text-xs font-mono font-medium transition ${selectedEndpoint === 'feed' ? 'bg-cyan-500 text-black font-bold' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                  >
                    GET /api/v1/videos/feed
                  </button>
                </div>

                {/* API JSON Result Display */}
                <div className="bg-zinc-950 border border-zinc-800 rounded p-4 text-xs font-mono text-cyan-300 overflow-x-auto min-h-[160px]">
                  {isApiLoading ? (
                    <div className="flex items-center gap-2 text-zinc-400">
                      <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                      Simulating Express backend response pipeline...
                    </div>
                  ) : apiResponse ? (
                    <pre className="text-cyan-300">{JSON.stringify(apiResponse, null, 2)}</pre>
                  ) : (
                    <div className="text-zinc-500 text-center py-6">
                      Click any endpoint button above to test real-time JSON responses & JWT headers!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* MoonSafe Interactive SOS */}
            {project.id === 'moonsafe' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex flex-col items-center justify-center p-4 bg-zinc-950 rounded-lg border border-zinc-800 gap-3">
                  <button
                    onClick={handleTriggerSos}
                    disabled={sosStatus === 'ALERTING'}
                    className={`px-6 py-3 rounded-full font-bold font-mono text-sm flex items-center gap-2 transition shadow-lg ${
                      sosStatus === 'DISPATCHED'
                        ? 'bg-emerald-500 text-black shadow-[0_0_20px_#10b981]'
                        : 'bg-rose-600 text-white hover:bg-rose-500 shadow-[0_0_20px_#f43f5e]'
                    }`}
                  >
                    <ShieldAlert className="w-5 h-5 animate-pulse" />
                    {sosStatus === 'DISPATCHED' ? 'SOS DISPATCHED & SYNCED' : 'PRESS TO TEST SOS EMERGENCY TRIGGER'}
                  </button>

                  <div className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 font-mono text-[11px] text-rose-300 space-y-1 min-h-[120px]">
                    {sosLogs.length === 0 ? (
                      <span className="text-zinc-500">Press the button above to simulate emergency alert workflow.</span>
                    ) : (
                      sosLogs.map((log, idx) => (
                        <div key={idx} className={log.includes('DISPATCHED') || log.includes('Broadcasting') ? 'text-emerald-400 font-semibold' : ''}>
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2 text-lime-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Built & Tested by Anish Kumar</span>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition"
          >
            Close Sandbox
          </button>
        </div>
      </motion.div>
    </div>
  );
};
