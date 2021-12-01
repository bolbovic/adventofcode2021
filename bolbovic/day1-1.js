const inputToArray = require("./inputToArray");

async function processing() {
  let previous = 1000000;
  let incrementations = 0;
  (await inputToArray()).forEach((number) => {
    if (number > previous) incrementations++;
    previous = number;
  });
  console.log(incrementations);
}

processing();
