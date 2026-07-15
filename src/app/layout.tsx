import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/portfolio/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Raphael Freitas · Full Stack Developer & SAP Specialist",
  description:
    "Portfólio de Raphael Freitas — Desenvolvedor Full Stack. SAP ABAP, TMS, React, Node, TypeScript e soluções corporativas que escalam.",
  keywords: [
    "Raphael Freitas",
    "Desenvolvedor Full Stack",
    "SAP ABAP",
    "TMS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Portfólio",
    "Engenharia de Software",
  ],
  authors: [{ name: "Raphael Freitas" }],
  creator: "Raphael Freitas",
  openGraph: {
    title: "Raphael Freitas · Full Stack Developer",
    description:
      "Construindo experiências digitais que escalam.",
    url: "https://raphaeljdk.github.io",
    siteName: "Raphael Freitas Portfolio",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raphael Freitas · Full Stack Developer",
    description:
      "Construindo experiências digitais que escalam — SAP, TMS, React, Node e cloud nativo.",
  },
  icons: {
    icon: "/avatar.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} ${jetbrains.variable} antialiased font-sans bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
