import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/appbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tic Tac Toe Game",
  description: "Simple game of Tic Tac Toe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppBar />
        {children}
      </body>
    </html>
  );
}
