import type { Metadata, Viewport } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const comic = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "PhotoTailor",
  description: "Upload, Beautify, and Personalize Your Picture!",
  keywords: [
    "photo editing",
    "image enhancement",
    "exif data",
    "privacy-focused",
    "free tool",
    "web application",
    "photography",
    "image customization",
    "photo sharing",
    "online photo editor",
  ],
  creator: "MengYao LI",
  alternates: {
    canonical: "https://www.aphototailor.com",
  },
  openGraph: {
    title: "PhotoTailor",
    description: "Upload, Beautify, and Personalize Your Picture!",
    siteName: "PhotoTailor",
    url: "https://www.aphototailor.com/",
    images: [
      {
        url: "https://www.aphototailor.com/og.png",
        width: 1200,
        height: 630,
        alt: "PhotoTailor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhotoTailor",
    description: "Upload, Beautify, and Personalize Your Picture!",
    creator: "MengYao LI",
    images: ["https://www.aphototailor.com/og.png"], // Must be an absolute URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={comic.className}>
        <div className="background-grid">
          <div className="content-container">
            <div className="min-h-screen flex flex-col">
              <div>
                <Header />
              </div>
              {children}
            </div>
          </div>
        </div>
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-G2K2QMBJJG" />
    </html>
  );
}
