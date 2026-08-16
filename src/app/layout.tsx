import "./globals.css";

export const metadata = {
  title: "Arya Vysya Matrimony",
  description: "Arya Vysya Matrimony",
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