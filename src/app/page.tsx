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
import { SakuraPetalDrift, SumiBrushDivider } from "@/components/portfolio/signature";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
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
        <Process />
        <SumiBrushDivider className="my-0" />
        <Skills />
        <Projects />
        <TechNews />
        <SumiBrushDivider className="my-0" />
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
    </div>
  );
}
