import { useState, useRef } from "react";
import { gradientMap, colorVariants } from "@/lib/config";
import { useColor } from "@/context/ColorContext";

export default function ColorPicker(props) {
  const { setColor } = useColor();
  const { onSelectColor } = props;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [customColor, setCustomColor] = useState("#ffffff");
  const colorInputRef = useRef(null);

  const handleColorSelect = (color, index) => {
    setColor(color);
    onSelectColor(color);
    setSelectedIndex(index);
  };

  const handleCustomColorSelect = () => {
    colorInputRef.current.click();
  };

  const handleCustomColorChange = (e) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    handleColorSelect(newColor, colors.length);
  };

  const colors = [
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
        className={`w-12 h-12 m-1 text-sm cursor-pointer rounded-md relative transition-all duration-300 ease-in-out ${
          selectedIndex === colors.length ? "ring-2 ring-offset-2" : ""
        }`}
        style={{ background: customColor }}
        onClick={handleCustomColorSelect}>
        Custom
        {selectedIndex === colors.length && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
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
