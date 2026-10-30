
import Link from "next/link";

import Hero from "@/components/Hero";
 
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title:
    "Telangana Arya Vysya Matrimony | Free Matrimony – Arya Vysya Mahasabha",

  description:
    "Telangana State Arya Vysya Mahasabha offers a free Arya Vysya matrimony platform for brides and grooms. Explore matrimonial profiles, register for free and access community membership services in Hyderabad and Telangana.",

  path: "/",

  keywords: [
    "Telangana Arya Vysya Matrimony",
    "Arya Vysya Free Matrimony",
    "Telangana State Arya Vysya Mahasabha",
    "Arya Vysya Marriage Bureau Hyderabad",
    "Arya Vysya Matrimonial Registration",
    "Arya Vysya Brides and Grooms",
    "Arya Vysya Community Telangana",
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
