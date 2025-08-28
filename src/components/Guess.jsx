import Box from "./Box";
import KeyBoard from "./KeyBoard";
import { useState, useEffect } from "react";
import randomFourLetterArrayGenerator from "../utils/randomFourLetterArrayGenerator";

let defaultAnswer = randomFourLetterArrayGenerator();
console.log("defaultAnswer", defaultAnswer);
export default function Guess() {
  // Game Lavel
  let [answer, setAnswer] = useState(defaultAnswer);

  let [isPlaying, setIsPlaying] = useState(false);
  let [startTime, setStartTime] = useState(null);
  let [timeDifference, setTimeDifference] = useState(null);
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

  let [playerGuessLetter, setPlayerGuessLetter] = useState(false);

  // Play the game and reset the game
  let playButtonHandler = () => {
    if (isPlaying) {
      setLetterBox([
        { id: 1, text: "?", isTextChange: false },
        { id: 2, text: "?", isTextChange: false },
        { id: 3, text: "?", isTextChange: false },
        { id: 4, text: "?", isTextChange: false },
      ]);

      setCorrectAnswer(0);
      setCorrectPosition(0);
      setPlayerGuessLetter("");
      setBoxClicked(!boxClicked);
    }
    setStartTime(Date.now());
    setTimeDifference(null);

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
    setPlayerGuessLetter(!playerGuessLetter);
    letterBox.map((box) => {
      if (box.id === boxClickedIndex) {
        box.text = letter.toLowerCase();
        box.isTextChange = true;
      }
    });
    setLetterBox(letterBox);

    // setBoxClicked(false);
  };

  let onSubmitHandler = () => {
    let answersArray = letterBox.map((box) => box.text);
    let samePositionArray;
    let correctAnswerCount = answer.filter((letter) =>
      answersArray.includes(letter)
    ).length;

    samePositionArray = answer
      .map((letter, index) => {
        if (letter === answersArray[index]) {
          return index;
        } else {
          return -1;
        }
      })
      .filter((index) => index !== -1);
    setCorrectAnswer(correctAnswerCount);
    setCorrectPosition(samePositionArray.length);

    if (startTime) {
      const difference = Date.now() - startTime;
      setTimeDifference(difference);
    }
    setIsSubmitting(true);
  };

  return (
    <div className=" font-poppins bg-bg-primary text-white bg-black flex flex-col justify-start items-center  h-auto  pt-4 gap-1 sm:gap-5">
      <div className="text-3xl">Guess the letter in the box</div>
      <div> guess letter from a~z</div>

      <button
        className="border-2 border-white w-40 h-15 hover:cursor-pointer mt-8 rounded-lg hover:bg-[#6e706f]"
        onClick={playButtonHandler}
      >
        {isPlaying ? "Reset Game" : "Play Game"}
      </button>

      {isPlaying && (
        <div className="flex justify-center items-center gap-1 sm:gap-6 mt-8">
          {letterBox.map((box) => (
            <Box
              key={box.id}
              getBoxClickedIndex={getBoxClickedIndex}
              indexNumber={box.id}
              text={box.text}
              box={box}
              answer={answer[box.id - 1]}
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
        <div className="text-2xl mt-8 flex justify-between gap-1 sm:gap-5">
          <div>Correct Answer: {correctAnswer}</div>
          <div>Correct Position: {correctPosition}</div>
          <div>Total Time : {Math.floor(timeDifference / 1000)} s</div>
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
