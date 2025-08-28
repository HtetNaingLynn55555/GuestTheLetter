import Box from "./Box";
export default function Guest() {
  return (
    <div className="font-poppins bg-bg-primary text-white bg-black flex flex-col justify-center items-center h-screen">
      <div className="text-3xl">Guest the letter in the box</div>
      <div>You can guest letter from a~z</div>
      <div className="flex justify-center items-center gap-4 mt-8">
        <Box />
        <Box />
        <Box />
        <Box />
      </div>
    </div>
  );
}
