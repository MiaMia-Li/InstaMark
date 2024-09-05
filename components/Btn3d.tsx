import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function Btn3d(props) {
  const { text, handleClick, loading } = props;
  return (
    <button
      className={`relative text-lg w-full ${
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
        {loading ? (
          <>
            <AiOutlineLoading3Quarters className="inline-block animate-spin text-2xl mr-2" />
            Working....
          </>
        ) : (
          text
        )}
      </div>
    </button>
  );
}
