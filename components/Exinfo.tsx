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
    focalLen?: string;
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
    focalLen,
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
    return textSize === "small"
      ? "12px"
      : textSize === "medium"
      ? "14px"
      : "16px";
  }, [textSize]);

  return (
    <div
      className={`flex items-center justify-between overflow-hidden transition-all duration-300 ease-in-out`}
      style={{ color: textColors.desc, fontSize: textSizeClass }}>
      <div className="flex-shrink-0">
        {model && (
          <p
            className="font-bold text-nowrap"
            style={{ color: textColors.main, marginBottom: 4 }}>
            {model}
          </p>
        )}
        {data && (
          <p className="text-nowrap" style={{ color: textColors.desc }}>
            {date}
          </p>
        )}
      </div>

      {cameraSrc && (
        <div className="flex-shrink-0 mx-2">
          <Image
            src={cameraSrc}
            alt=""
            width={35}
            height={35}
            objectFit="contain"
            className="object-contain w-auto sm:max-h-[35px] max-h-[15px]"
          />
        </div>
      )}

      <div className="flex-shrink overflow-hidden hidden sm:block">
        {iso && (
          <p
            className="font-bold flex gap-[5px] text-nowrap overflow-hidden"
            style={{ color: textColors.main, marginBottom: 4 }}>
            {focalLen && <span>{focalLen}mm</span>}
            {iso && <span>ISO{iso}</span>}
            {aperture && <span>F{aperture} </span>}
            {shutterSpeed && <span>{shutterSpeed}s</span>}
          </p>
        )}
        {latitude && longitude && (
          <p className="flex items-center text-nowrap overflow-hidden">
            {`${latitude} ${longitude}`}
          </p>
        )}
      </div>
    </div>
  );
}
