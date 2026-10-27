import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: `Arya Vysya Matrimonial Profile ${id}`,
    description:
      "View an Arya Vysya matrimonial profile and member details.",
    path: `/profile/${encodeURIComponent(id)}`,
    noIndex: true,
  });
}

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
