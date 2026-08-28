/**
 * ============================================================
 *  PREMIUM PORTFOLIO DATA · Raphael Freitas
 *  Centralized, typed data for the entire portfolio.
 * ============================================================
 */

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "tools"
  | "corporate"
  | "cloud"
  | "ai";

export interface Skill {
  name: string;
  icon: string;
  percent: number;
  category: SkillCategory;
  level: string;
  description: string;
  experience: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  technologies: string[];
  difficulty: number;
  highlights: string[];
  link: string;
  github: string;
  featured: boolean;
  status: "completed" | "in-progress" | "planned";
  year: string;
  stats: { views: number; likes: number };
  role: string;
  accent: string;
  image?: string;
  metrics?: { label: string; value: string }[];
  caseStudy?: {
    problem: string;
    solution: string;
    lessons: string;
  };
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  current?: boolean;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface Certification {
  name: string;
  hours: string;
  institution: string;
  year: number;
  status: "completed" | "in-progress" | "planned";
  progress?: number;
  credentialId?: string;
  category: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating?: number;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export const personal = {
  name: "Raphael Freitas",
  fullName: "Raphael Freitas dos Santos",
  firstName: "Raphael",
  lastName: "Freitas",
  initials: "RF",
  title: "Desenvolvedor Full Stack | Engenharia de Software | Arquitetura de Sistemas",
  tagline: "Full Stack · Eng. de Software · Modelagem de Sistemas",
  age: 19,
  location: "São Paulo, SP",
  email: "raphaelfreitasdossantos651@gmail.com",
  phone: "(11) 94737-4151",
  github: "https://github.com/Raphaeljdk",
  githubHandle: "Raphaeljdk",
  linkedin: "https://www.linkedin.com/in/raphael-freitas-dos-santos-a42704260/",
  linkedinHandle: "raphael-freitas",
  website: "https://raphaeljdk.github.io",
  availability: "Disponível para oportunidades",
  bio: "Desenvolvedor Full Stack em formação, com vivência prática em processos corporativos de suprimentos, logística e qualidade dentro de indústrias reguladas. Atua como Aprendiz de Suprimentos/Compras na Polyexcel, combinando rotina SAP Business One com desenvolvimento de automações em Python. Utiliza IAs generativas (ChatGPT, DeepSeek, GLM, Gemini) como ferramentas de produtividade e revisão de código.",
  bioLong:
    "Desenvolvedor Full Stack em formação, com vivência prática em processos corporativos de suprimentos, logística e qualidade dentro de indústrias reguladas. Atualmente atua como Aprendiz de Suprimentos/Compras na Polyexcel, combinando rotina SAP Business One com desenvolvimento de automações em Python. Acumulei também experiência operacional na Eurofarma com rastreabilidade de lotes, COAs e movimentação de materiais. No desenvolvimento, construo soluções web full stack (React, Next.js, TypeScript, Node.js, Java) e utilizo IAs generativas (ChatGPT, DeepSeek, GLM, Gemini) como ferramentas de produtividade e revisão de código. Perfil analítico, curioso, com facilidade para aprender tecnologias novas e aplicar tecnologia na resolução de problemas reais do negócio.",
  university: "Estácio",
  degree: "Bacharelado em Engenharia de Software (Cursando)",
  roles: [
    "Full Stack Developer",
    "Arquitetura de Software",
    "Engenharia de Software",
    "IA Generativa & Produtividade",
  ],
};

export const stats: Stat[] = [
  { label: "Projetos entregues", value: 11, suffix: "+", icon: "rocket" },
  { label: "Tecnologias dominadas", value: 30, suffix: "+", icon: "layers" },
  { label: "Certificações", value: 9, suffix: "", icon: "award" },
  { label: "IAs utilizadas", value: 4, suffix: "", icon: "sparkles" },
  { label: "Horas de estudo", value: 4500, suffix: "+", icon: "book" },
  { label: "Repositórios GitHub", value: 15, suffix: "", icon: "gitBranch" },
];

export const skills: Skill[] = [
  // Frontend
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", percent: 92, category: "frontend", level: "Avançado", description: "Estrutura semântica, SEO, acessibilidade WCAG", experience: "2+ anos" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", percent: 88, category: "frontend", level: "Avançado", description: "Flexbox, Grid, animações, design systems", experience: "2+ anos" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", percent: 85, category: "frontend", level: "Avançado", description: "ES6+, async/await, DOM, APIs REST", experience: "2+ anos" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", percent: 65, category: "frontend", level: "Intermediário-Avançado", description: "Hooks, Server Components, Next.js", experience: "1+ ano" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", percent: 80, category: "frontend", level: "Avançado", description: "Design tokens, theming, responsividade", experience: "1+ ano" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", percent: 60, category: "frontend", level: "Intermediário", description: "Tipagem estática, generics, inferência", experience: "8 meses" },
  { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", percent: 45, category: "frontend", level: "Intermediário", description: "Composition API, Pinia, Vue Router", experience: "6 meses" },
  // Backend
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", percent: 78, category: "backend", level: "Avançado", description: "Express, APIs REST, WebSockets", experience: "1+ ano" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", percent: 60, category: "backend", level: "Intermediário", description: "POO, Spring Boot, JPA, Maven", experience: "1+ ano" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", percent: 50, category: "backend", level: "Intermediário", description: "Django, Flask, automação", experience: "8 meses" },
  // Database
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", percent: 65, category: "database", level: "Intermediário", description: "Joins, procedures, otimização", experience: "1+ ano" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", percent: 55, category: "database", level: "Intermediário", description: "CTEs, JSONB, window functions", experience: "8 meses" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", percent: 45, category: "database", level: "Intermediário", description: "NoSQL, agregações, índices", experience: "6 meses" },
  // Tools
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", percent: 82, category: "tools", level: "Avançado", description: "Branches, rebase, hooks, workflows", experience: "2+ anos" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", percent: 82, category: "tools", level: "Avançado", description: "Actions, Projects, Pages, Copilot", experience: "2+ anos" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", percent: 95, category: "tools", level: "Especialista", description: "Debug, extensões, atalhos, tasks", experience: "2+ anos" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", percent: 35, category: "tools", level: "Intermediário", description: "Containers, compose, imagens", experience: "6 meses" },
  { name: "Excel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftoffice/microsoftoffice-original.svg", percent: 75, category: "tools", level: "Avançado", description: "Power Query, dashboards, VBA", experience: "2+ anos" },
  // Corporate
  { name: "SAP B1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sap/sap-original.svg", percent: 65, category: "corporate", level: "Intermediário", description: "Módulos Financeiro, Estoque, Vendas, Compras", experience: "1+ ano" },
  { name: "TMS", icon: "https://cdn-icons-png.flaticon.com/512/2942/2942271.png", percent: 62, category: "corporate", level: "Intermediário-Avançado", description: "CTEs, fretes, logística, transportadoras", experience: "1+ ano" },
  // Cloud
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", percent: 38, category: "cloud", level: "Intermediário", description: "EC2, S3, Lambda, IAM", experience: "8 meses" },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original-wordmark.svg", percent: 30, category: "cloud", level: "Intermediário", description: "VMs, Blob, Functions, AD", experience: "4 meses" },
  { name: "Cloud Computing", icon: "https://cdn-icons-png.flaticon.com/512/3242/3242257.png", percent: 45, category: "cloud", level: "Intermediário", description: "IaaS, PaaS, SaaS, serverless", experience: "8 meses" },
  // AI & Productivity
  { name: "ChatGPT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg", percent: 90, category: "ai", level: "Avançado", description: "Geração de código, revisão, pair programming, arquitetura de soluções", experience: "2+ anos" },
  { name: "DeepSeek", icon: "https://cdn.simpleicons.org/deepseek/6d9eeb", percent: 85, category: "ai", level: "Avançado", description: "Análise de código, debugging assistido, documentação automática", experience: "1+ ano" },
  { name: "GLM", icon: "https://cdn.simpleicons.org/zhipuai/4285f4", percent: 80, category: "ai", level: "Avançado", description: "Geração de texto, análise de requisitos, prototipação rápida", experience: "1+ ano" },
  { name: "Gemini", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", percent: 82, category: "ai", level: "Avançado", description: "Multimodal IA, visão computacional, análise de documentos", experience: "1+ ano" },
];

export const skillCategories: { id: SkillCategory | "all"; label: string; color: string }[] = [
  { id: "all", label: "Todas", color: "from-emerald-400 to-teal-400" },
  { id: "frontend", label: "Frontend", color: "from-cyan-400 to-emerald-400" },
  { id: "backend", label: "Backend", color: "from-amber-400 to-orange-400" },
  { id: "database", label: "Database", color: "from-violet-400 to-fuchsia-400" },
  { id: "corporate", label: "Corporativo", color: "from-teal-400 to-emerald-400" },
  { id: "cloud", label: "Cloud", color: "from-sky-400 to-cyan-400" },
  { id: "tools", label: "Tools & DevOps", color: "from-rose-400 to-pink-400" },
  { id: "ai", label: "IA Generativa", color: "from-red-400 to-orange-400" },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Nexus Retail",
    subtitle: "Executive Dashboard 2026",
    description: "Executive dashboard consolidado com indicadores estratégicos, análise de custos, ROI 3.2x e roadmap visualizado. Construído para tomada de decisão C-level.",
    category: "Executive Dashboard",
    technologies: ["HTML", "CSS", "JavaScript", "Chart.js", "Tailwind"],
    difficulty: 92,
    highlights: ["ROI 3.2x", "Análise de Custos", "Roadmap Estratégico", "KPIs"],
    link: "https://raphaeljdk.github.io/dashboard/",
    github: "https://github.com/Raphaeljdk/dashboard",
    featured: true,
    status: "completed",
    year: "2026",
    stats: { views: 289, likes: 22 },
    role: "Frontend Lead",
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
    image: "/projects/nexus-retail.png",
    metrics: [
      { label: "ROI Comprovado", value: "3.2x" },
      { label: "KPIs Rastreados", value: "12+" },
      { label: "Tempo de Build", value: "<2s" },
      { label: "Responsivo", value: "100%" },
    ],
    caseStudy: {
      problem: "Diretoria precisava de visão consolidada de múltiplos departamentos sem depender de planilhas desconectadas e relatórios manuais.",
      solution: "Dashboard executive com arquitetura de componente por KPI, Chart.js com lazy loading e sistema de temas consistente. Dados mockados com estrutura real para demo C-level.",
      lessons: "Aprendi que dashboards executivos precisam de hierarquia visual clara — o CEO vê 3 números, o gerente vê 12. Camadas de detalhe por perfil de acesso.",
    },
  },
  {
    id: 2,
    title: "TMS Lite PRO",
    subtitle: "Gestão Inteligente de Fretes",
    description: "Sistema inteligente de gestão de fretes e análise de CTEs com dashboards executivos. Inspirado em soluções corporativas reais do setor logístico.",
    category: "Logística / TMS",
    technologies: ["React", "TypeScript", "Tailwind", "Chart.js", "Node.js"],
    difficulty: 90,
    highlights: ["Gestão de Fretes", "UX Corporativo", "CTEs", "Dashboards"],
    link: "https://raphaeljdk.github.io/TMS-Lite-PRO---Sistema-Inteligente-de-Gest-o-de-Fretes../",
    github: "https://github.com/Raphaeljdk/TMS-Lite-PRO",
    featured: true,
    status: "completed",
    year: "2025",
    stats: { views: 198, likes: 14 },
    role: "Full Stack Developer",
    accent: "from-amber-500 via-orange-500 to-rose-500",
    image: "/projects/tms-lite.png",
    metrics: [
      { label: "CTEs Gerenciados", value: "500+" },
      { label: "Automação", value: "60%" },
      { label: "Dashboards", value: "4" },
      { label: "Tempo de Load", value: "<1.5s" },
    ],
    caseStudy: {
      problem: "Transportadoras gerenciam CTEs em planilhas Excel, sem visibilidade em tempo real sobre custos e performance logística.",
      solution: "Sistema com dashboard de fretes, análise preditiva de custos por rota e comparação de transportadoras. UX pensada para operadores de TMS com fluxos de trabalho lineares.",
      lessons: "A complexidade de regras de frete (pedágio, cubagem, tipo de carga) exige um modelo de dados bem normalizado. UX para operador é diferente de UX para gestor.",
    },
  },
  {
    id: 3,
    title: "EnergyOS",
    subtitle: "Dashboard SaaS Inteligente",
    description: "Dashboard SaaS inteligente com atualização em tempo real via WebSockets, indicadores estratégicos e visualização dinâmica para monitoramento energético.",
    category: "SaaS / Dashboard",
    technologies: ["React", "Chart.js", "WebSockets", "Node.js", "Express"],
    difficulty: 85,
    highlights: ["UI/UX Estratégico", "Tempo Real", "API Integration", "WebSockets"],
    link: "https://raphaeljdk.github.io/EnergyOS-um-dashboard-SaaS-inteligente-com-atualiza-o-em-tempo-real/",
    github: "https://github.com/Raphaeljdk/EnergyOS",
    featured: true,
    status: "completed",
    year: "2025",
    stats: { views: 245, likes: 18 },
    role: "Full Stack Developer",
    accent: "from-violet-500 via-fuchsia-500 to-pink-500",
    image: "/projects/energyos.png",
    metrics: [
      { label: "Atualização", value: "Real-time" },
      { label: "Indicadores", value: "8+" },
      { label: "WebSocket", value: "Estável" },
      { label: "Uptime", value: "99%+" },
    ],
    caseStudy: {
      problem: "Monitoramento energético dependia de atualizações manuais e não oferecia visão em tempo real do consumo e geração.",
      solution: "Arquitetura com WebSocket para push de dados, indicadores com thresholds configuráveis e alertas visuais. Separation clara entre dados e visualização.",
      lessons: "WebSocket precisa de reconnection logic robusto — redes corporativas derrubam conexões. Fallback para polling a cada 30s foi essencial.",
    },
  },
  {
    id: 4,
    title: "TradePro",
    subtitle: "Plataforma Profissional de Trading",
    description: "Plataforma profissional para trading com dados de mercado em tempo real, análises técnicas avançadas e suporte a múltiplos ativos simultâneos.",
    category: "Fintech / Trading",
    technologies: ["React", "JavaScript", "Chart.js", "WebSockets", "Node.js"],
    difficulty: 88,
    highlights: ["Tempo Real", "Análise Técnica", "Múltiplos Ativos", "WebSockets"],
    link: "https://raphaeljdk.github.io/-TradePro---Plataforma-Profissional-de-Trading/",
    github: "",
    featured: true,
    status: "completed",
    year: "2025",
    stats: { views: 156, likes: 11 },
    role: "Frontend Developer",
    accent: "from-cyan-500 via-sky-500 to-blue-500",
    image: "/projects/tradepro.png",
    metrics: [
      { label: "Ativos Rastreados", value: "5+" },
      { label: "Gráficos Técnicos", value: "6 tipos" },
      { label: "Atualização", value: "Live" },
      { label: "Performance", value: "60fps" },
    ],
    caseStudy: {
      problem: "Traders precisam de múltiplos gráficos e dados em tempo real numa interface que não sobrecarrega visualmente.",
      solution: "Layout com tabs para ativos, gráficos Chart.js com streaming via WebSocket e indicadores técnicos overlay. Design minimal para não competir com dados.",
      lessons: "Performance de renderização é crítica — cada tick de preço dispara re-render. Virtualização de listas e memoização de cálculos técnicos foram decisivos.",
    },
  },
  {
    id: 5,
    title: "Herdeiros do Einstein",
    subtitle: "Mini SaaS Educacional Gamificado",
    description: "Mini SaaS educacional que transforma exercícios matemáticos em uma experiência envolvente, com sistema de níveis, ranking global e feedback imediato.",
    category: "Educação / SaaS",
    technologies: ["JavaScript", "HTML", "CSS", "localStorage", "Chart.js"],
    difficulty: 80,
    highlights: ["Sistema de Níveis", "Ranking Global", "Feedback", "Gamificação"],
    link: "https://raphaeljdk.github.io/HERDEIROS-DO-EINSTEIN/",
    github: "https://github.com/Raphaeljdk/HERDEIROS-DO-EINSTEIN",
    featured: true,
    status: "completed",
    year: "2024",
    stats: { views: 167, likes: 13 },
    role: "Full Stack Developer",
    accent: "from-teal-500 via-emerald-500 to-green-500",
    image: "/projects/herdeiros.png",
    metrics: [
      { label: "Níveis", value: "10+" },
      { label: "Exercícios", value: "200+" },
      { label: "Gamificação", value: "Completa" },
      { label: "Retenção", value: "78%" },
    ],
    caseStudy: {
      problem: "Alunos desistem de exercícios de matemática por falta de engajamento e feedback imediato.",
      solution: "Sistema de gamificação com XP, ranking global, níveis de dificuldade adaptativos e feedback visual instantâneo. Tudo em localStorage sem backend.",
      lessons: "Gamificação funciona quando o loop de recompensa é curto (segundos, não minutos). A progressão visual (XP bar, level up) é mais motivadora que pontos sozinhos.",
    },
  },
  {
    id: 7,
    title: "MiniBank",
    subtitle: "Banco Digital Inteligente",
    description: "Aplicação bancária digital completa com autenticação segura, dashboard interativo, gestão de transações e UI glassmorphism moderna. Deploy em produção na Vercel.",
    category: "Fintech / Banking",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Prisma"],
    difficulty: 82,
    highlights: ["Auth Segura", "Dashboard Interativo", "Glassmorphism UI", "Deploy Vercel"],
    link: "https://mini-bank-v02.vercel.app",
    github: "",
    featured: true,
    status: "completed",
    year: "2025",
    stats: { views: 120, likes: 8 },
    role: "Full Stack Developer",
    accent: "from-emerald-500 via-cyan-500 to-teal-500",
    image: "/projects/mini-bank.png",
  },
  {
    id: 8,
    title: "ERP Tech Lemon",
    subtitle: "Sistema ERP Completo de Gestão Empresarial",
    description: "Sistema ERP completo com dashboard executivo, gestão de clientes, produtos, vendas, financeiro, estoque e relatórios. Interface moderna com modo escuro, gráficos interativos e módulos integrados para controle total da empresa.",
    category: "ERP / SaaS",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "Recharts", "localStorage"],
    difficulty: 88,
    highlights: ["Dashboard Executivo", "Gestão Completa", "Gráficos Interativos", "Modo Escuro", "Múltiplos Módulos"],
    link: "https://erp-tech-lemon.vercel.app/",
    github: "",
    featured: true,
    status: "completed",
    year: "2025",
    stats: { views: 180, likes: 15 },
    role: "Full Stack Developer",
    accent: "from-red-500 via-orange-500 to-amber-500",
    image: "/projects/erp-tech-lemon.png",
    metrics: [
      { label: "Módulos", value: "7+" },
      { label: "Gráficos", value: "4+" },
      { label: "CRUD Completo", value: "100%" },
      { label: "Responsivo", value: "100%" },
    ],
    caseStudy: {
      problem: "Empresas precisam de um sistema unificado para gerenciar vendas, estoque, clientes e finanças sem depender de múltiplas planilhas e ferramentas desconectadas.",
      solution: "ERP completo com 7+ módulos integrados: Dashboard com KPIs em tempo real, gestão de clientes e produtos, emissão de vendas com múltiplas formas de pagamento, controle financeiro e de estoque com alertas de itens críticos, e relatórios detalhados.",
      lessons: "Um ERP precisa ter fluxos de trabalho lineares e intuitivos — cada tela deve ter um objetivo claro. A arquitetura de módulos permite evolução independente e testabilidade por área.",
    },
  },
  {
    id: 9,
    title: "StudyAI",
    subtitle: "Plataforma de Estudos Wabi-Sabi",
    description: "Plataforma de estudos com tutor IA (Sensei) que respeita o ritmo natural do aprendizado. Flashcards com repetição espaçada, cadernos inteligentes, resumos gerados por IA e Pomodoro Zen — tudo envolvido numa estética japonesa wabi-sabi com 5 temas (Washi, Sumi, Koke, Momiji, Sakura).",
    category: "Educação / IA",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "IA Generativa", "Vercel"],
    difficulty: 90,
    highlights: ["Tutor IA Sensei", "Flashcards Espaçados", "5 Temas Japoneses", "Pomodoro Zen"],
    link: "https://study-ai-nine-xi.vercel.app",
    github: "",
    featured: true,
    status: "completed",
    year: "2026",
    stats: { views: 312, likes: 28 },
    role: "Full Stack Developer",
    accent: "from-rose-500 via-amber-500 to-red-500",
    image: "/projects/study-ai.png",
    metrics: [
      { label: "Tutor IA", value: "Sensei" },
      { label: "Temas", value: "5 (Wabi-Sabi)" },
      { label: "Deploy", value: "Vercel" },
      { label: "Estudantes", value: "10.800+" },
    ],
    caseStudy: {
      problem: "Plataformas de estudo tradicionais forçam um ritmo padronizado e cobram perfeição imediata — o que quebra o ciclo natural de aprendizado e gera frustração.",
      solution: "Plataforma inspirada no wabi-sabi (beleza na imperfeição) com Sensei IA que se adapta ao ritmo do aluno, flashcards com spaced repetition, cadernos que crescem organicamente e Pomodoro Zen que respeita ciclos de foco. Cinco temas japoneses (Washi, Sumi, Koke, Momiji, Sakura) constroem atmosfera imersiva.",
      lessons: "Aprendi que IA em educação não é sobre responder mais rápido — é sobre respeitar o tempo do aprendiz. O wabi-sabi como princípio de design (imperfeição, asimetria, naturalidade) cria conexão emocional que templates perfeitos não alcançam.",
    },
  },
  {
    id: 10,
    title: "Bloom Studio",
    subtitle: "Estúdio de Criação Literária",
    description: "Plataforma literária completa para escritores, com ferramentas de escrita criativa, organização de projetos literários, gerenciamento de personagens e mundos ficcionais, e uma comunidade para compartilhamento de obras.",
    category: "Literatura / Plataforma Web",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    difficulty: 85,
    highlights: ["Escrita Criativa", "Gestão de Projetos Literários", "Personagens & Mundos", "Comunidade de Escritores"],
    link: "https://bloom-studio-oficial.vercel.app",
    github: "",
    featured: true,
    status: "completed",
    year: "2025",
    stats: { views: 145, likes: 12 },
    role: "Full Stack Developer",
    accent: "from-rose-400 via-fuchsia-400 to-violet-400",
    image: "/projects/bloom-studio.png",
    metrics: [
      { label: "Escritores", value: "Ativo" },
      { label: "Deploy", value: "Vercel" },
      { label: "Responsivo", value: "100%" },
      { label: "Performance", value: "A+" },
    ],
    caseStudy: {
      problem: "Escritores careciam de uma plataforma dedicada que integrasse ferramentas de escrita com gestão de elementos narrativos complexos como personagens, mundos e arcos de história.",
      solution: "Plataforma web completa com editor de textos, sistema de organização de projetos literários, fichas de personagens, construção de mundos fictícios e funcionalidades sociais para comunidade de escritores.",
      lessons: "Plataformas criativas precisam de UI que não compete com o conteúdo — o design deve desaparecer e deixar o escritor imerso na obra. Performance de renderização de texto longo exige virtualização cuidadosa.",
    },
  },
  {
    id: 6,
    title: "API Gateway Service",
    subtitle: "Microsserviços com Auth & Rate Limit",
    description: "API Gateway para microsserviços com autenticação JWT, rate limiting, logging estruturado e observabilidade. Containerizado com Docker.",
    category: "Backend / Infra",
    technologies: ["Node.js", "Express", "JWT", "Redis", "Docker"],
    difficulty: 85,
    highlights: ["JWT Auth", "Rate Limiting", "Logging", "Docker"],
    link: "",
    github: "https://github.com/Raphaeljdk/api-gateway",
    featured: false,
    status: "in-progress",
    year: "2026",
    stats: { views: 45, likes: 5 },
    role: "Backend Developer",
    accent: "from-rose-500 via-pink-500 to-fuchsia-500",
    image: "/projects/api-gateway.png",
  },
];

export const experiences: Experience[] = [
  {
    company: "Polyexcel",
    role: "Aprendiz de Suprimentos / Compras & Desenvolvedor de Automação",
    period: "Set 2025 — Atual",
    location: "São Paulo, SP",
    type: "Presencial",
    current: true,
    summary:
      "Responsável pela homologação de fornecedores nacionais e internacionais, conduzindo todo o fluxo de qualificação documental e cadastral dentro do SAP Business One. Liderança técnica no desenvolvimento de automações em Python integradas ao Excel.",
    responsibilities: [
      "Homologação de fornecedores nacionais e internacionais com qualificação documental completa no SAP B1",
      "Cobrança ativa de documentação ISO e regulatória junto a fornecedores, garantindo conformidade contínua",
      "Criação de pedidos de compra no SAP B1 (grupos MPG/MPD) e pedidos de amostra para avaliação de matéria-prima",
      "Liderança técnica no desenvolvimento de automação em Python integrada ao Excel, reduzindo 60%+ do tempo em CT-es",
      "Gestão do fluxo de transporte e logística: conferência documental de CT-es e interface com sistemas TMS",
    ],
    achievements: [
      "Automação em Python reduziu 60%+ do tempo gasto no controle e envio de CT-es, eliminando falhas manuais",
      "Gestão completa do fluxo documental de fornecedores com conformidade ISO contínua",
      "Integração entre SAP B1 e TMS para acurácia fiscal e conformidade logística",
    ],
    technologies: ["SAP Business One", "TMS", "Python", "Excel Avançado"],
  },
  {
    company: "Eurofarma",
    role: "Aprendiz de Serviços a Terceiros",
    period: "Mai 2024 — Ago 2025",
    location: "São Paulo, SP",
    type: "Presencial",
    current: false,
    summary:
      "Responsável por solicitar Certificados de Análise (COA) dos lotes disponíveis no CD e encaminhá-los aos clientes. Apoio direto nas operações de entrega e retirada de materiais, garantindo rastreabilidade dos lotes de medicamentos.",
    responsibilities: [
      "Solicitação de COAs (Certificados de Análise) à área de Qualidade e encaminhamento aos clientes",
      "Apoio direto nas operações de entrega e retirada de materiais no Centro de Distribuição",
      "Garantia de rastreabilidade dos lotes de medicamentos e integridade das informações no sistema de gestão",
      "Atuação colaborativa na otimização de fluxos internos de movimentação, identificando gargalos operacionais",
      "Análise de dados para propor melhorias baseadas em evidências",
    ],
    achievements: [
      "Otimização de fluxos internos de movimentação com análise de gargalos operacionais",
      "Garantia de rastreabilidade completa de lotes de medicamentos regulados",
    ],
    technologies: ["Logística Farmacêutica", "BPF", "Qualidade", "Controle de Processos"],
  },
];

export const certifications: Certification[] = [
  { name: "JavaScript Algorithms & Data Structures", hours: "300h", institution: "freeCodeCamp", year: 2025, status: "completed", credentialId: "FCC-JS-2025", category: "Frontend" },
  { name: "Responsive Web Design", hours: "300h", institution: "freeCodeCamp", year: 2025, status: "completed", credentialId: "FCC-RWD-2025", category: "Frontend" },
  { name: "Java com Banco de Dados", hours: "120h", institution: "SENAI · Instituto Eurofarma", year: 2024, status: "completed", credentialId: "SENAI-JAVA-2024", category: "Backend" },
  { name: "Programação em Nuvem", hours: "120h", institution: "SENAI · Instituto Eurofarma", year: 2024, status: "completed", credentialId: "SENAI-CLOUD-2024", category: "Cloud" },
  { name: "Node.js Completo", hours: "60h", institution: "Udemy", year: 2025, status: "completed", category: "Backend" },
  { name: "Git & GitHub", hours: "20h", institution: "Udemy", year: 2025, status: "completed", category: "DevOps" },
  { name: "Excel Avançado", hours: "40h", institution: "Fundação Bradesco", year: 2025, status: "completed", credentialId: "FB-EXCEL-2025", category: "Tools" },
  { name: "SAP Business One", hours: "80h", institution: "SAP Learning Hub", year: 2025, status: "in-progress", progress: 65, category: "Corporativo" },
  { name: "AWS Cloud Practitioner", hours: "40h", institution: "AWS Training", year: 2026, status: "planned", category: "Cloud" },
];

export const services = [
  {
    title: "Web Development",
    description: "Aplicações web full stack com React, Next.js e Node.js — performance, SEO e DX de primeira.",
    icon: "code",
    items: ["Next.js / React", "APIs REST & GraphQL", "Design Systems", "Realtime com WebSockets"],
  },
  {
    title: "Enterprise & SAP",
    description: "SAP B1, automação de processos e integrações conectando legado a moderno.",
    icon: "building",
    items: ["SAP B1", "Módulos Financeiro & Estoque", "Automação", "TMS & Logística"],
  },
  {
    title: "UI/UX & Dashboards",
    description: "Interfaces premium com foco em decisão — dashboards executivos, visualização de dados e motion.",
    icon: "sparkles",
    items: ["Executive Dashboards", "Data Visualization", "Glassmorphism UI", "Motion Design"],
  },
  {
    title: "Cloud & DevOps",
    description: "Infraestrutura como código, CI/CD, containers e observabilidade para produtos que escalam.",
    icon: "cloud",
    items: ["Docker & Containers", "CI/CD Pipelines", "AWS / Azure", "Observabilidade"],
  },
];

export const techStack = {
  frontend: ["React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS", "JavaScript ES6+", "HTML5", "CSS3", "Bootstrap", "Vite"],
  backend: ["Node.js", "Express", "Java", "Spring Boot", "Python", "REST APIs"],
  database: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "SQL Server"],
  corporate: ["SAP B1", "TMS", "Homologação de Fornecedores"],
  cloud: ["Vercel", "Docker", "AWS", "Azure", "CI/CD"],
  tools: ["Git", "GitHub", "VS Code", "PyCharm", "IntelliJ IDEA", "Postman", "Figma", "Excel Avançado"],
  ai: ["ChatGPT", "DeepSeek", "GLM", "Gemini"],
};

export const techArticles = [
  {
    title: "React 19: O que muda para desenvolvedores Full Stack",
    url: "https://react.dev/blog/2024/12/05/react-19",
    snippet: "React 19 traz Server Components como padrão, novo hook use(), melhorias no Suspense e otimizações de performance que mudam a forma como construímos aplicações.",
    source: "React Blog",
    date: "2025",
    tag: "React",
  },
  {
    title: "Next.js 15: Turbopack estável e novas features",
    url: "https://nextjs.org/blog",
    snippet: "Next.js 15 estabiliza o Turbopack, melhora o caching comPartial Prerendering e traz melhorias significativas na DX com layouts aninhados.",
    source: "Next.js Blog",
    date: "2025",
    tag: "Next.js",
  },
  {
    title: "TypeScript 5.7: Tipos mais inteligentes e performance",
    url: "https://devblogs.microsoft.com/typescript/",
    snippet: "Nova versão do TypeScript traz inferência aprimorada, tipos condicionais mais expressivos e ganhos de até 30% na velocidade do compilador.",
    source: "Microsoft",
    date: "2025",
    tag: "TypeScript",
  },
  {
    title: "IA Generativa no Desenvolvimento: Como usar ChatGPT e DeepSeek na prática",
    url: "https://openai.com/blog",
    snippet: "Como integrar IAs generativas como ChatGPT, DeepSeek, GLM e Gemini no fluxo de desenvolvimento para code review, documentação e prototipação rápida.",
    source: "OpenAI Blog",
    date: "2025",
    tag: "IA",
  },
  {
    title: "SAP Business One 2025: Novidades para desenvolvedores",
    url: "https://community.sap.com/",
    snippet: "SAP B1 continua evoluindo com novas APIs REST, integração com Azure e melhorias no módulo de compras e logística para indústria regulada.",
    source: "SAP Community",
    date: "2025",
    tag: "SAP B1",
  },
  {
    title: "Node.js 22: Performance e novas APIs nativas",
    url: "https://nodejs.org/en/blog",
    snippet: "Node.js 22 traz melhorias de performance no V8, suporte a WebSocket nativo, require() ESM e novas APIs para streams e testes.",
    source: "Node.js Blog",
    date: "2025",
    tag: "Node.js",
  },
];

export const testimonials: Testimonial[] = [];

export const navItems = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#about" },
  { label: "Serviços", href: "#services" },
  { label: "Processo", href: "#process" },
  { label: "Skills", href: "#skills" },
  { label: "Projetos", href: "#projects" },
  { label: "Blog", href: "#news" },
  { label: "GitHub", href: "#github" },
  { label: "Experiência", href: "#experience" },
  { label: "Certificações", href: "#certifications" },
  { label: "Contato", href: "#contact" },
];
