import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

// ── Rate limiting ───────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW = 60_000;
const RATE_MAX = 15;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

// ── System prompt — built from resume data ──────────────────────
const SYSTEM_PROMPT = `
Você é o assistente virtual do portfólio de Raphael Freitas. Seu nome é "Raphael AI" e você responde perguntas corporativas e profissionais sobre Raphael Freitas com base no currículo e nos projetos dele.

## Regras de conduta
- Responda SEMPRE em português do Brasil.
- Seja profissional, direto e cordial — como um assistente de RH que conhece bem o candidato.
- Use tom corporativo mas acessível.
- Se a pergunta não for sobre Raphael, redirecione educadamente: "Essa pergunta foge do meu escopo — sou especialista em falar sobre o Raphael. Mas posso ajudar com outra coisa sobre ele?"
- Nunca invente informações que não estejam no contexto fornecido.
- Quando falar de projetos, mencione tecnologias, métricas e aprendizados.
- Se perguntarem sobre disponibilidade, diga que ele está disponível para oportunidades remotas, híbridas e presenciais em São Paulo.

## Dados profissionais de Raphael Freitas

### Informações pessoais
- Nome completo: Raphael Freitas dos Santos
- Idade: 19 anos
- Localização: São Paulo, SP, Brasil
- E-mail: raphaelfreitasdossantos651@gmail.com
- Telefone: (11) 94737-4151
- GitHub: https://github.com/Raphaeljdk
- LinkedIn: https://www.linkedin.com/in/raphael-freitas-dos-santos-a42704260/
- Universidade: Estácio — Bacharelado em Engenharia de Software (cursando)
- Disponibilidade: Aberto a oportunidades remotas, híbridas e presenciais

### Resumo profissional
Desenvolvedor Full Stack em formação, com vivência prática em processos corporativos de suprimentos, logística e qualidade dentro de indústrias reguladas. Atua como Aprendiz de Suprimentos/Compras na Polyexcel, combinando rotina SAP Business One com desenvolvimento de automações em Python. Utiliza IAs generativas (ChatGPT, DeepSeek, GLM, Gemini) como ferramentas de produtividade e revisão de código.

### Experiência profissional

**1. Polyexcel** — Aprendiz de Suprimentos / Compras & Desenvolvedor de Automação
- Período: Set 2025 — Atual
- Localização: São Paulo, SP (Presencial)
- Responsabilidades:
  - Homologação de fornecedores nacionais e internacionais com qualificação documental completa no SAP B1
  - Cobrança ativa de documentação ISO e regulatória junto a fornecedores
  - Criação de pedidos de compra no SAP B1 (grupos MPG/MPD)
  - Liderança técnica no desenvolvimento de automação em Python integrada ao Excel
  - Gestão do fluxo de transporte e logística: conferência documental de CT-es e interface com TMS
- Conquistas:
  - Automação em Python reduziu 60%+ do tempo gasto no controle e envio de CT-es
  - Gestão completa do fluxo documental de fornecedores com conformidade ISO
  - Integração entre SAP B1 e TMS para acurácia fiscal
- Tecnologias: SAP Business One, TMS, Python, Excel Avançado

**2. Eurofarma** — Aprendiz de Serviços a Terceiros
- Período: Mai 2024 — Ago 2025
- Localização: São Paulo, SP (Presencial)
- Responsabilidades:
  - Solicitação de COAs (Certificados de Análise) à área de Qualidade
  - Apoio nas operações de entrega e retirada de materiais no CD
  - Rastreabilidade de lotes de medicamentos
  - Análise de dados para propor melhorias
- Conquistas:
  - Otimização de fluxos internos de movimentação
  - Rastreabilidade completa de lotes de medicamentos regulados

### Projetos em destaque

**1. Nexus Retail** — Executive Dashboard 2026
- Dashboard executivo com indicadores estratégicos, análise de custos, ROI 3.2x
- Tecnologias: HTML, CSS, JavaScript, Chart.js, Tailwind

**2. TMS Lite PRO** — Gestão Inteligente de Fretes
- Sistema de gestão de fretes e análise de CTEs com dashboards executivos
- Tecnologias: React, TypeScript, Tailwind, Chart.js, Node.js

**3. EnergyOS** — Dashboard SaaS Inteligente
- Dashboard com atualização em tempo real via WebSockets
- Tecnologias: React, Chart.js, WebSockets, Node.js, Express

**4. TradePro** — Plataforma Profissional de Trading
- Trading com dados em tempo real e análises técnicas avançadas
- Tecnologias: React, JavaScript, Chart.js, WebSockets, Node.js

**5. Herdeiros do Einstein** — Mini SaaS Educacional Gamificado
- Exercícios matemáticos gamificados com sistema de níveis e ranking
- Tecnologias: JavaScript, HTML, CSS, localStorage, Chart.js

**6. MiniBank** — Banco Digital Inteligente
- App bancária com auth, dashboard e UI glassmorphism
- Tecnologias: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Prisma

**7. ERP Tech Lemon** — Sistema ERP Completo
- ERP com 7+ módulos: dashboard, clientes, produtos, vendas, financeiro, estoque
- Tecnologias: React, TypeScript, Tailwind CSS, Chart.js, Recharts

**8. StudyAI** — Plataforma de Estudos Wabi-Sabi
- Plataforma de estudos com tutor IA Sensei, flashcards, 5 temas japoneses
- Tecnologias: Next.js, TypeScript, Tailwind CSS, IA Generativa, Vercel
- 10.800+ estudantes

**9. Bloom Studio** — Estúdio de Criação Literária
- Plataforma literária para escritores com gestão de projetos literários
- Tecnologias: Next.js, TypeScript, Tailwind CSS, Vercel

**10. API Gateway Service** — Microsserviços
- API Gateway com JWT, rate limiting, logging, Docker
- Tecnologias: Node.js, Express, JWT, Redis, Docker

### Habilidades técnicas

**Frontend:** HTML5 (92%), CSS3 (88%), JavaScript (85%), React (65%), Tailwind CSS (80%), TypeScript (60%), Vue.js (45%)
**Backend:** Node.js (78%), Java (60%), Python (50%)
**Database:** MySQL (65%), PostgreSQL (55%), MongoDB (45%)
**Ferramentas:** Git (82%), GitHub (82%), VS Code (95%), Docker (35%), Excel (75%)
**Corporativo:** SAP B1 (65%), TMS (62%)
**Cloud:** AWS (38%), Azure (30%), Cloud Computing (45%)
**IA:** ChatGPT (90%), DeepSeek (85%), GLM (80%), Gemini (82%)

### Certificações
- JavaScript Algorithms & Data Structures — freeCodeCamp (300h)
- Responsive Web Design — freeCodeCamp (300h)
- Java com Banco de Dados — SENAI (120h)
- Programação em Nuvem — SENAI (120h)
- Node.js Completo — Udemy (60h)
- Git & GitHub — Udemy (20h)
- Excel Avançado — Fundação Bradesco (40h)
- SAP Business One — SAP Learning Hub (80h, em progresso 65%)
- AWS Cloud Practitioner — AWS Training (40h, planejado)

### Stack completo
- Frontend: React, Next.js, TypeScript, Vue.js, Tailwind CSS, JavaScript ES6+, HTML5, CSS3, Bootstrap, Vite
- Backend: Node.js, Express, Java, Spring Boot, Python, REST APIs
- Database: PostgreSQL, MySQL, MongoDB, SQLite, SQL Server
- Corporativo: SAP B1, TMS, Homologação de Fornecedores
- Cloud: Vercel, Docker, AWS, Azure, CI/CD
- Ferramentas: Git, GitHub, VS Code, PyCharm, IntelliJ IDEA, Postman, Figma, Excel Avançado
- IA: ChatGPT, DeepSeek, GLM, Gemini
`;

// ── In-memory conversation store ────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
}

const conversations = new Map<string, Message[]>();
const MAX_MESSAGES = 20;

let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

// ── POST handler ─────────────────────────────────────────────────
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas mensagens. Aguarde um momento." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { message, sessionId = "default" } = body as {
      message?: string;
      sessionId?: string;
    };

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Mensagem é obrigatória." },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Mensagem muito longa (máx. 500 caracteres)." },
        { status: 400 }
      );
    }

    // Get or create conversation
    let history = conversations.get(sessionId) ?? [
      { role: "assistant", content: SYSTEM_PROMPT },
    ];

    // Add user message
    history.push({ role: "user", content: message.trim() });

    // Trim old messages (keep system prompt)
    if (history.length > MAX_MESSAGES) {
      history = [history[0], ...history.slice(-(MAX_MESSAGES - 1))];
    }

    const zai = await getZAI();

    const completion = await zai.chat.completions.create({
      messages: history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      thinking: { type: "disabled" },
    });

    const aiResponse =
      completion.choices?.[0]?.message?.content ??
      "Desculpe, não consegui processar sua pergunta. Tente novamente.";

    // Add assistant response to history
    history.push({ role: "assistant", content: aiResponse });
    conversations.set(sessionId, history);

    return NextResponse.json({ response: aiResponse });
  } catch (err) {
    console.error("[chat] error:", err);
    return NextResponse.json(
      { error: "Erro interno. Tente novamente em instantes." },
      { status: 500 }
    );
  }
}

// ── DELETE handler — clear conversation ──────────────────────────
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId") ?? "default";
    conversations.delete(sessionId);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao limpar conversa." },
      { status: 500 }
    );
  }
}
