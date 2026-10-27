import "./globals.css";
import { getSiteUrl, SITE_KEYWORDS } from "@/lib/seo";

export const metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Arya Vysya Matrimony | Telangana Arya Vysya Mahasabha",
    template: "%s | Arya Vysya Mahasabha",
  },
  description:
    "Free Arya Vysya matrimonial registration, membership and marriage services from Telangana State Arya Vysya Mahasabha in Hyderabad.",
  keywords: SITE_KEYWORDS,
  openGraph: {
    type: "website",
    siteName: "Telangana State Arya Vysya Mahasabha",
    locale: "en_IN",
    title: "Arya Vysya Matrimony | Telangana Arya Vysya Mahasabha",
    description:
      "Free Arya Vysya matrimonial registration, membership and marriage services from Telangana State Arya Vysya Mahasabha in Hyderabad.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}