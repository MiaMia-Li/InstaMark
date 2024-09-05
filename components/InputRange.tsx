import React from "react";

interface InputRangeProps {
  num: number;
  handleChange: (value: number) => void;
}

export default function InputRange({
  num,
  handleChange,
}: InputRangeProps): JSX.Element {
  return (
    <div className="inputRange relative flex justify-center items-center">
      <input
        type="range"
        name="inputName"
        id="inputName"
        value={num}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(Number(e.target.value))
        }
        min="0"
        step="1"
        max="50"
        className={`bg-slate-200 relative appearance-none outline-none shadow-none w-full rounded-full h-2 m-0 p-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:shadow-[0_1px_5px_#d1d5db] [&::-webkit-slider-thumb]:rounded-full`}
      />
    </div>
  );
}
