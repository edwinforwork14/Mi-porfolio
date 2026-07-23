import Hero from "@/components/Hero";
import InfiniteScrollSection from "@/components/InfiniteScrollSection";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <InfiniteScrollSection />
      <AboutMe />
      <Experience />
      <Services />
      <Projects />
      <ContactSection />
      <Footer />
    </>
  );
}
