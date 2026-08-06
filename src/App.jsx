import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBento } from './components/HeroBento';
import { TerminalAbout } from './components/TerminalAbout';
import { SkillsBento } from './components/SkillsBento';
import { ProjectsBento } from './components/ProjectsBento';
import { ProjectModal } from './components/ProjectModal';
import { ExtracurricularsBento } from './components/ExtracurricularsBento';
import { ContactBento } from './components/ContactBento';
import { Footer } from './components/Footer';
import { MatrixBackground } from './components/MatrixBackground';
import { OnboardingSuite } from './components/OnboardingSuite';

export function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [matrixActive, setMatrixActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Onboarding States
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('portfolio-onboarding-completed');
  });
  const [tourActive, setTourActive] = useState(false);
  const [onboardingProgress, setOnboardingProgress] = useState({
    tour_completed: false,
    terminal_used: false,
    sandbox_launched: false,
    sfx_toggled: false
  });

  const handleNotifyOnboarding = (key) => {
    setOnboardingProgress((prev) => {
      if (prev[key]) return prev;
      return { ...prev, [key]: true };
    });
  };

  const handleStartTour = () => {
    setShowWelcome(false);
    setTourActive(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-[#a3e635] selection:text-black relative">
      {/* Optional Matrix Cyber Rain Backdrop */}
      <MatrixBackground active={matrixActive} color="#a3e635" />

      {/* Main Top Navigation */}
      <Navbar onStartTour={handleStartTour} />

      {/* Onboarding Suite Modal, Spotlight Tour & Progress Widget */}
      <OnboardingSuite
        showWelcome={showWelcome}
        setShowWelcome={setShowWelcome}
        tourActive={tourActive}
        setTourActive={setTourActive}
        onboardingProgress={onboardingProgress}
        setOnboardingProgress={setOnboardingProgress}
      />

      {/* Main Bento Box Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 relative z-10 pb-16">
        {/* Section 1: Hero & Quick Stats */}
        <section id="hero" className="scroll-mt-24">
          <HeroBento
            matrixActive={matrixActive}
            setMatrixActive={setMatrixActive}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            onNotifyOnboarding={handleNotifyOnboarding}
          />
        </section>

        {/* Section 2: Draggable Terminal Window (About Me) */}
        <section id="about" className="scroll-mt-24 space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
              <span className="text-lime-400 font-mono">//</span> About Anish
            </h2>
            <span className="text-xs font-mono text-zinc-500">Interactive Zsh Window</span>
          </div>
          <TerminalAbout onNotifyOnboarding={handleNotifyOnboarding} />
        </section>

        {/* Section 3: Technical Skills Bento Matrix */}
        <section id="skills" className="scroll-mt-24">
          <SkillsBento />
        </section>

        {/* Section 4: Projects Interactive Grid Cards */}
        <section id="projects" className="scroll-mt-24">
          <ProjectsBento
            onSelectProject={(proj) => setSelectedProject(proj)}
            onNotifyOnboarding={handleNotifyOnboarding}
          />
        </section>

        {/* Section 5: Extracurriculars & Hobbies Tile */}
        <section id="hobbies" className="scroll-mt-24">
          <ExtracurricularsBento />
        </section>

        {/* Section 6: Direct Transmission Contact Form */}
        <section id="contact" className="scroll-mt-24">
          <ContactBento />
        </section>
      </main>

      {/* Interactive Project Sandbox Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Footer */}
      <Footer onStartTour={handleStartTour} />
    </div>
  );
}

export default App;
