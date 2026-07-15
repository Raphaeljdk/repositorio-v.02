import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(80, "Nome muito longo"),
  email: z.string().email("E-mail inválido"),
  subject: z.string().min(2, "Assunto obrigatório").max(120),
  message: z.string().min(10, "Mensagem muito curta").max(2000, "Mensagem muito longa"),
  /** honeypot — must be empty */
  company: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    // Honeypot field filled → silently reject (bot)
    if (parsed.data.company) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // In a real app we'd persist or send an email here.
    console.log("[contact] new message:", {
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      length: parsed.data.message.length,
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

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/contact",
    method: "POST",
    fields: ["name", "email", "subject", "message"],
  });
}
