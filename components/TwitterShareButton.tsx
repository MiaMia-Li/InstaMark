import React, { useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { FaTwitter } from "react-icons/fa";

const TwitterShareButton: React.FC = () => {
  return (
    <>
      {/* <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        className="twitter-share-button"
        data-size="large"
        data-text="Just transformed my photo in seconds with PhotoTailor! ✨🎨 It's fast, fun, and super easy—now my pics are ready to shine! Try it out and level up your photos! 📸🚀 "
        data-hashtags="PhotoTailor,EasyEditing"
        data-related="Sep_Miamia"
        data-show-count="false">
        Share on Twitter
      </a>
      <Script src="https://platform.twitter.com/widgets.js" /> */}
      <button
        onClick={() => {
          const text = encodeURIComponent(
            "Just transformed my photo in seconds with PhotoTailor! ✨🎨 It's fast, fun, and super easy—now my pics are ready to shine! Try it out and level up your photos! 📸🚀"
          );
          const hashtags = encodeURIComponent("PhotoTailor,EasyEditing");
          const url = encodeURIComponent("https://www.aphototailor.com");
          window.open(
            `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}&url=${url}`,
            "_blank"
          );
        }}
        className="w-full mt-4 px-6 py-3 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
        <div className="flex items-center justify-center">
          <FaTwitter className="mr-3 text-xl" />
          <span className="font-semibold">Share on Twitter</span>
        </div>
      </button>
    </>
  );
};

export default TwitterShareButton;
