import Box from "./Box";
import KeyBoard from "./KeyBoard";
import { useState } from "react";
import randomFourLetterArrayGenerator from "../utils/randomFourLetterArrayGenerator";

let defaultLevel = randomFourLetterArrayGenerator();
export default function Guess() {
  // Game Lavel
  let [level, setLevel] = useState(defaultLevel);

  let [isPlaying, setIsPlaying] = useState(false);
  // Guess letter box
  let [boxClicked, setBoxClicked] = useState(false);
  let [boxClickedIndex, setBoxClickedIndex] = useState(0);
  let [isSubmitting, setIsSubmitting] = useState(false);
  let [correctAnswer, setCorrectAnswer] = useState(0);
  let [correctPosition, setCorrectPosition] = useState(0);
  let [letterBox, setLetterBox] = useState([
    { id: 1, text: "?", isTextChange: false },
    { id: 2, text: "?", isTextChange: false },
    { id: 3, text: "?", isTextChange: false },
    { id: 4, text: "?", isTextChange: false },
  ]);

  let [playerGuessLetter, setPlayerGuessLetter] = useState("");

  // Play the game and reset the game
  let playButtonHandler = () => {
    if (isPlaying) {
      setLetterBox([
        { id: 1, text: "?", isTextChange: false },
        { id: 2, text: "?", isTextChange: false },
        { id: 3, text: "?", isTextChange: false },
        { id: 4, text: "?", isTextChange: false },
      ]);

      setPlayerGuessLetter("");
      setBoxClicked(!boxClicked);
    }
    setIsPlaying(!isPlaying);
  };

  let getBoxClickedIndex = (index) => {
    setBoxClicked(true);
    setBoxClickedIndex(index);

    letterBox.map((box) => {
      if (box.id === index) {
        box.text = "_";
      }
    });

    setLetterBox(letterBox);
  };

  let handlePlayerGuessLetter = (letter) => {
    setPlayerGuessLetter(letter);
    letterBox.map((box) => {
      if (box.id === boxClickedIndex) {
        box.text = letter;
        box.isTextChange = true;
      }
    });
    setLetterBox(letterBox);
    // setBoxClicked(false);
    console.log("Player guess letter: ", letter);
  };

  let onSubmitHandler = () => {
    console.log("level", level);
    console.log("this is ", letterBox);

    let answersArray = letterBox.map((box) => box.text);

    let correctAnswerCount = 0;
    answersArray.forEach((element) => {
      level.find((letter) => {
        if (element === letter) {
          correctAnswerCount += 1;
          return true;
        }
        return false;
      });
    });
    setCorrectAnswer(correctAnswerCount);
    console.log("answersArray", answersArray);
    setIsSubmitting(true);
  };

  return (
    <div className="scroll-smooth font-poppins bg-bg-primary text-white bg-black flex flex-col justify-start items-center h-auto pt-4 gap-5">
      <div className="text-3xl">Guess the letter in the box</div>
      <div> guess letter from a~z</div>
      <div>
        {level.map((letter, index) => (
          <span key={index}>{letter},</span>
        ))}
      </div>

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
              getBoxClickedIndex={getBoxClickedIndex}
              indexNumber={box.id}
              box={box}
            />
          ))}
        </div>
      )}

      {isPlaying && (
        <button
          onClick={onSubmitHandler}
          className="border-2 border-white w-40 h-15 hover:cursor-pointer mt-8 rounded-lg hover:bg-[#6e706f]"
        >
          Submit
        </button>
      )}

      {isPlaying && isSubmitting && (
        <div className="text-2xl mt-8 flex justify-between gap-5">
          <div>Correct Answer: {correctAnswer}</div>
          <div>Correct Position: {correctPosition}</div>
          <div>Total Time : 00:00</div>
        </div>
      )}

      {isPlaying && boxClicked && (
        <div className="mt-8">
          <KeyBoard handlePlayerGuessLetter={handlePlayerGuessLetter} />
        </div>
      )}
    </div>
  );
}
