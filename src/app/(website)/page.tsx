import Hero from "@/components/Hero";
import FeaturedProfiles from "@/components/FeaturedProfiles";
import MatrimonySection from "@/components/MatrimonySection";
import SuccessStories from "@/components/SuccessStories";
import FAQ from "@/components/FAQ";


export default function Home() {
  return (
    <>
     
      <Hero />
      
       <FeaturedProfiles />
      <MatrimonySection />
      <SuccessStories />
      <FAQ />
     
    </>
  );
}