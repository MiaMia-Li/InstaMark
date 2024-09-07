import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const comic = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PhotoTailor",
  description: "Upload, Beautify, and Personalize Your Picture!",
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
      </body>
    </html>
  );
}
