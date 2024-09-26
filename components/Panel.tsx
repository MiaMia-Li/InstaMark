"use client";
import { motion, AnimatePresence } from "framer-motion";

import { useColor } from "@/context/ColorContext";
import ColorPop from "./ColorPop";
import Image from "next/image";
import React, { useState, useRef, useCallback } from "react";
import Exif from "exif-js";
import { CAMERA_BRAND, COLOR_MAP } from "@/lib/config";
import Btn3d from "./Btn3d";
import InputRange from "./InputRange";
import Divider from "./Divider";
import { isEmptyObj } from "@/lib/color";
import {
  IoIosArrowDown,
  IoIosColorPalette,
  IoMdColorFilter,
} from "react-icons/io";
import { FiLayout } from "react-icons/fi";
import { TiArrowBack } from "react-icons/ti";
interface PanelProps {
  padding: number;
  borderRadius: number;
  textColor: string;
  textSize: number;
  onChange: (method: string, value: any) => void;
  exifData: Record<string, any>;
  showCameraInfo: boolean;
  imageSrc: string | null;
  noExif?: boolean;
  exportRatio?: string;
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
    exportRatio,
  } = props;
  const [activeTab, setActiveTab] = useState<"palette" | "custom">("palette");
  console.log("-exifData", exifData);
  return (
    <div className="w-full mb-4">
      <div className="flex gap-6 mb-4 ">
        <button
          className={`flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium rounded-xl ${
            activeTab === "palette"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("palette")}>
          <IoIosColorPalette className="w-4 h-4" />
          Background
        </button>
        <button
          className={`flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium rounded-xl ${
            activeTab === "custom"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("custom")}>
          <FiLayout className="w-4 h-4" />
          Layout
        </button>
      </div>
      {activeTab === "palette" ? (
        <ColorPop
          onSelectColor={(color) => onChange("setBackgroundColor", color)}
        />
      ) : (
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Picture Ratio
            </label>
            <div className="flex flex-wrap gap-4">
              {[
                { ratio: "auto" },
                { ratio: "1:1", width: 40, height: 40 },
                { ratio: "4:3", width: 40, height: 30 },
                { ratio: "3:4", width: 30, height: 40 },
                { ratio: "16:9", width: 48, height: 27 },
              ].map((option) => (
                <button
                  key={option.ratio}
                  className={`flex flex-col items-center p-2 border rounded-md transition-all ${
                    exportRatio === option.ratio
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                  style={{
                    width: `${option.width}px`,
                    height: `${option.height}px`,
                  }}
                  onClick={() => onChange("setExportRatio", option.ratio)}>
                  <span className="text-xs">{option.ratio}</span>
                </button>
              ))}
            </div>
          </div>

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

          <div className="flex flex-col space-y-4">
            <label className="text-gray-700 text-sm">Text Size</label>
            <div>
              <InputRange
                num={textSize}
                handleChange={(num) => onChange("setTextSize", num)}
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
            <div className="flex justify-end w-2/3">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="textColor"
                  value="dark"
                  checked={textColor === "dark"}
                  onChange={(e) => onChange("setTextColor", e.target.value)}
                />
                <span className="ml-2 text-sm text-gray-700">Dark</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="textColor"
                  value="light"
                  checked={textColor === "light"}
                  onChange={(e) => onChange("setTextColor", e.target.value)}
                />
                <span className="ml-2 text-sm text-gray-700">Light</span>
              </label>
            </div>
          </div>
          {/* <div className="flex items-center justify-between">
            <label className="text-gray-700 text-sm">Text Size</label>
            <div className="flex justify-end w-2/3">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="textSize"
                  value="small"
                  checked={textSize === "small"}
                  onChange={(e) => onChange("setTextSize", e.target.value)}
                />
                <span className="ml-2 text-sm text-gray-700">Small</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="textSize"
                  value="medium"
                  checked={textSize === "medium"}
                  onChange={(e) => onChange("setTextSize", e.target.value)}
                />
                <span className="ml-2 text-sm text-gray-700">Medium</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="textSize"
                  value="large"
                  checked={textSize === "large"}
                  onChange={(e) => onChange("setTextSize", e.target.value)}
                />
                <span className="ml-2 text-sm text-gray-700">Large</span>
              </label>
            </div>
          </div> */}

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
              lang="en-US"
              id="dateInput"
              value={exifData?.date}
              onChange={(e) =>
                onChange("setExifData", {
                  ...exifData,
                  date: e.target.value,
                })
              }
              className="w-2/3 px-4 py-2 rounded bg-transparent text-gray-800"
            />
          </div>
          {/* <Divider /> */}
        </div>
      )}
    </div>
  );
}
