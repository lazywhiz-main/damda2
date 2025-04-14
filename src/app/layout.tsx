import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const notoSerifKr = Noto_Serif_KR({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Damda",
  description: "Damda - Your Daily Inspiration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={notoSerifKr.className}>
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
