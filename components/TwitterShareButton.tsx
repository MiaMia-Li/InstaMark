import React, { useEffect } from "react";
import Image from "next/image";

const TwitterShareButton: React.FC = () => {
  useEffect(() => {
    // 动态加载Twitter的widgets.js脚本
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      //组件卸载时移除脚本;
      document.body.removeChild(script);
    };
  }, []);

  return (
    // <a
    //   // href="https://twitter.com/share?ref_src=twsrc%5Etfw"
    //   href={`https://twitter.com/intent/tweet?text=Check%20out%20my%20awesome%20photo!&url=${encodeURIComponent(
    //     "https://www.aphototailor.com/rainbow.svg"
    //   )}`}
    //   class="twitter-share-button"
    //   data-show-count="false">
    //   Tweet
    // </a>
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      className="twitter-share-button"
      data-size="large"
      data-text="Just transformed my photo in seconds with PhotoTailor! ✨🎨 It's fast, fun, and super easy—now my pics are ready to shine! Try it out and level up your photos! 📸🚀 "
      data-hashtags="PhotoTailor,EasyEditing"
      data-related="Sep_Miamia"
      data-show-count="false">
      Share on Twitter
    </a>
  );
};

export default TwitterShareButton;
