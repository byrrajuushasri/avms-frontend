import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Arya Vysya Matrimony Success Stories",
  description:
    "Read community success stories and matrimonial journeys from Arya Vysya families.",
  path: "/success-stories",
  keywords: ["Arya Vysya marriage success stories"],
});

export default function SuccessStoriesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
