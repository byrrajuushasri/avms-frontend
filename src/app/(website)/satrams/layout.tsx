import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Arya Vysya Community Satrams",
  description:
    "Explore satram information and community resources from Telangana State Arya Vysya Mahasabha.",
  path: "/satrams",
  keywords: ["Arya Vysya satrams Telangana"],
});

export default function SatramsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
