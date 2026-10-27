import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Telangana State Arya Vysya Mahasabha",
  description:
    "Learn about Telangana State Arya Vysya Mahasabha, its Hyderabad community services, membership and matrimonial initiatives.",
  path: "/about",
  keywords: ["Arya Vysya Mahasabha Hyderabad", "Arya Vysya community Telangana"],
});

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
