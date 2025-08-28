let randomFourLetterArrayGenerator = () => {
  let array = [];
  let max = 26;
  let letters = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * max);
    array.push(letters[index]);
  }

  return array;
};
export default randomFourLetterArrayGenerator;
