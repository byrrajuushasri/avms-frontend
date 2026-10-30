import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title:
    "Arya Vysya Matrimonial Registration | Free Online Registration",

  description:
    "Register your matrimonial profile with Telangana State Arya Vysya Mahasabha. Submit your details for the free Arya Vysya matrimonial service. Membership verification is required.",

  path: "/register",

  keywords: [
    "Arya Vysya Matrimonial Registration",
    "Free Arya Vysya Matrimony Registration",
    "Register Arya Vysya Matrimonial Profile",
    "Telangana Arya Vysya Matrimony",
    "Arya Vysya Marriage Registration",
    "Arya Vysya Brides and Grooms Registration",
    "Telangana State Arya Vysya Mahasabha",
  ],

  noIndex: true,
});

export default function RegisterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
