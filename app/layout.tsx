import type { Metadata } from "next";
import { REM } from "next/font/google";
import "./globals.css";

const rem = REM({ subsets: ["latin"] });

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
      <body className={rem.className}>
        <div className="background-grid">
          <div className="content-container">{children}</div>
        </div>
      </body>
    </html>
  );
}
