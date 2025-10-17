import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const ASCII_ART = `
    ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
       ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
       ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
  `;

  const NEOFETCH_ART = `
       _,met$$$$$gg.          guest@portfolio.dev
    ,g$$$$$$$$$$$$$$$P.       ─────────────────────
  ,g$$P"     """Y$$.".        OS: Portfolio Linux
 ,$$P'              \`$$$.     Host: Terminal v2.0
',$$P       ,ggs.     \`$$b:   Kernel: 6.1.0-dev
\`d$$'     ,$P"'   .    $$$    Uptime: ${Math.floor(Math.random() * 100)} days
 $$P      d$'     ,    $$P    Shell: bash 5.2.0
 $$:      $$.   -    ,d$$'    Theme: CRT-Green
 $$;      Y$b._   _,d$P'      CPU: i7-Developer
 Y$$.    \`.\`"Y$$$$P"'         GPU: NVIDIA RTX Skills
 \`$$b      "-.__              Memory: 32GB
  \`Y$$                        Disk: 1TB SSD
   \`Y$$.
     \`$$b.
       \`Y$$b.
          \`"Y$b._
              \`"""
  `;

  const commands = {
    help: {
      description: 'Show available commands',
      action: () => [
        { type: 'output', content: 'Available commands:', class: 'terminal-bright' },
        { type: 'output', content: '' },
        { type: 'output', content: '  help      - Show this help message' },
        { type: 'output', content: '  about     - Learn about me' },
        { type: 'output', content: '  skills    - View my technical skills' },
        { type: 'output', content: '  projects  - See my projects' },
        { type: 'output', content: '  contact   - Get my contact information' },
        { type: 'output', content: '  neofetch  - Display system information' },
        { type: 'output', content: '  ls        - List directory contents' },
        { type: 'output', content: '  cat       - Read file contents' },
        { type: 'output', content: '  whoami    - Display current user' },
        { type: 'output', content: '  date      - Show current date and time' },
        { type: 'output', content: '  clear     - Clear the terminal' },
        { type: 'output', content: '  banner    - Show welcome banner' },
      ]
    },
    // about: {
    //   description: 'About me',
    //   action: () => [
    //     { type: 'output', content: '┌─────────────────────────────────────────────────────┐', class: 'terminal-bright' },
    //     { type: 'output', content: '│                    ABOUT ME                         │', class: 'terminal-bright' },
    //     { type: 'output', content: '└─────────────────────────────────────────────────────┘', class: 'terminal-bright' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  👨‍💻 Full-Stack Developer & Creative Coder' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  Hi! I\'m a Zayn Butt, passionate developer who loves building' },
    //     { type: 'output', content: '  innovative web applications that push the boundaries' },
    //     { type: 'output', content: '  of what\'s possible with modern web technologies.' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  🎯 Specializing in:' },
    //     { type: 'output', content: '     • Interactive UI/UX design' },
    //     { type: 'output', content: '     • Performance optimization' },
    //     { type: 'output', content: '     • Creative coding & animations' },
    //     { type: 'output', content: '     • Full-stack development' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  💡 Always learning, always building.' },
    //   ]
    // },
    about: {
      description: 'Display professional information about me',
      action: () => [
        { type: 'output', content: '┌─────────────────────────────────────────────────────────┐', class: 'terminal-bright' },
        { type: 'output', content: '│                    ZAIN UL ABIDEEN                       │', class: 'terminal-bright' },
        { type: 'output', content: '│               FULL-STACK DEVELOPER                      │', class: 'terminal-bright' },
        { type: 'output', content: '└─────────────────────────────────────────────────────────┘', class: 'terminal-bright' },
        { type: 'output', content: '' },
        { type: 'output', content: '  🚀 Passionate Full-Stack Developer specializing in the MERN stack' },
        { type: 'output', content: '  and Next.js, with expertise in creating dynamic, high-performance' },
        { type: 'output', content: '  web applications.' },
        { type: 'output', content: '' },
        { type: 'output', content: '  🎯 TECHNICAL EXPERTISE:' },
        { type: 'output', content: '     • MERN Stack (MongoDB, Express.js, React, Node.js)' },
        { type: 'output', content: '     • Next.js & Modern React Ecosystem' },
        { type: 'output', content: '     • RESTful API Design & Development' },
        { type: 'output', content: '     • Interactive Animations (GSAP, Three.js)' },
        { type: 'output', content: '     • Responsive UI/UX with Tailwind CSS' },
        { type: 'output', content: '     • Database Architecture & Optimization' },
        { type: 'output', content: '' },
        { type: 'output', content: '  💼 PROFESSIONAL HIGHLIGHTS:' },
        { type: 'output', content: '     • 1+ years of professional development experience' },
        { type: 'output', content: '     • Delivered 40% increase in user engagement' },
        { type: 'output', content: '     • Built applications for international clients' },
        { type: 'output', content: '     • Full-stack project lifecycle management' },
        { type: 'output', content: '' },
        { type: 'output', content: '  🔄 Constantly evolving with emerging technologies and' },
        { type: 'output', content: '  best practices in web development.' },
        { type: 'output', content: '' },
        { type: 'output', content: '  📍 Based in Pakistan | Open to Opportunities' },
      ]
    },
    // skills: {
    //   description: 'Technical skills',
    //   action: () => [
    //     { type: 'output', content: '┌─────────────────────────────────────────────────────┐', class: 'terminal-bright' },
    //     { type: 'output', content: '│                 TECHNICAL SKILLS                    │', class: 'terminal-bright' },
    //     { type: 'output', content: '└─────────────────────────────────────────────────────┘', class: 'terminal-bright' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  Frontend Development:' },
    //     { type: 'output', content: '  ▰▰▰▰▰▰▰▰▰▱ 90%  React.js / Next.js' },
    //     { type: 'output', content: '  ▰▰▰▰▰▰▰▰▱▱ 85%  TypeScript / JavaScript' },
    //     { type: 'output', content: '  ▰▰▰▰▰▰▰▰▰▱ 90%  Tailwind CSS / CSS3' },
    //     { type: 'output', content: '  ▰▰▰▰▰▰▰▰▱▱ 80%  GSAP / Framer Motion' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  Backend Development:' },
    //     { type: 'output', content: '  ▰▰▰▰▰▰▰▰▱▱ 85%  Node.js / Express' },
    //     { type: 'output', content: '  ▰▰▰▰▰▰▰▱▱▱ 75%  PostgreSQL / MongoDB' },
    //     { type: 'output', content: '  ▰▰▰▰▰▰▰▰▱▱ 80%  REST / GraphQL APIs' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  Tools & Platforms:' },
    //     { type: 'output', content: '  ▰▰▰▰▰▰▰▰▰▱ 95%  Git / GitHub' },
    //     { type: 'output', content: '  ▰▰▰▰▰▰▰▰▱▱ 80%  Docker / CI/CD' },
    //     { type: 'output', content: '  ▰▰▰▰▰▰▰▰▰▱ 90%  VS Code / Terminal' },
    //   ]
    // },
    skills: {
      description: 'Display my technical skills and proficiencies',
      action: () => [
        { type: 'output', content: '┌─────────────────────────────────────────────────────┐', class: 'terminal-bright' },
        { type: 'output', content: '│                 TECHNICAL SKILLS                    │', class: 'terminal-bright' },
        { type: 'output', content: '└─────────────────────────────────────────────────────┘', class: 'terminal-bright' },
        { type: 'output', content: '' },
        { type: 'output', content: '  🎯 FRONTEND DEVELOPMENT:' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▰▰ 95%  React.js / Next.js' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▰▱ 90%  JavaScript (ES6+) / TypeScript' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▰▰ 95%  HTML5 / CSS3 / Tailwind CSS' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▱▱ 85%  GSAP / Three.js / Framer Motion' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▱▱ 85%  Redux / Zustand State Management' },
        { type: 'output', content: '' },
        { type: 'output', content: '  ⚙️ BACKEND DEVELOPMENT:' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▰▱ 90%  Node.js / Express.js' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▱▱ 85%  MongoDB / Mongoose ODM' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▱▱▱ 75%  MySQL / PostgreSQL' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▰▱ 90%  RESTful API Design' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▱▱ 80%  JWT Authentication' },
        { type: 'output', content: '' },
        { type: 'output', content: '  🛠️ TOOLS & PLATFORMS:' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▰▰ 95%  Git / GitHub' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▰▱ 90%  Vercel / Netlify' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▱▱ 85%  VS Code / Linux Terminal' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▱▱▱ 70%  Docker / CI/CD' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▱▱ 80%  Postman / API Testing' },
        { type: 'output', content: '' },
        { type: 'output', content: '  🎨 DESIGN & CMS:' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▱▱ 85%  Figma / UI Design' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▱▱▱ 75%  WordPress / Elementor' },
        { type: 'output', content: '  ▰▰▰▰▰▰▰▰▱▱ 80%  Responsive Web Design' },
      ]
    },
    // projects: {
    //   description: 'View projects',
    //   action: () => [
    //     { type: 'output', content: '┌─────────────────────────────────────────────────────┐', class: 'terminal-bright' },
    //     { type: 'output', content: '│                    PROJECTS                         │', class: 'terminal-bright' },
    //     { type: 'output', content: '└─────────────────────────────────────────────────────┘', class: 'terminal-bright' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  [1] 🖥️  Terminal Portfolio' },
    //     { type: 'output', content: '      A retro terminal-style portfolio with CRT effects' },
    //     { type: 'output', content: '      Tech: React, GSAP, Tailwind CSS' },
    //     { type: 'output', content: '      Status: ✓ Live' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  [2] 🛒 E-Commerce Platform' },
    //     { type: 'output', content: '      Full-stack shopping experience with Stripe' },
    //     { type: 'output', content: '      Tech: Next.js, Stripe, Supabase' },
    //     { type: 'output', content: '      Status: ✓ Live' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  [3] 🤖 AI Chat Application' },
    //     { type: 'output', content: '      Real-time AI conversations with streaming' },
    //     { type: 'output', content: '      Tech: React, WebSocket, OpenAI GPT-4' },
    //     { type: 'output', content: '      Status: ⚡ In Development' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  [4] 📊 Data Visualization Dashboard' },
    //     { type: 'output', content: '      Interactive charts and analytics platform' },
    //     { type: 'output', content: '      Tech: React, D3.js, PostgreSQL' },
    //     { type: 'output', content: '      Status: ✓ Live' },
    //   ]
    // },
    // projects: {
    //   description: 'View my portfolio projects',
    //   action: () => [
    //     { type: 'output', content: '┌─────────────────────────────────────────────────────┐', class: 'terminal-bright' },
    //     { type: 'output', content: '│                    PROJECTS                         │', class: 'terminal-bright' },
    //     { type: 'output', content: '└─────────────────────────────────────────────────────┘', class: 'terminal-bright' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  📁 [1] TERMINAL PORTFOLIO', class: 'terminal-cyan' },
    //     { type: 'output', content: '      └─ Interactive Linux-terminal themed portfolio', class: 'terminal-dim' },
    //     { type: 'output', content: '      └─ Tech: React, TypeScript, Vite, CSS3', class: 'terminal-dim' },
    //     { type: 'output', content: '      └─ Status: 🟢 Live', class: 'terminal-green' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  📁 [2] JOBSYNC - JOB PORTAL', class: 'terminal-cyan' },
    //     { type: 'output', content: '      └─ Full-stack job board with role-based auth', class: 'terminal-dim' },
    //     { type: 'output', content: '      └─ Tech: MERN Stack, Redux, JWT, Shadcn/UI', class: 'terminal-dim' },
    //     { type: 'output', content: '      └─ Status: 🟢 Live', class: 'terminal-green' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  📁 [3] THIS IS MEGMA', class: 'terminal-cyan' },
    //     { type: 'output', content: '      └─ 3D animated website with scroll animations', class: 'terminal-dim' },
    //     { type: 'output', content: '      └─ Tech: GSAP, Three.js, JavaScript, HTML5/CSS3', class: 'terminal-dim' },
    //     { type: 'output', content: '      └─ Status: 🟢 Live', class: 'terminal-green' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  📁 [4] CHATPANDA CLONE', class: 'terminal-cyan' },
    //     { type: 'output', content: '      └─ Animated AI chat interface with 3D elements', class: 'terminal-dim' },
    //     { type: 'output', content: '      └─ Tech: Next.js, GSAP, Three.js, Tailwind', class: 'terminal-dim' },
    //     { type: 'output', content: '      └─ Status: 🟢 Live', class: 'terminal-green' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  📁 [5] LMS PLATFORM', class: 'terminal-cyan' },
    //     { type: 'output', content: '      └─ Course platform with video streaming', class: 'terminal-dim' },
    //     { type: 'output', content: '      └─ Tech: MERN, Cloudinary, Redux, JWT, RBAC', class: 'terminal-dim' },
    //     { type: 'output', content: '      └─ Status: 🔵 Completed', class: 'terminal-blue' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  📁 [6] CUSTOM CMS PORTFOLIO', class: 'terminal-cyan' },
    //     { type: 'output', content: '      └─ Dynamic portfolio with admin panel', class: 'terminal-dim' },
    //     { type: 'output', content: '      └─ Tech: Next.js, MongoDB, Nodemailer, CRUD', class: 'terminal-dim' },
    //     { type: 'output', content: '      └─ Status: 🔵 Deployed', class: 'terminal-blue' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  💡 Type \'project [number]\' for detailed view', class: 'terminal-yellow' },
    //     { type: 'output', content: '  💡 Type \'projects --all\' for complete list', class: 'terminal-yellow' },
    //   ]
    // },

    projects: {
      description: 'Explore my projects portfolio',
      action: () => [
        { type: 'output', content: '┌─────────────────────────────────────────────────────┐', class: 'terminal-bright' },
        { type: 'output', content: '│                     PROJECTS                        │', class: 'terminal-bright' },
        { type: 'output', content: '└─────────────────────────────────────────────────────┘', class: 'terminal-bright' },
        { type: 'output', content: '' },
        { type: 'output', content: '  🖥️  [1] TERMINAL PORTFOLIO', class: 'terminal-cyan' },
        { type: 'output', content: '      Interactive Linux-terminal themed portfolio', class: 'terminal-dim' },
        { type: 'output', content: '      Tech: React, TypeScript, Vite, CSS3', class: 'terminal-dim' },
        { type: 'output', content: '      Status: 🟢 Live', class: 'terminal-green' },
        { type: 'output', content: '' },
        { type: 'output', content: '' },
        { type: 'output', content: '  💼 [2] JOBSYNC - JOB PORTAL', class: 'terminal-cyan' },
        { type: 'output', content: '      Full-stack job board with role-based authentication', class: 'terminal-dim' },
        { type: 'output', content: '      Tech: MERN Stack, Redux, JWT, Shadcn/UI', class: 'terminal-dim' },
        { type: 'output', content: '      Status: 🟢 Live', class: 'terminal-green' },
        { type: 'output', content: '' },
        { type: 'output', content: '' },
        { type: 'output', content: '  🎨 [3] THIS IS MEGMA', class: 'terminal-cyan' },
        { type: 'output', content: '      3D animated website with scroll-triggered animations', class: 'terminal-dim' },
        { type: 'output', content: '      Tech: GSAP, Three.js, JavaScript, HTML5/CSS3', class: 'terminal-dim' },
        { type: 'output', content: '      Status: 🟢 Live', class: 'terminal-green' },
        { type: 'output', content: '' },
        { type: 'output', content: '' },
        { type: 'output', content: '  🤖 [4] CHATPANDA CLONE', class: 'terminal-cyan' },
        { type: 'output', content: '      Animated AI chat interface with 3D elements', class: 'terminal-dim' },
        { type: 'output', content: '      Tech: Next.js, GSAP, Three.js, Tailwind CSS', class: 'terminal-dim' },
        { type: 'output', content: '      Status: 🟢 Live', class: 'terminal-green' },
        { type: 'output', content: '' },
        { type: 'output', content: '' },
        { type: 'output', content: '  🎓 [5] LMS PLATFORM', class: 'terminal-cyan' },
        { type: 'output', content: '      Learning management system with video streaming', class: 'terminal-dim' },
        { type: 'output', content: '      Tech: MERN Stack, Cloudinary, Redux, JWT', class: 'terminal-dim' },
        { type: 'output', content: '      Status: 🔵 Completed', class: 'terminal-blue' },
        { type: 'output', content: '' },
        { type: 'output', content: '' },
        { type: 'output', content: '  📊 [6] CUSTOM CMS PORTFOLIO', class: 'terminal-cyan' },
        { type: 'output', content: '      Dynamic portfolio with admin content management', class: 'terminal-dim' },
        { type: 'output', content: '      Tech: Next.js, MongoDB, Nodemailer, CRUD', class: 'terminal-dim' },
        { type: 'output', content: '      Status: 🔵 Deployed', class: 'terminal-blue' },
        { type: 'output', content: '' },
        { type: 'output', content: '' },
        { type: 'output', content: '  💡 Type project [number] for detailed view', class: 'terminal-yellow' },
        { type: 'output', content: '  💡 Example: project 2', class: 'terminal-yellow' },
      ]
    },

    // contact: {
    //   description: 'Contact information',
    //   action: () => [
    //     { type: 'output', content: '┌─────────────────────────────────────────────────────┐', class: 'terminal-bright' },
    //     { type: 'output', content: '│                    CONTACT                          │', class: 'terminal-bright' },
    //     { type: 'output', content: '└─────────────────────────────────────────────────────┘', class: 'terminal-bright' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  📧 Email:      zaynobusiness@gmail.com' },
    //     { type: 'output', content: '  🐙 GitHub:     https://github.com/hey-Zayn/' },
    //     { type: 'output', content: '  💼 LinkedIn:   https://www.linkedin.com/in/zayn-butt/' },
    //     // { type: 'output', content: '  🐦 Twitter:    @yourusername' },
    //     { type: 'output', content: '  🌐 Website:    https://my-portfolio-zayn.vercel.app/' },
    //     { type: 'output', content: '' },
    //     { type: 'output', content: '  💬 Feel free to reach out for collaborations!' },
    //   ]
    // },

    contact: {
      description: 'Get in touch with me',
      action: () => [
        { type: 'output', content: '┌─────────────────────────────────────────────────────┐', class: 'terminal-bright' },
        { type: 'output', content: '│                     CONTACT                         │', class: 'terminal-bright' },
        { type: 'output', content: '└─────────────────────────────────────────────────────┘', class: 'terminal-bright' },
        { type: 'output', content: '' },
        { type: 'output', content: '  📧  EMAIL', class: 'terminal-cyan' },
        { type: 'output', content: '      zaynobusiness@gmail.com', class: 'terminal-dim' },
        { type: 'output', content: '' },
        { type: 'output', content: '  💼  LINKEDIN', class: 'terminal-cyan' },
        { type: 'output', content: '      linkedin.com/in/zayn-butt', class: 'terminal-dim' },
        { type: 'output', content: '' },
        { type: 'output', content: '  🔗  GITHUB', class: 'terminal-cyan' },
        { type: 'output', content: '      github.com/hey-Zayn', class: 'terminal-dim' },
        { type: 'output', content: '' },
        { type: 'output', content: '  🌐  PORTFOLIO', class: 'terminal-cyan' },
        { type: 'output', content: '      my-portfolio-zayn.vercel.app', class: 'terminal-dim' },
        { type: 'output', content: '' },
        { type: 'output', content: '  📱  PHONE', class: 'terminal-cyan' },
        { type: 'output', content: '      +92 300-3636-186', class: 'terminal-dim' },
        { type: 'output', content: '' },
        { type: 'output', content: '  🗺️   LOCATION', class: 'terminal-cyan' },
        { type: 'output', content: '      Pakistan', class: 'terminal-dim' },
        { type: 'output', content: '' },
        { type: 'output', content: '  💬  Feel free to reach out for:' },
        { type: 'output', content: '      • Job opportunities and collaborations', class: 'terminal-dim' },
        { type: 'output', content: '      • Technical discussions and projects', class: 'terminal-dim' },
        { type: 'output', content: '      • Open source contributions', class: 'terminal-dim' },
        { type: 'output', content: '' },
        { type: 'output', content: '  ⚡  I typically respond within 24 hours', class: 'terminal-green' },
      ]
    },

    neofetch: {
      description: 'Display system information',
      action: () => [
        { type: 'ascii', content: NEOFETCH_ART },
      ]
    },
    ls: {
      description: 'List directory contents',
      action: () => [
        { type: 'output', content: 'drwxr-xr-x  2 guest guest  4096 Oct 17 2025  about/' },
        { type: 'output', content: 'drwxr-xr-x  2 guest guest  4096 Oct 17 2025  projects/' },
        { type: 'output', content: 'drwxr-xr-x  2 guest guest  4096 Oct 17 2025  skills/' },
        { type: 'output', content: '-rw-r--r--  1 guest guest  1337 Oct 17 2025  contact.txt' },
        { type: 'output', content: '-rw-r--r--  1 guest guest  2048 Oct 17 2025  resume.pdf' },
        { type: 'output', content: '-rwxr-xr-x  1 guest guest   512 Oct 17 2025  run.sh' },
      ]
    },
    cat: {
      description: 'Read file contents',
      action: (args) => {
        if (!args || args.length === 0) {
          return [{ type: 'error', content: 'cat: missing file operand' }];
        }
        if (args[0] === 'contact.txt') {
          return [
            { type: 'output', content: '# Contact Information' },
            { type: 'output', content: '' },
            { type: 'output', content: 'Email: zaynobusiness@gamil.com' },
            { type: 'output', content: 'GitHub: github.com/hey-Zayn' },
          ];
        }
        return [{ type: 'error', content: `cat: ${args[0]}: No such file or directory` }];
      }
    },
    whoami: {
      description: 'Current user',
      action: () => [
        { type: 'output', content: 'guest@portfolio.dev' },
      ]
    },
    date: {
      description: 'Show current date',
      action: () => [
        { type: 'output', content: new Date().toString() },
      ]
    },
    banner: {
      description: 'Show welcome banner',
      action: () => [
        { type: 'ascii', content: ASCII_ART },
        { type: 'output', content: '' },
        { type: 'output', content: '  Welcome to my terminal portfolio! Type "help" for commands.', class: 'terminal-bright' },
        { type: 'output', content: '' },
      ]
    },
    clear: {
      description: 'Clear terminal',
      action: () => 'clear'
    }
  };

  useEffect(() => {
    // Boot sequence
    const bootMessages = [
      '[ OK ] Started Terminal Portfolio Service',
      '[ OK ] Reached target Multi-User System',
      '[ OK ] Started GSAP Animation Engine',
      '',
      'Portfolio Linux 6.1.0-dev (tty1)',
      '',
    ];

    bootMessages.forEach((msg, index) => {
      setTimeout(() => {
        const element = document.createElement('div');
        element.className = 'terminal-text boot-text mb-1';
        element.textContent = msg;
        terminalRef.current?.appendChild(element);
        gsap.to(element, { opacity: 1, duration: 0.1 });
      }, index * 200);
    });

    setTimeout(() => {
      setIsBooting(false);
      const welcomeMessages = [
        { type: 'ascii', content: ASCII_ART },
        { type: 'output', content: '' },
        { type: 'output', content: '  ╔══════════════════════════════════════════════════════════╗', class: 'terminal-bright' },
        { type: 'output', content: '  ║                                                          ║', class: 'terminal-bright' },
        { type: 'output', content: '  ║   👋 Welcome to my interactive terminal portfolio!      ║', class: 'terminal-bright' },
        { type: 'output', content: '  ║                                                          ║', class: 'terminal-bright' },
        { type: 'output', content: '  ║   💡 TIP: Type "help" to see all available commands     ║', class: 'terminal-bright glitch', dataText: '  ║   💡 TIP: Type "help" to see all available commands     ║' },
        { type: 'output', content: '  ║                                                          ║', class: 'terminal-bright' },
        { type: 'output', content: '  ╚══════════════════════════════════════════════════════════╝', class: 'terminal-bright' },
        { type: 'output', content: '' },
      ];

      welcomeMessages.forEach((msg, index) => {
        setTimeout(() => {
          setHistory(prev => [...prev, msg]);
        }, index * 100);
      });
    }, bootMessages.length * 200 + 500);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();

    if (!trimmedCmd) return;

    const [command, ...args] = trimmedCmd.toLowerCase().split(' ');

    setHistory(prev => [...prev, { type: 'command', content: cmd }]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (command === 'clear') {
      setTimeout(() => setHistory([]), 50);
      return;
    }

    if (commands[command]) {
      const result = commands[command].action(args);
      if (result !== 'clear') {
        result.forEach((line, index) => {
          setTimeout(() => {
            setHistory(prev => [...prev, line]);
          }, index * 30);
        });
      }
    } else {
      setHistory(prev => [...prev,
      { type: 'error', content: `bash: ${command}: command not found` },
      { type: 'output', content: 'Type "help" for available commands.' }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matchingCommands = Object.keys(commands).filter(cmd =>
        cmd.startsWith(input.toLowerCase())
      );
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-terminal-bg scanline crt-screen p-4 md:p-8 flicker">
      <div className="max-w-5xl mx-auto">
        <div className="bg-terminal-bgLight border border-primary rounded-lg overflow-hidden shadow-2xl">
          {/* Window Controls */}
          <div className="window-controls border-b border-primary/30">
            <div className="window-button close"></div>
            <div className="window-button minimize"></div>
            <div className="window-button maximize"></div>
            <span className="ml-4 terminal-text text-xs flex-1">
              guest@portfolio.dev: ~
            </span>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="p-6 min-h-[75vh] max-h-[75vh] overflow-y-auto font-mono text-sm md:text-base custom-scrollbar"
            onClick={() => !isBooting && inputRef.current?.focus()}
          >
            {!isBooting && history.map((item, index) => (
              <div key={index} className="mb-1">
                {item.type === 'command' && (
                  <div className="flex items-start gap-2">
                    <span className="terminal-text terminal-glow select-none">guest@portfolio:~$</span>
                    <span className="terminal-text">{item.content}</span>
                  </div>
                )}
                {item.type === 'output' && (
                  <div className={`terminal-text pl-0 ${item.class || ''}`} data-text={item.dataText}>
                    {item.content}
                  </div>
                )}
                {item.type === 'ascii' && (
                  <pre className="terminal-text ascii-art terminal-bright">
                    {item.content}
                  </pre>
                )}
                {item.type === 'error' && (
                  <div className="text-destructive pl-0">{item.content}</div>
                )}
              </div>
            ))}

            {!isBooting && (
              <form onSubmit={handleSubmit} className="flex items-start gap-2 mt-2">
                <span className="terminal-text terminal-glow select-none">guest@portfolio:~$</span>
                <div className="flex-1 flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none terminal-text caret-primary"
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                  />
                  <span className="terminal-text cursor-blink ml-0.5">█</span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-4 text-center terminal-text text-xs opacity-60 space-y-1">
          <div>Press ↑ ↓ to navigate command history • Tab for autocomplete</div>
          <div>Tip: Try typing "neofetch" or "banner"</div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--terminal-bg));
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--terminal-green) / 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--terminal-green) / 0.5);
        }
      `}</style>
    </div>
  );
};

export default Terminal;
