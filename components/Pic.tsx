"use client";
import { ColorProvider, useColor } from "@/context/ColorContext";
import ColorPicker from "./ColorPicker";
import Exinfo from "./Exinfo";
import Image from "next/image";
import React, { useState, useRef, useCallback } from "react";
import Exif from "exif-js";
import { CAMERA_BRAND, COLOR_MAP } from "@/lib/config";
import html2canvas from "html2canvas";
import { useDropzone } from "react-dropzone";
import Btn3d from "./Btn3d";
import InputRange from "./InputRange";

function PicContent() {
  const { color, setColor } = useColor();
  const [imageSrc, setImageSrc] = useState(null);
  const [exifData, setExifData] = useState({});
  const [padding, setPadding] = useState(20);
  const [borderRadius, setBorderRadius] = useState(10);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [textColor, setTextColor] = useState("dark"); // 新增状态
  const fileInputRef = useRef(null);
  const exportRef = useRef(null);

  const handleFile = useCallback((file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result as string);
        loadExifData(file);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleFile(acceptedFiles[0]);
    },
    [handleFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const handleReupload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        loadExifData(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadExifData = (file) => {
    Exif.getData(file, function () {
      console.log(
        "-Exif-",
        Exif.getAllTags(this),
        Exif.getTag(this, "GPSLatitude")
      );

      const fNumber = Exif.getTag(this, "FNumber") || "";
      const aperture = fNumber ? fNumber.numerator / fNumber.denominator : "";
      const DateTime = Exif.getTag(this, "DateTimeOriginal") || "";
      const date = DateTime ? DateTime.replace(/:/, "/").replace(/:/, "/") : "";

      const gpsLatitude = Exif.getTag(this, "GPSLatitude") || "";
      const gpsLongitude = Exif.getTag(this, "GPSLongitude") || "";
      const latitudeRef = Exif.getTag(this, "GPSLatitudeRef") || "N";
      const longitudeRef = Exif.getTag(this, "GPSLongitudeRef") || "E";

      let latitude;
      let longitude;

      if (gpsLatitude && gpsLongitude) {
        latitude = formatDMS(gpsLatitude, latitudeRef);
        longitude = formatDMS(gpsLongitude, longitudeRef);
      }
      function formatDMS(coordinates, ref) {
        const degrees = coordinates[0].numerator / coordinates[0].denominator;
        const minutes = coordinates[1].numerator / coordinates[1].denominator;
        const seconds = coordinates[2].numerator / coordinates[2].denominator;

        return `${Math.floor(
          degrees
        )}°${Math.floor(minutes)}′${seconds.toFixed(0)}″${ref}`;
      }

      const exifInfo = {
        make: Exif.getTag(this, "Make"),
        date,
        model: Exif.getTag(this, "Model"),
        iso: Exif.getTag(this, "ISOSpeedRatings"),
        aperture,
        shutterSpeed: Exif.getTag(this, "ExposureTime")
          ? `1/${Math.round(1 / Exif.getTag(this, "ExposureTime"))}`
          : null,
        focalLength: Exif.getTag(this, "FocalLength"),
        latitude,
        longitude,
      };
      setExifData(exifInfo);
    });
  };

  const handleExport = async () => {
    if (exportRef.current) {
      const canvas = await html2canvas(exportRef.current);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "image-with-exif.png";
      link.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">EXIF Viewer</h1>

      <div
        className={`${backgroundColor} shadow-md rounded p-4 duration-200 transform-gpu transition-all ease-linear md:w-2/3 w-full`}
        ref={exportRef}
        style={{
          padding: padding,
          borderRadius: borderRadius,
          backgroundColor: backgroundColor,
        }}>
        <div className="w-full">
          {!imageSrc ? (
            <div
              {...getRootProps()}
              className={`${
                textColor === "dark" ? "border-slate-800" : "border-slate-50"
              } w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors duration-300`}>
              <input {...getInputProps()} />
              <svg
                className={`w-12 h-12 mb-4 ${
                  textColor === "dark" ? "text-slate-800" : "text-slate-50"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {isDragActive ? (
                <p
                  className={`${
                    textColor === "dark" ? "text-slate-800" : "text-slate-50"
                  }`}>
                  将文件拖放到此处...
                </p>
              ) : (
                <p
                  className={`${
                    textColor === "dark" ? "text-slate-800" : "text-slate-50"
                  }`}>
                  拖放图片文件到此处，或点击选择文件
                </p>
              )}
            </div>
          ) : (
            <div>
              <Image
                src={imageSrc}
                alt="Uploaded"
                width={500}
                height={300}
                className="w-full h-auto"
                unoptimized
              />
            </div>
          )}

          <div className="text-left pt-4">
            <Exinfo
              bgColor={backgroundColor}
              textColor={textColor}
              data={exifData}
            />
          </div>
        </div>
      </div>

      {imageSrc && (
        <div className="flex items-center w-full max-w-lg my-5 gap-5">
          <div className="flex-1">
            <Btn3d handleClick={handleReupload} text="Upload" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <Btn3d handleClick={handleExport} text="Export" />
          </div>
        </div>
      )}
      <div className="w-full max-w-lg mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Background Color:
        </label>
        <div className="flex flex-wrap mb-4">
          <ColorPicker onSelectColor={(color) => setBackgroundColor(color)} />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-gray-700 text-sm font-bold">Padding</label>
            <div className="w-2/3">
              <InputRange
                num={padding}
                handleChange={(num) => setPadding(num)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700 text-sm font-bold">Radius</label>
            <div className="w-2/3">
              <InputRange
                num={borderRadius}
                handleChange={(num) => setBorderRadius(num)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700 text-sm font-bold">
              Text Color
            </label>
            <select
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-2/3 px-4 py-2 rounded bg-transparent text-gray-800">
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700 text-sm font-bold">
              Camera Logo
            </label>
            <select
              value={exifData.make}
              onChange={(e) =>
                setExifData({
                  ...exifData,
                  make: e.target.value,
                })
              }
              className="w-2/3 px-4 py-2 rounded bg-transparent text-gray-800">
              {CAMERA_BRAND.map((brand) => (
                <option key={brand.key} value={brand.key}>
                  {brand.key}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Pic() {
  return (
    <ColorProvider>
      <PicContent />
    </ColorProvider>
  );
}
