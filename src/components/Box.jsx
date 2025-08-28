export default function Box({ indexNumber, box, getBoxClickedIndex }) {
  let onClickBox = () => {
    getBoxClickedIndex(indexNumber);
  };
  return (
    <div
      onClick={onClickBox}
      className={`select-none w-23 h-23 border-4  border-white flex justify-center items-center text-4xl hover:cursor-pointer  `}
    >
      <span className={`${box.isTextChange ? "text-teal-500" : ""}`}>
        {box.text}
      </span>
    </div>
  );
}
