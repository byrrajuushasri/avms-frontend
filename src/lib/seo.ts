import type { Metadata } from "next";

export const SITE_KEYWORDS = [
  "Arya Vysya Matrimony",
  "Free Arya Vysya Matrimony",
  "Telangana Arya Vysya Mahasabha",
  "Arya Vysya Marriage Bureau",
  "Arya Vysya Brides and Grooms",
  "Arya Vysya Matrimonial Registration",
  "Free Matrimony Registration",
  "Arya Vysya Community Hyderabad",
  "Telangana Arya Vysya Community",
  "Arya Vysya Membership Registration",
  "Arya Vysya Marriage Services",
  "Arya Vysya Free Matrimony Website",
];

export const getSiteUrl = () =>
  new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.aaryavysyamahasabha.com"
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
  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    keywords: [...SITE_KEYWORDS, ...keywords],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: canonicalUrl,
      siteName: "Telangana State Arya Vysya Mahasabha",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}