import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title:
    "Contact Telangana State Arya Vysya Mahasabha | Hyderabad",

  description:
    "Contact Telangana State Arya Vysya Mahasabha in Hyderabad for Arya Vysya community membership, free matrimonial registration, association information and community services.",

  path: "/contact",

  keywords: [
    "Contact Telangana State Arya Vysya Mahasabha",
    "Arya Vysya Mahasabha Contact Hyderabad",
    "Arya Vysya Community Hyderabad Contact",
    "Arya Vysya Association Hyderabad",
    "Arya Vysya Matrimony Contact",
    "Arya Vysya Membership Enquiry",
    "Telangana Arya Vysya Mahasabha Address",
  ],
});

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
