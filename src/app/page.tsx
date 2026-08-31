import { AnimatedBackground } from "@/components/portfolio/animated-background";
import { NoiseOverlay } from "@/components/portfolio/noise-overlay";
import { ScrollProgress } from "@/components/portfolio/scroll-progress";
import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/sections/hero";
import { ScrollToTop } from "@/components/portfolio/scroll-to-top";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Experience } from "@/components/sections/experience";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/portfolio/footer";
import { Services } from "@/components/sections/services";
import { SakuraPetalDrift, SumiBrushDivider } from "@/components/portfolio/signature";
import { AIChatWidget } from "@/components/portfolio/ai-chat";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollProgress />
      <AnimatedBackground />
      <NoiseOverlay />
      {/* Signature: a single sakura petal drifts across rarely.
          Ties to the cherry blossom in the personal logo. */}
      <SakuraPetalDrift />
      <Navbar />

      <main className="relative flex-1">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <GitHubActivity />
        <SumiBrushDivider className="my-0" />
        <Experience />
        <SumiBrushDivider className="my-0" />
        <Certifications />
        <SumiBrushDivider className="my-0" />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
      <AIChatWidget />
    </div>
  );
}
