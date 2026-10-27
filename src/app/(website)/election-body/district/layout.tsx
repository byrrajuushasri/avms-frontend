import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Arya Vysya District Executive Bodies",
  description:
    "Find district-level executive body information for Telangana State Arya Vysya Mahasabha.",
  path: "/election-body/district",
});

export default function DistrictBodyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
