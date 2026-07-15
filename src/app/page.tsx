import { AnimatedBackground } from "@/components/portfolio/animated-background";
import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Services } from "@/components/sections/services";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AnimatedBackground />
      <Navbar />

      <main className="relative flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
