import Hero from "@/components/Hero";
import InfiniteScrollSection from "@/components/InfiniteScrollSection";
import AboutMe from "@/components/AboutMe";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <InfiniteScrollSection />
      <AboutMe />
      <Services />
    </>
  );
}
