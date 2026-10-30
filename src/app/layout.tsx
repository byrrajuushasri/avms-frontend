
import "./globals.css";
import { getSiteUrl, SITE_KEYWORDS } from "@/lib/seo";

export const metadata = {
  metadataBase: getSiteUrl(),

  title: {
    default:
      "Telangana Arya Vysya Matrimony | Free Matrimony – Arya Vysya Mahasabha",
    template: "%s | Telangana Arya Vysya Mahasabha",
  },

  description:
    "Telangana State Arya Vysya Mahasabha offers a free Arya Vysya matrimony platform for brides and grooms. Register online for Arya Vysya matrimonial services and marriage introductions in Hyderabad and Telangana.",

  keywords: [
    ...SITE_KEYWORDS,
    "Telangana Arya Vysya Matrimony",
    "Arya Vysya Free Matrimony",
    "Telangana State Arya Vysya Mahasabha",
    "Arya Vysya Marriage Bureau Hyderabad",
    "Arya Vysya Matrimonial Registration",
  ],

  authors: [
    {
      name: "Telangana State Arya Vysya Mahasabha",
    },
  ],

  openGraph: {
    type: "website",
    siteName: "Telangana State Arya Vysya Mahasabha",
    locale: "en_IN",
    title:
      "Telangana Arya Vysya Matrimony | Free Matrimony – Arya Vysya Mahasabha",
    description:
      "Join Telangana State Arya Vysya Mahasabha's free matrimonial platform. Register online for Arya Vysya brides and grooms in Hyderabad and Telangana.",
    url: "https://www.aaryavysyamahasabha.com/",
  },

  icons: {
    icon: "/images/favicon.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="te">
      <body>{children}</body>
    </html>
  );
}
