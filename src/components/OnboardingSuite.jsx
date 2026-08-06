import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  X,
  ChevronRight,
  ChevronLeft,
  Terminal,
  Code2,
  Cpu,
  Volume2,
  Play,
  RotateCcw,
  CheckSquare,
  Square,
  HelpCircle,
  Zap,
  Briefcase,
  UserCheck,
  Compass
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const OnboardingSuite = ({
  showWelcome,
  setShowWelcome,
  tourActive,
  setTourActive,
  onboardingProgress,
  setOnboardingProgress
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState('recruiter');
  const [isWidgetMinimized, setIsWidgetMinimized] = useState(false);
  const [targetRect, setTargetRect] = useState(null);

  // Tour steps definition
  const tourSteps = [
    {
      targetId: 'hero-controls',
      title: '1. Cyber Controls & Audio Engine',
      description: 'Toggle Web Audio SFX for tactile feedback and activate the Matrix Cyber Rain canvas backdrop.',
      hint: 'Try toggling the audio icon or matrix button!'
    },
    {
      targetId: 'about-terminal',
      title: '2. Interactive Zsh Terminal Window',
      description: 'A fully functional interactive shell! Type commands like "help", "skills", "projects", "matrix", or "clear".',
      hint: 'Type "help" in the terminal to see all commands.'
    },
    {
      targetId: 'skills-grid',
      title: '3. Technical Skills Bento Matrix',
      description: 'Filter skills by Category (Languages, Backend, Frontend, DevOps, AI & Data) to inspect proficiency.',
      hint: 'Click any filter tab to slice the skills matrix.'
    },
    {
      targetId: 'projects-grid',
      title: '4. Full-Stack & AI Project Sandboxes',
      description: 'Production applications featuring live interactive code execution, socket canvas drawings, and media streaming APIs.',
      hint: 'Click any card to launch its live interactive sandbox modal!'
    },
    {
      targetId: 'contact-form',
      title: '5. Direct Transmission Form',
      description: 'Direct dispatch pipeline with real-time field validation to get in touch with Anish directly.',
      hint: 'Send a message or copy contact details with one click!'
    }
  ];

  // Measure target bounding box for SVG spotlight mask
  useEffect(() => {
    if (!tourActive) return;

    const updateTargetRect = () => {
      const step = tourSteps[currentStep];
      if (!step) return;

      const el = document.getElementById(step.targetId);
      if (el) {
        // Scroll target into view gently
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const rect = el.getBoundingClientRect();
        setTargetRect({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateTargetRect();
    window.addEventListener('resize', updateTargetRect);
    window.addEventListener('scroll', updateTargetRect);

    return () => {
      window.removeEventListener('resize', updateTargetRect);
      window.removeEventListener('scroll', updateTargetRect);
    };
  }, [tourActive, currentStep]);

  // Keyboard navigation for tour
  useEffect(() => {
    if (!tourActive) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        endTour(false);
      } else if (e.key === 'ArrowRight') {
        handleNextStep();
      } else if (e.key === 'ArrowLeft') {
        handlePrevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tourActive, currentStep]);

  const handleNextStep = () => {
    soundEffects.playClick();
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      endTour(true);
    }
  };

  const handlePrevStep = () => {
    soundEffects.playClick();
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const endTour = (completed = true) => {
    setTourActive(false);
    setCurrentStep(0);
    if (completed) {
      soundEffects.playSuccess();
      setOnboardingProgress((prev) => ({ ...prev, tour_completed: true }));
      localStorage.setItem('portfolio-onboarding-completed', 'true');
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#a3e635', '#38bdf8', '#c084fc']
      });
    }
  };

  const startTourFromWelcome = () => {
    soundEffects.playClick();
    setShowWelcome(false);
    setCurrentStep(0);
    setTourActive(true);
  };

  // Calculate completed checklist count
  const completedCount = Object.values(onboardingProgress).filter(Boolean).length;
  const totalSteps = 4;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  // Check if all 4 steps completed for big celebration
  useEffect(() => {
    if (completedCount === totalSteps && !localStorage.getItem('portfolio-master-unlocked')) {
      localStorage.setItem('portfolio-master-unlocked', 'true');
      soundEffects.playSuccess();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#a3e635', '#f43f5e', '#38bdf8', '#c084fc']
      });
    }
  }, [completedCount]);

  return (
    <>
      {/* 1. WELCOME WIZARD MODAL */}
      <AnimatePresence>
        {showWelcome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-zinc-950 border-2 border-lime-400/60 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative overflow-hidden text-zinc-100"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-lime-400/10 blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setShowWelcome(false);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-lime-950 text-lime-400 border border-lime-800 font-mono text-xs flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Interactive Portfolio Hub v2.0
                </span>
                <span className="px-2.5 py-1 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs">
                  ⚡ 90s Quick Tour
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight mb-2">
                Welcome to Anish's <span className="text-lime-400">Engineering Hub</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mb-6">
                Explore a production-grade full-stack portfolio featuring live interactive coding sandboxes, real-time socket canvas games, interactive Zsh terminal, and audio SFX.
              </p>

              {/* Persona Selector */}
              <div className="mb-6 space-y-2">
                <span className="text-xs font-mono text-zinc-400 block uppercase tracking-wider">
                  Select your primary view goal:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedRole('recruiter');
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-mono flex flex-col items-center gap-1.5 transition ${
                      selectedRole === 'recruiter'
                        ? 'bg-lime-400/20 text-lime-300 border-lime-400 shadow-brutal-green-sm'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 text-lime-400" />
                    <span>Recruiter</span>
                  </button>

                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedRole('engineer');
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-mono flex flex-col items-center gap-1.5 transition ${
                      selectedRole === 'engineer'
                        ? 'bg-purple-400/20 text-purple-300 border-purple-400 shadow-brutal-purple-sm'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <Code2 className="w-4 h-4 text-purple-400" />
                    <span>Engineer</span>
                  </button>

                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedRole('visitor');
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-mono flex flex-col items-center gap-1.5 transition ${
                      selectedRole === 'visitor'
                        ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400 shadow-brutal-cyan-sm'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Explorer</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={startTourFromWelcome}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-lime-400 text-black font-mono font-bold text-xs hover:bg-lime-300 transition shadow-brutal-green flex items-center justify-center gap-2 group"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>Start Guided Tour</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setShowWelcome(false);
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-zinc-900 text-zinc-200 border border-zinc-800 font-mono text-xs hover:border-zinc-600 transition flex items-center justify-center gap-1.5"
                >
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>Try Sandbox</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setShowWelcome(false);
                    localStorage.setItem('portfolio-onboarding-completed', 'true');
                  }}
                  className="w-full sm:w-auto py-3 px-3 rounded-xl text-zinc-400 hover:text-zinc-200 font-mono text-xs transition"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. SPOTLIGHT GUIDED TOUR OVERLAY */}
      <AnimatePresence>
        {tourActive && targetRect && (
          <div className="fixed inset-0 z-50 pointer-events-auto">
            {/* Darkened SVG Backdrop with Cutout Hole */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <mask id="spotlight-mask">
                  <rect width="100%" height="100%" fill="white" />
                  <rect
                    x={targetRect.left - 8 - window.scrollX}
                    y={targetRect.top - 8 - window.scrollY}
                    width={targetRect.width + 16}
                    height={targetRect.height + 16}
                    rx="16"
                    fill="black"
                  />
                </mask>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="rgba(9, 9, 11, 0.85)"
                mask="url(#spotlight-mask)"
              />
            </svg>

            {/* Glowing Border around targeted DOM element */}
            <div
              className="absolute pointer-events-none rounded-2xl border-2 border-lime-400 shadow-[0_0_25px_rgba(163,230,53,0.6)] animate-pulse"
              style={{
                top: targetRect.top - 8 - window.scrollY,
                left: targetRect.left - 8 - window.scrollX,
                width: targetRect.width + 16,
                height: targetRect.height + 16
              }}
            />

            {/* Tour Step Popover Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              key={currentStep}
              className="fixed z-50 max-w-md w-[calc(100vw-2rem)] sm:w-full bg-zinc-950 border-2 border-lime-400/80 rounded-2xl p-5 shadow-2xl text-zinc-100 font-sans"
              style={{
                top: Math.min(
                  window.innerHeight - 240,
                  Math.max(20, targetRect.top - window.scrollY + targetRect.height + 20)
                ),
                left: Math.max(
                  16,
                  Math.min(window.innerWidth - 460, targetRect.left - window.scrollX)
                )
              }}
            >
              {/* Header Step Counter */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono font-bold text-lime-400 bg-lime-950 px-2.5 py-0.5 rounded border border-lime-800">
                  Step {currentStep + 1} of {tourSteps.length}
                </span>
                <button
                  onClick={() => endTour(false)}
                  className="text-xs font-mono text-zinc-500 hover:text-white transition flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Skip
                </button>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-white font-heading mb-1">
                {tourSteps[currentStep].title}
              </h3>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-3">
                {tourSteps[currentStep].description}
              </p>

              {/* Hint Box */}
              <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center gap-2 mb-4">
                <Zap className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>{tourSteps[currentStep].hint}</span>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-1 transition ${
                    currentStep === 0
                      ? 'text-zinc-600 cursor-not-allowed'
                      : 'text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back
                </button>

                <div className="flex items-center gap-1">
                  {tourSteps.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentStep ? 'w-5 bg-lime-400' : 'w-1.5 bg-zinc-800'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextStep}
                  className="px-4 py-1.5 rounded-lg bg-lime-400 text-black font-mono font-bold text-xs hover:bg-lime-300 transition shadow-brutal-green-sm flex items-center gap-1"
                >
                  <span>{currentStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. PERSISTENT ONBOARDING CHECKLIST WIDGET */}
      <div className="fixed bottom-4 right-4 z-40">
        <AnimatePresence>
          {isWidgetMinimized ? (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => {
                soundEffects.playClick();
                setIsWidgetMinimized(false);
              }}
              className="p-3 rounded-2xl bg-zinc-950 border-2 border-lime-400 text-lime-400 shadow-2xl flex items-center gap-2 font-mono text-xs hover:bg-zinc-900 transition group"
            >
              <Sparkles className="w-4 h-4 text-lime-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Guide ({completedCount}/{totalSteps})</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-zinc-950/95 border-2 border-zinc-800 hover:border-lime-400/60 rounded-2xl p-4 shadow-2xl max-w-xs w-80 text-zinc-100 backdrop-blur-md transition-colors"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-lime-950 text-lime-400 border border-lime-800">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-heading text-white">Portfolio Discovery</h4>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {progressPercent}% Complete
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setTourActive(true);
                      setCurrentStep(0);
                    }}
                    title="Replay Spotlight Tour"
                    className="p-1 rounded text-zinc-400 hover:text-lime-400 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setIsWidgetMinimized(true);
                    }}
                    title="Minimize Guide"
                    className="p-1 rounded text-zinc-400 hover:text-white transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Progress Gauge Bar */}
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-lime-400 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Checklist Items */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  {onboardingProgress.tour_completed ? (
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-zinc-600 shrink-0" />
                  )}
                  <span className={onboardingProgress.tour_completed ? 'text-zinc-200 line-through' : 'text-zinc-400'}>
                    Complete Guided Tour
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {onboardingProgress.terminal_used ? (
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-zinc-600 shrink-0" />
                  )}
                  <span className={onboardingProgress.terminal_used ? 'text-zinc-200 line-through' : 'text-zinc-400'}>
                    Execute Terminal Command
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {onboardingProgress.sandbox_launched ? (
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-zinc-600 shrink-0" />
                  )}
                  <span className={onboardingProgress.sandbox_launched ? 'text-zinc-200 line-through' : 'text-zinc-400'}>
                    Launch Project Sandbox
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {onboardingProgress.sfx_toggled ? (
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-zinc-600 shrink-0" />
                  )}
                  <span className={onboardingProgress.sfx_toggled ? 'text-zinc-200 line-through' : 'text-zinc-400'}>
                    Toggle SFX or Matrix Rain
                  </span>
                </div>
              </div>

              {/* Master Celebration Banner when finished */}
              {completedCount === totalSteps && (
                <div className="mt-3 p-2 rounded-lg bg-lime-950/80 border border-lime-700/80 text-[11px] font-mono text-lime-300 text-center flex items-center justify-center gap-1.5 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                  <span>Master Explorer Badge Unlocked! 🎉</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
