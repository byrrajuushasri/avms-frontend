import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Set a New Matrimonial Password",
  description: "Choose a new password for your Arya Vysya matrimonial account.",
  path: "/reset-password",
  noIndex: true,
});

export default function ResetPasswordLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
