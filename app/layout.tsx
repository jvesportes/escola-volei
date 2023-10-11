import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] as const });

export const metadata: Metadata = {
  title: "Escola Vôlei",
  description: "Escolinha Vôlei",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, "bg-white")}>{children}</body>
    </html>
  );
}
