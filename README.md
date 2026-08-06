# ⚡ Anish Kumar | Full-Stack & AI Engineer Portfolio Hub

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-E10098?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-SFX_Engine-a3e635?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

A state-of-the-art, interactive portfolio hub engineered by **Anish Kumar** (B.Tech Computer Science @ GGSIPU, Expected 2027 | 9.1 CGPA). Designed with neo-brutalist aesthetics, real-time code sandboxes, interactive Zsh terminal, Web Audio SFX, and an end-to-end guided onboarding suite.

---

## 🌟 Key Features

### 1. 🎓 Interactive Guided Onboarding Suite
- **Welcome Wizard Modal**: High-impact introduction modal tailored by visitor persona (Recruiter, Engineer, Explorer).
- **Spotlight Guided Tour**: SVG mask backdrop that dims the viewport and illuminates key DOM elements step-by-step (`#hero-controls`, `#about-terminal`, `#skills-grid`, `#projects-grid`, `#contact-form`).
- **Discovery Progress Checklist Widget**: Floating collapsible widget tracking visitor exploration (`0%` to `100%`) with celebratory confetti bursts (`canvas-confetti`).

### 2. 🖥️ Draggable Zsh Terminal Shell
- Interactive terminal window supporting commands:
  - `help` - List all shell commands
  - `cat about.txt` - Display bio, academic record, and achievements
  - `skills` - Display full-stack arsenal
  - `projects` - View highlighted software systems
  - `contact` - Display direct contact details
  - `clear` - Clear terminal buffer
- Draggable window handle, quick-run command pills, and visual command completion hints (`⌘K`).

### 3. 🚀 Production Project Interactive Sandboxes
- **Meridian Collaborative Platform**: Live JavaScript execution sandbox simulator.
- **Realtime Multiplayer Drawing Game**: Synchronized WebSocket canvas drawing board and live chat simulator.
- **Video Streaming Microservice**: Endpoint explorer for media uploading and JWT authentication.
- **MoonSafe Emergency App**: SOS alert and AI workflow trigger demonstration.

### 4. 🎵 Web Audio SFX & Cyber Matrix Rain
- Synthesized Web Audio API sound effects for tactile click, keypress, and success feedback.
- Toggleable Cyberpunk Matrix green rain background canvas animation (`<MatrixBackground />`).

### 5. 📬 Direct Transmission Contact Form
- Real-time input validation, accessible label structure (`htmlFor`, `aria-label`), keyboard focus rings, and dispatch confirmation with confetti.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18, HTML5, Vanilla CSS Design System, Tailwind CSS
- **Animations & Micro-interactions**: Framer Motion, Canvas Confetti
- **Icons**: Lucide React Icons
- **Audio & SFX**: Synthesized Web Audio API
- **Bundler & Tooling**: Vite, PostCSS, Autoprefixer

---

## 📁 Project Architecture

```
FinalPortfolio/
├── public/                # Static public assets
├── src/
│   ├── assets/            # Fonts & image assets
│   ├── components/        # Modular UI Components
│   │   ├── ContactBento.jsx          # Direct transmission contact form
│   │   ├── ExtracurricularsBento.jsx # Hobbies & extracurricular achievements
│   │   ├── Footer.jsx                # Footer with replay tour shortcut
│   │   ├── HeroBento.jsx             # Hero card & audio/matrix controls
│   │   ├── LineArtIllustrations.jsx  # SVG line art project previews
│   │   ├── MatrixBackground.jsx      # Cyber rain HTML5 canvas background
│   │   ├── Navbar.jsx                # Sticky navbar & mobile drawer menu
│   │   ├── OnboardingSuite.jsx       # Guided tour, welcome wizard & progress widget
│   │   ├── ProjectModal.jsx          # Interactive code execution modal
│   │   ├── ProjectsBento.jsx         # Featured projects bento grid
│   │   ├── SkillsBento.jsx           # Filterable technical skills matrix
│   │   └── TerminalAbout.jsx         # Draggable interactive Zsh shell
│   ├── utils/
│   │   └── audio.js                  # Web Audio API sound synthesizer
│   ├── App.css
│   ├── App.jsx                       # Main application shell
│   ├── index.css                     # Design tokens & utility classes
│   └── main.jsx                      # Vite entrypoint
├── .gitignore             # Git ignore configuration
├── package.json           # Node dependencies & scripts
├── README.md              # Project documentation
└── vite.config.js         # Vite build configuration
```

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/anish/final-portfolio.git
   cd final-portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 📬 Contact & Connect

- **Engineer**: Anish Kumar
- **Email**: [anishdevelops@gmail.com](mailto:anishdevelops@gmail.com)
- **Phone**: +91 7065692440
- **Location**: New Delhi, Delhi, India
- **Education**: B.Tech Computer Science @ Guru Gobind Singh Indraprastha University (Expected May 2027) | **9.1 CGPA**

---

*© 2026 Anish Kumar. Built with React, Node.js & Brutalist Engineering Precision.*
