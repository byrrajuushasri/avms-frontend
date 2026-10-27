import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Arya Vysya Temple Events",
  description:
    "View temple events and community celebrations shared by Telangana State Arya Vysya Mahasabha.",
  path: "/temples/events",
  keywords: ["Arya Vysya temple events"],
});

export default function TempleEventsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
