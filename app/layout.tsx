import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";

const comic = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

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

  openGraph: {
    title: "PhotoTailor",
    description: "Upload, Beautify, and Personalize Your Picture!",
    siteName: "PhotoTailor",
    images: [
      {
        url: "https://insta-mark-liard.vercel.app/og.png", // Must be an absolute URL
        width: 1200,
        height: 630,
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
    images: ["https://insta-mark-liard.vercel.app/og.png"], // Must be an absolute URL
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
    </html>
  );
}
