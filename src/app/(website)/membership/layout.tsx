import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Free Arya Vysya Membership Registration",
  description:
    "Register for Arya Vysya community membership and access Telangana State Arya Vysya Mahasabha services in Hyderabad.",
  path: "/membership",
  keywords: ["free Arya Vysya membership registration"],
});

export default function MembershipLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
