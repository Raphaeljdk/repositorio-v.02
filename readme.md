🚀 Portfólio Gamificado - Raphael Freitas
<div align="center"> <img src="https://img.shields.io/badge/STATUS-EM_DESENVOLVIMENTO-yellow?style=for-the-badge" /> <img src="https://img.shields.io/badge/VERSÃO-2.0.0-blue?style=for-the-badge" /> <img src="https://img.shields.io/badge/LICENÇA-MIT-green?style=for-the-badge" /> </div>
<div align="center"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white" /> <img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" /> <img src="https://img.shields.io/badge/Gamificação-FF6B6B?style=for-the-badge&logo=playstation&logoColor=white" /> </div>
📋 ÍNDICE
Visão Geral

Gamificação

Roadmap de Evolução

Funcionalidades

Arquitetura de Dados

Sistema de Progresso

Tecnologias

Estrutura de Arquivos

Como Executar

Personalização

Modo Recrutador

Evolução Futura

Capturas de Tela

Autor

🎯 VISÃO GERAL
Este projeto é um portfólio interativo gamificado que representa minha evolução técnica como desenvolvedor, utilizando conceitos de gamificação, roadmap de aprendizado, projetos desbloqueáveis e persistência de progresso.

Objetivos Principais
✅ Demonstrar evolução contínua de skills

✅ Exibir capacidade de planejamento técnico

✅ Mostrar organização de dados complexos

✅ Proporcionar UX moderna e engajadora

✅ Evidenciar pensamento de produto

🎮 GAMIFICAÇÃO
Sistema de XP
javascript
// Cada ação gera XP
- Skill atualizada: +10 XP
- Projeto concluído: +50 XP  
- Meta mensal atingida: +100 XP
- Level Up automático a cada 500 XP
Níveis e Recompensas
Nível	XP Necessário	Recompensa
Iniciante	0-499	Badge Bronze
Aprendiz	500-999	Badge Prata + Tema especial
Intermediário	1000-1999	Badge Ouro + Desbloqueia projetos
Avançado	2000-3499	Badge Platina + Modo foco
Expert	3500+	Badge Diamante + Perfil verificado
Feedback Visual
Barras de progresso animadas

Efeitos de brilho ao subir de nível

Confetes em conquistas importantes

Sons suaves (opcional)

🗺️ ROADMAP DE EVOLUÇÃO
Fases de Aprendizado
text
NÍVEL 1: FUNDAÇÃO (Mês 1-2)
├── HTML5 Semântico ✅
├── CSS3 Moderno ✅
├── JavaScript ES6+ ✅
└── Projetos: Site institucional, Landing page

NÍVEL 2: FRONTEND (Mês 3-4) 
├── React ⚛️
├── TypeScript 📘
├── Tailwind 🎨
├── Consumo de APIs 🌐
└── Projetos: Dashboard, Todo List, App clima

NÍVEL 3: BACKEND (Mês 5-6) ⏳
├── Node.js
├── Express
├── JWT
├── Postman
└── Projetos: API REST, Auth system

NÍVEL 4: BANCO DE DADOS (Mês 7-8)
├── PostgreSQL
├── MongoDB  
├── Prisma
├── SQL
└── Projetos: CRUD, Blog

NÍVEL 5: JAVA (Mês 9-10)
├── Java 17+
├── Spring Boot
├── JPA/Hibernate
├── Maven
└── Projetos: API Spring, Order system

NÍVEL 6: DEVOPS (Mês 11-12)
├── Docker
├── CI/CD
├── AWS
├── Vercel/Netlify
└── Projetos: Full stack deploy, Pipeline

NÍVEL 7: PROJETO FINAL (Mês 13-14) ⭐
├── Full Stack Completo
├── Arquitetura Escalável
├── Boas Práticas
└── Projeto: E-commerce/SaaS

NÍVEL 8: ESPECIALIZAÇÃO (Mês 15+)
├── Next.js
├── Kubernetes
├── Redis
├── Kafka
├── Testes
└── Projetos: Open Source
✨ FUNCIONALIDADES
🎨 Skills Dinâmicas
✅ Barras animadas baseadas no mês atual

✅ Ícones oficiais via Devicon

✅ Evolução automática mensal

✅ Cálculo de percentual por skill

✅ Tooltips com detalhes do aprendizado

🗺️ Roadmap Mensal
✅ Conteúdos aprendidos por skill

✅ Atualização mês a mês automática

✅ Visualização em timeline

✅ Badges de tecnologias

🎮 Gamificação
✅ Sistema de XP e níveis

✅ Level Up automático

✅ Feedback visual com animações

✅ Badges de conquistas

✅ Barra de progresso do jogador

🔓 Projetos Desbloqueáveis
✅ Projetos liberados conforme progresso médio

✅ Tooltip mostrando pré-requisitos

✅ Recompensa em XP ao "concluir"

✅ Badges de dificuldade (Expert, Avançado)

✅ Links para demos e GitHub

💾 Persistência
✅ Progresso salvo no localStorage

✅ Sincronização entre sessões

✅ Reset opcional do progresso

✅ Exportação de dados

🧑‍💼 Modo Recrutador
✅ Visual limpo e profissional

✅ Foco em resultados finais

✅ Sem elementos de gamificação

✅ Dados consolidados

📊 Dashboard Interativo
✅ Gráfico de evolução (Chart.js)

✅ Estatísticas em tempo real

✅ Média geral das skills

✅ Skills em evolução destaque

🌓 Temas
✅ Dark mode (padrão)

✅ Light mode

✅ Alternância suave

✅ Persistência de preferência

📱 PWA
✅ Instalável como app nativo

✅ Funciona offline

✅ Cache de assets

✅ Ícones para dispositivos

🏗️ ARQUITETURA DE DADOS
Estrutura do data.json
json
{
  "currentMonth": 3,
  "totalXP": 1250,
  "level": 3,
  "skills": [
    {
      "name": "React",
      "icon": "icons/react.svg",
      "basePercent": 70,
      "xp": 150,
      "category": "frontend",
      "monthlyLearning": {
        "1": ["Componentes", "Props", "Estado"],
        "2": ["Hooks", "Efeitos"],
        "3": ["Context API", "Redux"],
        "4": ["Next.js", "SSR"],
        "5": ["Performance", "Otimização"],
        "6": ["Projetos complexos"]
      }
    }
  ]
}
Estrutura do projects.json
json
[
  {
    "id": 1,
    "title": "EnergyOS",
    "description": "Dashboard SaaS",
    "requiredLevel": 3,
    "requiredSkill": 70,
    "xpReward": 100,
    "technologies": ["React", "Node.js"],
    "difficulty": 85,
    "unlocked": true,
    "link": "https://demo.com"
  }
]
📈 SISTEMA DE PROGRESSO
Cálculo de Progresso
javascript
// Progresso médio das skills
const mediaSkills = skills.reduce((acc, s) => acc + s.percent, 0) / skills.length;

// Nível baseado no XP
const level = Math.floor(totalXP / 500) + 1;

// Projetos desbloqueados
const projetosDisponiveis = projetos.filter(p => 
    mediaSkills >= p.requiredSkill && level >= p.requiredLevel
);
Fórmulas
XP por ação: XP = baseXP * multiplicador

Progresso mensal: +5% base por mês

Level up: nível = floor(XP/500) + 1

Desbloqueio: skill.percent >= 70 && level >= 3

🛠️ TECNOLOGIAS
Frontend
Tecnologia	Versão	Uso
HTML5	-	Estrutura semântica
CSS3	-	Design System próprio
JavaScript	ES6+	Lógica e gamificação
Chart.js	4.4.0	Gráficos interativos
DevIcon	-	Ícones profissionais
LocalStorage	-	Persistência de dados
Conceitos
Gamificação

Roadmap de aprendizado

Progressive Web App (PWA)

Design responsivo

UX moderna

Pensamento de produto

📁 ESTRUTURA DE ARQUIVOS
text
PORTFOLIO-GAMIFICADO/
│
├── 📄 index.html          # Estrutura principal
├── 📄 style.css           # Design System
├── 📄 script.js           # Lógica gamificada
├── 📄 manifest.json       # Config PWA
├── 📄 sw.js               # Service Worker
│
├── 📁 data/
│   ├── 📄 data.json       # Skills + progresso
│   └── 📄 projects.json   # Projetos desbloqueáveis
│
├── 📁 icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
│
└── 📄 README.md
🚀 COMO EXECUTAR
Pré-requisitos
Navegador moderno

Servidor local (opcional)

Passo a Passo
Clone o repositório

bash
git clone https://github.com/Raphaeljdk/portfolio-gamificado.git
cd portfolio-gamificado
Inicie o servidor

bash
# Com Python
python -m http.server 8000

# Com Node
npx live-server

# VS Code: Live Server extension
Acesse

text
http://localhost:8000
Teste o PWA

Abra no Chrome

Instale como app

Use offline

🎨 PERSONALIZAÇÃO
Configurar Dados
json
// data.json - Suas skills
{
  "currentMonth": 3,
  "totalXP": 1250,
  "skills": [...]
}
Ajustar Dificuldade
javascript
// script.js - Fatores de progresso
const XP_PER_ACTION = {
  skill_update: 10,
  project_complete: 50,
  monthly_goal: 100
};

const LEVEL_THRESHOLD = 500; // XP por nível
Modificar Tema
css
:root {
  --accent-primary: #3b82f6;  /* Cor principal */
  --accent-secondary: #8b5cf6; /* Cor secundária */
  --level-easy: #10b981;       /* Nível fácil */
  --level-medium: #f59e0b;     /* Nível médio */
  --level-hard: #ef4444;       /* Nível difícil */
}
👔 MODO RECRUTADOR
Ativação
javascript
// Adicione ?recruiter=true na URL
https://seudominio.com?recruiter=true
Diferenças
Elemento	Modo Normal	Modo Recrutador
XP/Level	✅ Mostra	❌ Oculta
Gamificação	✅ Ativa	❌ Desativa
Animações	✅ Completas	✅ Suaves
Projetos	🔒 Bloqueados	🔓 Todos visíveis
Foco	Jornada	Resultados
Visual Limpo
Remove elementos gamificados

Foca em conquistas reais

Mostra projetos completos

Dados consolidados

🚧 EVOLUÇÃO FUTURA
Fase 1 - Backend Real
API REST com Node.js/Java

Banco de dados PostgreSQL

Autenticação JWT

Dashboard admin

Fase 2 - Social
Login de usuário

Compartilhar progresso

Rankings

Conquistas sociais

Fase 3 - IA
Recomendações personalizadas

Roadmap adaptativo

Análise de desempenho

Mentor virtual

Fase 4 - Profissional
Exportar currículo

Gerar certificados

Integração com LinkedIn

Portfólio dinâmico

📸 CAPTURAS DE TELA
🎮 Dashboard Gamificado
text
┌─────────────────────────────────────┐
│  NÍVEL 3 • XP 1.250/2.000           │
│  [████████░░░░░░░░░░] 62%           │
│                                     │
│  🏆 Conquistas: 5                    │
│  📊 Progresso médio: 73%             │
│  🔓 Projetos disponíveis: 4          │
└─────────────────────────────────────┘
🗺️ Roadmap Visual
text
NÍVEL 1: FUNDAÇÃO       [██████████] 100% ✅
NÍVEL 2: FRONTEND       [██████████] 100% ✅
NÍVEL 3: BACKEND        [██████░░░░]  60% ⏳
NÍVEL 4: BANCO DADOS    [░░░░░░░░░░]   0% 
NÍVEL 5: JAVA           [░░░░░░░░░░]   0%
NÍVEL 6: DEVOPS         [░░░░░░░░░░]   0%
NÍVEL 7: PROJETO FINAL  [░░░░░░░░░░]   0% ⭐
🔓 Projetos Desbloqueáveis
text
┌─────────────────────────────────────┐
│  ⚛️ EnergyOS                         │
│  Dashboard SaaS em tempo real        │
│  [🔓 DESBLOQUEADO]                   │
│  ├─ Recompensa: +100 XP              │
│  ├─ Dificuldade: 🔥🔥🔥 85%           │
│  └─ Tecnologias: React, Node.js      │
└─────────────────────────────────────┘
👨‍💻 AUTOR
Raphael Freitas Dos Santos
Desenvolvedor Full Stack | Gamificação | Arquitetura de Software

<div align="center">
https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white
https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white

</div>
Pensamento de Produto
"Este portfólio foi desenvolvido como um produto real, não apenas uma demonstração visual. Cada detalhe foi pensado para mostrar não só o que eu sei, mas como eu penso, planejo e executo soluções completas."

⭐ AGRADECIMENTOS
Se você gostou do conceito de portfólio gamificado, considere dar uma ⭐ no projeto!

<div align="center">
Desenvolvido com ☕, 🎮 e muito código limpo

</div>
📌 VERSÃO 2.0.0 - CHANGELOG
Novidades
✅ Sistema completo de XP e níveis

✅ Projetos desbloqueáveis por progresso

✅ Modo recrutador com URL param

✅ Roadmap visual em 8 níveis

✅ Persistência com localStorage

✅ Badges de conquistas

✅ Animações de level up

✅ Gráfico de evolução interativo

✅ Temas dark/light

✅ PWA instalável

Melhorias
⬆️ Performance otimizada

⬆️ Código modularizado

⬆️ Acessibilidade aprimorada

⬆️ Responsividade total

<div align="center">
🚀 Evolua, desbloqueie, conquiste!

</div>