const inputToArray = require("../utils/inputToArray");

async function processing() {
  let lines = 0;
  let numberOfOnes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  (await inputToArray((line) => line.split(""))).forEach((row) => {
    row.forEach((bit, idx) => {
      if (bit === "1") numberOfOnes[idx]++;
    });
    lines++;
  });
  const gamma = numberOfOnes
    .map((number) => (number > lines / 2 ? 1 : 0))
    .join("");
  const epsilon = numberOfOnes
    .map((number) => (number > lines / 2 ? 0 : 1))
    .join("");
  console.log(gamma, epsilon, parseInt(gamma, 2) * parseInt(epsilon, 2));
}

processing();
