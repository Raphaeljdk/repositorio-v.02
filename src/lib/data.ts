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
  | "cloud";

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
  title: "Full Stack Developer",
  tagline: "Construindo experiências digitais que escalam",
  age: 19,
  location: "São Paulo, Brasil",
  email: "raphaelfreitasdossantos651@gmail.com",
  phone: "+55 11 94737-4151",
  github: "https://github.com/Raphaeljdk",
  githubHandle: "Raphaeljdk",
  linkedin: "https://www.linkedin.com/in/raphael-freitas-22976828a/",
  linkedinHandle: "raphael-freitas",
  website: "https://raphaeljdk.github.io",
  availability: "Disponível para oportunidades",
  bio: "Estudante de Engenharia de Software na Estácio e Desenvolvedor Full Stack com experiência prática em SAP ABAP, TMS e construção de aplicações web modernas. Apaixonado por arquiteturas escaláveis, DX impecável e interfaces que comunicam intenção.",
  bioLong:
    "Caminho entre o mundo corporativo (SAP, TMS, processos de logística farmacêutica) e o ecossistema web moderno (React, Node, TypeScript). Acredito que código limpo, design system consistente e observabilidade são os três pilares de produtos que sobrevivem ao tempo. Atualmente aprofundando estudos em arquiteturas distribuídas, Next.js e cloud nativo.",
  university: "Estácio",
  degree: "Bacharelado em Engenharia de Software",
  roles: [
    "Full Stack Developer",
    "SAP ABAP Specialist",
    "TMS & Logistics Engineer",
    "React & Node Builder",
  ],
};

export const stats: Stat[] = [
  { label: "Projetos entregues", value: 8, suffix: "+", icon: "rocket" },
  { label: "Tecnologias dominadas", value: 25, suffix: "+", icon: "layers" },
  { label: "Certificações", value: 9, suffix: "", icon: "award" },
  { label: "Anos de experiência", value: 2, suffix: "+", icon: "calendar" },
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
  { name: "SAP ABAP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sap/sap-original.svg", percent: 68, category: "corporate", level: "Intermediário-Avançado", description: "Reports, ALV, Module Pool, OData", experience: "1+ ano" },
  { name: "SAP MM/SD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sap/sap-original.svg", percent: 58, category: "corporate", level: "Intermediário", description: "Módulos MM, SD, pedidos, faturamento", experience: "1+ ano" },
  { name: "TMS", icon: "https://cdn-icons-png.flaticon.com/512/2942/2942271.png", percent: 62, category: "corporate", level: "Intermediário-Avançado", description: "CTEs, fretes, logística, transportadoras", experience: "1+ ano" },
  // Cloud
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", percent: 38, category: "cloud", level: "Intermediário", description: "EC2, S3, Lambda, IAM", experience: "8 meses" },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original-wordmark.svg", percent: 30, category: "cloud", level: "Intermediário", description: "VMs, Blob, Functions, AD", experience: "4 meses" },
  { name: "Cloud Computing", icon: "https://cdn-icons-png.flaticon.com/512/3242/3242257.png", percent: 45, category: "cloud", level: "Intermediário", description: "IaaS, PaaS, SaaS, serverless", experience: "8 meses" },
];

export const skillCategories: { id: SkillCategory | "all"; label: string; color: string }[] = [
  { id: "all", label: "Todas", color: "from-emerald-400 to-teal-400" },
  { id: "frontend", label: "Frontend", color: "from-cyan-400 to-emerald-400" },
  { id: "backend", label: "Backend", color: "from-amber-400 to-orange-400" },
  { id: "database", label: "Database", color: "from-violet-400 to-fuchsia-400" },
  { id: "corporate", label: "Corporativo", color: "from-teal-400 to-emerald-400" },
  { id: "cloud", label: "Cloud", color: "from-sky-400 to-cyan-400" },
  { id: "tools", label: "Tools & DevOps", color: "from-rose-400 to-pink-400" },
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
    role: "Aprendiz Administrativo — Operações & Sistemas",
    period: "Set 2025 — Atual",
    location: "São Paulo, SP",
    type: "Presencial",
    current: true,
    summary:
      "Atuação direta com SAP (MM/SD) e TMS em ambiente corporativo industrial, automatizando relatórios e apoiando integração entre sistemas.",
    responsibilities: [
      "Operação do sistema SAP (módulos MM/SD) para criação e gestão de pedidos",
      "Apoio em processos de faturamento e controle de dados mestre",
      "Cadastro e manutenção de itens e fornecedores no ERP",
      "Suporte em auditorias internas e controle de CTEs (TMS)",
      "Desenvolvimento de relatórios e dashboards para tomada de decisão",
    ],
    achievements: [
      "Automatização de relatórios reduzindo 30% do tempo operacional",
      "Participação em projeto de integração SAP ↔ TMS",
    ],
    technologies: ["SAP ABAP", "SAP MM", "SAP SD", "TMS", "Excel Avançado"],
  },
  {
    company: "Eurofarma",
    role: "Aprendiz — Operações & Logística Farmacêutica",
    period: "Mai 2024 — Ago 2025",
    location: "São Paulo, SP",
    type: "Presencial",
    current: false,
    summary:
      "Experiência em logística farmacêutica regulada (BPF), controle de estoque, COA de lotes e auditorias de qualidade sem não-conformidades.",
    responsibilities: [
      "Controle e acompanhamento de entregas de medicamentos",
      "Organização e gestão de estoque no Centro de Distribuição",
      "Envio e análise de COA (Certificados de Análise) de lotes farmacêuticos",
      "Apoio em processos logísticos e controle de qualidade",
      "Participação em auditorias internas de qualidade",
    ],
    achievements: [
      "Redução de 15% em retrabalho de lotes",
      "Auditoria aprovada sem não-conformidades",
    ],
    technologies: ["Logística Farmacêutica", "BPF", "Qualidade", "SAP", "Controle de Processos"],
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
  { name: "SAP ABAP Fundamentals", hours: "80h", institution: "SAP Learning Hub", year: 2025, status: "in-progress", progress: 65, category: "Corporativo" },
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
    description: "Integrações SAP, ABAP, módulos MM/SD e camadas OData/RFC conectando legado a moderno.",
    icon: "building",
    items: ["ABAP Reports & ALV", "SAP MM / SD", "OData & RFC", "TMS & Logística"],
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
  frontend: ["React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS", "JavaScript ES6+"],
  backend: ["Node.js", "Express", "Java", "Spring Boot", "Python", "Flask"],
  database: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma ORM"],
  corporate: ["SAP ABAP", "SAP MM/SD", "TMS", "Processos Corporativos"],
  cloud: ["AWS", "Azure", "Docker", "CI/CD", "GitHub Actions"],
  tools: ["Git", "VS Code", "Postman", "Figma", "Excel Avançado"],
};

export const testimonials: Testimonial[] = [
  {
    name: "Marcos Oliveira",
    role: "Gerente de Operações",
    company: "Polyexcel",
    quote: "Raphael se destacou rapidamente no domínio do SAP e do TMS. Em poucos meses já operava módulos MM/SD com autonomia e propunha melhorias nos fluxos de integração. Raro ver alguém tão jovem com essa capacidade de absorver processos corporativos complexos.",
  },
  {
    name: "Juliana Mendes",
    role: "Analista de Logística",
    company: "Eurofarma",
    quote: "Trabalhei lado a lado com o Raphael no centro de distribuição. Ele trouxe uma visão analítica que nos ajudou a reduzir retrabalho em lotes farmacêuticos. Sua disciplina em seguir protocolos de qualidade BPF foi exemplar para toda a equipe.",
  },
  {
    name: "Lucas Ferreira",
    role: "Desenvolvedor Frontend",
    company: "freeCodeCamp Community",
    quote: "Nos projetos colaborativos do freeCodeCamp, o Raphael sempre entregava código limpo e bem documentado. Suas soluções para os desafios de JavaScript e algoritmos demonstram uma base sólida que muitos devs com o dobro do tempo de carreira não têm.",
  },
  {
    name: "Prof. Ricardo Nascimento",
    role: "Professor — Eng. de Software",
    company: "Estácio",
    quote: "Raphael é um dos alunos mais engajados que já tive. Ele não se limita ao conteúdo das aulas — busca entender o porquê por trás de cada padrão de projeto e arquitetura. Tem potencial claro para se tornar um engenheiro de software referência.",
  },
];

export const navItems = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#about" },
  { label: "Serviços", href: "#services" },
  { label: "Processo", href: "#process" },
  { label: "Skills", href: "#skills" },
  { label: "Projetos", href: "#projects" },
  { label: "Experiência", href: "#experience" },
  { label: "Depoimentos", href: "#testimonials" },
  { label: "Certificações", href: "#certifications" },
  { label: "Contato", href: "#contact" },
];
