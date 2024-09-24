import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Btn3dProps {
  text: string;
  handleClick: () => void;
  loading?: boolean;
}

const Btn3d: React.FC<Btn3dProps> = ({
  text,
  handleClick,
  loading = false,
}) => {
  return (
    <button
      className={`relative text-lg w-full text-primary text-black ${
        loading ? "cursor-not-allowed opacity-70" : ""
      }`}
      onClick={handleClick}
      disabled={loading}>
      <div
        className={`absolute inset-x-0 h-full rounded-lg -bottom-2 ${
          loading
            ? "bg-gray-200 border-gray-300"
            : "bg-gray-100 border-gray-500"
        } border`}></div>
      <div
        className={`relative py-2 px-10 rounded-lg border ${
          loading
            ? "bg-gray-100 border-gray-300 text-gray-500"
            : "bg-white border-gray-500 hover:translate-y-2"
        } transition transform duration-200`}>
        {loading && (
          <>
            <AiOutlineLoading3Quarters className="inline-block animate-spin text-2xl mr-2" />
          </>
        )}
        {text}
      </div>
    </button>
  );
};

export default Btn3d;
