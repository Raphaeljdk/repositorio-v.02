import { AnimatedBackground } from "@/components/portfolio/animated-background";
import { NoiseOverlay } from "@/components/portfolio/noise-overlay";
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
import { Process } from "@/components/sections/process";
import { TechNews } from "@/components/sections/tech-news";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AnimatedBackground />
      <NoiseOverlay />
      <Navbar />

      <main className="relative flex-1">
        <Hero />
        <About />
        <Services />
        <Process />
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
