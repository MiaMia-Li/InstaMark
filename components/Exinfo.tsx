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

  return (
    <div
      className={`h-auto flex items-end justify-between transition-all duration-300 ease-in-out`}
      style={{ color: textColors.desc, fontSize: `${textSize}px` }}>
      <div className="flex-shrink-0">
        {model && (
          <div
            className="font-bold text-nowrap"
            style={{ color: textColors.main }}>
            {model}
          </div>
        )}
        {data && (
          <div className="text-nowrap" style={{ color: textColors.desc }}>
            {date}
          </div>
        )}
      </div>

      {make && (
        <div className="flex-shrink-0 mx-2">
          {CAMERA_BRAND.map((item) => {
            if (make.toLowerCase().includes(item.key.toLowerCase())) {
              const Logo = item.svg;
              return (
                <Logo
                  key={item.key}
                  className="sm:max-h-[35px] max-h-[15px] w-auto"
                />
              );
            }
            return <></>;
          })}
        </div>
      )}

      <div className="flex-shrink hidden sm:block">
        {iso && (
          <div
            className="font-bold flex gap-[5px] text-nowrap"
            style={{ color: textColors.main }}>
            {focalLen && <span>{focalLen}mm</span>}
            {iso && <span>ISO{iso}</span>}
            {aperture && <span>F{aperture} </span>}
            {shutterSpeed && <span>{shutterSpeed}s</span>}
          </div>
        )}
        {latitude && longitude && (
          <div className="flex items-center text-nowrap">
            {`${latitude} ${longitude}`}
          </div>
        )}
      </div>
    </div>
  );
}
