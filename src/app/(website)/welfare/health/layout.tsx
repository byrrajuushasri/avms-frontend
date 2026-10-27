import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Arya Vysya Health Welfare",
  description:
    "Explore health welfare information and community support from Telangana State Arya Vysya Mahasabha.",
  path: "/welfare/health",
  keywords: ["Arya Vysya health welfare"],
});

export default function HealthWelfareLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
