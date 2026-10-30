import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title:
    "About Telangana State Arya Vysya Mahasabha | Hyderabad",

  description:
    "Learn about Telangana State Arya Vysya Mahasabha, its history, community development activities, membership services, free Arya Vysya matrimony initiatives and community programs in Hyderabad and Telangana.",

  path: "/about",

  keywords: [
    "Telangana State Arya Vysya Mahasabha",
    "Arya Vysya Mahasabha Hyderabad",
    "Arya Vysya Community Telangana",
    "Telangana Arya Vysya Association",
    "Arya Vysya Community Services",
    "Arya Vysya Community Development",
    "Arya Vysya Free Matrimony",
    "Arya Vysya Membership Services",
  ],
});

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
