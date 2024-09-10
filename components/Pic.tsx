"use client";
import { ColorProvider, useColor } from "@/context/ColorContext";
import ColorPicker from "./ColorPicker";
import Exinfo from "./Exinfo";
import Image from "next/image";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import Exif from "exif-js";
import { CAMERA_BRAND, COLOR_MAP } from "@/lib/config";
import { tailwindToCSS, isEmptyObj } from "@/lib/color";
import html2canvas from "html2canvas";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
import Btn3d from "./Btn3d";
import InputRange from "./InputRange";
import Panel from "./Panel";
import ColorPop from "./ColorPop";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "./Confetti";
import ShareDialog from "./ShareDialog";

function PicContent() {
  const { color, setColor } = useColor();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [exifData, setExifData] = useState({});
  const [padding, setPadding] = useState(20);
  const [borderRadius, setBorderRadius] = useState(10);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [textColor, setTextColor] = useState("dark");
  const [textSize, setTextSize] = useState("lg");
  const [showCameraInfo, setShowCameraInfo] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [noExif, setNoExif] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [exportRatio, setExportRatio] = useState("auto");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const [exportedImageUrl, setExportedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => {
        setShowConfetti(false);
        setShowShareDialog(true);
      }, 3000); // 5秒后显示分享对话框
    }
  }, [showConfetti]);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          setImageSrc(event.target.result as string);
          loadExifData(file);
          gtag("event", "upload_photo");
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file");
    }
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
      if (rejectedFiles.length > 0) {
        alert("Please upload a valid image file");
      } else if (acceptedFiles.length > 0) {
        handleFile(acceptedFiles[0]);
      }
    },
    [handleFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });
  const handleReupload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          setImageSrc(event.target.result as string);
          loadExifData(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const loadExifData = (file: any) => {
    Exif.getData(file, function (this: any) {
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
      function formatDMS(coordinates: any, ref: any) {
        const degrees = coordinates[0].numerator / coordinates[0].denominator;
        const minutes = coordinates[1].numerator / coordinates[1].denominator;
        const seconds = coordinates[2].numerator / coordinates[2].denominator;

        return `${Math.floor(
          degrees
        )}°${Math.floor(minutes)}′${seconds.toFixed(0)}″${ref}`;
      }

      const focalLength = Exif.getTag(this, "FocalLength");
      const focalLen = focalLength
        ? focalLength.numerator / focalLength.denominator
        : "";

      const exifInfo = {
        make: Exif.getTag(this, "Make"),
        date,
        model: Exif.getTag(this, "Model"),
        iso: Exif.getTag(this, "ISOSpeedRatings"),
        aperture,
        shutterSpeed: Exif.getTag(this, "ExposureTime")
          ? `1/${Math.round(1 / Exif.getTag(this, "ExposureTime"))}`
          : null,
        focalLen,
        latitude,
        longitude,
      };
      setNoExif(isEmptyObj(exifInfo));
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
        const scale = 3;
        const canvas = await html2canvas(wrapper, {
          width: width,
          height: height,
          scale: scale,
          useCORS: true,
          backgroundColor: null,
          logging: false,
          imageTimeout: 0,
          allowTaint: true,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.body.querySelector(
              "[data-export-wrapper]"
            );
            if (clonedElement instanceof HTMLElement) {
              const styles = window.getComputedStyle(element);
              Object.values(styles).forEach((key) => {
                // @ts-ignore
                clonedElement.style[key] = styles[key];
              });
              // 确保圆角效果被应用
              clonedElement.style.borderRadius = `${borderRadius}px`;
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
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(borderRadius * scale, 0);
          ctx.lineTo(finalCanvas.width - borderRadius * scale, 0);
          ctx.quadraticCurveTo(
            finalCanvas.width,
            0,
            finalCanvas.width,
            borderRadius * scale
          );
          ctx.lineTo(
            finalCanvas.width,
            finalCanvas.height - borderRadius * scale
          );
          ctx.quadraticCurveTo(
            finalCanvas.width,
            finalCanvas.height,
            finalCanvas.width - borderRadius * scale,
            finalCanvas.height
          );
          ctx.lineTo(borderRadius * scale, finalCanvas.height);
          ctx.quadraticCurveTo(
            0,
            finalCanvas.height,
            0,
            finalCanvas.height - borderRadius * scale
          );
          ctx.lineTo(0, borderRadius * scale);
          ctx.quadraticCurveTo(0, 0, borderRadius * scale, 0);
          ctx.closePath();
          ctx.clip();

          const gradient = ctx.createLinearGradient(0, 0, width * 2, 0);
          const cssGradient = backgroundColor;
          if (cssGradient.startsWith("linear-gradient")) {
            const colors = cssGradient.match(/rgba?\([\d\s,\.]+\)|#[a-f\d]+/gi);
            if (colors) {
              colors.forEach((color: string, index: number) => {
                gradient.addColorStop(index / (colors.length - 1), color);
              });
            }
          } else {
            gradient.addColorStop(0, cssGradient);
            gradient.addColorStop(1, cssGradient);
          }
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

          // 绘制内容
          ctx.drawImage(canvas, 0, 0);
          ctx.restore();
        }

        // 导出图片
        const image = finalCanvas.toDataURL("image/png");
        setExportedImageUrl(image);
        const link = document.createElement("a");
        link.href = image;
        link.download = new Date().toISOString().replace(/:/g, "-") + ".png";
        link.click();
      } finally {
        // 清理临时元素
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // 3秒后隐藏彩带效果
        document.body.removeChild(wrapper);
        setIsExporting(false);
        gtag("event", "download_photo");
      }
    }
  };

  const handleChange = useCallback((method: string, value: any) => {
    const methodMap: { [key: string]: Dispatch<SetStateAction<any>> } = {
      setPadding,
      setBorderRadius,
      setBackgroundColor,
      setTextColor,
      setExifData,
      setShowCameraInfo,
      setTextSize,
      setExportRatio,
    };

    if (method in methodMap) {
      gtag("event", "setting_photo", {
        method,
        value,
      });
      (methodMap as any)[method](value);
    }
  }, []);

  return (
    <div className="flex flex-col h-full w-full gap-10 px-4 md:px-10 md:flex-row">
      <div className="relative">
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <Confetti />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          animate={{ filter: showConfetti ? "blur(5px)" : "blur(0px)" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col h-full w-full gap-10 px-4 md:px-10 md:flex-row">
          {/* ... 其他 JSX 保持不变 */}
        </motion.div>
        <AnimatePresence>
          {showShareDialog && (
            <ShareDialog
              imageUrl={exportedImageUrl}
              onClose={() => setShowShareDialog(false)}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="flex-1">
        <div className="text-center my-4 md:my-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-600">
            Upload, Beautify, and Personalize Your Picture
          </h1>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Discover our free, privacy-focused image tool. Enhance your photos
            locally, without uploads server. Enjoy secure, cost-free
            personalization. Transform your pictures easily and safely.
          </p>
        </div>
        <div
          className={`shadow-md rounded p-4 duration-200 transform-gpu transition-all ease-linear w-full overflow-hidden`}
          ref={exportRef}
          style={{
            padding: padding,
            borderRadius: borderRadius,
            background: backgroundColor,
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
                <Image src="/click.svg" alt="Upload" width={120} height={120} />
                <p className="mt-2 font-bold">Drag or click your Image here!</p>
              </div>
            ) : (
              <div>
                <Image
                  style={{
                    aspectRatio:
                      exportRatio === "auto"
                        ? "auto"
                        : exportRatio.replace(":", "/"),
                  }}
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
              <div className="pt-4">
                <Exinfo
                  bgColor={backgroundColor}
                  textColor={textColor}
                  textSize={textSize}
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
      <div className="mt-2 w-full md:w-1/4 min-w-[300px] h-full flex-shrink-0">
        <div className="rounded-md shadow-sm p-4 md:sticky md:top-0">
          <Panel
            textSize={textSize}
            textColor={textColor}
            padding={padding}
            borderRadius={borderRadius}
            exifData={exifData}
            showCameraInfo={showCameraInfo}
            onChange={handleChange}
            imageSrc={imageSrc}
            noExif={noExif}
            exportRatio={exportRatio}
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
