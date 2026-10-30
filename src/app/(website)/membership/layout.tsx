import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title:
    "Free Arya Vysya Membership Registration | Telangana Arya Vysya Mahasabha",

  description:
    "Register online for Arya Vysya community membership with Telangana State Arya Vysya Mahasabha. Access community services, membership benefits and association information in Hyderabad and across Telangana.",

  path: "/membership",

  keywords: [
    "Free Arya Vysya Membership Registration",
    "Arya Vysya Membership",
    "Telangana Arya Vysya Mahasabha Membership",
    "Telangana State Arya Vysya Mahasabha",
    "Arya Vysya Community Registration",
    "Arya Vysya Association Hyderabad",
    "Arya Vysya Member Registration",
    "Arya Vysya Community Services",
  ],
});

export default function MembershipLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
