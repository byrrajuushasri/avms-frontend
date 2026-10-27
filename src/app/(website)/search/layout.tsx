import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Search Arya Vysya Matrimonial Profiles",
  description:
    "Search Arya Vysya matrimonial profiles by preferences after logging in to your approved account.",
  path: "/search",
  noIndex: true,
});

export default function SearchLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
