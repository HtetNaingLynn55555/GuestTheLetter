import Box from "./Box";
import KeyBoard from "./KeyBoard";
import { useState } from "react";
export default function Guest() {
  let [isPlaying, setIsPlaying] = useState(false);

  let playButtonHandler = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="scroll-smooth font-poppins bg-bg-primary text-white bg-black flex flex-col justify-start items-center h-auto pt-4 gap-5">
      <div className="text-3xl">Guest the letter in the box</div>
      <div> guest letter from a~z</div>

      <button
        className="border-2 border-white w-40 h-15 hover:cursor-pointer mt-8 rounded-lg hover:bg-[#6e706f]"
        onClick={playButtonHandler}
      >
        {isPlaying ? "Reset Game" : "Play Game"}
      </button>

      {isPlaying && (
        <div className="flex justify-center items-center gap-6 mt-8">
          <Box />
          <Box />
          <Box />
          <Box />
        </div>
      )}
      {isPlaying && (
        <div className="mt-8">
          <KeyBoard />
        </div>
      )}
    </div>
  );
}
