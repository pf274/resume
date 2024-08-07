export function getNewHighlight() {
  const randomNumber = Math.floor(Math.random() * 999_999_999).toLocaleString();
  return [
    `Saved the world ${randomNumber} times`,
    `Benched ${randomNumber} pounds`,
    `Saved the company $${randomNumber} in costs`,
    `Consumed ${randomNumber} enchiladas in one sitting`,
    `Built an army of ${randomNumber} roombas`
  ][Math.floor(Math.random() * 5)];
}