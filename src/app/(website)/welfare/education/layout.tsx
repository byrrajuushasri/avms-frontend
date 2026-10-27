import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Arya Vysya Education Welfare",
  description:
    "Explore education welfare information and community support from Telangana State Arya Vysya Mahasabha.",
  path: "/welfare/education",
  keywords: ["Arya Vysya education welfare"],
});

export default function EducationWelfareLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
