import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Matrimonial Registration Status",
  description: "Matrimonial registration submission status.",
  path: "/register-success",
  noIndex: true,
});

export default function RegisterSuccessLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
