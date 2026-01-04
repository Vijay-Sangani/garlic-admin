import type { Metadata } from "next";
import { JSX } from "react";

import "../styles/globals.css";
import { Sidebar } from "../components";

export const metadata: Metadata = {
  title: "Garlic Admin - Wholesale Management",
  description: "Admin panel for Garlic & Green Peas wholesale business",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => (
  <html lang="en">
    <body className={`font-sans antialiased`}>
      <Sidebar />
      <main className="lg:ml-64 min-h-screen">{children}</main>
      {/* <Analytics /> */}
    </body>
  </html>
);

export default RootLayout;
