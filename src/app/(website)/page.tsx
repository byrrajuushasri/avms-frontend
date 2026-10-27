
import Link from "next/link";

import Hero from "@/components/Hero";
import FeaturedProfiles from "@/components/FeaturedProfiles";
import MatrimonySection from "@/components/MatrimonySection";
import SuccessStories from "@/components/SuccessStories";
import FAQ from "@/components/FAQ";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Free Arya Vysya Matrimony & Membership in Telangana",
  description:
    "Join Telangana State Arya Vysya Mahasabha for free Arya Vysya matrimonial registration, membership and community services in Hyderabad.",
  path: "/",
  keywords: [
    "Telangana Arya Vysya Mahasabha matrimonial services",
    "free Arya Vysya bride and groom profiles",
  ],
});

export default function Home() {
  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}
      <Hero />
 
       
      

      
    </>
  );
}
