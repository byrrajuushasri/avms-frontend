import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Arya Vysya Mahasabha",
  description:
    "Contact Telangana State Arya Vysya Mahasabha in Hyderabad for community services.",
  path: "/contact",
  noIndex: true,
});

export default function LegacyContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
