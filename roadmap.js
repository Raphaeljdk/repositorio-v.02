// ==================== ROADMAP DE CARREIRA - VERSÃO ULTRA ====================
// Módulo completo para gerenciamento de roadmap de carreira
// Autor: Raphael Freitas
// Features: Filtros, Estatísticas, Persistência, Exportação, Drag & Drop, Metas

class CareerRoadmap {
  constructor(config = {}) {
    this.config = {
      containerId: config.containerId || "roadmapContainer",
      progressContainerId: config.progressContainerId || "roadmapProgress",
      filtersContainerId: config.filtersContainerId || "roadmapFilters",
      timelineContainerId: config.timelineContainerId || "roadmapTimeline",
      enableFilters: config.enableFilters !== false,
      enableProgress: config.enableProgress !== false,
      enableTimeline: config.enableTimeline !== false,
      enableAnimations: config.enableAnimations !== false,
      enableDragDrop: config.enableDragDrop !== false,
      enableExport: config.enableExport !== false,
      autoSave: config.autoSave !== false,
      ...config
    };
    
    this.state = {
      milestones: [],
      filteredMilestones: [],
      stats: {},
      activeFilter: 'all',
      activeCategory: 'all',
      sortBy: 'date',
      viewMode: 'timeline', // timeline, grid, kanban
      expandedMilestone: null,
      selectedMilestones: new Set()
    };
    
    this.categories = [
      { id: 'fundamentals', name: 'Fundamentos', color: '#61dafb', icon: '🎯' },
      { id: 'frontend', name: 'Frontend', color: '#61dafb', icon: '⚛️' },
      { id: 'backend', name: 'Backend', color: '#339933', icon: '🟢' },
      { id: 'database', name: 'Banco de Dados', color: '#4479a1', icon: '🗄️' },
      { id: 'corporate', name: 'Corporativo', color: '#10b981', icon: '🏢' },
      { id: 'cloud', name: 'Cloud & DevOps', color: '#ff9900', icon: '☁️' },
      { id: 'ai', name: 'IA & Data Science', color: '#8b5cf6', icon: '🤖' },
      { id: 'education', name: 'Educação', color: '#8b5cf6', icon: '🎓' },
      { id: 'mobile', name: 'Mobile', color: '#ec4899', icon: '📱' },
      { id: 'security', name: 'Segurança', color: '#ef4444', icon: '🔒' }
    ];
    
    this.events = new Map();
    this.init();
  }
  
  init() {
    this.loadMilestones();
    this.calculateStats();
    this.render();
    this.attachEventListeners();
    this.loadSavedState();
    console.log('✅ CareerRoadmap ULTRA inicializado');
  }
  
  getMilestonesData() {
    return [
      {
        id: 'mile-001',
        title: 'Fundamentos da Programação',
        subtitle: 'Lógica, Algoritmos e Estruturas de Dados',
        period: { start: '2024-01-01', end: '2024-03-31', display: 'Jan 2024 - Mar 2024' },
        status: 'completed',
        progress: 100,
        category: 'fundamentals',
        priority: 'high',
        difficulty: 'beginner',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'Algoritmos', 'Estruturas de Dados', 'Git Básico'],
        description: 'Fundamentos essenciais de programação web: HTML semântico, CSS moderno, JavaScript ES6+, lógica de programação e algoritmos.',
        projects: ['Portfolio v1', 'Landing Pages', 'Calculadora JS'],
        icon: '🎯',
        color: '#61dafb',
        learningHours: 120,
        metrics: { projects: 3, skills: 6, certifications: 0, commits: 45 },
        featured: false,
        dependencies: [],
        resources: [
          { type: 'course', name: 'HTML5 e CSS3', url: '#', completed: true, platform: 'Curso em Vídeo' },
          { type: 'course', name: 'JavaScript ES6+', url: '#', completed: true, platform: 'Rocketseat' },
          { type: 'book', name: 'Eloquent JavaScript', url: '#', completed: true }
        ],
        achievements: ['Primeiro Site Online', '100+ Commits'],
        tags: ['web', 'fundamentals', 'beginner']
      },
      {
        id: 'mile-002',
        title: 'Desenvolvimento Web Avançado',
        subtitle: 'React, TypeScript e Ferramentas Modernas',
        period: { start: '2024-03-01', end: '2024-06-30', display: 'Mar 2024 - Jun 2024' },
        status: 'completed',
        progress: 100,
        category: 'frontend',
        priority: 'high',
        difficulty: 'intermediate',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js', 'Redux', 'Jest'],
        description: 'Desenvolvimento web completo com React, TypeScript, Tailwind CSS e ferramentas modernas de build. Inclui testes e gerenciamento de estado.',
        projects: ['Dashboard App', 'E-commerce Frontend', 'Portfólio v2', 'Task Manager'],
        icon: '⚛️',
        color: '#61dafb',
        learningHours: 180,
        metrics: { projects: 4, skills: 7, certifications: 1, commits: 120 },
        featured: true,
        dependencies: ['mile-001'],
        resources: [
          { type: 'course', name: 'React Complete Guide', url: '#', completed: true, platform: 'Udemy' },
          { type: 'course', name: 'TypeScript Masterclass', url: '#', completed: true, platform: 'Alura' }
        ],
        achievements: ['Primeiro App React', 'Component Library Própria'],
        tags: ['react', 'typescript', 'frontend', 'intermediate']
      },
      {
        id: 'mile-003',
        title: 'Backend com Node.js e Java',
        subtitle: 'APIs, Microsserviços e Arquitetura',
        period: { start: '2024-06-01', end: '2024-10-31', display: 'Jun 2024 - Out 2024' },
        status: 'completed',
        progress: 100,
        category: 'backend',
        priority: 'high',
        difficulty: 'intermediate',
        skills: ['Node.js', 'Express', 'Java', 'Spring Boot', 'APIs RESTful', 'JWT', 'WebSocket', 'GraphQL'],
        description: 'Desenvolvimento backend com Node.js/Express e Java/Spring Boot, incluindo APIs RESTful, autenticação, WebSockets e GraphQL.',
        projects: ['API RESTful', 'Microservices Demo', 'Auth Service', 'Real-time Chat'],
        icon: '🟢',
        color: '#339933',
        learningHours: 200,
        metrics: { projects: 4, skills: 8, certifications: 2, commits: 150 },
        featured: false,
        dependencies: ['mile-001'],
        resources: [
          { type: 'course', name: 'Node.js Bootcamp', url: '#', completed: true, platform: 'Rocketseat' },
          { type: 'course', name: 'Spring Boot Expert', url: '#', completed: true, platform: 'Algaworks' }
        ],
        achievements: ['API com 1000+ requests/dia', 'Microsserviço em produção'],
        tags: ['nodejs', 'java', 'backend', 'api']
      },
      {
        id: 'mile-004',
        title: 'Banco de Dados SQL e NoSQL',
        subtitle: 'Modelagem, Otimização e Escalabilidade',
        period: { start: '2024-08-01', end: '2024-11-30', display: 'Ago 2024 - Nov 2024' },
        status: 'completed',
        progress: 100,
        category: 'database',
        priority: 'medium',
        difficulty: 'intermediate',
        skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Prisma ORM', 'Mongoose', 'Query Optimization'],
        description: 'Modelagem e otimização de bancos de dados relacionais e não-relacionais, incluindo caching com Redis.',
        projects: ['Database Design', 'Caching System', 'Data Migration Tool', 'Analytics Pipeline'],
        icon: '🗄️',
        color: '#4479a1',
        learningHours: 140,
        metrics: { projects: 4, skills: 7, certifications: 1, commits: 80 },
        featured: false,
        dependencies: ['mile-003'],
        resources: [
          { type: 'course', name: 'PostgreSQL Mastery', url: '#', completed: true, platform: 'Udemy' },
          { type: 'course', name: 'MongoDB University', url: '#', completed: true, platform: 'MongoDB' }
        ],
        achievements: ['Otimização de queries (10x mais rápido)', 'Cluster MongoDB'],
        tags: ['database', 'sql', 'nosql', 'performance']
      },
      {
        id: 'mile-005',
        title: 'Experiência Corporativa - Eurofarma',
        subtitle: 'Logística Farmacêutica e Controle de Qualidade',
        period: { start: '2024-05-01', display: 'Mai 2024 - Atual' },
        status: 'completed',
        progress: 100,
        category: 'corporate',
        priority: 'high',
        difficulty: 'intermediate',
        skills: ['Processos', 'Qualidade', 'Logística', 'COA', 'BPF', 'Auditoria', 'ERP'],
        description: 'Experiência prática em logística farmacêutica, controle de qualidade de lotes e análise de Certificados de Análise (COA).',
        projects: ['Controle de Lotes', 'Auditoria de Qualidade', 'Otimização de Processos'],
        icon: '💊',
        color: '#10b981',
        learningHours: 480,
        metrics: { projects: 3, skills: 7, certifications: 0, processes: 5 },
        featured: true,
        dependencies: [],
        resources: [
          { type: 'training', name: 'BPF - Boas Práticas de Fabricação', completed: true },
          { type: 'training', name: 'ISO 9001', completed: true }
        ],
        achievements: ['Redução de 15% em retrabalho', 'Auditoria aprovada sem não-conformidades'],
        tags: ['corporate', 'quality', 'logistics', 'pharma']
      },
      {
        id: 'mile-006',
        title: 'Polyexcel - SAP e TMS',
        subtitle: 'Sistemas Corporativos e Gestão de Transporte',
        period: { start: '2025-07-01', display: 'Jul 2025 - Atual' },
        status: 'in-progress',
        progress: 70,
        category: 'corporate',
        priority: 'high',
        difficulty: 'advanced',
        skills: ['SAP ABAP', 'SAP MM', 'SAP SD', 'TMS', 'CTE', 'Processos', 'Auditoria', 'Relatórios'],
        description: 'Operação de sistemas SAP (módulos MM, SD) e TMS para gestão de transporte e processos administrativos.',
        projects: ['Gestão de Pedidos', 'Emissão de CTEs', 'Relatórios SAP', 'Integração SAP-TMS'],
        icon: '🏢',
        color: '#008fd3',
        learningHours: 600,
        targetDate: '2026-12-31',
        targetPercent: 100,
        metrics: { projects: 4, skills: 8, certifications: 1, integrations: 3 },
        featured: true,
        dependencies: ['mile-005'],
        resources: [
          { type: 'course', name: 'SAP ABAP Programming', url: '#', completed: false, platform: 'SAP Learning' },
          { type: 'course', name: 'TMS Advanced', url: '#', completed: false, platform: 'Internal' }
        ],
        achievements: ['Automação de 30% dos processos', 'Dashboard SAP'],
        tags: ['sap', 'tms', 'corporate', 'erp', 'advanced']
      },
      {
        id: 'mile-007',
        title: 'Cloud Computing e DevOps',
        subtitle: 'AWS, Docker, Kubernetes e CI/CD',
        period: { start: '2025-01-01', display: 'Jan 2025 - Atual' },
        status: 'in-progress',
        progress: 55,
        category: 'cloud',
        priority: 'high',
        difficulty: 'advanced',
        skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'GitHub Actions', 'Monitoring'],
        description: 'Fundamentos de cloud computing com AWS, containerização e pipelines CI/CD. Inclui infraestrutura como código.',
        projects: ['Cloud Deployment', 'Container Orchestration', 'CI/CD Pipeline', 'Infra as Code'],
        icon: '☁️',
        color: '#ff9900',
        learningHours: 160,
        targetDate: '2026-08-30',
        metrics: { projects: 4, skills: 7, certifications: 1, deployments: 10 },
        featured: false,
        dependencies: ['mile-003', 'mile-004'],
        resources: [
          { type: 'course', name: 'AWS Solutions Architect', url: '#', completed: false, platform: 'A Cloud Guru' },
          { type: 'course', name: 'Docker & Kubernetes', url: '#', completed: false, platform: 'KodeKloud' }
        ],
        achievements: ['Deploy automatizado', 'Cluster EKS'],
        tags: ['cloud', 'aws', 'devops', 'containers', 'advanced']
      },
      {
        id: 'mile-008',
        title: 'Certificação AWS Solutions Architect',
        subtitle: 'Associate Level',
        period: { display: 'Planejado 2026' },
        status: 'planned',
        progress: 10,
        category: 'cloud',
        priority: 'high',
        difficulty: 'advanced',
        skills: ['AWS', 'Architecture', 'Security', 'Cost Optimization', 'High Availability'],
        description: 'Certificação AWS Solutions Architect Associate. Valida conhecimentos em design de arquiteturas escaláveis e seguras.',
        icon: '🎓',
        color: '#ff9900',
        learningHours: 120,
        targetDate: '2026-06-30',
        targetPercent: 100,
        metrics: { certifications: 1, practiceExams: 5 },
        featured: true,
        dependencies: ['mile-007'],
        resources: [
          { type: 'course', name: 'AWS SAA-C03 Course', url: '#', completed: false },
          { type: 'practice', name: 'Practice Exams', url: '#', completed: false }
        ],
        achievements: [],
        tags: ['certification', 'aws', 'cloud', 'advanced']
      },
      {
        id: 'mile-009',
        title: 'Python para Análise de Dados',
        subtitle: 'Pandas, NumPy, Visualização e Machine Learning',
        period: { display: 'Planejado 2026-2027' },
        status: 'planned',
        progress: 15,
        category: 'ai',
        priority: 'medium',
        difficulty: 'intermediate',
        skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'Jupyter'],
        description: 'Análise de dados com Python, incluindo manipulação, visualização e introdução a machine learning.',
        icon: '🐍',
        color: '#8b5cf6',
        learningHours: 140,
        targetDate: '2027-03-31',
        metrics: { projects: 2, skills: 7, certifications: 1, datasets: 10 },
        featured: false,
        dependencies: ['mile-001'],
        resources: [
          { type: 'course', name: 'Python for Data Science', url: '#', completed: false, platform: 'DataCamp' }
        ],
        achievements: [],
        tags: ['python', 'data-science', 'analytics', 'intermediate']
      },
      {
        id: 'mile-010',
        title: 'Engenharia de Software - Conclusão',
        subtitle: 'Bacharelado - Universidade Mackenzie',
        period: { display: 'Planejado 2028' },
        status: 'planned',
        progress: 35,
        category: 'education',
        priority: 'high',
        difficulty: 'advanced',
        skills: ['Arquitetura de Software', 'Gestão de Projetos', 'Qualidade', 'Pesquisa', 'Metodologias Ágeis'],
        description: 'Conclusão do bacharelado em Engenharia de Software com desenvolvimento de TCC e projeto integrador.',
        icon: '🎓',
        color: '#8b5cf6',
        learningHours: 1200,
        targetDate: '2028-12-31',
        targetPercent: 100,
        metrics: { projects: 1, certifications: 0, semesters: 8 },
        featured: true,
        dependencies: ['mile-001', 'mile-002', 'mile-003', 'mile-004', 'mile-007'],
        resources: [],
        achievements: ['Bolsista', 'Monitor de Algoritmos'],
        tags: ['education', 'degree', 'advanced']
      },
      {
        id: 'mile-011',
        title: 'Mobile Development',
        subtitle: 'React Native e Flutter',
        period: { display: 'Planejado 2027' },
        status: 'planned',
        progress: 0,
        category: 'mobile',
        priority: 'medium',
        difficulty: 'intermediate',
        skills: ['React Native', 'Flutter', 'Dart', 'Mobile UI/UX', 'App Store', 'Google Play'],
        description: 'Desenvolvimento de aplicativos mobile multiplataforma com React Native e Flutter.',
        icon: '📱',
        color: '#ec4899',
        learningHours: 150,
        targetDate: '2027-12-31',
        metrics: { projects: 2, skills: 6, certifications: 1 },
        featured: false,
        dependencies: ['mile-002'],
        resources: [],
        achievements: [],
        tags: ['mobile', 'react-native', 'flutter', 'intermediate']
      },
      {
        id: 'mile-012',
        title: 'Segurança da Informação',
        subtitle: 'OWASP, Pentest e DevSecOps',
        period: { display: 'Planejado 2027' },
        status: 'planned',
        progress: 0,
        category: 'security',
        priority: 'low',
        difficulty: 'advanced',
        skills: ['OWASP', 'Pentest', 'Security Auditing', 'DevSecOps', 'Cryptography'],
        description: 'Fundamentos de segurança da informação, incluindo OWASP Top 10, testes de penetração e práticas DevSecOps.',
        icon: '🔒',
        color: '#ef4444',
        learningHours: 100,
        targetDate: '2027-06-30',
        metrics: { projects: 1, skills: 5, certifications: 1 },
        featured: false,
        dependencies: ['mile-003', 'mile-007'],
        resources: [],
        achievements: [],
        tags: ['security', 'devsecops', 'advanced']
      }
    ];
  }
  
  loadMilestones() {
    this.state.milestones = this.getMilestonesData();
    this.state.filteredMilestones = [...this.state.milestones];
  }
  
  calculateStats() {
    const milestones = this.state.filteredMilestones;
    const total = milestones.length;
    const completed = milestones.filter(m => m.status === 'completed').length;
    const inProgress = milestones.filter(m => m.status === 'in-progress').length;
    const planned = milestones.filter(m => m.status === 'planned').length;
    const blocked = milestones.filter(m => m.status === 'blocked').length;
    
    const totalProgress = milestones.reduce((sum, m) => sum + (m.progress || 0), 0);
    const overallProgress = total > 0 ? Math.round(totalProgress / total) : 0;
    
    const totalHours = milestones.reduce((sum, m) => sum + (m.learningHours || 0), 0);
    const completedHours = milestones.filter(m => m.status === 'completed')
      .reduce((sum, m) => sum + (m.learningHours || 0), 0);
    const remainingHours = totalHours - completedHours;
    
    // Estatísticas por categoria
    const categoryStats = {};
    this.categories.forEach(cat => {
      const catMilestones = milestones.filter(m => m.category === cat.id);
      if (catMilestones.length > 0) {
        categoryStats[cat.id] = {
          name: cat.name,
          color: cat.color,
          icon: cat.icon,
          total: catMilestones.length,
          completed: catMilestones.filter(m => m.status === 'completed').length,
          inProgress: catMilestones.filter(m => m.status === 'in-progress').length,
          planned: catMilestones.filter(m => m.status === 'planned').length,
          avgProgress: Math.round(catMilestones.reduce((sum, m) => sum + m.progress, 0) / catMilestones.length),
          totalHours: catMilestones.reduce((sum, m) => sum + m.learningHours, 0)
        };
      }
    });
    
    // Estatísticas por dificuldade
    const difficultyStats = {
      beginner: milestones.filter(m => m.difficulty === 'beginner').length,
      intermediate: milestones.filter(m => m.difficulty === 'intermediate').length,
      advanced: milestones.filter(m => m.difficulty === 'advanced').length
    };
    
    // Próximo milestone (prioridade + progresso)
    const nextMilestone = milestones
      .filter(m => m.status !== 'completed' && m.status !== 'blocked')
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        if (priorityDiff !== 0) return priorityDiff;
        return (b.progress || 0) - (a.progress || 0);
      })[0];
    
    // Timeline estimada
    const estimatedCompletionMonths = milestones
      .filter(m => m.status !== 'completed')
      .reduce((sum, m) => {
        const remaining = 100 - (m.progress || 0);
        return sum + Math.ceil(remaining / 5);
      }, 0);
    
    this.state.stats = {
      total, completed, inProgress, planned, blocked,
      overallProgress, totalHours, completedHours, remainingHours,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      categoryStats,
      difficultyStats,
      nextMilestone,
      estimatedCompletionMonths,
      estimatedCompletionDate: this.addMonths(new Date(), estimatedCompletionMonths),
      totalProjects: milestones.reduce((sum, m) => sum + (m.metrics?.projects || 0), 0),
      totalSkills: milestones.reduce((sum, m) => sum + (m.metrics?.skills || 0), 0),
      totalCertifications: milestones.reduce((sum, m) => sum + (m.metrics?.certifications || 0), 0),
      featuredCount: milestones.filter(m => m.featured).length
    };
    
    this.emit('statsUpdated', this.state.stats);
  }
  
  addMonths(date, months) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  }
  
  render() {
    if (this.config.enableFilters) this.renderFilters();
    this.renderTimeline();
    if (this.config.enableProgress) this.renderProgress();
  }
  
  renderFilters() {
    const container = document.getElementById(this.config.filtersContainerId);
    if (!container) return;
    
    const categories = this.categories.filter(cat => 
      this.state.milestones.some(m => m.category === cat.id)
    );
    
    container.innerHTML = `
      <div class="roadmap-filters-wrapper">
        <div class="filter-group">
          <button class="filter-btn ${this.state.activeFilter === 'all' ? 'active' : ''}" data-filter="all">
            Todos (${this.state.stats.total})
          </button>
          <button class="filter-btn ${this.state.activeFilter === 'completed' ? 'active' : ''}" data-filter="completed">
            ✅ Concluídos (${this.state.stats.completed})
          </button>
          <button class="filter-btn ${this.state.activeFilter === 'in-progress' ? 'active' : ''}" data-filter="in-progress">
            🔄 Em Andamento (${this.state.stats.inProgress})
          </button>
          <button class="filter-btn ${this.state.activeFilter === 'planned' ? 'active' : ''}" data-filter="planned">
            📅 Planejados (${this.state.stats.planned})
          </button>
          <button class="filter-btn ${this.state.activeFilter === 'featured' ? 'active' : ''}" data-filter="featured">
            ⭐ Destaques (${this.state.stats.featuredCount})
          </button>
        </div>
        
        <div class="filter-group">
          <select id="categoryFilter" class="filter-select">
            <option value="all" ${this.state.activeCategory === 'all' ? 'selected' : ''}>Todas categorias</option>
            ${categories.map(cat => `
              <option value="${cat.id}" ${this.state.activeCategory === cat.id ? 'selected' : ''}>
                ${cat.icon} ${cat.name}
              </option>
            `).join('')}
          </select>
        </div>
        
        <div class="filter-group">
          <select id="sortBy" class="filter-select">
            <option value="date" ${this.state.sortBy === 'date' ? 'selected' : ''}>📅 Data</option>
            <option value="progress" ${this.state.sortBy === 'progress' ? 'selected' : ''}>📊 Progresso</option>
            <option value="priority" ${this.state.sortBy === 'priority' ? 'selected' : ''}>🎯 Prioridade</option>
            <option value="name" ${this.state.sortBy === 'name' ? 'selected' : ''}>📝 Nome</option>
            <option value="hours" ${this.state.sortBy === 'hours' ? 'selected' : ''}>⏰ Horas</option>
          </select>
        </div>
        
        <div class="view-toggle">
          <button class="view-btn ${this.state.viewMode === 'timeline' ? 'active' : ''}" data-view="timeline">
            <i class="fas fa-stream"></i>
          </button>
          <button class="view-btn ${this.state.viewMode === 'grid' ? 'active' : ''}" data-view="grid">
            <i class="fas fa-th"></i>
          </button>
          <button class="view-btn ${this.state.viewMode === 'kanban' ? 'active' : ''}" data-view="kanban">
            <i class="fas fa-columns"></i>
          </button>
        </div>
        
        ${this.config.enableExport ? `
          <div class="export-actions">
            <button class="btn-export" data-action="export-json">
              <i class="fas fa-download"></i> JSON
            </button>
            <button class="btn-export" data-action="export-csv">
              <i class="fas fa-file-csv"></i> CSV
            </button>
          </div>
        ` : ''}
      </div>
      
      <div class="active-filters-info">
        ${this.state.activeFilter !== 'all' ? `<span class="filter-tag">Status: ${this.state.activeFilter} <button data-clear="filter">&times;</button></span>` : ''}
        ${this.state.activeCategory !== 'all' ? `<span class="filter-tag">Categoria: ${this.getCategoryName(this.state.activeCategory)} <button data-clear="category">&times;</button></span>` : ''}
        ${(this.state.activeFilter !== 'all' || this.state.activeCategory !== 'all') ? 
          `<button class="clear-all-filters" data-clear="all">Limpar todos</button>` : ''}
      </div>
    `;
  }
  
  renderTimeline() {
    const container = document.getElementById(this.config.containerId);
    if (!container) return;
    
    const milestones = this.state.filteredMilestones;
    
    if (milestones.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🗺️</div>
          <h3>Nenhum milestone encontrado</h3>
          <p>Ajuste os filtros para ver os milestones.</p>
        </div>
      `;
      return;
    }
    
    if (this.state.viewMode === 'grid') {
      container.className = 'roadmap-grid-view';
      container.innerHTML = milestones.map(m => this.renderGridItem(m)).join('');
    } else if (this.state.viewMode === 'kanban') {
      container.className = 'roadmap-kanban-view';
      container.innerHTML = this.renderKanbanView(milestones);
    } else {
      container.className = 'roadmap-timeline';
      container.innerHTML = milestones.map(m => this.renderTimelineItem(m)).join('');
    }
  }
  
  renderTimelineItem(m) {
    const priorityBadge = m.priority === 'high' ? '🔴 Alta' : m.priority === 'medium' ? '🟡 Média' : '🟢 Baixa';
    const difficultyBadge = m.difficulty === 'beginner' ? '🟢 Iniciante' : m.difficulty === 'intermediate' ? '🟡 Intermediário' : '🔴 Avançado';
    const selectedClass = this.state.selectedMilestones.has(m.id) ? 'selected' : '';
    
    return `
      <div class="timeline-item ${m.status} ${m.featured ? 'featured' : ''} ${selectedClass}" 
           data-id="${m.id}" 
           draggable="${this.config.enableDragDrop}">
        <div class="timeline-marker ${m.status} ${m.featured ? 'featured' : ''}">
          ${m.featured ? '⭐' : ''}
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <span class="timeline-month"><i class="far fa-calendar-alt"></i> ${m.period.display}</span>
            <span class="timeline-badge ${m.priority}-priority">${priorityBadge}</span>
            <span class="timeline-badge difficulty">${difficultyBadge}</span>
            ${this.state.selectedMilestones.has(m.id) ? '<span class="selected-indicator">✓ Selecionado</span>' : ''}
          </div>
          
          <h4>
            <span class="timeline-icon">${m.icon}</span>
            ${m.title}
            ${m.subtitle ? `<small>${m.subtitle}</small>` : ''}
          </h4>
          
          <p>${m.description}</p>
          
          ${m.dependencies && m.dependencies.length > 0 ? `
            <div class="timeline-dependencies">
              <i class="fas fa-link"></i> Dependências: 
              ${m.dependencies.map(depId => {
                const dep = this.state.milestones.find(m => m.id === depId);
                return dep ? `<span class="dep-badge ${dep.status}">${dep.icon} ${dep.title}</span>` : '';
              }).join('')}
            </div>
          ` : ''}
          
          <div class="timeline-metrics">
            ${m.metrics.projects ? `<div class="timeline-metric"><span class="timeline-metric-label">Projetos</span><span class="timeline-metric-value">${m.metrics.projects}</span></div>` : ''}
            ${m.metrics.skills ? `<div class="timeline-metric"><span class="timeline-metric-label">Skills</span><span class="timeline-metric-value">${m.metrics.skills}</span></div>` : ''}
            ${m.metrics.certifications ? `<div class="timeline-metric"><span class="timeline-metric-label">Certificações</span><span class="timeline-metric-value">${m.metrics.certifications}</span></div>` : ''}
            <div class="timeline-metric"><span class="timeline-metric-label">Horas</span><span class="timeline-metric-value highlight">${m.learningHours}h</span></div>
          </div>
          
          <div class="timeline-tech">
            ${m.skills.slice(0, 5).map(s => `<span class="tech-badge">${s}</span>`).join('')}
            ${m.skills.length > 5 ? `<span class="tech-badge more">+${m.skills.length - 5}</span>` : ''}
          </div>
          
          ${m.projects ? `
            <div class="timeline-projects">
              <div class="timeline-projects-header">
                <i class="fas fa-folder-open"></i> Projetos (${m.projects.length})
              </div>
              <div class="timeline-projects-list">
                ${m.projects.map(p => `<span class="timeline-project-tag">${p}</span>`).join('')}
              </div>
            </div>
          ` : ''}
          
          ${m.achievements && m.achievements.length > 0 ? `
            <div class="timeline-achievements">
              <div class="achievements-header"><i class="fas fa-trophy"></i> Conquistas</div>
              <div class="achievements-list">
                ${m.achievements.map(a => `<span class="achievement-badge">🏆 ${a}</span>`).join('')}
              </div>
            </div>
          ` : ''}
          
          <div class="timeline-progress-section">
            <div class="timeline-progress-header">
              <span>Progresso</span>
              <span>${m.progress}%</span>
            </div>
            <div class="timeline-progress-bar">
              <div class="timeline-progress-fill" style="width: ${m.progress}%"></div>
            </div>
          </div>
          
          ${m.targetDate ? `
            <div class="timeline-target ${this.isOverdue(m.targetDate) ? 'overdue' : ''}">
              <i class="fas fa-bullseye"></i>
              <span>Meta: ${m.targetPercent || 100}% até ${this.formatDate(m.targetDate)}</span>
              <span class="days-remaining">${this.getDaysRemaining(m.targetDate)}</span>
            </div>
          ` : ''}
          
          <div class="timeline-actions">
            <input type="checkbox" class="milestone-checkbox" data-id="${m.id}" ${this.state.selectedMilestones.has(m.id) ? 'checked' : ''}>
            <button class="timeline-action-btn" data-action="update-progress" data-id="${m.id}">
              <i class="fas fa-chart-line"></i> Atualizar
            </button>
            <button class="timeline-action-btn" data-action="view-details" data-id="${m.id}">
              <i class="fas fa-eye"></i> Detalhes
            </button>
            ${m.status !== 'completed' ? `
              <button class="timeline-action-btn primary" data-action="start" data-id="${m.id}">
                <i class="fas fa-play"></i> ${m.status === 'planned' ? 'Iniciar' : 'Continuar'}
              </button>
            ` : ''}
            ${m.resources && m.resources.length > 0 ? `
              <button class="timeline-action-btn" data-action="view-resources" data-id="${m.id}">
                <i class="fas fa-book"></i> Recursos
              </button>
            ` : ''}
          </div>
          
          ${m.tags && m.tags.length > 0 ? `
            <div class="timeline-tags">
              ${m.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
  
  renderGridItem(m) {
    return `
      <div class="roadmap-grid-item ${m.status} ${m.featured ? 'featured' : ''}" data-id="${m.id}">
        <div class="grid-item-header">
          <span class="grid-item-icon">${m.icon}</span>
          <div class="grid-item-status">
            <span class="status-badge ${m.status}">${this.getStatusLabel(m.status)}</span>
            ${m.featured ? '<span class="featured-badge">⭐</span>' : ''}
          </div>
        </div>
        <h4>${m.title}</h4>
        <p class="grid-item-subtitle">${m.subtitle || ''}</p>
        <div class="grid-item-progress">
          <div class="progress-bar small">
            <div class="progress-fill" style="width: ${m.progress}%"></div>
          </div>
          <span>${m.progress}%</span>
        </div>
        <div class="grid-item-meta">
          <span><i class="far fa-clock"></i> ${m.learningHours}h</span>
          <span><i class="fas fa-code"></i> ${m.skills.length} skills</span>
        </div>
        <div class="grid-item-actions">
          <button data-action="view-details" data-id="${m.id}">Ver detalhes</button>
        </div>
      </div>
    `;
  }
  
  renderKanbanView(milestones) {
    const columns = {
      planned: { title: '📅 Planejado', items: [] },
      'in-progress': { title: '🔄 Em Andamento', items: [] },
      completed: { title: '✅ Concluído', items: [] },
      blocked: { title: '🚫 Bloqueado', items: [] }
    };
    
    milestones.forEach(m => {
      if (columns[m.status]) {
        columns[m.status].items.push(m);
      }
    });
    
    return `
      <div class="kanban-container">
        ${Object.entries(columns).map(([status, col]) => `
          <div class="kanban-column" data-status="${status}">
            <div class="kanban-column-header">
              <h3>${col.title}</h3>
              <span class="kanban-count">${col.items.length}</span>
            </div>
            <div class="kanban-items">
              ${col.items.map(m => `
                <div class="kanban-item ${m.featured ? 'featured' : ''}" data-id="${m.id}" draggable="true">
                  <div class="kanban-item-icon">${m.icon}</div>
                  <div class="kanban-item-content">
                    <strong>${m.title}</strong>
                    <small>${m.learningHours}h • ${m.progress}%</small>
                    <div class="kanban-item-progress">
                      <div class="progress-bar tiny">
                        <div class="progress-fill" style="width: ${m.progress}%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  renderProgress() {
    const container = document.getElementById(this.config.progressContainerId);
    if (!container) return;
    
    const s = this.state.stats;
    
    container.innerHTML = `
      <div class="roadmap-overall-progress">
        <div class="progress-stats-grid">
          <div class="progress-stat-card total">
            <div class="stat-icon">📊</div>
            <div class="stat-value">${s.total}</div>
            <div class="stat-label">Total</div>
          </div>
          <div class="progress-stat-card completed">
            <div class="stat-icon">✅</div>
            <div class="stat-value">${s.completed}</div>
            <div class="stat-label">Concluídos</div>
          </div>
          <div class="progress-stat-card in-progress">
            <div class="stat-icon">🔄</div>
            <div class="stat-value">${s.inProgress}</div>
            <div class="stat-label">Em Andamento</div>
          </div>
          <div class="progress-stat-card planned">
            <div class="stat-icon">📅</div>
            <div class="stat-value">${s.planned}</div>
            <div class="stat-label">Planejados</div>
          </div>
          <div class="progress-stat-card hours">
            <div class="stat-icon">⏰</div>
            <div class="stat-value">${s.totalHours}</div>
            <div class="stat-label">Horas Totais</div>
          </div>
          <div class="progress-stat-card projects">
            <div class="stat-icon">📁</div>
            <div class="stat-value">${s.totalProjects}</div>
            <div class="stat-label">Projetos</div>
          </div>
        </div>
        
        <div class="progress-header">
          <h3><i class="fas fa-chart-pie"></i> Progresso Geral da Carreira</h3>
          <span class="progress-percentage">${s.overallProgress}%</span>
        </div>
        
        <div class="progress-bar large">
          <div class="progress-fill" style="width: ${s.overallProgress}%"></div>
        </div>
        
        <div class="progress-info">
          <span><i class="fas fa-check-circle"></i> ${s.completedHours}h concluídas</span>
          <span><i class="fas fa-hourglass-half"></i> ${s.remainingHours}h restantes</span>
          <span><i class="fas fa-chart-line"></i> ${s.completionRate}% concluído</span>
        </div>
        
        <div class="category-progress-section">
          <h4><i class="fas fa-tags"></i> Progresso por Categoria</h4>
          <div class="category-progress-list">
            ${Object.entries(s.categoryStats).map(([id, cat]) => `
              <div class="category-progress-item">
                <div class="category-info">
                  <span>${cat.icon}</span>
                  <span>${cat.name}</span>
                  <span class="category-stats">${cat.completed}/${cat.total}</span>
                </div>
                <div class="category-progress-bar">
                  <div class="progress-fill" style="width: ${(cat.completed / cat.total) * 100}%; background: ${cat.color}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="difficulty-stats">
          <h4><i class="fas fa-signal"></i> Por Dificuldade</h4>
          <div class="difficulty-bars">
            <div class="difficulty-bar beginner">
              <span>🟢 Iniciante</span>
              <div class="bar"><div class="fill" style="width: ${(s.difficultyStats.beginner / s.total) * 100}%"></div></div>
              <span>${s.difficultyStats.beginner}</span>
            </div>
            <div class="difficulty-bar intermediate">
              <span>🟡 Intermediário</span>
              <div class="bar"><div class="fill" style="width: ${(s.difficultyStats.intermediate / s.total) * 100}%"></div></div>
              <span>${s.difficultyStats.intermediate}</span>
            </div>
            <div class="difficulty-bar advanced">
              <span>🔴 Avançado</span>
              <div class="bar"><div class="fill" style="width: ${(s.difficultyStats.advanced / s.total) * 100}%"></div></div>
              <span>${s.difficultyStats.advanced}</span>
            </div>
          </div>
        </div>
        
        ${s.nextMilestone ? `
          <div class="next-milestone-card">
            <div class="next-milestone-header">
              <i class="fas fa-forward"></i>
              <h4>Próximo Marco Recomendado</h4>
            </div>
            <div class="next-milestone-content">
              <span class="milestone-icon">${s.nextMilestone.icon}</span>
              <div class="milestone-info">
                <strong>${s.nextMilestone.title}</strong>
                <p>${s.nextMilestone.description.substring(0, 100)}...</p>
                <div class="milestone-meta">
                  <span>Prioridade: ${s.nextMilestone.priority}</span>
                  <span>Progresso: ${s.nextMilestone.progress}%</span>
                </div>
              </div>
              <button class="btn btn-primary" data-action="start" data-id="${s.nextMilestone.id}">
                ${s.nextMilestone.status === 'planned' ? 'Iniciar' : 'Continuar'}
              </button>
            </div>
          </div>
        ` : ''}
        
        <div class="progress-estimate">
          <i class="fas fa-calendar-alt"></i>
          <span>Conclusão estimada: <strong>${this.formatDate(s.estimatedCompletionDate)}</strong> (${s.estimatedCompletionMonths} meses)</span>
        </div>
      </div>
    `;
  }
  
  applyFilters() {
    let filtered = [...this.state.milestones];
    
    // Filtro por status
    if (this.state.activeFilter === 'featured') {
      filtered = filtered.filter(m => m.featured);
    } else if (this.state.activeFilter !== 'all') {
      filtered = filtered.filter(m => m.status === this.state.activeFilter);
    }
    
    // Filtro por categoria
    if (this.state.activeCategory !== 'all') {
      filtered = filtered.filter(m => m.category === this.state.activeCategory);
    }
    
    // Ordenação
    filtered.sort((a, b) => {
      switch (this.state.sortBy) {
        case 'progress':
          return (b.progress || 0) - (a.progress || 0);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        case 'name':
          return a.title.localeCompare(b.title);
        case 'hours':
          return (b.learningHours || 0) - (a.learningHours || 0);
        case 'date':
        default:
          const dateA = a.period?.start || a.targetDate || '';
          const dateB = b.period?.start || b.targetDate || '';
          return dateB.localeCompare(dateA);
      }
    });
    
    this.state.filteredMilestones = filtered;
    this.calculateStats();
    this.render();
  }
  
  filterMilestones(filter) {
    this.state.activeFilter = filter;
    this.applyFilters();
  }
  
  filterByCategory(category) {
    this.state.activeCategory = category;
    this.applyFilters();
  }
  
  sortMilestones(sortBy) {
    this.state.sortBy = sortBy;
    this.applyFilters();
  }
  
  setViewMode(mode) {
    this.state.viewMode = mode;
    this.renderTimeline();
  }
  
  updateProgress(id, newProgress) {
    const milestone = this.state.milestones.find(m => m.id === id);
    if (milestone) {
      milestone.progress = Math.min(100, Math.max(0, newProgress));
      
      if (milestone.progress >= 100) {
        milestone.status = 'completed';
        milestone.completedAt = new Date().toISOString();
      } else if (milestone.progress > 0 && milestone.status === 'planned') {
        milestone.status = 'in-progress';
        milestone.startedAt = milestone.startedAt || new Date().toISOString();
      }
      
      milestone.updatedAt = new Date().toISOString();
      
      this.applyFilters();
      this.saveState();
      this.showToast(`✅ "${milestone.title}" atualizado para ${milestone.progress}%`, 'success');
      this.emit('progressUpdated', { id, progress: milestone.progress, status: milestone.status });
    }
  }
  
  startMilestone(id) {
    const milestone = this.state.milestones.find(m => m.id === id);
    if (milestone && milestone.status !== 'completed') {
      milestone.status = 'in-progress';
      milestone.startedAt = milestone.startedAt || new Date().toISOString();
      if (milestone.progress === 0) milestone.progress = 5;
      
      this.applyFilters();
      this.saveState();
      this.showToast(`🚀 "${milestone.title}" iniciado! Bons estudos!`, 'success');
      this.emit('milestoneStarted', { id });
    }
  }
  
  toggleMilestoneSelection(id) {
    if (this.state.selectedMilestones.has(id)) {
      this.state.selectedMilestones.delete(id);
    } else {
      this.state.selectedMilestones.add(id);
    }
    this.renderTimeline();
  }
  
  exportData(format = 'json') {
    const data = {
      exportedAt: new Date().toISOString(),
      stats: this.state.stats,
      milestones: this.state.milestones,
      version: '4.0.0'
    };
    
    let content, mimeType, filename;
    
    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      mimeType = 'application/json';
      filename = `roadmap-${new Date().toISOString().split('T')[0]}.json`;
    } else if (format === 'csv') {
      const headers = ['ID', 'Título', 'Status', 'Progresso', 'Categoria', 'Horas', 'Prioridade', 'Dificuldade'];
      const rows = this.state.milestones.map(m => [
        m.id, m.title, m.status, `${m.progress}%`, m.category, m.learningHours, m.priority, m.difficulty
      ]);
      content = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
      mimeType = 'text/csv';
      filename = `roadmap-${new Date().toISOString().split('T')[0]}.csv`;
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showToast(`📤 Dados exportados como ${format.toUpperCase()}`, 'success');
  }
  
  showMilestoneDetails(id) {
    const m = this.state.milestones.find(m => m.id === id);
    if (!m) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal milestone-modal';
    modal.innerHTML = `
      <div class="modal-content modal-large">
        <div class="modal-header" style="border-left-color: ${m.color}">
          <h3>${m.icon} ${m.title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          ${m.subtitle ? `<p class="milestone-subtitle">${m.subtitle}</p>` : ''}
          <p class="milestone-description">${m.description}</p>
          
          <div class="milestone-detail-grid">
            <div class="detail-item"><strong>Período:</strong> ${m.period.display}</div>
            <div class="detail-item"><strong>Status:</strong> ${this.getStatusLabel(m.status)}</div>
            <div class="detail-item"><strong>Progresso:</strong> ${m.progress}%</div>
            <div class="detail-item"><strong>Horas:</strong> ${m.learningHours}h</div>
            <div class="detail-item"><strong>Prioridade:</strong> ${m.priority}</div>
            <div class="detail-item"><strong>Dificuldade:</strong> ${m.difficulty}</div>
            <div class="detail-item"><strong>Categoria:</strong> ${this.getCategoryName(m.category)}</div>
            ${m.startedAt ? `<div class="detail-item"><strong>Iniciado:</strong> ${this.formatDateTime(m.startedAt)}</div>` : ''}
            ${m.completedAt ? `<div class="detail-item"><strong>Concluído:</strong> ${this.formatDateTime(m.completedAt)}</div>` : ''}
          </div>
          
          ${m.dependencies && m.dependencies.length > 0 ? `
            <div class="detail-section">
              <h4><i class="fas fa-link"></i> Dependências</h4>
              <div class="dependencies-list">
                ${m.dependencies.map(depId => {
                  const dep = this.state.milestones.find(m => m.id === depId);
                  return dep ? `
                    <div class="dependency-item ${dep.status}">
                      <span>${dep.icon}</span>
                      <span>${dep.title}</span>
                      <span class="dep-status">${this.getStatusLabel(dep.status)}</span>
                    </div>
                  ` : '';
                }).join('')}
              </div>
            </div>
          ` : ''}
          
          <div class="detail-section">
            <h4><i class="fas fa-code"></i> Skills (${m.skills.length})</h4>
            <div class="skills-cloud">
              ${m.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
            </div>
          </div>
          
          ${m.projects && m.projects.length > 0 ? `
            <div class="detail-section">
              <h4><i class="fas fa-folder-open"></i> Projetos</h4>
              <ul class="projects-detail-list">
                ${m.projects.map(project => `<li><i class="fas fa-code-branch"></i> ${project}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${m.achievements && m.achievements.length > 0 ? `
            <div class="detail-section">
              <h4><i class="fas fa-trophy"></i> Conquistas</h4>
              <ul class="achievements-list">
                ${m.achievements.map(a => `<li>🏆 ${a}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${m.resources && m.resources.length > 0 ? `
            <div class="detail-section">
              <h4><i class="fas fa-book"></i> Recursos de Aprendizado</h4>
              <div class="resources-list">
                ${m.resources.map(r => `
                  <div class="resource-item ${r.completed ? 'completed' : ''}">
                    <span class="resource-type">${this.getResourceIcon(r.type)}</span>
                    <div class="resource-info">
                      <strong>${r.name}</strong>
                      <small>${r.platform || ''}</small>
                    </div>
                    ${r.completed ? '<span class="completed-badge">✓</span>' : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <div class="milestone-progress-control">
            <label>Atualizar Progresso:</label>
            <div class="progress-slider-container">
              <input type="range" min="0" max="100" value="${m.progress}" id="milestoneSlider" class="progress-slider">
              <span id="progressValue" class="progress-value-display">${m.progress}%</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" data-action="save-progress" data-id="${m.id}">
            <i class="fas fa-save"></i> Salvar Progresso
          </button>
          ${m.status !== 'completed' ? `
            <button class="btn btn-success" data-action="start-from-modal" data-id="${m.id}">
              <i class="fas fa-play"></i> ${m.status === 'planned' ? 'Iniciar' : 'Continuar'}
            </button>
          ` : ''}
          <button class="btn btn-outline modal-close">Fechar</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const slider = modal.querySelector('#milestoneSlider');
    const progressValue = modal.querySelector('#progressValue');
    slider.addEventListener('input', e => progressValue.textContent = `${e.target.value}%`);
    
    modal.querySelector('[data-action="save-progress"]').addEventListener('click', () => {
      this.updateProgress(id, parseInt(slider.value));
      modal.remove();
    });
    
    modal.querySelector('[data-action="start-from-modal"]')?.addEventListener('click', () => {
      this.startMilestone(id);
      modal.remove();
    });
    
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', () => modal.remove()));
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  }
  
  attachEventListeners() {
    document.addEventListener('click', e => {
      // Filtros
      if (e.target.matches('[data-filter]')) {
        this.filterMilestones(e.target.dataset.filter);
      }
      
      if (e.target.matches('[data-view]')) {
        this.setViewMode(e.target.dataset.view);
      }
      
      if (e.target.matches('[data-clear]')) {
        const type = e.target.dataset.clear;
        if (type === 'filter') this.filterMilestones('all');
        if (type === 'category') this.filterByCategory('all');
        if (type === 'all') {
          this.filterMilestones('all');
          this.filterByCategory('all');
        }
      }
      
      // Ações
      const action = e.target.closest('[data-action]')?.dataset.action;
      const id = e.target.closest('[data-action]')?.dataset.id;
      
      if (action === 'update-progress' || action === 'view-details') {
        this.showMilestoneDetails(id);
      }
      if (action === 'start') {
        this.startMilestone(id);
      }
      if (action === 'export-json') {
        this.exportData('json');
      }
      if (action === 'export-csv') {
        this.exportData('csv');
      }
      
      // Checkbox de seleção
      if (e.target.matches('.milestone-checkbox')) {
        this.toggleMilestoneSelection(e.target.dataset.id);
      }
    });
    
    document.addEventListener('change', e => {
      if (e.target.id === 'categoryFilter') {
        this.filterByCategory(e.target.value);
      }
      if (e.target.id === 'sortBy') {
        this.sortMilestones(e.target.value);
      }
    });
    
    // Drag & Drop
    if (this.config.enableDragDrop) {
      this.setupDragDrop();
    }
  }
  
  setupDragDrop() {
    document.addEventListener('dragstart', e => {
      const item = e.target.closest('[draggable="true"]');
      if (item) {
        e.dataTransfer.setData('text/plain', item.dataset.id);
        item.classList.add('dragging');
      }
    });
    
    document.addEventListener('dragend', e => {
      const item = e.target.closest('[draggable="true"]');
      if (item) {
        item.classList.remove('dragging');
      }
    });
    
    document.addEventListener('dragover', e => {
      e.preventDefault();
      const column = e.target.closest('[data-status]');
      if (column) {
        column.classList.add('drag-over');
      }
    });
    
    document.addEventListener('dragleave', e => {
      const column = e.target.closest('[data-status]');
      if (column) {
        column.classList.remove('drag-over');
      }
    });
    
    document.addEventListener('drop', e => {
      e.preventDefault();
      const column = e.target.closest('[data-status]');
      if (column) {
        column.classList.remove('drag-over');
        const id = e.dataTransfer.getData('text/plain');
        const newStatus = column.dataset.status;
        const milestone = this.state.milestones.find(m => m.id === id);
        
        if (milestone && milestone.status !== newStatus) {
          milestone.status = newStatus;
          if (newStatus === 'completed') {
            milestone.progress = 100;
            milestone.completedAt = new Date().toISOString();
          }
          this.applyFilters();
          this.saveState();
          this.showToast(`"${milestone.title}" movido para ${this.getStatusLabel(newStatus)}`, 'info');
        }
      }
    });
  }
  
  saveState() {
    if (!this.config.autoSave) return;
    const state = {
      milestones: this.state.milestones.map(m => ({
        id: m.id,
        progress: m.progress,
        status: m.status,
        startedAt: m.startedAt,
        completedAt: m.completedAt,
        updatedAt: m.updatedAt
      })),
      lastSaved: new Date().toISOString()
    };
    localStorage.setItem('roadmap_state_ultra', JSON.stringify(state));
  }
  
  loadSavedState() {
    try {
      const saved = localStorage.getItem('roadmap_state_ultra');
      if (saved) {
        const { milestones } = JSON.parse(saved);
        milestones.forEach(savedItem => {
          const existing = this.state.milestones.find(m => m.id === savedItem.id);
          if (existing) {
            existing.progress = savedItem.progress ?? existing.progress;
            existing.status = savedItem.status ?? existing.status;
            existing.startedAt = savedItem.startedAt ?? existing.startedAt;
            existing.completedAt = savedItem.completedAt ?? existing.completedAt;
            existing.updatedAt = savedItem.updatedAt ?? existing.updatedAt;
          }
        });
        this.applyFilters();
      }
    } catch (e) {
      console.warn('Erro ao carregar estado:', e);
    }
  }
  
  // Utilitários
  formatDate(date) {
    if (!date) return '';
    if (typeof date === 'string') return new Date(date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short' });
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short' });
  }
  
  formatDateTime(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  
  getStatusLabel(status) {
    const labels = {
      completed: 'Concluído',
      'in-progress': 'Em Andamento',
      planned: 'Planejado',
      blocked: 'Bloqueado',
      paused: 'Pausado'
    };
    return labels[status] || status;
  }
  
  getCategoryName(categoryId) {
    const cat = this.categories.find(c => c.id === categoryId);
    return cat ? cat.name : categoryId;
  }
  
  getResourceIcon(type) {
    const icons = { course: '📚', book: '📖', video: '🎥', article: '📄', practice: '💻', training: '🎓' };
    return icons[type] || '📌';
  }
  
  isOverdue(targetDate) {
    return new Date(targetDate) < new Date();
  }
  
  getDaysRemaining(targetDate) {
    const diff = new Date(targetDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return `${Math.abs(days)} dias atrasado`;
    if (days === 0) return 'Hoje';
    return `${days} dias restantes`;
  }
  
  showToast(message, type = 'info') {
    if (typeof window.showToast === 'function') {
      window.showToast(message, type);
    } else {
      console.log(`[${type}] ${message}`);
    }
  }
  
  // API Pública
  on(event, callback) { 
    if (!this.events.has(event)) this.events.set(event, []); 
    this.events.get(event).push(callback); 
    return this;
  }
  
  emit(event, data) { 
    if (this.events.has(event)) {
      this.events.get(event).forEach(cb => cb(data)); 
    }
    return this;
  }
  
  refresh() {
    this.applyFilters();
    return this;
  }
  
  getStats() {
    return { ...this.state.stats };
  }
  
  getMilestone(id) {
    return this.state.milestones.find(m => m.id === id);
  }
  
  addMilestone(milestone) {
    const newMilestone = {
      ...milestone,
      id: milestone.id || `mile-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.state.milestones.push(newMilestone);
    this.applyFilters();
    this.saveState();
    this.emit('milestoneAdded', newMilestone);
    return newMilestone;
  }
  
  deleteMilestone(id) {
    const index = this.state.milestones.findIndex(m => m.id === id);
    if (index !== -1) {
      const deleted = this.state.milestones.splice(index, 1)[0];
      this.applyFilters();
      this.saveState();
      this.emit('milestoneDeleted', deleted);
      return true;
    }
    return false;
  }
}

// Inicialização global
let roadmapInstance = null;

function initRoadmap(config = {}) {
  if (!roadmapInstance) {
    roadmapInstance = new CareerRoadmap({
      containerId: 'roadmapContainer',
      progressContainerId: 'roadmapProgress',
      filtersContainerId: 'roadmapFilters',
      enableAnimations: true,
      enableDragDrop: true,
      enableExport: true,
      autoSave: true,
      ...config
    });
    window.roadmap = roadmapInstance;
  }
  return roadmapInstance;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initRoadmap());
} else {
  setTimeout(() => initRoadmap(), 100);
}

window.CareerRoadmap = CareerRoadmap;
window.initRoadmap = initRoadmap;