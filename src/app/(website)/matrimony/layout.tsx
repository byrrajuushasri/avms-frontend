import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Free Arya Vysya Marriage & Matrimony Service",
  description:
    "Explore the Arya Vysya marriage and matrimony service from Telangana State Arya Vysya Mahasabha. Register your matrimonial profile for free.",
  path: "/matrimony",
  keywords: ["Arya Vysya marriage profiles", "Arya Vysya matrimony Telangana"],
});

export default function MatrimonyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
