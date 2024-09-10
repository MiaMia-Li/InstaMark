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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-white text-center">
          Woohoo! Your masterpiece is ready! 🎉
        </h2>
        <p className="mb-6 text-white text-center">
          Your photo looks absolutely fantastic! Why not show it off to the
          world on Twitter?
        </p>
        <div className="flex justify-center mb-6">
          <TwitterShareButton />
        </div>
        <button
          onClick={onClose}
          className="w-full mt-4 px-6 py-3 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-100 transition-colors duration-300 transform hover:scale-105">
          Maybe Later
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ShareDialog;
