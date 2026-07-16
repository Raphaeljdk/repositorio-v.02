import { NextResponse } from "next/server";

// ── Simple in-memory rate limiting ──────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // max 3 submissions per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    // Create fresh window
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

// ── Validation helpers ─────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface ValidationError {
  field: string;
  message: string;
}

function validatePayload(
  body: Record<string, unknown>
): { valid: true; data: { name: string; email: string; subject: string; message: string } } | { valid: false; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message : "";

  if (!name || name.length < 2) {
    errors.push({ field: "name", message: "Nome é obrigatório (mín. 2 caracteres)." });
  } else if (name.length > 80) {
    errors.push({ field: "name", message: "Nome muito longo (máx. 80 caracteres)." });
  }

  if (!email) {
    errors.push({ field: "email", message: "E-mail é obrigatório." });
  } else if (!isValidEmail(email)) {
    errors.push({ field: "email", message: "Formato de e-mail inválido." });
  }

  if (!subject || subject.length < 2) {
    errors.push({ field: "subject", message: "Assunto é obrigatório (mín. 2 caracteres)." });
  } else if (subject.length > 120) {
    errors.push({ field: "subject", message: "Assunto muito longo (máx. 120 caracteres)." });
  }

  if (!message || message.length < 10) {
    errors.push({ field: "message", message: "Mensagem é obrigatória (mín. 10 caracteres)." });
  } else if (message.length > 2000) {
    errors.push({ field: "message", message: "Mensagem muito longa (máx. 2000 caracteres)." });
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, data: { name, email, subject, message } };
}

// ── POST handler ───────────────────────────────────────────────────
export async function POST(req: Request) {
  // Rate limiting by IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Muitas solicitações. Tente novamente em 1 minuto." },
      { status: 429 }
    );
  }

  try {
    const body: Record<string, unknown> = await req.json();

    // Honeypot check (company field must be empty)
    if (typeof body.company === "string" && body.company.length > 0) {
      // Silently succeed — bot trap
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Validate payload
    const result = validatePayload(body);
    if (!result.valid) {
      return NextResponse.json(
        { ok: false, message: "Dados inválidos.", errors: result.errors },
        { status: 400 }
      );
    }

    // In a real app we'd persist to DB or send an email here.
    console.log("[contact] new message:", {
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject,
      length: result.data.message.length,
      at: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Mensagem recebida! Em breve responderei no e-mail informado.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json(
      { ok: false, message: "Erro interno. Tente novamente em instantes." },
      { status: 500 }
    );
  }
}

// ── GET handler (info endpoint) ────────────────────────────────────
export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/contact",
    method: "POST",
    fields: ["name", "email", "subject", "message"],
  });
}