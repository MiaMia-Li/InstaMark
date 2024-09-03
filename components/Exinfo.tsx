import Image from "next/image";
import { useMemo } from "react";
import { getTextColors } from "@/lib/color";
import { CAMERA_BRAND } from "@/lib/config";

export default function Exinfo(props) {
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
    return getTextColors(textColor);
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
          className="text-sm font-mono text-nowrap"
          style={{ color: textColors.desc }}>
          {iso && <>ISO{iso}</>}
          {aperture && <>F{aperture} </>}
          {shutterSpeed && <>{shutterSpeed}s</>}
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
          <p className="text-sm font-mono">{`${latitude} ${longitude}`}</p>
        )}
        {data && (
          <p className="font-mono text-sm" style={{ color: textColors.desc }}>
            {date}
          </p>
        )}
      </div>
    </div>
  );
}
