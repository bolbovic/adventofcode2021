const inputToArray = require("../utils/inputToArray");

async function processing() {
  let previous = 1000000;
  let incrementations = 0;
  const input = await inputToArray();
  input.forEach((_, idx) => {
    if (idx > input.length - 3) return 0;
    const sum = input[idx] + input[idx + 1] + input[idx + 2];
    if (sum > previous) incrementations++;
    previous = sum;
  });
  console.log(incrementations);
}

processing();
