import { useState, useRef } from "react";
import { useColor } from "@/context/ColorContext";

interface ColorPickerProps {
  onSelectColor: (color: string) => void;
}

export default function ColorPicker({ onSelectColor }: ColorPickerProps) {
  const { setColor } = useColor();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [customColor, setCustomColor] = useState<string>("#ffffff");
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleColorSelect = (color: string, index: number) => {
    setColor(color);
    onSelectColor(color);
    setSelectedIndex(index);
  };

  const handleCustomColorSelect = () => {
    colorInputRef.current?.click();
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    handleColorSelect(newColor, colors.length);
  };

  const colors: string[] = [
    "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    "bg-gradient-to-r from-cyan-500 to-blue-500",
    "bg-gradient-to-r from-violet-200 to-pink-200",
    "bg-gradient-to-r from-teal-400 to-yellow-200",
    "bg-gradient-to-r from-slate-500 to-slate-800",
    "bg-gradient-to-r from-fuchsia-500 to-cyan-500",
  ];

  return (
    <div className="flex flex-wrap items-center">
      {colors.map((color, index) => (
        <div
          className={`w-12 h-12 m-1 cursor-pointer rounded-md ${color} relative transition-all duration-300 ease-in-out ${
            selectedIndex === index ? "ring-2 ring-offset-2" : ""
          }`}
          key={index}
          onClick={() => handleColorSelect(color, index)}>
          {selectedIndex === index && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          )}
        </div>
      ))}
      <div
        className={`w-12 h-12 m-1 text-sm cursor-pointer rounded-md relative transition-all duration-300 ease-in-out overflow-hidden border-2 border-gray-300 hover:border-gray-500 ${
          selectedIndex === colors.length
            ? "ring-2 ring-offset-2 ring-blue-500"
            : ""
        }`}
        onClick={handleCustomColorSelect}>
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300"
          style={{ background: customColor }}>
          <span className="text-xs font-semibold text-gray-700 bg-white bg-opacity-70 px-1 py-0.5 rounded">
            Custom
          </span>
        </div>
        {selectedIndex === colors.length && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
          </div>
        )}
        <input
          ref={colorInputRef}
          type="color"
          value={customColor}
          onChange={handleCustomColorChange}
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        />
      </div>
    </div>
  );
}
