import Image from "next/image";
import { useMemo } from "react";
import { getTextColors, isEmptyObj } from "@/lib/color";
import { CAMERA_BRAND } from "@/lib/config";
import { GrLocation } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
interface ExinfoProps {
  data: {
    make?: string;
    model?: string;
    date?: string;
    shutterSpeed?: string;
    iso?: string;
    aperture?: string;
    latitude?: string;
    longitude?: string;
  };
  type?: string;
  bgColor?: string;
  textColor?: string;
  textSize?: string;
}

export default function Exinfo(props: ExinfoProps) {
  const { data, type = "default", bgColor, textColor, textSize } = props;
  const {
    make,
    model,
    date,
    shutterSpeed,
    iso,
    aperture,
    latitude = "",
    longitude = "",
  } = data;

  const textColors = useMemo(() => {
    return getTextColors(textColor || ""); // 提供默认值
  }, [textColor]);

  const cameraSrc = useMemo(() => {
    const brand = make
      ? CAMERA_BRAND.find((it) =>
          make.toLowerCase().includes(it.key.toLowerCase())
        )
      : null;
    return brand ? brand.src : null;
  }, [make]);

  const textSizeClass = useMemo(() => {
    return textSize ? `text-${textSize}` : "text-sm";
  }, [textSize]);

  return (
    <div
      className={`flex items-center justify-between ${textSizeClass} transition-all duration-300 ease-in-out`}
      style={{ color: textColors.desc }}>
      {model && (
        <div>
          <p className="font-bold mb-1" style={{ color: textColors.main }}>
            {model}
          </p>

          <p
            className="text-nowrap flex gap-[5px]"
            style={{ color: textColors.desc }}>
            {iso && <span>ISO{iso}</span>}
            {aperture && <span>F{aperture} </span>}
            {shutterSpeed && <span>{shutterSpeed}s</span>}
          </p>
        </div>
      )}
      {cameraSrc && (
        <Image
          src={cameraSrc}
          alt=""
          width={0}
          height={0}
          className={`object-contain w-auto ${
            textSize === "sm"
              ? "h-[25px]"
              : textSize === "md"
              ? "h-[35px]"
              : "h-[45px]"
          }`}
        />
      )}
      <div>
        {latitude && longitude && (
          <p className="flex items-center gap-[2px]">
            {`${latitude} ${longitude}`}
          </p>
        )}
        {date && <p className="flex items-center gap-[2px]">{date}</p>}
      </div>
    </div>
  );
}
