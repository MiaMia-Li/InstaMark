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
