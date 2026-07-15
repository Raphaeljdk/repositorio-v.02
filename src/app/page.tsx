import { AnimatedBackground } from "@/components/portfolio/animated-background";
import { NoiseOverlay } from "@/components/portfolio/noise-overlay";
import { CustomCursor } from "@/components/portfolio/custom-cursor";
import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/sections/hero";
import { ScrollToTop } from "@/components/portfolio/scroll-to-top";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Testimonials } from "@/components/sections/testimonials";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { EditorialTicker } from "@/components/portfolio/editorial-ticker";
import { Footer } from "@/components/portfolio/footer";
import { ScrollIndicator } from "@/components/portfolio/scroll-indicator";
import { KeyboardShortcuts } from "@/components/portfolio/keyboard-shortcuts";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AnimatedBackground />
      <NoiseOverlay />
      <CustomCursor />
      <Navbar />
      <ScrollIndicator />
      <KeyboardShortcuts />

      <main className="relative flex-1">
        <Hero />
        <EditorialTicker />
        <div className="section-divider my-0" />
        <About />
        <Services />
        <Skills />
        <Projects />
        <div className="section-divider my-0" />
        <Experience />
        <div className="section-divider my-0" />
        <Testimonials />
        <Certifications />
        <div className="section-divider my-0" />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}