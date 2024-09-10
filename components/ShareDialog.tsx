import React from "react";
import { motion } from "framer-motion";
import TwitterShareButton from "./TwitterShareButton";

interface ShareDialogProps {
  imageUrl: string | null;
  onClose: () => void;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ imageUrl, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white text-center">
          Woohoo! Your masterpiece is ready! 🎉
        </h2>
        <p className="mb-4 text-white text-center text-sm sm:text-base">
          Your photo looks absolutely fantastic! Why not show it off to the
          world on Twitter?
        </p>
        <div className="flex justify-center">
          <TwitterShareButton key={imageUrl} />
        </div>
        <button
          onClick={onClose}
          className="w-full mt-4 px-6 py-3 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-100 transition-colors duration-300 transform hover:scale-105 text-sm sm:text-base">
          Maybe Later
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ShareDialog;
