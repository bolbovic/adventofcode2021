const inputToArray = require("../utils/inputToArray");

async function processing() {
  let crabs = (
    await inputToArray((line) => line.split(",").map((num) => parseInt(num)))
  )[0];

  const max = crabs.reduce((max, v) => (v > max ? v : max));
  const fuel = [];
  for (let i = 0; i < max + 1; i++) {
    fuel.push(
      crabs.reduce(
        (tot, crab) =>
          tot + ((Math.abs(crab - i) + 1) * Math.abs(crab - i)) / 2,
        0
      )
    );
  }
  console.log(
    fuel.reduce((min, v, idx) => (v < min.v ? { idx, v } : min), {
      idx: 0,
      v: 1000000000,
    })
  );
}

processing();
