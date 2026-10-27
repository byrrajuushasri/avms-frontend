import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Arya Vysya Community News",
  description:
    "Read news and updates from Telangana State Arya Vysya Mahasabha and the Arya Vysya community.",
  path: "/media/news",
  keywords: ["Telangana Arya Vysya community news"],
});

export default function NewsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
