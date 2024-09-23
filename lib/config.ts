import {
  RiTwitterXFill,
  RiLinkedinBoxFill,
  RiInstagramFill,
  RiWeiboFill,
  RiGithubFill,
} from "react-icons/ri";
import { SiBuymeacoffee } from "react-icons/si";

export const CAMERA_BRAND = [
  { key: "Canon", src: "/camera/Canon.svg" },
  { key: "Fujifilm", src: "/camera/Fujifilm.svg" },
  { key: "Gopro", src: "/camera/Gopro.svg" },
  { key: "Leica", src: "/camera/Leica.svg" },
  { key: "Nikon", src: "/camera/Nikon.svg" },
  { key: "Olympus", src: "/camera/Olympus.svg" },
  { key: "Sony", src: "/camera/Sony.svg" },
  { key: "Apple", src: "/camera/Apple.svg" },
  { key: "DJI", src: "/camera/DJI.svg" },
  { key: "Vivo", src: "/camera/Vivo.svg" },
  { key: "Oppo", src: "/camera/Oppo.svg" },
  { key: "Huawei", src: "/camera/Huawei.svg" },
  { key: "Xiaomi", src: "/camera/Xiaomi.svg" },
  { key: "Realme", src: "/camera/Realme.svg" },
  { key: "Insta360", src: "/camera/Insta360.svg" },
  { key: "Panasonic", src: "/camera/Panasonic.svg" },
  { key: "Pentax", src: "/camera/Pentax.svg" },
  { key: "Samsung", src: "/camera/Samsung.svg" },
  { key: "Sigma", src: "/camera/Sigma.svg" },

  // 添加更多图片路径
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

export function sleep(timeout) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
