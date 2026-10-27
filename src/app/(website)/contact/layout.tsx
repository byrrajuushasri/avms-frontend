import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Arya Vysya Mahasabha in Hyderabad",
  description:
    "Contact Telangana State Arya Vysya Mahasabha in Hyderabad for membership, matrimonial registration and community services.",
  path: "/contact",
  keywords: ["Arya Vysya community Hyderabad contact"],
});

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
