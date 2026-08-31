import type { Metadata } from "next";
import { Inter, Noto_Serif_JP, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/portfolio/theme-provider";
import { CustomCursor } from "@/components/portfolio/custom-cursor";

/* SHOGUN DIGITAL typography system */
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raphaeljdk.github.io"),
  title: "Raphael Freitas · Full Stack Developer & Engenheiro de Software",
  description:
    "Portfólio de Raphael Freitas — Desenvolvedor Full Stack com praticidade em arquitetura de sistemas, modelagem de sistemas e engenharia de software. React, Next.js, TypeScript, Node.js.",
  keywords: [
    "Raphael Freitas",
    "Desenvolvedor Full Stack",
    "Engenharia de Software",
    "Arquitetura de Sistemas",
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
      "Portfólio de Raphael Freitas — Full Stack Developer com praticidade em arquitetura de sistemas, modelagem de sistemas e engenharia de software. São Paulo, Brasil.",
    url: "https://raphaeljdk.github.io",
    siteName: "Raphael Freitas",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1344,
        height: 768,
        alt: "Raphael Freitas · Full Stack Developer & Engenheiro de Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raphael Freitas · Full Stack Developer",
    description:
      "Portfólio de Raphael Freitas — Full Stack Developer com praticidade em arquitetura de sistemas, modelagem de sistemas e engenharia de software.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/raphael-logo.png",
    apple: "/raphael-logo.png",
    shortcut: "/raphael-logo.png",
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
        className={`${inter.variable} ${notoSerifJP.variable} ${jetbrains.variable} antialiased font-sans bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
