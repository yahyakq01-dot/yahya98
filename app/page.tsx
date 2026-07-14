import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WorkedWith from "@/components/sections/WorkedWith";
import Services from "@/components/sections/Services";
import Dashboards from "@/components/sections/Dashboards";
import CodeAnalysis from "@/components/sections/CodeAnalysis";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WorkedWith />
      <Services />
      <Dashboards />
      <CodeAnalysis />
      <Testimonials />
      <Contact />
    </main>
  );
}
