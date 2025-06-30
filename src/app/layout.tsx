import type { Metadata } from "next";
import { Noto_Serif_KR, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsentBanner from "@/components/CookieConsentBanner";

const notoSerifKr = Noto_Serif_KR({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif",
});

const nanumPen = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-nanum-pen",
  preload: true,
  fallback: ['cursive'],
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
    <html lang="ko" className={`${notoSerifKr.variable} ${nanumPen.variable}`}>
      <body className="bg-ivory text-ink min-h-screen">
        <GoogleAnalytics />
        <Navigation />
        <main>{children}</main>
        <CookieConsentBanner />
      </body>
    </html>
  );
}
