import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Arya Vysya Sangham Executive Bodies",
  description:
    "Find sangham-level executive body information for Telangana State Arya Vysya Mahasabha.",
  path: "/election-body/sangam",
});

export default function SangamBodyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
