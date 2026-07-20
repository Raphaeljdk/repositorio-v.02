import { AnimatedBackground } from "@/components/portfolio/animated-background";
import { NoiseOverlay } from "@/components/portfolio/noise-overlay";
import { CustomCursor } from "@/components/portfolio/custom-cursor";
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
import { EditorialTicker } from "@/components/portfolio/editorial-ticker";
import { Footer } from "@/components/portfolio/footer";
import { ScrollIndicator } from "@/components/portfolio/scroll-indicator";
import { KeyboardShortcuts } from "@/components/portfolio/keyboard-shortcuts";
import { Services } from "@/components/sections/services";
import { StatsMarquee, StatsCounter } from "@/components/sections/stats-marquee";
import { Process } from "@/components/sections/process";
import { TechNews } from "@/components/sections/tech-news";
import { FloatingParticles } from "@/components/portfolio/particles";
import { ScrollProgress } from "@/components/portfolio/scroll-progress";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollProgress />
      <AnimatedBackground />
      <FloatingParticles />
      <NoiseOverlay />
      <CustomCursor />
      <Navbar />
      <ScrollIndicator />
      <KeyboardShortcuts />

      <main className="relative flex-1">
        <Hero />
        <EditorialTicker />
        <StatsMarquee />
        <About />
        <Services />
        <Process />
        <StatsCounter />
        <div className="section-divider my-0" />
        <Skills />
        <Projects />
        <TechNews />
        <div className="section-divider my-0" />
        <GitHubActivity />
        <div className="section-divider my-0" />
        <Experience />
        <div className="section-divider my-0" />
        <Certifications />
        <div className="section-divider my-0" />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}