import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Arya Vysya Employment Welfare",
  description:
    "Find employment welfare resources and community information from Telangana State Arya Vysya Mahasabha.",
  path: "/welfare/employment",
  keywords: ["Arya Vysya employment welfare"],
});

export default function EmploymentWelfareLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
