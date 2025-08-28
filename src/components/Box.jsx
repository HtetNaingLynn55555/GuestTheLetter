export default function Box({ guestBoxActive, indexNumber }) {
  return (
    <div
      className={`select-none w-23 h-23 border-4  border-white flex justify-center items-center text-4xl hover:cursor-pointer ${
        guestBoxActive === indexNumber ? "bg-[#6e706f]" : ""
      }  `}
    >
      ?
    </div>
  );
}
