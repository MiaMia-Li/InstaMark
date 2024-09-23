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
import { CAMERA_BRAND, COLOR_MAP, sleep } from "@/lib/config";
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
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const { color, setColor } = useColor();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [exifData, setExifData] = useState({});
  const [padding, setPadding] = useState(20);
  const [borderRadius, setBorderRadius] = useState(10);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [textColor, setTextColor] = useState("dark");
  const [textSize, setTextSize] = useState("medium");
  const [showCameraInfo, setShowCameraInfo] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [noExif, setNoExif] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [exportRatio, setExportRatio] = useState("auto");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const [exportedImageUrl, setExportedImageUrl] = useState<string | null>(null);

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

  const exportToPc = (image) => {
    setIsExporting(true);
    const link = document.createElement("a");
    link.href = image;
    link.download = new Date().toISOString().replace(/:/g, "-") + ".png";
    link.click();
    setShowConfetti(true);
    sleep(3000).then(() => {
      setShowConfetti(false);
      setShowShareDialog(true);
      setIsExporting(false);
    });
    document.body.removeChild(wrapper);
    gtag("event", "download_photo");
  };

  const exportToM = (image) => {
    console.log("--image", image);
    const img = document.createElement("img");
    img.src = image;
    img.style.position = "absolute";
    img.style.top = 0;
    img.style.left = 0;
    img.style.zIndex = 999;
    exportRef.appendChild(img); // 添加：将图像添加到文档中
  };

  const generateImg = async () => {
    if (exportRef.current) {
      const element = exportRef.current;
      const { width, height } = element.getBoundingClientRect();
      // Adjust the scale for mobile (iPhone) devices
      const scale = isMobile ? 2 : 3;

      // Create a temporary wrapper div
      const wrapper = document.createElement("div");
      wrapper.style.width = `${width}px`;
      wrapper.style.height = `${height}px`;
      wrapper.style.overflow = "hidden";
      wrapper.appendChild(element.cloneNode(true));

      // Hide the wrapper and append it to the body
      document.body.appendChild(wrapper);
      wrapper.style.position = "absolute";
      wrapper.style.left = "-9999px";

      try {
        await document.fonts.ready;

        // Ensure a delay for iOS to handle font rendering properly
        if (isMobile) {
          await new Promise((resolve) => setTimeout(resolve, 100)); // small delay for iOS rendering
        }

        const canvas = await html2canvas(wrapper, {
          width: width,
          height: height,
          scale: scale,
          // dpi: window.devicePixelRatio * 2,
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
              console.log("--styles", styles);
              // 应用 exportRef 和其所有子元素的样式
              const applyStyles = (
                source: HTMLElement,
                target: HTMLElement
              ) => {
                const sourceStyles = window.getComputedStyle(source);
                Object.values(sourceStyles).forEach((key) => {
                  // @ts-ignore
                  target.style[key] = sourceStyles[key];
                });
                Array.from(source.children).forEach((child, index) => {
                  if (target.children[index]) {
                    applyStyles(
                      child as HTMLElement,
                      target.children[index] as HTMLElement
                    );
                  }
                });
              };
              applyStyles(element, clonedElement); // 应用样式
              // Ensure borderRadius is applied
              clonedElement.style.borderRadius = `${borderRadius}px`;
            }
          },
        });

        // Create a final canvas to draw background and content
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = width * scale;
        finalCanvas.height = height * scale;
        const ctx = finalCanvas.getContext("2d");

        if (ctx) {
          // Draw background
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
          ctx.drawImage(canvas, 0, 0);
          ctx.restore();
        }
        const image = finalCanvas.toDataURL("image/png");
        setExportedImageUrl(image);
        // if (isMobile) {
        //   exportToM(image);
        // } else {
        //   exportToPc(image);
        // }
        const img = document.createElement("img");
        img.src = image;
        img.style.position = "absolute";
        img.style.top = 0;
        img.style.left = 0;
        img.style.zIndex = 999;
        document.body.appendChild(img);
      } catch (e) {}
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
    <div>
      {showConfetti && <Confetti />}
      {showShareDialog && (
        <ShareDialog
          imageUrl={exportedImageUrl}
          onClose={() => setShowShareDialog(false)}
        />
      )}
      <div className="flex flex-col h-full w-full gap-x-10 px-4 md:px-10 md:flex-row">
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
              fontSize:
                textSize === "small" ? 12 : textSize === "medium" ? 14 : 16,
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
                  <Image
                    src="/click.svg"
                    alt="Upload"
                    width={120}
                    height={120}
                  />
                  <p className="mt-2 font-bold">
                    Drag or click your Image here!
                  </p>
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
                    className="w-full h-auto pointer-events-none"
                    unoptimized
                  />
                </div>
              )}

              {showCameraInfo && (
                <div style={{ paddingTop: 16 }}>
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
                <Btn3d handleClick={handleReupload} text="Reupload Picture" />
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
                  handleClick={generateImg}
                  text="Export Picture"
                  loading={isExporting}
                />
              </div>
              <div
                className="flex-1"
                onTouchStart={() => {
                  // 开始长按
                  // handleLongPress();
                }}
                onTouchEnd={() => {
                  // 结束长按
                }}>
                <Btn3d text="Press and hold to save the picture" />
              </div>
            </div>
          )}
        </div>
        <div className="mt-2 w-full md:w-1/4 min-w-[300px] h-full flex-shrink-0 md:sticky md:top-0">
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
