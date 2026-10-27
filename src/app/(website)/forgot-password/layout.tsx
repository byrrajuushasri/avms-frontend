import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Reset Your Matrimonial Password",
  description: "Request help recovering access to your Arya Vysya account.",
  path: "/forgot-password",
  noIndex: true,
});

export default function ForgotPasswordLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
