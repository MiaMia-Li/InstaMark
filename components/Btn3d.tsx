export default function Btn3d(props) {
  const { text, handleClick } = props;
  return (
    <button class="relative text-lg w-full" onClick={handleClick}>
      <div class="absolute inset-x-0 h-full rounded-lg -bottom-2  bg-gray-100 border border-gray-500"></div>
      <div class="relative bg-white py-2 px-10 rounded-lg border border-gray-500 transition transform duration-200 hover:translate-y-2">
        {text}
      </div>
    </button>
  );
}
