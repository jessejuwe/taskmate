import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import Providers from "@/providers/providers";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

export const metadata: Metadata = {
  appleWebApp: { capable: true, title: "Taskmate", statusBarStyle: "default" },
  applicationName: "Taskmate",
  keywords: ["Task", "Management", "Dashboard"],
  title: { default: "Taskmate", template: "%s | Taskmate" },
  description: "Manage your tasks efficiently",
  creator: "Jesse Juwe",
  publisher: "Jesse Juwe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <Providers>
          <DashboardLayout>{children}</DashboardLayout>
        </Providers>
      </body>
    </html>
  );
}
