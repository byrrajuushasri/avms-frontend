import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Free Arya Vysya Matrimonial Registration",
  description:
    "Register your Arya Vysya matrimonial profile with Telangana State Arya Vysya Mahasabha. Membership verification is required.",
  path: "/register",
  keywords: ["register Arya Vysya matrimonial profile"],
  noIndex: true,
});

export default function RegisterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
