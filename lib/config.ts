import {
  RiTwitterXFill,
  RiLinkedinBoxFill,
  RiInstagramFill,
  RiWeiboFill,
  RiGithubFill,
} from "react-icons/ri";
import { SiBuymeacoffee } from "react-icons/si";

import CanonSvg from "@/public/camera/Canon.svg";
import FujifilmSvg from "@/public/camera/Fujifilm.svg";
import GoproSvg from "@/public/camera/Gopro.svg";
import LeicaSvg from "@/public/camera/Leica.svg";
import NikonSvg from "@/public/camera/Nikon.svg";
import OlympusSvg from "@/public/camera/Olympus.svg";
import SonySvg from "@/public/camera/Sony.svg";
import AppleSvg from "@/public/camera/Apple.svg";
import DJISvg from "@/public/camera/DJI.svg";
import VivoSvg from "@/public/camera/Vivo.svg";
import OppoSvg from "@/public/camera/Oppo.svg";
import HuaweiSvg from "@/public/camera/Huawei.svg";
import XiaomiSvg from "@/public/camera/Xiaomi.svg";
import RealmeSvg from "@/public/camera/Realme.svg";
import Insta360Svg from "@/public/camera/Insta360.svg";
import PanasonicSvg from "@/public/camera/Panasonic.svg";
import PentaxSvg from "@/public/camera/Pentax.svg";
import SamsungSvg from "@/public/camera/Samsung.svg";
import SigmaSvg from "@/public/camera/Sigma.svg";

export const CAMERA_BRAND = [
  { key: "Canon", src: "/camera/Canon.svg", svg: CanonSvg },
  { key: "Fujifilm", src: "/camera/Fujifilm.svg", svg: FujifilmSvg },
  { key: "Gopro", src: "/camera/Gopro.svg", svg: GoproSvg },
  { key: "Leica", src: "/camera/Leica.svg", svg: LeicaSvg },
  { key: "Nikon", src: "/camera/Nikon.svg", svg: NikonSvg },
  { key: "Olympus", src: "/camera/Olympus.svg", svg: OlympusSvg },
  { key: "Sony", src: "/camera/Sony.svg", svg: SonySvg },
  { key: "Apple", src: "/camera/Apple.svg", svg: AppleSvg },
  { key: "DJI", src: "/camera/DJI.svg", svg: DJISvg },
  { key: "Vivo", src: "/camera/Vivo.svg", svg: VivoSvg },
  { key: "Oppo", src: "/camera/Oppo.svg", svg: OppoSvg },
  { key: "Huawei", src: "/camera/Huawei.svg", svg: HuaweiSvg },
  { key: "Xiaomi", src: "/camera/Xiaomi.svg", svg: XiaomiSvg },
  { key: "Realme", src: "/camera/Realme.svg", svg: RealmeSvg },
  { key: "Insta360", src: "/camera/Insta360.svg", svg: Insta360Svg },
  { key: "Panasonic", src: "/camera/Panasonic.svg", svg: PanasonicSvg },
  { key: "Pentax", src: "/camera/Pentax.svg", svg: PentaxSvg },
  { key: "Samsung", src: "/camera/Samsung.svg", svg: SamsungSvg },
  { key: "Sigma", src: "/camera/Sigma.svg", svg: SigmaSvg },

  // 添加更多品牌
];

export const COLOR_MAP = new Map([
  ["bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500", "text-white"],
  ["bg-gradient-to-r from-cyan-500 to-blue-500", "text-white"],
  ["bg-gradient-to-r from-violet-200 to-pink-200", "text-gray-900"],
  ["bg-gradient-to-r from-teal-400 to-yellow-200", "text-gray-900"],
  ["bg-gradient-to-r from-slate-500 to-slate-800", "text-white"],
  ["bg-gradient-to-r from-fuchsia-500 to-cyan-500", "text-white"],
]);

export const SOCIAL_MEDIA = [
  //   {
  //     id: "whatsapp",
  //     icon: "whatsapp.svg", // 你可以使用图标文件的路径
  //     href: "https://github.com/your-profile",
  //     description: "Follow me on GitHub",
  //   },
  {
    id: "twitter",
    icon: "media/twitter.svg",
    href: "https://x.com/Sep_Miamia",
    description: "Follow me on Twitter",
    svg: RiTwitterXFill,
  },
  {
    id: "linkedin",
    icon: "media/linkedin.svg",
    href: "https://www.linkedin.com/in/mengyao-li-software/",
    description: "Connect with me on LinkedIn",
    svg: RiLinkedinBoxFill,
  },
  // {
  //   id: "instagram",
  //   icon: "media/instagram.svg",
  //   href: "https://www.instagram.com/sep.miamia/",
  //   description: "Follow me on Instagram",
  //   svg: RiInstagramFill,
  // },

  // {
  //   id: "weibo",
  //   icon: "media/weibo.svg",
  //   href: "https://m.weibo.cn/profile/2887635897",
  //   description: "Follow me on Instagram",
  //   svg: RiWeiboFill,
  // },
  {
    id: "github",
    icon: "media/github.svg",
    href: "https://github.com/MiaMia-Li",
    description: "Follow me on Github",
    svg: RiGithubFill,
  },
  {
    id: "buymeacoffee",
    icon: "media/buymeacoffee.svg",
    href: "https://www.buymeacoffee.com/sept.miamia",
    description: "Buy me a coffee",
    svg: SiBuymeacoffee,
  },
];

export const getSocialMedia = (ids: string[]) => {
  return SOCIAL_MEDIA.filter((media) => ids.includes(media.id));
};

export function sleep(timeout: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
