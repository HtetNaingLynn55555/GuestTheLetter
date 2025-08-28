import { useState, useEffect } from "react";

export default function Box({
  indexNumber,
  box,
  getBoxClickedIndex,
  answer,
  text,
}) {
  console.log("is rendering box");
  let [showAlert, setShowAlert] = useState(false);
  let [isTextChange, setIsTextChange] = useState(false);
  let onClickBox = () => {
    getBoxClickedIndex(indexNumber);
  };

  useEffect(() => {
    if (text === answer) {
      alert("Correct Answer");
    }
    console.log("text changed");
  }, [text]);

  return (
    <div className="flex flex-col items-center sm:gap-2">
      <div
        onClick={onClickBox}
        className={`select-none h-11 w-11 sm:w-23 sm:h-23 border-4  border-white flex justify-center items-center sm:text-2xl text-[16px] md:text-4xl hover:cursor-pointer  `}
      >
        <span className={`${box.isTextChange ? "text-teal-500" : ""}`}>
          {box.text}
        </span>
      </div>
    </div>
  );
}
