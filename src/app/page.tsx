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
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { EditorialTicker } from "@/components/portfolio/editorial-ticker";
import { Footer } from "@/components/portfolio/footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AnimatedBackground />
      <NoiseOverlay />
      <CustomCursor />
      <Navbar />

      <main className="relative flex-1">
        <Hero />
        <EditorialTicker />
        <div className="section-divider my-0" />
        <About />
        <Skills />
        <Projects />
        <div className="section-divider my-0" />
        <Experience />
        <Certifications />
        <div className="section-divider my-0" />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}