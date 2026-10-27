import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Member Login",
  description:
    "Log in to your Arya Vysya matrimonial account to search approved profiles.",
  path: "/login",
  noIndex: true,
});

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
