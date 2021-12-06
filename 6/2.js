const inputToArray = require("../utils/inputToArray");

async function processing() {
  let days = (
    await inputToArray((line) => line.split(",").map((num) => parseInt(num)))
  )[0];
  const daysLeftFishes = new Array(9).fill(0);
  days.forEach((fish) => daysLeftFishes[fish]++);
  for (let i = 0; i < 256; i++) {
    const newFishes = daysLeftFishes.shift();
    daysLeftFishes.push(newFishes);
    daysLeftFishes[6] += newFishes;
  }
  console.log(daysLeftFishes.reduce((t, fishs) => t + fishs, 0));
}

processing();
