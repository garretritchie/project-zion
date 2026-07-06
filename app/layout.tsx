import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zion 2.0",
  description: "A private AI operating system and command center."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
