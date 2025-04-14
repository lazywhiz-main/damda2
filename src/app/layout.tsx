import type { Metadata } from "next";
import { Noto_Serif_KR, Nanum_Pen_Script } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  variable: "--font-noto-serif",
});

const nanumPen = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwriting",
});

export const metadata: Metadata = {
  title: "담다 - 마음을 글씨에 담습니다",
  description: "서예 작가 담다의 브랜드 웹사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${notoSerif.variable} ${nanumPen.variable}`}>
      <body className="bg-ivory text-ink min-h-screen">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
