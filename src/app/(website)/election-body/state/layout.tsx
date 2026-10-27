import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Arya Vysya State Executive Body",
  description:
    "View state-level executive body information for Telangana State Arya Vysya Mahasabha.",
  path: "/election-body/state",
});

export default function StateBodyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
