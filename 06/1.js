const inputToArray = require("../utils/inputToArray");

async function processing() {
  let fishes = (
    await inputToArray((line) => line.split(",").map((num) => parseInt(num)))
  )[0];

  for (let i = 0; i < 80; i++) {
    let newFishes = 0;
    fishes.forEach((age, idx) => {
      if (age === 0) {
        newFishes++;
        fishes[idx] = 6;
      } else {
        fishes[idx]--;
      }
    });
    if (newFishes) {
      fishes = fishes.concat(new Array(newFishes).fill(8));
    }
  }
  console.log(fishes.length);
}

processing();
