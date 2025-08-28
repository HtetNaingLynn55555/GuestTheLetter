import Box from "./Box";
import KeyBoard from "./KeyBoard";
import { useState } from "react";

export default function Guess() {
  let [isPlaying, setIsPlaying] = useState(false);

  let [letterBox, setLetterBox] = useState([
    { id: 1, text: "?", isTextChange: false },
    { id: 2, text: "?", isTextChange: false },
    { id: 3, text: "?", isTextChange: false },
    { id: 4, text: "?", isTextChange: false },
  ]);

  let [guestBoxActive, setGuestBoxActive] = useState(1);
  let [playerGuessLetter, setPlayerGuessLetter] = useState("");
  let [description, setDescription] = useState([
    "first",
    "second",
    "third",
    "fourth",
  ]);
  let playButtonHandler = () => {
    if (isPlaying) {
      setLetterBox([
        { id: 1, text: "?", isTextChange: false },
        { id: 2, text: "?", isTextChange: false },
        { id: 3, text: "?", isTextChange: false },
        { id: 4, text: "?", isTextChange: false },
      ]);
      setGuestBoxActive(1);
      setPlayerGuessLetter("");
    }
    setIsPlaying(!isPlaying);
  };

  let handleGuestBoxState = () => {
    if (guestBoxActive < 5) {
      setGuestBoxActive(guestBoxActive + 1);
    }
  };

  let handlePlayerGuessLetter = (letter) => {
    setPlayerGuessLetter(letter);
    if (letter === "{bksp}") {
      setGuestBoxActive(guestBoxActive - 1);
      letterBox.map((box) => {
        if (box.id === guestBoxActive - 1) {
          box.text = "?";
          box.isTextChange = false;
        } else {
          box.text = box.text;
        }
      });
    } else {
      letterBox.map((box) => {
        if (box.id === guestBoxActive) {
          box.text = letter;
          box.isTextChange = true;
        } else {
          box.text = box.text;
        }
      });
      setLetterBox(letterBox);
    }
  };
  return (
    <div className="scroll-smooth font-poppins bg-bg-primary text-white bg-black flex flex-col justify-start items-center h-auto pt-4 gap-5">
      <div className="text-3xl">Guess the letter in the box</div>
      <div> guess letter from a~z</div>

      <button
        className="border-2 border-white w-40 h-15 hover:cursor-pointer mt-8 rounded-lg hover:bg-[#6e706f]"
        onClick={playButtonHandler}
      >
        {isPlaying ? "Reset Game" : "Play Game"}
      </button>

      {isPlaying && (
        <div className="flex justify-center items-center gap-6 mt-8">
          {letterBox.map((box) => (
            <Box
              key={box.id}
              guestBoxActive={guestBoxActive}
              indexNumber={box.id}
              box={box}
            />
          ))}
        </div>
      )}
      {isPlaying && (
        <div className="mt-8">
          {guestBoxActive < 5 && guestBoxActive > 0
            ? `Guess the ${description[guestBoxActive - 1]} letter of the box`
            : guestBoxActive <= 0
            ? "No more letter to delete"
            : "All letter are guessed"}
          {/* dynamic message to show */}
        </div>
      )}
      {isPlaying && (
        <div className="mt-8">
          <KeyBoard
            handleGuestBoxState={handleGuestBoxState}
            handlePlayerGuessLetter={handlePlayerGuessLetter}
          />
        </div>
      )}
    </div>
  );
}
