"use client";
import { ColorProvider, useColor } from "@/context/ColorContext";
import ColorPicker from "./ColorPicker";
import Exinfo from "./Exinfo";
import Image from "next/image";
import React, { useState, useRef, useCallback } from "react";
import Exif from "exif-js";
import { CAMERA_BRAND, COLOR_MAP } from "@/lib/config";
import { tailwindToCSS } from "@/lib/color";
import html2canvas from "html2canvas";
import { useDropzone } from "react-dropzone";
import Btn3d from "./Btn3d";
import InputRange from "./InputRange";
import Panel from "./Panel";
import { IoCloudUploadOutline } from "react-icons/io5";

function PicContent() {
  const { color, setColor } = useColor();
  const [imageSrc, setImageSrc] = useState(null);
  const [exifData, setExifData] = useState({});
  const [padding, setPadding] = useState(20);
  const [borderRadius, setBorderRadius] = useState(10);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [textColor, setTextColor] = useState("dark"); // 新增状态
  const [showCameraInfo, setShowCameraInfo] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
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
      setIsExporting(true);
      const element = exportRef.current;
      const { width, height } = element.getBoundingClientRect();

      // 创建一个临时的包装器div
      const wrapper = document.createElement("div");
      wrapper.style.width = `${width}px`;
      wrapper.style.height = `${height}px`;
      wrapper.style.overflow = "hidden";
      wrapper.appendChild(element.cloneNode(true));

      // 将包装器添加到body中，但设置为不可见
      document.body.appendChild(wrapper);
      wrapper.style.position = "absolute";
      wrapper.style.left = "-9999px";
      try {
        await document.fonts.ready;
        const scale = 4;
        const canvas = await html2canvas(wrapper, {
          width: width,
          height: height,
          scale: scale,
          useCORS: true,
          backgroundColor: null,
          logging: false,
          imageTimeout: 0, // 禁用图片加载超时
          allowTaint: true, //
          onclone: (clonedDoc) => {
            // 在克隆的文档中应用所有计算后的样式
            const clonedElement = clonedDoc.body.querySelector(
              "[data-export-wrapper]"
            );
            if (clonedElement) {
              const styles = window.getComputedStyle(element);
              Object.values(styles).forEach((key) => {
                // @ts-ignore
                clonedElement.style[key] = styles[key];
              });
            }
          },
        });

        // 创建一个新的canvas来绘制背景和内容
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = width * scale;
        finalCanvas.height = height * scale;
        const ctx = finalCanvas.getContext("2d");
        if (ctx) {
          // 绘制背景
          const gradient = ctx.createLinearGradient(0, 0, width * 2, 0);
          const cssGradient = tailwindToCSS(backgroundColor);
          if (cssGradient.startsWith("linear-gradient")) {
            const colors = cssGradient.match(/rgba?\([\d\s,\.]+\)|#[a-f\d]+/gi);
            if (colors) {
              colors.forEach((color, index) => {
                gradient.addColorStop(index / (colors.length - 1), color);
              });
            }
          } else {
            gradient.addColorStop(0, cssGradient);
            gradient.addColorStop(1, cssGradient);
          }
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width * scale, height * scale);

          // 绘制内容
          ctx.drawImage(canvas, 0, 0);
        }

        // 导出图片
        const image = finalCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "image-with-exif.png";
        link.click();
      } finally {
        // 清理临时元素
        document.body.removeChild(wrapper);
        setIsExporting(false);
      }
    }
  };

  const handleChange = useCallback((method: string, value: any) => {
    const methodMap = {
      setPadding,
      setBorderRadius,
      setBackgroundColor,
      setTextColor,
      setExifData,
      setShowCameraInfo,
    };

    if (method in methodMap) {
      methodMap[method](value);
    }
  }, []);

  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="w-full md:w-[calc(100%-300px)] md:pr-8">
        <div
          className={`${backgroundColor} shadow-md rounded p-4 duration-200 transform-gpu transition-all ease-linear w-full`}
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
                className={`
                w-full h-64 border-2 border-dashed rounded-lg 
                flex flex-col items-center justify-center cursor-pointer 
                transition-all duration-300 ease-in-out
                border-gray-300 text-gray-500
                hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg
              `}>
                <input {...getInputProps()} />
                <IoCloudUploadOutline className="w-10 h-10 transition-colors duration-300 group-hover:text-blue-500" />
                <p className="mt-2 transition-colors duration-300 group-hover:text-blue-500">
                  Drag or click your Image here!
                </p>
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

            {showCameraInfo && (
              <div className="text-left pt-4">
                <Exinfo
                  bgColor={backgroundColor}
                  textColor={textColor}
                  data={exifData}
                />
              </div>
            )}
          </div>
        </div>

        {imageSrc && (
          <div className="flex items-center w-full my-5 gap-5">
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
              <Btn3d
                handleClick={handleExport}
                text="Export"
                loading={isExporting}
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-full md:w-[300px]">
        <div className="static md:fixed md:w-[300px] bg-transparent z-20 rounded-lg shadow-lg border border-gray-200 p-6 transition-shadow duration-300 ease-in-out hover:shadow-xl">
          <Panel
            textColor={textColor}
            padding={padding}
            borderRadius={borderRadius}
            backgroundColor={backgroundColor}
            exifData={exifData}
            showCameraInfo={showCameraInfo}
            onChange={handleChange}
            imageSrc={imageSrc}
          />
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
