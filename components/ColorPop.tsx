"use client";

import { useState, useRef } from "react";
import { useColor } from "@/context/ColorContext";

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
    "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    "bg-gradient-to-r from-cyan-500 to-blue-500",
    "bg-gradient-to-r from-violet-200 to-pink-200",
    "bg-gradient-to-r from-teal-400 to-yellow-200",
    "bg-gradient-to-r from-slate-500 to-slate-800",
    "bg-gradient-to-r from-fuchsia-500 to-cyan-500",
    "bg-gradient-to-r from-green-500 to-blue-500",
    "bg-gradient-to-r from-purple-500 to-pink-500",
    "bg-gradient-to-r from-orange-500 to-red-500",
    "bg-gradient-to-r from-indigo-500 to-blue-500",
    "bg-gradient-to-r from-teal-500 to-green-500",
    "bg-gradient-to-r from-yellow-500 to-orange-500",
    "bg-gradient-to-r from-pink-500 to-red-500",
    "bg-gradient-to-r from-cyan-500 to-blue-500",
    "bg-gradient-to-r from-lime-500 to-rose-500",
    // ... 添加更多渐变色，共15个
  ];

  const solidColors: string[] = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-cyan-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-indigo-500",
    "bg-gray-500",
    "bg-slate-500",
    "bg-fuchsia-500",
    "bg-violet-500",
    "bg-lime-500",
    "bg-rose-500",
    "bg-emerald-500",
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
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-auto space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
        <div
          className="w-6 h-6 rounded-full border border-gray-300"
          style={{ backgroundColor: selectedColor }}></div>
        <span>选择颜色</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-auto min-w-96 bg-white rounded-md shadow-lg p-4">
          <div className="flex border-b mb-4">
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-t-md ${
                activeTab === "palette"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("palette")}>
              调色板
            </button>
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-t-md ${
                activeTab === "custom"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("custom")}>
              自定义
            </button>
          </div>

          {activeTab === "palette" ? (
            <div>
              <h3 className="text-sm font-semibold mb-2">渐变色</h3>
              <div className="grid grid-cols-8 gap-2 mb-4">
                {gradientColors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 rounded-full cursor-pointer ${color}`}
                    onClick={() => handleColorSelect(color)}></div>
                ))}
              </div>
              <h3 className="text-sm font-semibold mb-2">纯色</h3>
              <div className="grid grid-cols-8 gap-2">
                {solidColors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-6 h-6 rounded-md cursor-pointer ${color} border border-gray-300 hover:border-blue-500 transition-all duration-200 ${
                      selectedColor === color ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => handleColorSelect(color)}></div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <input
                type="color"
                value={selectedColor}
                onChange={handleCustomColorChange}
                className="w-full h-10 cursor-pointer rounded-md"
              />
              <div className="mt-2 text-sm text-gray-600">
                已选颜色: {selectedColor}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
