// ==================== PORTFOLIO SCRIPT v5.0 ULTRA ====================
// Módulo principal do portfólio - Versão Profissional Completa
// Autor: Raphael Freitas

(function () {
  "use strict";

  // ==================== CONFIGURAÇÃO ====================
  const APP_CONFIG = {
    version: "5.0.0",
    debug: false,
    debounceDelay: 300,
    githubUsername: "Raphaeljdk",
    enableAnalytics: true,
    enableAutoSave: true,
    enableNotifications: true,
    enableKeyboardShortcuts: true,
    enableDragDrop: true,
    itemsPerPage: 6
  };

  // ==================== LOGGER ====================
  const Logger = {
    info: (...a) => APP_CONFIG.debug && console.log("[INFO]", ...a),
    warn: (...a) => console.warn("[WARN]", ...a),
    error: (...a) => console.error("[ERROR]", ...a),
    analytics: (event, data) => APP_CONFIG.enableAnalytics && console.log("[ANALYTICS]", event, data)
  };

  // ==================== DADOS ====================
  const personalInfo = {
    name: "Raphael Freitas",
    age: 19,
    location: "São Paulo, Brasil",
    phone: "(11) 94737-4151",
    email: "raphaelfreitasdossantos651@gmail.com",
    github: "https://github.com/Raphaeljdk",
    linkedin: "https://www.linkedin.com/in/raphael-freitas-22976828a/",
    website: "https://raphaeljdk.github.io/REPOSITORIO---RAPHAEL-FREITAS/",
    availability: "Disponível para oportunidades"
  };

  const skillsData = [
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", percent: 85, category: "frontend", level: "Avançado", description: "Estruturação semântica, SEO, acessibilidade", experience: "2+ anos" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", percent: 80, category: "frontend", level: "Avançado", description: "Flexbox, Grid, animações, responsividade", experience: "2+ anos" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", percent: 75, category: "frontend", level: "Intermediário-Avançado", description: "ES6+, async/await, DOM, APIs REST", experience: "1.5 anos" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", percent: 30, category: "frontend", level: "Iniciante-Intermediário", description: "Componentes, hooks, estado, roteamento", experience: "6 meses" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", percent: 50, category: "frontend", level: "Intermediário", description: "Utilitários, customização, design responsivo", experience: "8 meses" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", percent: 20, category: "frontend", level: "Iniciante", description: "Tipagem estática, interfaces, generics", experience: "3 meses" },
    { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", percent: 25, category: "frontend", level: "Iniciante", description: "Composition API, Vue Router, Pinia", experience: "4 meses" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", percent: 38, category: "backend", level: "Intermediário", description: "POO, Spring Boot, JPA, Maven", experience: "1 ano" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", percent: 48, category: "backend", level: "Intermediário", description: "Express, APIs REST, WebSockets", experience: "1 ano" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", percent: 30, category: "backend", level: "Iniciante-Intermediário", description: "Django, Flask, automação", experience: "6 meses" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", percent: 28, category: "database", level: "Iniciante-Intermediário", description: "Consultas SQL, joins, procedures", experience: "8 meses" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", percent: 25, category: "database", level: "Iniciante", description: "CTEs, JSONB, window functions", experience: "6 meses" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", percent: 20, category: "database", level: "Iniciante", description: "NoSQL, agregações, índices", experience: "4 meses" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", percent: 55, category: "tools", level: "Intermediário", description: "Branches, rebase, hooks, workflows", experience: "1.5 anos" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", percent: 55, category: "tools", level: "Intermediário", description: "Actions, Projects, Pages, Copilot", experience: "1.5 anos" },
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", percent: 88, category: "tools", level: "Avançado", description: "Debug, extensões, atalhos, terminal", experience: "2+ anos" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", percent: 18, category: "tools", level: "Iniciante", description: "Containers, docker-compose, imagens", experience: "3 meses" },
    { name: "Excel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftoffice/microsoftoffice-original.svg", percent: 65, category: "tools", level: "Intermediário-Avançado", description: "Power Query, dashboards, VBA", experience: "2 anos" },
    { name: "SAP ABAP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sap/sap-original.svg", percent: 58, category: "corporate", level: "Intermediário", description: "ABAP, Reports, ALV, Module Pool", experience: "1 ano" },
    { name: "SAP MM/SD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sap/sap-original.svg", percent: 45, category: "corporate", level: "Intermediário", description: "Módulos MM, SD, pedidos, faturamento", experience: "1 ano" },
    { name: "TMS", icon: "https://cdn-icons-png.flaticon.com/512/2942/2942271.png", percent: 52, category: "corporate", level: "Intermediário", description: "CTEs, fretes, logística, transportadoras", experience: "1 ano" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", percent: 22, category: "cloud", level: "Iniciante", description: "EC2, S3, Lambda, IAM", experience: "4 meses" },
    { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original-wordmark.svg", percent: 18, category: "cloud", level: "Iniciante", description: "VMs, Blob, Functions, AD", experience: "2 meses" },
    { name: "Cloud Computing", icon: "https://cdn-icons-png.flaticon.com/512/3242/3242257.png", percent: 25, category: "cloud", level: "Fundamentos", description: "IaaS, PaaS, SaaS, serverless", experience: "4 meses" },
  ];

  const projectsData = [
    { 
      id: 1, 
      title: "EnergyOS - Dashboard SaaS", 
      description: "Dashboard SaaS inteligente com atualização em tempo real e visualização dinâmica para monitoramento energético.", 
      category: "SaaS / Dashboard", 
      technologies: ["React", "Chart.js", "WebSockets", "Node.js", "Express"], 
      difficulty: 85, 
      highlights: ["UI/UX Estratégico", "Tempo Real", "API Integration", "WebSockets"], 
      link: "https://raphaeljdk.github.io/EnergyOS-um-dashboard-SaaS-inteligente-com-atualiza-o-em-tempo-real/", 
      github: "https://github.com/Raphaeljdk/EnergyOS", 
      featured: true, 
      status: "completed",
      completedDate: "2025-10-15",
      stats: { views: 245, likes: 18, shares: 7 },
      role: "Full Stack Developer"
    },
    { 
      id: 2, 
      title: "TMS Lite PRO", 
      description: "Sistema inteligente de gestão de fretes e análise de CTEs com dashboards executivos.", 
      category: "Logística / TMS", 
      technologies: ["React", "TypeScript", "Tailwind", "Chart.js", "Node.js"], 
      difficulty: 90, 
      highlights: ["Gestão de Fretes", "UX Corporativo", "CTEs", "Dashboards"], 
      link: "https://raphaeljdk.github.io/TMS-Lite-PRO---Sistema-Inteligente-de-Gest-o-de-Fretes../", 
      github: "https://github.com/Raphaeljdk/TMS-Lite-PRO", 
      featured: true, 
      status: "completed",
      completedDate: "2025-12-01",
      stats: { views: 198, likes: 14, shares: 5 },
      role: "Full Stack Developer"
    },
    { 
      id: 3, 
      title: "TradePro - Plataforma de Trading", 
      description: "Plataforma profissional para trading com dados em tempo real e análises técnicas.", 
      category: "Fintech / Trading", 
      technologies: ["React", "JavaScript", "Chart.js", "WebSockets", "Node.js"], 
      difficulty: 88, 
      highlights: ["Tempo Real", "Análise Técnica", "Múltiplos Ativos", "WebSockets"], 
      link: "https://raphaeljdk.github.io/-TradePro---Plataforma-Profissional-de-Trading/", 
      github: "", 
      featured: true, 
      status: "completed",
      completedDate: "2025-11-10",
      stats: { views: 156, likes: 11, shares: 3 },
      role: "Frontend Developer"
    },
    { 
      id: 4, 
      title: "Herdeiros do Einstein", 
      description: "Mini SaaS educacional gamificado para matemática com sistema de níveis e ranking.", 
      category: "Educação / SaaS", 
      technologies: ["JavaScript", "HTML", "CSS", "localStorage", "Chart.js"], 
      difficulty: 80, 
      highlights: ["Sistema de Níveis", "Ranking Global", "Feedback Imediato", "Gamificação"], 
      link: "https://raphaeljdk.github.io/HERDEIROS-DO-EINSTEIN/", 
      github: "https://github.com/Raphaeljdk/HERDEIROS-DO-EINSTEIN", 
      featured: true, 
      status: "completed",
      completedDate: "2025-08-20",
      stats: { views: 167, likes: 13, shares: 4 },
      role: "Full Stack Developer"
    },
    { 
      id: 5, 
      title: "Nexus Retail Dashboard", 
      description: "Executive dashboard para Recuperação de Capital e Global Trade com análises de ROI.", 
      category: "Executive Dashboard", 
      technologies: ["HTML", "CSS", "JavaScript", "Chart.js", "Tailwind"], 
      difficulty: 92, 
      highlights: ["ROI 3.2x", "Análise de Custos", "Roadmap Estratégico", "KPIs"], 
      link: "https://raphaeljdk.github.io/dashboard/", 
      github: "https://github.com/Raphaeljdk/dashboard", 
      featured: true, 
      status: "completed",
      completedDate: "2026-01-15",
      stats: { views: 289, likes: 22, shares: 9 },
      role: "Frontend Developer"
    },
    { 
      id: 6, 
      title: "Portfólio Profissional v3", 
      description: "Portfólio interativo com dashboard de evolução, blog técnico, PWA e 3D background.", 
      category: "SaaS / Dashboard", 
      technologies: ["HTML", "CSS", "JavaScript", "Tailwind", "Chart.js", "Three.js", "PWA"], 
      difficulty: 88, 
      highlights: ["PWA", "Offline Mode", "3D Background", "Dashboard Interativo"], 
      link: "https://raphaeljdk.github.io/REPOSITORIO---RAPHAEL-FREITAS/", 
      github: "https://github.com/Raphaeljdk/REPOSITORIO---RAPHAEL-FREITAS", 
      featured: true, 
      status: "in-progress",
      completedDate: null,
      stats: { views: 120, likes: 10, shares: 3 },
      role: "Full Stack Developer"
    },
    {
      id: 7,
      title: "API Gateway Service",
      description: "API Gateway para microsserviços com autenticação JWT, rate limiting e logging.",
      category: "SaaS / Dashboard",
      technologies: ["Node.js", "Express", "JWT", "Redis", "Docker"],
      difficulty: 85,
      highlights: ["JWT Auth", "Rate Limiting", "Logging", "Docker"],
      github: "https://github.com/Raphaeljdk/api-gateway",
      featured: false,
      status: "in-progress",
      stats: { views: 45, likes: 5, shares: 1 },
      role: "Backend Developer"
    },
    {
      id: 8,
      title: "SAP Integration Layer",
      description: "Camada de integração entre SAP e sistemas modernos via OData/RFC.",
      category: "SAP / Corporativo",
      technologies: ["SAP ABAP", "Node.js", "OData", "RFC", "PostgreSQL"],
      difficulty: 95,
      highlights: ["OData Services", "RFC Integration", "Real-time Sync"],
      github: "https://github.com/Raphaeljdk/sap-integration",
      featured: false,
      status: "planned",
      stats: { views: 30, likes: 3, shares: 1 },
      role: "SAP Developer"
    }
  ];

  const experiencesData = [
    {
      company: "Polyexcel",
      role: "Aprendiz Administrativo – Operações / Sistemas",
      period: "Setembro/2025 – Atual",
      icon: "📊",
      location: "São Paulo, SP",
      type: "Presencial",
      responsibilities: [
        "Operação do sistema SAP (módulos MM/SD) para criação e gestão de pedidos",
        "Apoio em processos de faturamento e controle de dados",
        "Cadastro e manutenção de itens e fornecedores no ERP",
        "Suporte em auditorias internas e controle de CTEs (TMS)",
        "Desenvolvimento de relatórios e dashboards para tomada de decisão"
      ],
      technologies: ["SAP ABAP", "SAP MM", "SAP SD", "TMS", "Processos administrativos", "Controle de dados", "Excel Avançado"],
      achievements: [
        "Automatização de relatórios reduzindo 30% do tempo",
        "Participação em projeto de integração SAP-TMS"
      ]
    },
    {
      company: "Eurofarma",
      role: "Aprendiz – Operações / Logística",
      period: "Maio/2024 – Agosto/2025",
      icon: "💊",
      location: "São Paulo, SP",
      type: "Presencial",
      responsibilities: [
        "Controle e acompanhamento de entregas de medicamentos",
        "Organização e gestão de estoque no Centro de Distribuição",
        "Envio e análise de COA (Certificados de Análise) de lotes farmacêuticos",
        "Apoio em processos logísticos e controle de qualidade",
        "Participação em auditorias internas de qualidade"
      ],
      technologies: ["Logística Farmacêutica", "Organização de dados", "Controle de processos", "Qualidade", "BPF", "SAP"],
      achievements: [
        "Redução de 15% em retrabalho de lotes",
        "Auditoria aprovada sem não-conformidades"
      ]
    },
  ];

  const certificationsData = [
    { name: "JavaScript Algorithms and Data Structures", hours: "300h", institution: "freeCodeCamp", year: 2025, icon: "📜", credentialUrl: "https://freecodecamp.org/certification", credentialId: "FCC-JS-2025" },
    { name: "Responsive Web Design", hours: "300h", institution: "freeCodeCamp", year: 2025, icon: "🎨", credentialUrl: "https://freecodecamp.org/certification", credentialId: "FCC-RWD-2025" },
    { name: "Java com Banco de Dados", hours: "120h", institution: "Instituto Eurofarma / SENAI", year: 2024, icon: "☕", credentialId: "SENAI-JAVA-2024" },
    { name: "Programação em Nuvem", hours: "120h", institution: "Instituto Eurofarma / SENAI", year: 2024, icon: "☁️", credentialId: "SENAI-CLOUD-2024" },
    { name: "Excel Avançado", hours: "40h", institution: "Fundação Bradesco", year: 2025, icon: "📊", credentialId: "FB-EXCEL-2025" },
    { name: "Node.js Completo", hours: "60h", institution: "Udemy", year: 2025, icon: "🟢", credentialUrl: "https://udemy.com/certificate" },
    { name: "Git e GitHub", hours: "20h", institution: "Udemy", year: 2025, icon: "🔧", credentialUrl: "https://udemy.com/certificate" },
    { name: "SAP ABAP Fundamentals", hours: "80h", institution: "SAP Learning Hub", year: 2025, icon: "🔷", status: "in-progress", progress: 65 },
    { name: "AWS Cloud Practitioner", hours: "40h", institution: "AWS Training", year: 2026, icon: "☁️", status: "planned" },
  ];

  const roadmapData = [
    { id: 1, title: "Fundamentos da Programação", month: "Jan 2024 - Mar 2024", status: "completed", description: "Lógica de programação, algoritmos, estrutura de dados", technologies: ["JavaScript", "HTML", "CSS"], projects: ["Primeiros projetos web"], percent: 100, category: "fundamentals" },
    { id: 2, title: "Desenvolvimento Web", month: "Mar 2024 - Jun 2024", status: "completed", description: "HTML5, CSS3, JavaScript ES6+, responsividade", technologies: ["HTML", "CSS", "JS", "Tailwind"], projects: ["Landing Pages"], percent: 100, category: "frontend" },
    { id: 3, title: "Início na Eurofarma", month: "Maio 2024", status: "completed", description: "Início como Aprendiz, experiência em logística farmacêutica", technologies: ["Logística", "Qualidade", "BPF"], projects: ["Controle de lotes"], percent: 100, category: "corporate" },
    { id: 4, title: "Java com Banco de Dados", month: "Jun 2024 - Out 2024", status: "completed", description: "Java, POO, MySQL, JDBC", technologies: ["Java", "MySQL", "JDBC"], projects: ["Sistemas desktop"], percent: 100, category: "backend" },
    { id: 5, title: "Computação em Nuvem", month: "Ago 2024 - Nov 2024", status: "completed", description: "Fundamentos AWS e Azure", technologies: ["AWS", "Azure"], projects: ["Deploy de apps"], percent: 100, category: "cloud" },
    { id: 6, title: "Polyexcel - SAP e TMS", month: "Julho 2025", status: "completed", description: "Operação SAP (MM/SD) e TMS, processos corporativos", technologies: ["SAP ABAP", "SAP MM", "SAP SD", "TMS"], projects: ["Gestão de pedidos", "Integração SAP-TMS"], percent: 100, category: "corporate" },
    { id: 7, title: "Aprofundamento em React", month: "Atual", status: "in-progress", description: "React avançado, hooks, Next.js, TypeScript", technologies: ["React", "Next.js", "TypeScript", "Redux"], projects: ["Dashboards", "Portfólio v3"], percent: 48, category: "frontend" },
    { id: 8, title: "Certificação AWS", month: "Planejado 2026", status: "planned", description: "AWS Solutions Architect Associate", technologies: ["AWS", "Architecture", "Security"], projects: ["Arquiteturas cloud"], percent: 25, targetDate: "2026-12-31", category: "cloud" },
    { id: 9, title: "Conclusão da Faculdade", month: "Planejado 2028", status: "planned", description: "Bacharelado em Engenharia de Software", technologies: ["Arquitetura", "Gestão", "Qualidade"], projects: ["TCC"], percent: 35, targetDate: "2028-12-31", category: "education" },
    { id: 10, title: "Python para Dados", month: "Planejado 2026", status: "planned", description: "Análise de dados com Python", technologies: ["Python", "Pandas", "NumPy"], projects: ["Análises de dados"], percent: 10, targetDate: "2026-08-31", category: "ai" },
  ];

  const blogPosts = [
    { id: 1, title: "🎨 Minha jornada com React", date: "2026-04-05", excerpt: "Primeiros passos com React e hooks.", content: "Recentemente iniciei meus estudos em React e quero compartilhar minha experiência...", tags: ["React", "JavaScript", "Frontend"], category: "frontend", readTime: 6, image: "https://placehold.co/600x400/1e293b/61dafb?text=React", author: "Raphael Freitas", views: 124, likes: 8, learningProgress: 30, featured: true },
    { id: 2, title: "🎨 Explorando Tailwind CSS", date: "2026-03-28", excerpt: "Produtividade no estilo com Tailwind.", content: "Tailwind é um framework CSS utilitário que permite estilizar componentes...", tags: ["Tailwind", "CSS", "Frontend"], category: "frontend", readTime: 5, image: "https://placehold.co/600x400/1e293b/38bdf8?text=Tailwind", author: "Raphael Freitas", views: 89, likes: 5, learningProgress: 50 },
    { id: 3, title: "☁️ Primeiros passos com AWS", date: "2026-03-20", excerpt: "Criando minha primeira instância EC2.", content: "Cloud computing é o futuro da tecnologia...", tags: ["AWS", "Cloud", "DevOps"], category: "cloud", readTime: 7, image: "https://placehold.co/600x400/1e293b/ff9900?text=AWS", author: "Raphael Freitas", views: 156, likes: 12, learningProgress: 22, featured: true },
    { id: 4, title: "🔄 Entendendo Promises e Async/Await", date: "2026-03-15", excerpt: "Programação assíncrona em JavaScript.", content: "JavaScript é single-thread, mas muitas operações são assíncronas...", tags: ["JavaScript", "Async", "Promises"], category: "backend", readTime: 5, image: "https://placehold.co/600x400/1e293b/f7df1e?text=JavaScript", author: "Raphael Freitas", views: 203, likes: 18, learningProgress: 75 },
    { id: 5, title: "🔧 Versionamento com Git", date: "2026-03-01", excerpt: "Comandos essenciais que uso todo dia.", content: "Todo desenvolvedor precisa saber Git...", tags: ["Git", "GitHub", "DevOps"], category: "devops", readTime: 4, image: "https://placehold.co/600x400/1e293b/f05032?text=Git", author: "Raphael Freitas", views: 178, likes: 15, learningProgress: 55 },
    { id: 6, title: "🗄️ Estudando Bancos de Dados", date: "2026-02-15", excerpt: "MySQL e PostgreSQL na prática.", content: "Dados estão em toda parte...", tags: ["SQL", "MySQL", "PostgreSQL"], category: "database", readTime: 6, image: "https://placehold.co/600x400/1e293b/4479a1?text=SQL", author: "Raphael Freitas", views: 87, likes: 6, learningProgress: 28 },
    { id: 7, title: "🏢 SAP na prática", date: "2026-01-20", excerpt: "Minha experiência com SAP ABAP.", content: "Trabalhar com SAP tem sido uma experiência transformadora...", tags: ["SAP", "ABAP", "Corporativo"], category: "corporate", readTime: 8, image: "https://placehold.co/600x400/1e293b/008fd3?text=SAP", author: "Raphael Freitas", views: 67, likes: 9, learningProgress: 58 },
    { id: 8, title: "🐍 Python para iniciantes", date: "2025-12-10", excerpt: "Por que aprender Python?", content: "Python é uma das linguagens mais versáteis...", tags: ["Python", "Backend", "Data Science"], category: "backend", readTime: 5, image: "https://placehold.co/600x400/1e293b/3776ab?text=Python", author: "Raphael Freitas", views: 112, likes: 14, learningProgress: 30 },
  ];

  // ==================== ESTADO GLOBAL ====================
  const state = {
    // Favoritos
    favorites: JSON.parse(localStorage.getItem("portfolio_favorites") || "[]"),
    
    // Projetos
    compareList: [],
    currentProjectPage: 1,
    currentProjectView: "grid",
    currentCategoryFilter: "all",
    currentProjectSearch: "",
    projectSortBy: "date",
    
    // Blog
    currentBlogFilter: "all",
    currentBlogSearch: "",
    visibleBlogPosts: 6,
    blogSortBy: "date",
    
    // Skills
    skillSearchQuery: "",
    skillCategoryFilter: "all",
    
    // UI
    theme: localStorage.getItem("theme") || "dark",
    sidebarOpen: false,
    modals: { open: null },
    
    // Analytics
    pageViews: parseInt(localStorage.getItem("page_views") || "0"),
    sessionStart: Date.now(),
    
    // Cache
    githubData: null,
    lastGithubFetch: null
  };

  // ==================== UTILITÁRIOS ====================
  const $ = (id) => document.getElementById(id);
  const $$ = (selector) => document.querySelectorAll(selector);
  
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  
  function throttle(fn, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  function saveToStorage(key, data) {
    if (!APP_CONFIG.enableAutoSave) return;
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  function formatDate(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  
  function formatNumber(num) {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  }
  
  function calculateReadTime(text) {
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200);
  }

  // ==================== TOAST SYSTEM ====================
  const Toast = {
    container: null,
    
    init() {
      this.container = $("toast-container");
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
      }
    },
    
    show(message, type = 'info', duration = 5000) {
      if (!this.container) this.init();
      
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      
      const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
      
      toast.innerHTML = `
        <div class="toast-content">
          <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
          <span class="toast-message">${message}</span>
        </div>
        <button class="toast-close" aria-label="Fechar">&times;</button>
        <div class="toast-progress-bar"></div>
      `;
      
      this.container.appendChild(toast);
      
      requestAnimationFrame(() => {
        toast.classList.add('show');
        const progressBar = toast.querySelector('.toast-progress-bar');
        progressBar.style.animation = `toastTimer ${duration}ms linear forwards`;
      });
      
      const dismiss = () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      };
      
      const timeout = setTimeout(dismiss, duration);
      
      toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(timeout);
        dismiss();
      });
      
      Logger.analytics('toast_shown', { message, type });
    },
    
    success(message) { this.show(message, 'success'); },
    error(message) { this.show(message, 'error'); },
    warning(message) { this.show(message, 'warning'); },
    info(message) { this.show(message, 'info'); }
  };

  // ==================== MODAL SYSTEM ====================
  const Modal = {
    open(modalId, data = {}) {
      const modal = $(modalId);
      if (!modal) return;
      
      modal.removeAttribute('hidden');
      modal.setAttribute('aria-hidden', 'false');
      state.modals.open = modalId;
      
      document.body.style.overflow = 'hidden';
      
      Logger.analytics('modal_opened', { modalId });
    },
    
    close(modalId) {
      const modal = $(modalId);
      if (!modal) return;
      
      modal.setAttribute('hidden', '');
      modal.setAttribute('aria-hidden', 'true');
      state.modals.open = null;
      
      document.body.style.overflow = '';
    },
    
    closeAll() {
      $$('.modal').forEach(m => {
        m.setAttribute('hidden', '');
        m.setAttribute('aria-hidden', 'true');
      });
      state.modals.open = null;
      document.body.style.overflow = '';
    }
  };

  // ==================== TEMA ====================
  const Theme = {
    themes: ['dark', 'light', 'sunset', 'forest', 'ocean'],
    current: 0,
    
    get() {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    },
    
    set(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      state.theme = theme;
      
      // Atualizar ícones
      $$('.theme-toggle').forEach(btn => {
        const lightIcon = btn.querySelector('.light-icon');
        const darkIcon = btn.querySelector('.dark-icon');
        if (lightIcon && darkIcon) {
          lightIcon.style.display = theme === 'dark' ? 'inline-block' : 'none';
          darkIcon.style.display = theme === 'light' ? 'inline-block' : 'none';
        }
      });
      
      Toast.info(`Tema ${theme} ativado`);
      Logger.analytics('theme_changed', { theme });
    },
    
    toggle() {
      const current = this.get();
      this.set(current === 'dark' ? 'light' : 'dark');
    },
    
    cycle() {
      this.current = (this.current + 1) % this.themes.length;
      this.set(this.themes[this.current]);
    }
  };

  // ==================== GITHUB API ====================
  const GitHubAPI = {
    async fetchUserData() {
      const cacheKey = 'github_user_cache';
      const cacheTime = 3600000; // 1 hora
      
      // Verificar cache
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < cacheTime) {
          Logger.info('GitHub: Usando dados em cache');
          return data;
        }
      }
      
      try {
        const response = await fetch(`https://api.github.com/users/${APP_CONFIG.githubUsername}`);
        if (!response.ok) throw new Error('GitHub API error');
        
        const data = await response.json();
        
        localStorage.setItem(cacheKey, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
        
        return data;
      } catch (error) {
        Logger.error('GitHub fetch error:', error);
        return null;
      }
    },
    
    async fetchRepos() {
      const cacheKey = 'github_repos_cache';
      const cacheTime = 3600000;
      
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < cacheTime) {
          return data;
        }
      }
      
      try {
        const response = await fetch(`https://api.github.com/users/${APP_CONFIG.githubUsername}/repos?sort=updated&per_page=10`);
        if (!response.ok) throw new Error('GitHub API error');
        
        const data = await response.json();
        
        localStorage.setItem(cacheKey, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
        
        return data;
      } catch (error) {
        Logger.error('GitHub repos fetch error:', error);
        return [];
      }
    },
    
    async updateUI() {
      const userData = await this.fetchUserData();
      const repos = await this.fetchRepos();
      
      if (userData) {
        $("githubFollowers") && ($("githubFollowers").textContent = userData.followers || '--');
        $("githubRepos") && ($("githubRepos").textContent = userData.public_repos || '--');
      }
      
      if (repos.length) {
        const stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
        $("githubStars") && ($("githubStars").textContent = stars);
        
        const languages = [...new Set(repos.map(r => r.language).filter(Boolean))];
        $("githubLanguages") && ($("githubLanguages").textContent = languages.length);
      }
    }
  };

  // ==================== RENDER: SKILLS ====================
  const SKILL_CATEGORIES = {
    frontend:  { name: "Frontend", icon: "🎨", color: "#61dafb" },
    backend:   { name: "Backend", icon: "⚙️", color: "#f7df1e" },
    database:  { name: "Banco de Dados", icon: "🗄️", color: "#4479a1" },
    tools:     { name: "Ferramentas", icon: "🛠️", color: "#f34f29" },
    corporate: { name: "Sistemas Corporativos", icon: "🏢", color: "#10b981" },
    cloud:     { name: "Cloud Computing", icon: "☁️", color: "#06b6d4" },
  };

  function renderSkills() {
    const container = $("skills-container");
    if (!container) return;

    let filtered = [...skillsData];
    
    if (state.skillSearchQuery) {
      const q = state.skillSearchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q)
      );
    }
    
    if (state.skillCategoryFilter !== 'all') {
      filtered = filtered.filter(s => s.category === state.skillCategoryFilter);
    }
    
    const grouped = {};
    for (const key of Object.keys(SKILL_CATEGORIES)) grouped[key] = [];
    
    filtered.forEach(skill => {
      if (grouped[skill.category]) grouped[skill.category].push(skill);
    });
    
    let html = '';
    
    for (const [key, cat] of Object.entries(SKILL_CATEGORIES)) {
      const skills = grouped[key];
      if (!skills.length) continue;
      
      const avgProgress = Math.round(skills.reduce((s, i) => s + i.percent, 0) / skills.length);
      
      html += `
        <div class="skills-category" data-category="${key}">
          <div class="skills-category-header">
            <div class="skills-category-icon">${cat.icon}</div>
            <h3 class="skills-category-title" style="color: ${cat.color}">${cat.name}</h3>
            <span class="skills-category-count">${skills.length} skills • ${avgProgress}% média</span>
          </div>
          <div class="skills-grid-enhanced">
            ${skills.map(s => {
              const isFavorited = state.favorites.includes(`skill_${s.name}`);
              return `
                <div class="skill-card" data-skill="${s.name}">
                  <img src="${s.icon}" alt="${s.name}" class="skill-icon" loading="lazy" onerror="this.style.display='none'">
                  <i class="fas fa-code" style="display: none;"></i>
                  <div class="skill-header-info">
                    <h4 class="skill-name">${s.name}</h4>
                    <span class="skill-level-badge">${s.level}</span>
                  </div>
                  <div class="skill-level">
                    <div class="skill-progress" style="width:${s.percent}%; background: ${cat.color}"></div>
                  </div>
                  <div class="skill-footer">
                    <span class="skill-percent">${s.percent}%</span>
                    <span class="skill-experience">${s.experience}</span>
                  </div>
                  <small class="skill-desc">${s.description}</small>
                  <button class="skill-favorite-btn ${isFavorited ? 'favorited' : ''}" data-skill="${s.name}" aria-label="Favoritar ${s.name}">
                    ${isFavorited ? '❤️' : '🤍'}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }
    
    container.innerHTML = html || '<div class="empty-state"><div class="empty-state-icon">🔍</div><h3>Nenhuma skill encontrada</h3></div>';
    
    // Event listeners
    container.querySelectorAll('.skill-favorite-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const name = btn.dataset.skill;
        const key = `skill_${name}`;
        const idx = state.favorites.indexOf(key);
        
        if (idx === -1) {
          state.favorites.push(key);
          Toast.success(`${name} adicionado aos favoritos!`);
        } else {
          state.favorites.splice(idx, 1);
          Toast.info(`${name} removido dos favoritos`);
        }
        
        saveToStorage("portfolio_favorites", state.favorites);
        renderSkills();
      });
    });
    
    container.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('click', () => {
        const skillName = card.dataset.skill;
        const skill = skillsData.find(s => s.name === skillName);
        if (skill) showSkillDetails(skill);
      });
    });
  }

  function showSkillDetails(skill) {
    const modal = document.createElement('div');
    modal.className = 'modal skill-detail-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3><img src="${skill.icon}" alt="" style="width:32px;height:32px;margin-right:12px"> ${skill.name}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="skill-detail-header">
            <div class="skill-detail-level">
              <span class="badge badge-primary">${skill.level}</span>
              <span class="badge badge-success">${skill.percent}% proficiência</span>
            </div>
            <p><strong>Experiência:</strong> ${skill.experience}</p>
          </div>
          <p>${skill.description}</p>
          <div class="skill-progress-section">
            <div class="progress-header">
              <span>Progresso</span>
              <span>${skill.percent}%</span>
            </div>
            <div class="progress-bar large">
              <div class="progress-fill" style="width:${skill.percent}%"></div>
            </div>
          </div>
          <div class="skill-resources">
            <h4>Recursos Relacionados</h4>
            <ul>
              ${blogPosts.filter(p => p.tags.some(t => skill.name.includes(t))).slice(0, 3).map(p => `
                <li><a href="#" data-post-id="${p.id}">📝 ${p.title}</a></li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    
    modal.querySelectorAll('[data-post-id]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        modal.remove();
        openBlogModal(parseInt(link.dataset.postId));
      });
    });
  }

  // ==================== RENDER: PROJECTS ====================
  function renderProjects() {
    const container = $("projects-container");
    if (!container) return;

    let filtered = projectsData.filter(p => {
      if (state.currentCategoryFilter !== "all" && p.category !== state.currentCategoryFilter) return false;
      if (state.currentProjectSearch) {
        const q = state.currentProjectSearch.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) {
          return !p.technologies.some(t => t.toLowerCase().includes(q));
        }
      }
      return true;
    });
    
    // Ordenação
    filtered.sort((a, b) => {
      switch (state.projectSortBy) {
        case 'name': return a.title.localeCompare(b.title);
        case 'difficulty': return b.difficulty - a.difficulty;
        case 'views': return b.stats.views - a.stats.views;
        case 'date':
        default:
          return new Date(b.completedDate || '2000-01-01') - new Date(a.completedDate || '2000-01-01');
      }
    });

    const totalPages = Math.ceil(filtered.length / APP_CONFIG.itemsPerPage) || 1;
    if (state.currentProjectPage > totalPages) state.currentProjectPage = 1;
    
    const start = (state.currentProjectPage - 1) * APP_CONFIG.itemsPerPage;
    const page = filtered.slice(start, start + APP_CONFIG.itemsPerPage);
    
    container.className = state.currentProjectView === "grid" ? "projects-grid" : "projects-list";
    
    container.innerHTML = page.map(p => {
      const isFavorited = state.favorites.includes(`project_${p.id}`);
      const isCompared = state.compareList.includes(p.id);
      
      return `
        <div class="project-card ${p.featured ? 'featured' : ''}" data-project-id="${p.id}">
          ${p.featured ? '<div class="project-ribbon">Destaque</div>' : ''}
          <div class="project-body">
            <div class="project-header">
              <h3>${p.title}</h3>
              <div class="project-actions">
                <button class="favorite-project-btn ${isFavorited ? 'favorited' : ''}" data-id="${p.id}" aria-label="Favoritar">
                  ${isFavorited ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
            <p class="project-description">${p.description}</p>
            <div class="project-meta">
              <span class="project-category category-tag">${p.category}</span>
              <span class="project-difficulty difficulty-badge">🎯 ${p.difficulty}%</span>
              <span class="project-status status-badge ${p.status}">${p.status === 'completed' ? '✅ Concluído' : p.status === 'in-progress' ? '🔄 Em Andamento' : '📅 Planejado'}</span>
            </div>
            <div class="project-highlights">
              ${p.highlights.map(h => `<span class="highlight-tag">🏆 ${h}</span>`).join('')}
            </div>
            <div class="project-technologies">
              ${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
            <div class="project-stats">
              <span><i class="far fa-eye"></i> ${formatNumber(p.stats.views)}</span>
              <span><i class="far fa-heart"></i> ${formatNumber(p.stats.likes)}</span>
              <span><i class="fas fa-share"></i> ${formatNumber(p.stats.shares)}</span>
              <span><i class="fas fa-user"></i> ${p.role}</span>
            </div>
            <div class="project-links">
              ${p.link ? `<a href="${p.link}" class="project-link" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
              ${p.github ? `<a href="${p.github}" class="github-link" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>` : ''}
              <button class="compare-select-btn ${isCompared ? 'selected' : ''}" data-id="${p.id}">
                <i class="fas fa-balance-scale"></i> ${isCompared ? 'Selecionado' : 'Comparar'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    renderPagination(totalPages);
    attachProjectEvents(container);
  }

  function renderPagination(totalPages) {
    const container = $("pagination");
    if (!container) return;
    
    if (totalPages <= 1) {
      container.innerHTML = "";
      return;
    }

    const cp = state.currentProjectPage;
    let html = '<div class="pagination">';
    
    html += `<button class="page-btn" ${cp === 1 ? "disabled" : ""} data-page="${cp - 1}"><i class="fas fa-chevron-left"></i></button>`;
    
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= cp - 2 && i <= cp + 2)) {
        html += `<button class="page-btn ${i === cp ? "active" : ""}" data-page="${i}">${i}</button>`;
      } else if (i === cp - 3 || i === cp + 3) {
        html += `<span class="page-dots">...</span>`;
      }
    }
    
    html += `<button class="page-btn" ${cp === totalPages ? "disabled" : ""} data-page="${cp + 1}"><i class="fas fa-chevron-right"></i></button>`;
    html += "</div>";
    
    container.innerHTML = html;

    container.querySelectorAll(".page-btn:not([disabled])").forEach(btn => {
      btn.addEventListener("click", () => {
        state.currentProjectPage = parseInt(btn.dataset.page);
        renderProjects();
        $("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function attachProjectEvents(container) {
    container.querySelectorAll(".favorite-project-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = `project_${btn.dataset.id}`;
        const project = projectsData.find(p => p.id === parseInt(btn.dataset.id));
        const idx = state.favorites.indexOf(id);
        
        if (idx === -1) {
          state.favorites.push(id);
          if (project) project.stats.likes++;
          Toast.success("Projeto favoritado!");
        } else {
          state.favorites.splice(idx, 1);
          if (project && project.stats.likes > 0) project.stats.likes--;
          Toast.info("Projeto removido dos favoritos");
        }
        
        saveToStorage("portfolio_favorites", state.favorites);
        renderProjects();
      });
    });
    
    container.querySelectorAll(".compare-select-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        const idx = state.compareList.indexOf(id);
        
        if (idx !== -1) {
          state.compareList.splice(idx, 1);
          Toast.info("Removido da comparação");
        } else if (state.compareList.length < 3) {
          state.compareList.push(id);
          Toast.success(`Adicionado à comparação (${state.compareList.length}/3)`);
        } else {
          Toast.warning("Máximo de 3 projetos");
        }
        
        $("compareCount") && ($("compareCount").textContent = state.compareList.length);
        $("compareBtn") && ($("compareBtn").disabled = state.compareList.length < 2);
        renderProjects();
      });
    });
    
    container.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest('button') || e.target.closest('a')) return;
        const id = parseInt(card.dataset.projectId);
        showProjectDetails(id);
      });
    });
  }

  function showProjectDetails(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;
    
    project.stats.views++;
    
    const modal = document.createElement('div');
    modal.className = 'modal project-modal';
    modal.innerHTML = `
      <div class="modal-content modal-large">
        <div class="modal-header">
          <h3>${project.title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="project-detail-header">
            <span class="category-tag">${project.category}</span>
            <span class="difficulty-badge">🎯 Dificuldade: ${project.difficulty}%</span>
            <span class="status-badge ${project.status}">${project.status}</span>
          </div>
          <p class="project-full-description">${project.description}</p>
          
          <div class="project-detail-grid">
            <div class="detail-item"><strong>Função:</strong> ${project.role}</div>
            ${project.completedDate ? `<div class="detail-item"><strong>Concluído:</strong> ${formatDate(project.completedDate)}</div>` : ''}
            <div class="detail-item"><strong>Visualizações:</strong> ${project.stats.views}</div>
          </div>
          
          <div class="project-highlights-full">
            <h4>🏆 Destaques</h4>
            <ul>
              ${project.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
          
          <div class="project-tech-full">
            <h4>💻 Tecnologias</h4>
            <div class="tech-cloud">
              ${project.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}
            </div>
          </div>
          
          <div class="project-links-full">
            ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Ver Demo</a>` : ''}
            ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener" class="btn btn-outline"><i class="fab fa-github"></i> GitHub</a>` : ''}
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
  }

  // ==================== RENDER: EXPERIENCES ====================
  function renderExperiences() {
    const container = $("experienceTimeline");
    if (!container) return;

    container.innerHTML = experiencesData.map((exp, index) => `
      <div class="experience-item" style="animation-delay: ${index * 0.1}s">
        <div class="experience-marker">
          <div class="exp-icon">${exp.icon}</div>
        </div>
        <div class="experience-content">
          <span class="experience-date">📅 ${exp.period}</span>
          <div class="experience-header">
            <h3>${exp.role}</h3>
            <span class="experience-type">${exp.type}</span>
          </div>
          <div class="experience-company">
            <i class="fas fa-building"></i> ${exp.company} • ${exp.location}
          </div>
          <ul class="experience-responsibilities">
            ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
          </ul>
          ${exp.achievements ? `
            <div class="experience-achievements">
              <h4><i class="fas fa-trophy"></i> Conquistas</h4>
              <ul>
                ${exp.achievements.map(a => `<li>🏆 ${a}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          <div class="experience-tech">
            ${exp.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // ==================== RENDER: EVOLUTION ====================
  function renderEvolutionDashboard() {
    const statsEl = $("evolutionStats");
    if (statsEl) {
      const total = skillsData.length;
      const avg = Math.round(skillsData.reduce((s, i) => s + i.percent, 0) / total);
      const topSkill = [...skillsData].sort((a, b) => b.percent - a.percent)[0];
      
      statsEl.innerHTML = [
        { icon: "📚", value: total, label: "Habilidades" },
        { icon: "📊", value: avg + "%", label: "Média Geral" },
        { icon: "✅", value: projectsData.filter(p => p.status === 'completed').length, label: "Projetos Concluídos" },
        { icon: "📜", value: certificationsData.filter(c => !c.status || c.status !== 'planned').length, label: "Certificações" },
        { icon: "💼", value: experiencesData.length, label: "Experiências" },
        { icon: "⭐", value: topSkill?.name || '--', label: "Top Skill" },
      ].map(s => `
        <div class="stat-card">
          <div class="stat-icon">${s.icon}</div>
          <div class="stat-content">
            <span class="stat-value">${s.value}</span>
            <span class="stat-label">${s.label}</span>
          </div>
        </div>
      `).join("");
    }

    const gridEl = $("evolutionGrid");
    if (gridEl) {
      const cats = Object.entries(SKILL_CATEGORIES);
      
      gridEl.innerHTML = cats.map(([key, cat]) => {
        const catSkills = skillsData.filter(s => s.category === key);
        const avg = catSkills.length ? Math.round(catSkills.reduce((s, i) => s + i.percent, 0) / catSkills.length) : 0;
        
        return `
          <div class="evolution-category">
            <div class="category-header">
              <div class="category-icon">${cat.icon}</div>
              <h3 style="color: ${cat.color}">${cat.name}</h3>
              <span class="category-average">${avg}%</span>
            </div>
            <div class="skills-evolution-list">
              ${catSkills.slice(0, 5).map(s => `
                <div class="evolution-skill-item">
                  <img src="${s.icon}" class="skill-icon-small" loading="lazy" onerror="this.style.display='none'">
                  <div class="skill-info">
                    <div class="skill-info-header">
                      <span class="skill-name">${s.name}</span>
                      <span class="skill-percentage">${s.percent}%</span>
                    </div>
                    <div class="skill-progress-bar">
                      <div class="skill-progress-fill" style="width:${s.percent}%; background: ${cat.color}"></div>
                    </div>
                  </div>
                </div>
              `).join('')}
              ${catSkills.length > 5 ? `<div class="more-skills">+${catSkills.length - 5} mais...</div>` : ''}
            </div>
          </div>
        `;
      }).join("");
    }
    
    setupCharts();
  }

  // ==================== CHARTS ====================
  function setupCharts() {
    if (typeof Chart === "undefined") return;

    // Radar Chart
    const radarCtx = $("evolutionChart")?.getContext("2d");
    if (radarCtx) {
      const labels = Object.values(SKILL_CATEGORIES).map(c => c.name);
      const data = Object.keys(SKILL_CATEGORIES).map(key => {
        const skills = skillsData.filter(s => s.category === key);
        return skills.length ? Math.round(skills.reduce((s, i) => s + i.percent, 0) / skills.length) : 0;
      });
      
      new Chart(radarCtx, {
        type: "radar",
        data: {
          labels,
          datasets: [{
            label: "Proficiência (%)",
            data,
            backgroundColor: "rgba(59,130,246,0.2)",
            borderColor: "#3b82f6",
            borderWidth: 2,
            pointBackgroundColor: "#8b5cf6",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#8b5cf6"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } } },
          plugins: { legend: { display: false } }
        }
      });
    }

    // Bar Chart
    const barCtx = $("skillsChart")?.getContext("2d");
    if (barCtx) {
      const top = [...skillsData].sort((a, b) => b.percent - a.percent).slice(0, 8);
      
      new Chart(barCtx, {
        type: "bar",
        data: {
          labels: top.map(s => s.name),
          datasets: [{
            label: "Proficiência (%)",
            data: top.map(s => s.percent),
            backgroundColor: top.map(s => {
              const cat = Object.values(SKILL_CATEGORIES).find(c => 
                skillsData.find(sk => sk.name === s.name)?.category === Object.keys(SKILL_CATEGORIES).find(k => SKILL_CATEGORIES[k] === c)
              );
              return cat?.color || "#8b5cf6";
            }),
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          indexAxis: "y",
          scales: { x: { max: 100, grid: { color: "rgba(255,255,255,0.1)" } } },
          plugins: { legend: { display: false } }
        }
      });
    }

    // Line Chart
    const lineCtx = $("timelineChart")?.getContext("2d");
    if (lineCtx) {
      new Chart(lineCtx, {
        type: "line",
        data: {
          labels: ["Jan 2024", "Mai 2024", "Set 2024", "Jan 2025", "Mai 2025", "Set 2025", "Jan 2026", "Abr 2026"],
          datasets: [
            { label: "Frontend", data: [30, 45, 60, 70, 75, 80, 82, 85], borderColor: "#61dafb", tension: 0.4, fill: false },
            { label: "Backend", data: [10, 20, 30, 40, 45, 48, 50, 52], borderColor: "#f7df1e", tension: 0.4, fill: false },
            { label: "Corporativo", data: [0, 0, 10, 30, 45, 55, 58, 60], borderColor: "#10b981", tension: 0.4, fill: false },
            { label: "Cloud", data: [0, 5, 10, 15, 18, 20, 22, 25], borderColor: "#06b6d4", tension: 0.4, fill: false },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: { y: { beginAtZero: true, max: 100, grid: { color: "rgba(255,255,255,0.1)" } } },
          plugins: { tooltip: { mode: "index", intersect: false } }
        }
      });
    }
  }

  // ==================== RENDER: CERTIFICATIONS ====================
  function renderCertifications() {
    const container = $("certificationsGrid");
    if (!container) return;
    
    const statsContainer = $("certificationsStats");
    if (statsContainer) {
      const completed = certificationsData.filter(c => !c.status || c.status === 'completed').length;
      const inProgress = certificationsData.filter(c => c.status === 'in-progress').length;
      const planned = certificationsData.filter(c => c.status === 'planned').length;
      
      statsContainer.innerHTML = `
        <div class="cert-stat-card"><div class="cert-stat-icon">📜</div><div class="cert-stat-number">${certificationsData.length}</div><div class="cert-stat-label">Total</div></div>
        <div class="cert-stat-card"><div class="cert-stat-icon">✅</div><div class="cert-stat-number">${completed}</div><div class="cert-stat-label">Concluídas</div></div>
        <div class="cert-stat-card"><div class="cert-stat-icon">🔄</div><div class="cert-stat-number">${inProgress}</div><div class="cert-stat-label">Em Andamento</div></div>
        <div class="cert-stat-card"><div class="cert-stat-icon">📅</div><div class="cert-stat-number">${planned}</div><div class="cert-stat-label">Planejadas</div></div>
      `;
    }
    
    container.innerHTML = certificationsData.map(c => `
      <div class="certification-card ${c.status || 'completed'} ${c.featured ? 'featured' : ''}">
        ${c.status === 'in-progress' ? '<div class="certification-badge in-progress">🔄</div>' : 
          c.status === 'planned' ? '<div class="certification-badge planned">📅</div>' :
          '<div class="certification-badge">✅</div>'}
        <div class="certification-content">
          <div class="certification-icon">${c.icon}</div>
          <div class="certification-issuer"><span>${c.institution}</span></div>
          <h4 class="certification-title">${c.name}</h4>
          <div class="certification-meta">
            <span><i class="far fa-clock"></i> ${c.hours}</span>
            <span><i class="far fa-calendar"></i> ${c.year}</span>
          </div>
          ${c.status === 'in-progress' ? `
            <div class="certification-progress">
              <div class="certification-progress-header"><span>Progresso</span><span>${c.progress}%</span></div>
              <div class="certification-progress-bar"><div class="certification-progress-fill" style="width:${c.progress}%"></div></div>
            </div>
          ` : ''}
        </div>
        <div class="certification-footer">
          ${c.credentialUrl ? `
            <a href="${c.credentialUrl}" target="_blank" rel="noopener" class="certification-link">
              Ver credencial <i class="fas fa-external-link-alt"></i>
            </a>
          ` : `<span class="certification-id">ID: ${c.credentialId || 'N/A'}</span>`}
        </div>
      </div>
    `).join('');
  }

  // ==================== RENDER: ROADMAP ====================
  function renderRoadmap() {
    const container = $("roadmapContainer");
    if (!container) return;

    const statusIcons = { completed: "✅", "in-progress": "🔄", planned: "📅" };
    
    container.innerHTML = roadmapData.map((item, i) => {
      const category = SKILL_CATEGORIES[item.category] || { color: "#6b7280", icon: "📌" };
      
      return `
        <div class="timeline-item ${item.status}" style="animation-delay:${i * 0.08}s">
          <div class="timeline-marker ${item.status}" style="border-color: ${category.color}"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <span class="timeline-month"><i class="far fa-calendar-alt"></i> ${item.month}</span>
              <span class="timeline-category" style="color: ${category.color}">${category.icon} ${category.name}</span>
            </div>
            <h4>${statusIcons[item.status] || "📌"} ${item.title}</h4>
            <p>${item.description}</p>
            <div class="timeline-tech">
              ${item.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}
            </div>
            <div class="timeline-projects">
              <i class="fas fa-folder-open"></i> ${item.projects.join(" • ")}
            </div>
            ${item.targetDate ? `
              <div class="timeline-target ${new Date(item.targetDate) < new Date() ? 'overdue' : ''}">
                <i class="fas fa-bullseye"></i> Meta: ${formatDate(item.targetDate)}
              </div>
            ` : ''}
            <div class="timeline-progress-section">
              <div class="timeline-progress-header">
                <span>Progresso</span>
                <span>${item.percent}%</span>
              </div>
              <div class="timeline-progress-bar">
                <div class="timeline-progress-fill" style="width:${item.percent}%; background: ${category.color}"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Atualizar progresso geral
    const completed = roadmapData.filter(i => i.status === "completed").length;
    const inProgress = roadmapData.filter(i => i.status === "in-progress").length;
    const progress = Math.round(((completed + inProgress * 0.5) / roadmapData.length) * 100);
    
    $("totalProgressPercent") && ($("totalProgressPercent").textContent = `${progress}%`);
    $("totalProgressFill") && ($("totalProgressFill").style.width = `${progress}%`);
    
    // Atualizar progress label com aria
    const progressBar = $("totalProgressFill")?.parentElement;
    if (progressBar) {
      progressBar.setAttribute('aria-valuenow', progress);
      progressBar.setAttribute('aria-valuemin', '0');
      progressBar.setAttribute('aria-valuemax', '100');
    }
  }

  // ==================== RENDER: BLOG ====================
  function renderBlog() {
    const container = $("blogContainer");
    if (!container) return;

    let filtered = [...blogPosts];
    
    if (state.currentBlogFilter !== "all") {
      filtered = filtered.filter(p => p.category === state.currentBlogFilter);
    }
    if (state.currentBlogSearch) {
      const q = state.currentBlogSearch.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    
    filtered.sort((a, b) => {
      switch (state.blogSortBy) {
        case 'views': return b.views - a.views;
        case 'likes': return b.likes - a.likes;
        case 'title': return a.title.localeCompare(b.title);
        case 'date':
        default: return new Date(b.date) - new Date(a.date);
      }
    });

    const displayed = filtered.slice(0, state.visibleBlogPosts);
    const hasMore = filtered.length > state.visibleBlogPosts;

    container.innerHTML = displayed.map(p => `
      <div class="blog-card ${p.featured ? 'featured' : ''}" data-post-id="${p.id}">
        <div class="blog-image">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
          <span class="blog-category">${SKILL_CATEGORIES[p.category]?.icon || '📝'} ${p.category}</span>
          <span class="blog-read-time">📖 ${p.readTime} min</span>
          <div class="blog-progress">
            <div class="blog-progress-fill" style="width:${p.learningProgress}%"></div>
          </div>
        </div>
        <div class="blog-content">
          <div class="blog-tags">
            ${p.tags.slice(0, 3).map(t => `<span class="blog-tag">#${t}</span>`).join('')}
          </div>
          <h3>${p.title}</h3>
          <p class="blog-excerpt">${p.excerpt}</p>
          <div class="blog-meta">
            <span><i class="far fa-calendar"></i> ${formatDate(p.date)}</span>
            <span><i class="far fa-user"></i> ${p.author}</span>
          </div>
          <div class="blog-footer">
            <div class="blog-stats">
              <span><i class="far fa-eye"></i> ${formatNumber(p.views)}</span>
              <span><i class="far fa-heart"></i> ${formatNumber(p.likes)}</span>
            </div>
            <button class="blog-read-more" data-id="${p.id}">
              Ler mais <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    $("loadMoreBlog") && ($("loadMoreBlog").style.display = hasMore ? "inline-flex" : "none");

    container.querySelectorAll(".blog-read-more, .blog-card").forEach(el => {
      el.addEventListener("click", (e) => {
        if (e.target.closest('button')) {
          const id = e.target.closest('[data-post-id]')?.dataset.postId;
          if (id) openBlogModal(parseInt(id));
        }
      });
    });
  }

  function openBlogModal(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;

    post.views++;
    renderBlog();

    const modal = document.createElement('div');
    modal.className = 'modal blog-modal active';
    modal.innerHTML = `
      <div class="modal-content modal-large">
        <div class="modal-header">
          <h3>${post.title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="blog-post-header">
            <img src="${post.image}" alt="${post.title}" class="blog-post-image">
            <div class="blog-post-meta">
              <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
              <span><i class="far fa-user"></i> ${post.author}</span>
              <span><i class="far fa-clock"></i> ${post.readTime} min de leitura</span>
              <span><i class="far fa-eye"></i> ${post.views} visualizações</span>
            </div>
          </div>
          <div class="blog-tags-full">
            ${post.tags.map(t => `<span class="blog-tag">#${t}</span>`).join('')}
          </div>
          <div class="blog-post-content">
            ${post.content}
          </div>
          <div class="blog-progress-section">
            <h4><i class="fas fa-chart-line"></i> Meu progresso em ${post.tags[0]}</h4>
            <div class="blog-progress-label">
              <span>${post.learningProgress}% concluído</span>
            </div>
            <div class="blog-progress-bar large">
              <div class="blog-progress-fill-modal" style="width:${post.learningProgress}%"></div>
            </div>
          </div>
          <div class="blog-actions">
            <button class="blog-like-btn" data-id="${post.id}">
              <i class="far fa-heart"></i> Curtir (${post.likes})
            </button>
            <button class="blog-share-btn" data-id="${post.id}">
              <i class="fas fa-share"></i> Compartilhar
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    
    modal.querySelector('.blog-like-btn')?.addEventListener('click', () => {
      post.likes++;
      Toast.success('Obrigado pelo like!');
      modal.querySelector('.blog-like-btn').innerHTML = `<i class="fas fa-heart"></i> Curtir (${post.likes})`;
    });
    
    modal.querySelector('.blog-share-btn')?.addEventListener('click', () => {
      const url = `${window.location.origin}${window.location.pathname}#blog`;
      navigator.clipboard?.writeText(`${post.title}\n${url}`).then(() => {
        Toast.success('Link copiado!');
      });
    });
  }

  // ==================== RENDER: AI SUGGESTION ====================
  function renderAISuggestion() {
    const container = $("aiContent");
    if (!container) return;

    const lowest = [...skillsData].sort((a, b) => a.percent - b.percent)[0];
    const nextCert = certificationsData.find(c => c.status === 'in-progress' || c.status === 'planned');
    const recommendedProject = projectsData.find(p => 
      p.status === 'in-progress' || p.status === 'planned'
    ) || projectsData[0];
    
    container.innerHTML = `
      <div class="skill-focus">
        <span class="skill-name">🎯 Foco recomendado: ${lowest.name}</span>
        <span class="skill-status">${lowest.level} • ${lowest.percent}%</span>
      </div>
      <div class="progress-mini">
        <div class="progress-bar">
          <div class="progress-fill" style="width:${lowest.percent}%"></div>
        </div>
        <span class="progress-text">${100 - lowest.percent}% para dominar</span>
      </div>
      <p class="suggestion-message">Baseado no seu perfil, recomendo:</p>
      <ul class="suggestion-tips">
        <li><i class="fas fa-arrow-trend-up"></i> Aprofundar em <strong>${lowest.name}</strong> (${lowest.category})</li>
        ${nextCert ? `<li><i class="fas fa-certificate"></i> Continuar <strong>${nextCert.name}</strong> (${nextCert.progress || 0}%)</li>` : ''}
        <li><i class="fas fa-code-branch"></i> Avançar no projeto <strong>${recommendedProject.title}</strong></li>
        <li><i class="fas fa-book"></i> Ler artigo: "${blogPosts[0].title}"</li>
      </ul>
      <a href="#roadmap" class="suggestion-link">Ver roadmap completo <i class="fas fa-arrow-right"></i></a>
    `;
  }

  // ==================== RENDER: GITHUB ====================
  async function renderGitHubSection() {
    const container = $("githubContainer");
    if (!container) return;
    
    container.innerHTML = '<div class="skeleton-card"><div class="skeleton-title"></div><div class="skeleton-text"></div></div>';
    
    const repos = await GitHubAPI.fetchRepos();
    
    if (repos.length) {
      container.innerHTML = `
        <div class="github-repos-grid">
          ${repos.slice(0, 6).map(repo => `
            <div class="github-repo-card">
              <div class="repo-header">
                <i class="fab fa-github"></i>
                <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
              </div>
              <p class="repo-description">${repo.description || 'Sem descrição'}</p>
              <div class="repo-meta">
                ${repo.language ? `<span><span class="lang-dot" style="background: ${getLanguageColor(repo.language)}"></span>${repo.language}</span>` : ''}
                <span><i class="far fa-star"></i> ${repo.stargazers_count}</span>
                <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
    
    await GitHubAPI.updateUI();
  }

  function getLanguageColor(lang) {
    const colors = {
      JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3776ab', Java: '#b07219',
      HTML: '#e34c26', CSS: '#563d7c', Vue: '#42b883', Shell: '#89e051'
    };
    return colors[lang] || '#6b7280';
  }

  // ==================== TYPEWRITER ====================
  function initTypewriter() {
    const words = [
      'aplicações web modernas',
      'soluções corporativas',
      'dashboards interativos',
      'integrações SAP/TMS',
      'APIs escaláveis',
      'experiências incríveis'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const el = $('typewriter');
    if (!el) return;
    
    function type() {
      const current = words[wordIndex];
      
      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }
      
      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
        return;
      }
      
      setTimeout(type, isDeleting ? 50 : 100);
    }
    
    type();
  }

  // ==================== KEYBOARD SHORTCUTS ====================
  function setupKeyboardShortcuts() {
    if (!APP_CONFIG.enableKeyboardShortcuts) return;
    
    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea, select')) return;
      
      // Ctrl/Cmd + K -> Search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        $('skillSearch')?.focus();
      }
      
      // Ctrl/Cmd + D -> Toggle theme
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        Theme.toggle();
      }
      
      // Ctrl/Cmd + H -> Home
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Escape -> Close modals
      if (e.key === 'Escape') {
        Modal.closeAll();
      }
    });
  }

  // ==================== EVENT LISTENERS ====================
  function setupEventListeners() {
    // Theme
    $$('.theme-toggle').forEach(btn => btn.addEventListener('click', () => Theme.toggle()));
    $('floatingThemeToggle')?.addEventListener('click', () => Theme.toggle());
    $('floatingThemeToggle')?.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      Theme.cycle();
    });
    
    // Skills
    $('skillSearch')?.addEventListener('input', debounce((e) => {
      state.skillSearchQuery = e.target.value.toLowerCase();
      renderSkills();
    }, APP_CONFIG.debounceDelay));
    
    $('clearSkillSearch')?.addEventListener('click', () => {
      const input = $('skillSearch');
      if (input) { input.value = ''; state.skillSearchQuery = ''; renderSkills(); }
    });
    
    // Projects
    $('projectSearch')?.addEventListener('input', debounce((e) => {
      state.currentProjectSearch = e.target.value.toLowerCase();
      state.currentProjectPage = 1;
      renderProjects();
    }, APP_CONFIG.debounceDelay));
    
    $('clearProjectSearch')?.addEventListener('click', () => {
      const input = $('projectSearch');
      if (input) { input.value = ''; state.currentProjectSearch = ''; state.currentProjectPage = 1; renderProjects(); }
    });
    
    $('categoryFilter')?.addEventListener('change', (e) => {
      state.currentCategoryFilter = e.target.value;
      state.currentProjectPage = 1;
      renderProjects();
    });
    
    $('gridViewBtn')?.addEventListener('click', () => {
      state.currentProjectView = "grid";
      $('gridViewBtn')?.classList.add('active');
      $('listViewBtn')?.classList.remove('active');
      renderProjects();
    });
    
    $('listViewBtn')?.addEventListener('click', () => {
      state.currentProjectView = "list";
      $('listViewBtn')?.classList.add('active');
      $('gridViewBtn')?.classList.remove('active');
      renderProjects();
    });
    
    $('compareBtn')?.addEventListener('click', () => {
      if (state.compareList.length >= 2) {
        Modal.open('compareModal');
        renderCompareModal();
      }
    });
    
    $('exportBtn')?.addEventListener('click', () => Modal.open('exportModal'));
    
    // Export options
    $('exportPDF')?.addEventListener('click', () => exportData('pdf'));
    $('exportCSV')?.addEventListener('click', () => exportData('csv'));
    $('exportJSON')?.addEventListener('click', () => exportData('json'));
    
    // Blog
    $$('.blog-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.blog-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentBlogFilter = btn.dataset.filter || 'all';
        state.visibleBlogPosts = 6;
        renderBlog();
      });
    });
    
    $('blogSearch')?.addEventListener('input', debounce((e) => {
      state.currentBlogSearch = e.target.value.toLowerCase();
      state.visibleBlogPosts = 6;
      renderBlog();
    }, APP_CONFIG.debounceDelay));
    
    $('clearBlogSearch')?.addEventListener('click', () => {
      const input = $('blogSearch');
      if (input) { input.value = ''; state.currentBlogSearch = ''; state.visibleBlogPosts = 6; renderBlog(); }
    });
    
    $('loadMoreBlog')?.addEventListener('click', () => {
      state.visibleBlogPosts += 4;
      renderBlog();
    });
    
    // Mobile menu
    const mobileBtn = $('mobileMenuBtn');
    const navLinks = $('navLinks');
    mobileBtn?.addEventListener('click', () => {
      mobileBtn.classList.toggle('active');
      navLinks?.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      mobileBtn.setAttribute('aria-expanded', navLinks?.classList.contains('active'));
    });
    
    // Smooth scroll
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#main-content') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          if (navLinks?.classList.contains('active')) mobileBtn?.click();
          
          // Update URL without jump
          history.pushState(null, null, href);
        }
      });
    });
    
    // Copy buttons
    $$('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.copy;
        navigator.clipboard?.writeText(text).then(() => {
          Toast.success('Copiado!');
        }).catch(() => Toast.error('Erro ao copiar'));
      });
    });
    
    // Share
    $('sharePortfolioBtn')?.addEventListener('click', () => Modal.open('shareModal'));
    
    $('copyShareUrl')?.addEventListener('click', () => {
      const input = $('shareUrl');
      input?.select();
      navigator.clipboard?.writeText(input?.value || window.location.href).then(() => {
        Toast.success('Link copiado!');
      });
    });
    
    $$('.share-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const platform = btn.dataset.platform;
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Confira o portfólio do Raphael Freitas!');
        
        let shareUrl = '';
        if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        else if (platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        else if (platform === 'email') shareUrl = `mailto:?subject=${text}&body=${url}`;
        else if (btn.dataset.action === 'copy') {
          navigator.clipboard?.writeText(window.location.href).then(() => Toast.success('Link copiado!'));
          return;
        }
        
        if (shareUrl) window.open(shareUrl, '_blank');
        Modal.close('shareModal');
      });
    });
    
    // Download resume
    $('downloadResumeBtn')?.addEventListener('click', () => {
      Toast.info('Preparando download do CV...');
      // Simular download
      setTimeout(() => Toast.success('CV baixado com sucesso!'), 1000);
    });
    
    // Back to top
    const backToTop = $('backToTop');
    if (backToTop) {
      window.addEventListener('scroll', throttle(() => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
      }, 100));
      
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    
    // Reading progress
    window.addEventListener('scroll', throttle(() => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 100;
      $('readingProgress')?.style.setProperty('width', scrolled + '%');
    }, 50));
    
    // Modal close on backdrop click
    document.addEventListener('click', (e) => {
      if (e.target.matches('.modal')) {
        const modal = e.target;
        modal.setAttribute('hidden', '');
        modal.setAttribute('aria-hidden', 'true');
        state.modals.open = null;
        document.body.style.overflow = '';
      }
      
      if (e.target.matches('.modal-close')) {
        const modal = e.target.closest('.modal');
        if (modal) {
          modal.setAttribute('hidden', '');
          modal.setAttribute('aria-hidden', 'true');
          state.modals.open = null;
          document.body.style.overflow = '';
        }
      }
    });
    
    setupKeyboardShortcuts();
  }

  function renderCompareModal() {
    const body = $('compareModalBody');
    if (!body) return;
    
    const projects = state.compareList.map(id => projectsData.find(p => p.id === id)).filter(Boolean);
    
    body.innerHTML = `
      <div class="compare-table">
        <table>
          <thead>
            <tr>
              <th>Critério</th>
              ${projects.map(p => `<th>${p.title}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr><td>Categoria</td>${projects.map(p => `<td>${p.category}</td>`).join('')}</tr>
            <tr><td>Dificuldade</td>${projects.map(p => `<td>${p.difficulty}%</td>`).join('')}</tr>
            <tr><td>Status</td>${projects.map(p => `<td>${p.status}</td>`).join('')}</tr>
            <tr><td>Tecnologias</td>${projects.map(p => `<td>${p.technologies.length}</td>`).join('')}</tr>
            <tr><td>Visualizações</td>${projects.map(p => `<td>${p.stats.views}</td>`).join('')}</tr>
            <tr><td>Likes</td>${projects.map(p => `<td>${p.stats.likes}</td>`).join('')}</tr>
          </tbody>
        </table>
      </div>
      <div class="compare-actions">
        <button class="btn btn-outline" id="clearCompareBtn">Limpar Comparação</button>
      </div>
    `;
    
    $('clearCompareBtn')?.addEventListener('click', () => {
      state.compareList = [];
      $('compareCount') && ($('compareCount').textContent = '0');
      $('compareBtn') && ($('compareBtn').disabled = true);
      Modal.close('compareModal');
      renderProjects();
      Toast.info('Comparação limpa');
    });
  }

  function exportData(format) {
    const data = {
      exportedAt: new Date().toISOString(),
      personal: personalInfo,
      skills: skillsData,
      projects: projectsData,
      experiences: experiencesData,
      certifications: certificationsData,
      roadmap: roadmapData,
      stats: {
        totalProjects: projectsData.length,
        totalSkills: skillsData.length,
        avgProgress: Math.round(skillsData.reduce((s, i) => s + i.percent, 0) / skillsData.length)
      }
    };
    
    let content, mimeType, filename;
    
    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      mimeType = 'application/json';
      filename = `portfolio-${new Date().toISOString().split('T')[0]}.json`;
    } else if (format === 'csv') {
      const headers = ['Nome', 'Categoria', 'Proficiência', 'Nível'];
      const rows = skillsData.map(s => [s.name, s.category, `${s.percent}%`, s.level]);
      content = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
      mimeType = 'text/csv';
      filename = `skills-${new Date().toISOString().split('T')[0]}.csv`;
    } else {
      Toast.info('Exportação PDF em desenvolvimento');
      Modal.close('exportModal');
      return;
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    Toast.success(`Exportado como ${format.toUpperCase()}`);
    Modal.close('exportModal');
    
    Logger.analytics('export', { format });
  }

  // ==================== QR CODE ====================
  function generateQRCode() {
    const container = $('qrCanvas');
    if (container && typeof QRCode !== 'undefined') {
      new QRCode(container, {
        text: window.location.href,
        width: 150,
        height: 150,
        colorDark: '#3b82f6',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }

  // ==================== ACTIVE SECTION TRACKING ====================
  function setupActiveSectionTracking() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            if (link.getAttribute('href') === `#${id}`) {
              link.setAttribute('aria-current', 'page');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px -20% 0px' });
    
    sections.forEach(section => observer.observe(section));
  }

  // ==================== ANALYTICS ====================
  function trackPageView() {
    state.pageViews++;
    localStorage.setItem('page_views', state.pageViews.toString());
    
    Logger.analytics('page_view', {
      page: window.location.pathname,
      referrer: document.referrer,
      views: state.pageViews
    });
  }

  // ==================== INICIALIZAÇÃO ====================
  async function initializeApp() {
    Logger.info(`🚀 Inicializando Portfólio v${APP_CONFIG.version}`);
    
    // Aplicar tema salvo
    Theme.set(state.theme);
    
    // Renderizar tudo
    renderSkills();
    renderProjects();
    renderExperiences();
    renderEvolutionDashboard();
    renderCertifications();
    renderRoadmap();
    renderBlog();
    renderAISuggestion();
    renderGitHubSection();
    
    // Setup
    setupEventListeners();
    setupActiveSectionTracking();
    initTypewriter();
    generateQRCode();
    trackPageView();
    
    // Inicializar managers
    setTimeout(() => {
      if (typeof initCertifications === 'function') initCertifications();
      if (typeof initRoadmap === 'function') initRoadmap();
    }, 200);
    
    // Esconder loader
    setTimeout(() => {
      const loader = $('global-loader');
      loader?.classList.add('fade-out');
      setTimeout(() => loader?.remove(), 500);
    }, 400);
    
    // Atualizar contadores
    $('projectsCount') && ($('projectsCount').textContent = projectsData.length);
    $('skillsCount') && ($('skillsCount').textContent = skillsData.length);
    $('certificationsCount') && ($('certificationsCount').textContent = certificationsData.filter(c => !c.status || c.status === 'completed').length);
    
    Logger.info('✅ Portfólio inicializado com sucesso!');
    
    // Welcome message (primeira visita)
    if (!localStorage.getItem('portfolio_visited')) {
      setTimeout(() => {
        Toast.info('👋 Bem-vindo ao meu portfólio! Explore meus projetos e skills.', 8000);
        localStorage.setItem('portfolio_visited', 'true');
      }, 1500);
    }
  }

  // ==================== START ====================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }

  // Expor para debug
  window.app = {
    state,
    Theme,
    Toast,
    Modal,
    renderSkills,
    renderProjects,
    renderBlog,
    version: APP_CONFIG.version
  };
})();