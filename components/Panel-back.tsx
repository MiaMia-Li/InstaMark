import ColorPicker from "./ColorPicker";
import Image from "next/image";
import React, { useState, useRef, useCallback } from "react";
import Exif from "exif-js";
import { CAMERA_BRAND, COLOR_MAP } from "@/lib/config";
import Btn3d from "./Btn3d";
import InputRange from "./InputRange";
import Divider from "./Divider";
import { isEmptyObj } from "@/lib/color";
interface PanelProps {
  padding: number;
  borderRadius: number;
  textColor: string;
  textSize: string;
  onChange: (method: string, value: any) => void;
  exifData: Record<string, any>;
  showCameraInfo: boolean;
  imageSrc: string | null;
  noExif?: boolean;
}

export default function Panel(props: PanelProps) {
  const {
    padding,
    borderRadius,
    textColor,
    onChange,
    exifData,
    showCameraInfo,
    imageSrc,
    noExif,
    textSize,
  } = props;
  console.log("-exifData", exifData);
  return (
    <div className="w-full mb-4">
      {/* <label className="block text-gray-700 text-sm mb-2">
        Background Color
      </label>
      <div className="flex flex-wrap mb-4">
        <ColorPicker
          onSelectColor={(color) => onChange("setBackgroundColor", color)}
        />
      </div> */}
      <div className="flex flex-col space-y-4">
        <label className="text-gray-700 text-sm">Padding</label>
        <div>
          <InputRange
            num={padding}
            handleChange={(num) => onChange("setPadding", num)}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <label className="text-gray-700 text-sm">Radius</label>
          <div>
            <InputRange
              num={borderRadius}
              handleChange={(num) => onChange("setBorderRadius", num)}
            />
          </div>
        </div>
        <Divider />

        <div className="flex items-center justify-between">
          <label htmlFor="showCameraInfo" className="text-gray-700 text-sm">
            Show CameraInfo
          </label>
          <input
            type="checkbox"
            id="showCameraInfo"
            checked={showCameraInfo}
            onChange={(e) => onChange("setShowCameraInfo", e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded-3xl transition duration-150 ease-in-out"
          />
        </div>

        {showCameraInfo && imageSrc && noExif && (
          <div className="text-sm text-gray-500 bg-gray-100 rounded-md p-2 mt-2">
            😮 Opps~~ No photo information obtained
          </div>
        )}

        <div className="flex items-center justify-between">
          <label className="text-gray-700 text-sm">Text Color</label>
          <select
            value={textColor}
            onChange={(e) => onChange("setTextColor", e.target.value)}
            className="w-2/3 px-4 py-2 rounded bg-transparent text-gray-800 focus:outline-none">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-gray-700 text-sm">Text Size</label>
          <select
            value={textSize}
            onChange={(e) => onChange("setTextSize", e.target.value)}
            className="w-2/3 px-4 py-2 rounded bg-transparent text-gray-800 focus:outline-none">
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-gray-700 text-sm ">Camera Logo</label>
          <select
            value={exifData?.make}
            onChange={(e) =>
              onChange("setExifData", {
                ...exifData,
                make: e.target.value,
              })
            }
            className="w-2/3 px-4 py-2 rounded bg-transparent text-gray-800 focus:outline-none">
            <option key="all" value="">
              None
            </option>
            {CAMERA_BRAND.map((brand) => (
              <option key={brand.key} value={brand.key}>
                {brand.key}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="dateInput" className="text-gray-700 text-sm">
            Date
          </label>
          <input
            type="date"
            id="dateInput"
            value={exifData?.date}
            onChange={(e) =>
              onChange("setExifData", {
                ...exifData,
                date: e.target.value,
              })
            }
            className="w-2/3 px-4 py-2 rounded bg-transparent text-gray-800 transition duration-150 ease-in-out
                  bg-white border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
      </div>
    </div>
  );
}
