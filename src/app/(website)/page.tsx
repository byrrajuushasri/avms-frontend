import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import FeaturedProfiles from "@/components/FeaturedProfiles";
import StatsSection from "@/components/StatsSection";
import SuccessStories from "@/components/SuccessStories";
import FAQ from "@/components/FAQ";


export default function Home() {
  return (
    <>
     
      <Hero />
      <SearchSection />
       <FeaturedProfiles />
      <StatsSection />
      <SuccessStories />
      <FAQ />
     
    </>
  );
}