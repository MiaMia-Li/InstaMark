"use client";

import { useContext } from "react";
import { ColorProvider, useColor } from "@/context/ColorContext";

function Foo() {
  const { color, setColor } = useColor();

  return (
    <div
      className="flex justify-center py-2 transition-colors duration-300 ease-in-out"
      style={{ color }}>
      <p className="text-sm text-gray-700">
        © {new Date().getFullYear()} All rights reserved. created by ❤️{" "}
        <a
          target="_blank"
          href="https://www.linkedin.com/in/mengyao-li-software/">
          Mia
        </a>
      </p>
    </div>
  );
}

export default function Footer() {
  return (
    <ColorProvider>
      <Foo />
    </ColorProvider>
  );
}
