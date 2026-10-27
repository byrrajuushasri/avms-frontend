import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Arya Vysya Temples and Community Information",
  description:
    "Find temple information and community resources from Telangana State Arya Vysya Mahasabha.",
  path: "/temples",
  keywords: ["Arya Vysya temples Telangana"],
});

export default function TemplesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
