import React from "react";
import { motion } from "framer-motion";
import TwitterShareButton from "./TwitterShareButton";
import Image from "next/image";

interface PreviewDialogProps {
  imageUrl: string;
  onClose: () => void;
  onDownload: () => void;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({
  imageUrl,
  onClose,
  onDownload,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative flex flex-col items-center">
        <Image
          src={imageUrl}
          width={400}
          height={300}
          alt="preview"
          className="w-auto max-h-[70vh]"
        />
        <p className="mt-2 text-white text-center text-lg">
          Long press the image to save, or click the button below to download
        </p>
        <button
          onClick={onDownload}
          className="w-1/2 mt-4 py-2 px-2 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-100 transition-colors duration-300 transform hover:scale-105 text-sm sm:text-base">
          Download
        </button>
        {/* <button
          onClick={onClose}
          className="w-full mt-4 py-2 px-2 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-100 transition-colors duration-300 transform hover:scale-105 text-sm sm:text-base">
          Maybe Later
        </button> */}
      </motion.div>
    </motion.div>
  );
};

export default PreviewDialog;
