import type { Metadata } from "next";

export const SITE_KEYWORDS = [
  "Arya Vysya Matrimony free",
  "Telangana Arya Vysya free Mahasabha",
  "Arya Vysya marriage free",
  "Arya Vysya matrimonial registration free",
  "Arya Vysya membership free",
  "Arya Vysya community Hyderabad",
];

export const getSiteUrl = () =>
  new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  );

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  return {
    title,
    description,
    keywords: [...SITE_KEYWORDS, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: "Telangana State Arya Vysya Mahasabha",
      locale: "en_IN",
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
