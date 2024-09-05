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
}

export default function Exinfo(props: ExinfoProps) {
  const { data, type = "default", bgColor, textColor } = props;
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

  return (
    <div className={`flex items-center justify-between`}>
      <div>
        <p className={`font-bold mb-1`} style={{ color: textColors.main }}>
          {model}
        </p>

        <p
          className="text-sm text-nowrap flex gap-[5px]"
          style={{ color: textColors.desc }}>
          {iso && <span>ISO{iso}</span>}
          {aperture && <span>F{aperture} </span>}
          {shutterSpeed && <span>{shutterSpeed}s</span>}
        </p>
      </div>
      {cameraSrc && (
        <Image
          src={cameraSrc}
          alt=""
          width={0}
          height={35}
          className="object-contain w-1/3 h-[35px]"
        />
      )}
      <div>
        {latitude && longitude && (
          <p
            className="text-sm flex items-center gap-[2px]"
            style={{ color: textColors.desc }}>
            {/* <GrLocation /> */}
            {`${latitude} ${longitude}`}
          </p>
        )}
        {date && (
          <p
            className="text-sm flex items-center gap-[2px]"
            style={{ color: textColors.desc }}>
            {/* <MdDateRange /> */}
            {date}
          </p>
        )}
      </div>
    </div>
  );
}
