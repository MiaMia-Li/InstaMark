"use client";

import { useState, useRef } from "react";
import { useColor } from "@/context/ColorContext";
import {
  IoIosArrowDown,
  IoIosColorPalette,
  IoMdColorFilter,
} from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import Panel from "./Panel";

interface ColorPickerProps {
  onSelectColor: (color: string) => void;
}

export default function ColorPicker({ onSelectColor }: ColorPickerProps) {
  const { setColor } = useColor();
  const [selectedColor, setSelectedColor] = useState<string>("#ffffff");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"palette" | "custom">("palette");
  const colorInputRef = useRef<HTMLInputElement>(null);

  const gradientColors: string[] = [
    "linear-gradient(to right, rgb(142, 158, 171), rgb(238, 242, 243)",
    "linear-gradient(to right, rgb(172, 203, 238), rgb(231, 240, 253)",
    "linear-gradient(to right, rgb(211, 204, 227), rgb(233, 228, 240)",
    "linear-gradient(to right, rgb(217, 167, 199), rgb(255, 252, 220)",
    "linear-gradient(to right, rgb(251, 200, 212), rgb(151, 149, 240)",
    "linear-gradient(to right, rgb(255, 226, 89), rgb(255, 167, 81)",
    "linear-gradient(to right, rgb(248, 54, 0), rgb(249, 212, 35)",
    "linear-gradient(to right, rgb(238, 156, 167), rgb(255, 221, 225)",
    "linear-gradient(to right, rgb(255, 129, 119), rgb(177, 42, 91)",
    "linear-gradient(to right, rgb(255, 75, 31), rgb(255, 144, 104))",
    "linear-gradient(to right, rgb(67, 206, 162), rgb(24, 90, 157))",
    "linear-gradient(to right, rgb(123, 67, 151), rgb(220, 36, 48))",
    "linear-gradient(to right, rgb(34, 193, 195), rgb(253, 187, 45))",
    "linear-gradient(to right, rgb(219, 230, 246), rgb(197, 121, 109))",
    "linear-gradient(to right, rgb(255, 175, 189), rgb(255, 195, 160))",
    "linear-gradient(to right, rgb(102, 126, 234), rgb(118, 75, 162))",
    "linear-gradient(to right, rgb(0, 176, 155), rgb(150, 201, 61))",
    "linear-gradient(to right, rgb(131, 96, 195), rgb(46, 191, 145))",
    "linear-gradient(to right, rgb(252, 92, 125), rgb(106, 130, 251))",
    "linear-gradient(to right, rgb(78, 84, 200), rgb(143, 148, 251))",
    "linear-gradient(to right, rgb(255, 153, 102), rgb(255, 94, 98))",
    "linear-gradient(to right, rgb(236, 0, 140), rgb(252, 103, 103))",
    "linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85))",
    "linear-gradient(to right, rgb(0, 82, 212), rgb(67, 100, 247))",
    "linear-gradient(to right, rgb(106, 48, 147), rgb(160, 68, 255))",
    "linear-gradient(to right, rgb(0, 201, 255), rgb(146, 254, 157))",
    "linear-gradient(to right, rgb(255, 224, 0), rgb(121, 159, 12))",
    "linear-gradient(to right, rgb(255, 81, 47), rgb(240, 152, 25))",
    "linear-gradient(to right, rgb(43, 88, 118), rgb(78, 67, 118))",
  ];

  const solidColors: string[] = [
    "rgb(195, 200, 215)",
    "rgb(102, 124, 137)",
    "rgb(237, 99, 55)",
    "rgb(255, 65, 108)",
    "rgb(255, 137, 0)",
    "rgb(255, 228, 0)",
    "rgb(165, 234, 32)",
    "rgb(96, 246, 173)",
    "rgb(70, 230, 209)",
    "rgb(186, 225, 255)",
    "rgb(76, 137, 248)",
    "rgb(120, 68, 233)",
    "rgb(63, 43, 150)",
    "rgb(205, 90, 236)",
    // ... 添加更多纯色，共15个
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setColor(color);
    onSelectColor(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    handleColorSelect(newColor);
  };

  return (
    <div>
      <p className="text-sm font-semibold mb-2">Gradients</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {gradientColors.map((color, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-full cursor-pointer relative transition-all duration-300 ease-in-out flex-shrink-0`}
            style={{ background: color }}
            onClick={() => handleColorSelect(color)}>
            {selectedColor === color && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-sm font-semibold mb-2">Solid color</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {solidColors.map((color, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-full cursor-pointer relative transition-all duration-300 ease-in-out flex-shrink-0`}
            style={{ background: color }}
            onClick={() => handleColorSelect(color)}>
            {selectedColor === color && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold mb-2">Customer</p>
        <div className="flex items-center">
          <div className="relative">
            <label htmlFor="custom-color" className="sr-only">
              Select Custom Color
            </label>
            <input
              id="custom-color"
              type="color"
              value={selectedColor}
              onChange={handleCustomColorChange}
              className="w-10 h-10 p-0 border-0 rounded-full cursor-pointer"
            />
            {selectedColor.startsWith("#") && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
            )}
          </div>
          <span className="ml-2 text-sm">{selectedColor}</span>
        </div>
      </div>
    </div>
  );
}
