function isDarkColor(color) {
  let r, g, b;

  // 将颜色转换为 RGB 格式
  if (color.startsWith("#")) {
    // 处理十六进制颜色
    const hex = color.replace("#", "");
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  } else if (color.startsWith("rgb")) {
    // 处理 RGB 颜色
    const rgbValues = color.match(/\d+/g);
    r = parseInt(rgbValues[0], 10);
    g = parseInt(rgbValues[1], 10);
    b = parseInt(rgbValues[2], 10);
  }

  // 计算颜色亮度
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  // 判断亮度是否低于阈值（128）来判断颜色是暗色还是亮色
  return brightness < 128;
}

export const getTextColors = (bgColor) => {
  // let isDarkBackground;
  // if (bgColor.startsWith("#")) {
  //   isDarkBackground = isDarkColor(bgColor);
  // } else {
  //   isDarkBackground =
  //     bgColor.includes("slate") ||
  //     bgColor.includes("teal") ||
  //     bgColor.includes("fuchsia");
  // }
  return bgColor === "dark"
    ? { main: "rgb(15 23 42)", desc: "rgb(71 85 105)" }
    : { main: "rgb(255 255 255)", desc: "rgb(226 232 240)" };
};

export const isEmptyObj = (data: any) => {
  if (!data || Object.keys(data).length === 0) return true;
  return Object.values(data).every((value) => !value);
};

// 定义一个函数来转换 Tailwind 类到 CSS 渐变
export const tailwindToCSS = (tailwindClass: string) => {
  const gradientMap = {
    "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500":
      "linear-gradient(to right, #ec4899, #ef4444, #eab308)",
    "bg-gradient-to-r from-cyan-500 to-blue-500":
      "linear-gradient(to right, #06b6d4, #3b82f6)",
    "bg-gradient-to-r from-violet-200 to-pink-200":
      "linear-gradient(to right, #ddd6fe, #fbcfe8)",
    "bg-gradient-to-r from-teal-400 to-yellow-200":
      "linear-gradient(to right, #2dd4bf, #fef08a)",
    "bg-gradient-to-r from-slate-500 to-slate-800":
      "linear-gradient(to right, #64748b, #1e293b)",
    "bg-gradient-to-r from-fuchsia-500 to-cyan-500":
      "linear-gradient(to right, #d946ef, #06b6d4)",
  };
  return gradientMap[tailwindClass] || tailwindClass;
};
