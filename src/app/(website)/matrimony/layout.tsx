import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title:
    "Telangana Arya Vysya Matrimony | Free Arya Vysya Marriage Bureau Hyderabad",

  description:
    "Telangana State Arya Vysya Mahasabha provides a free Arya Vysya matrimony service for brides and grooms. Explore marriage profiles and register your Arya Vysya matrimonial profile online in Hyderabad and Telangana.",

  path: "/matrimony",

  keywords: [
    "Telangana Arya Vysya Matrimony",
    "Arya Vysya Free Matrimony",
    "Arya Vysya Marriage Bureau Hyderabad",
    "Arya Vysya matrimonial profiles",
    "Arya Vysya marriage profiles",
    "Arya Vysya matrimony Telangana",
    "Arya Vysya Matrimonial Registration",
    "Free Arya Vysya Marriage Service",
    "Telangana State Arya Vysya Mahasabha",
  ],
});

export default function MatrimonyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
