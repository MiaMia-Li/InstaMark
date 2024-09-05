export const getTextColors = (bgColor: string) => {
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
