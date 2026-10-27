import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Arya Vysya Mandal Executive Bodies",
  description:
    "Find mandal-level executive body information for Telangana State Arya Vysya Mahasabha.",
  path: "/election-body/mandal",
});

export default function MandalBodyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
