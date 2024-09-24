"use client";
import Script from "next/script";
export default function Vconsole() {
  return (
    <>
      <Script
        src="https://unpkg.com/vconsole/dist/vconsole.min.js"
        onLoad={() => {
          const isMobile = /iPhone|iPad|iPod|Android/i.test(
            navigator.userAgent
          );
          if (isMobile) {
            new VConsole();
          }
        }}></Script>
    </>
  );
}
