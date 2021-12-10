const inputToArray = require("../utils/inputToArray");

async function processing() {
  let outputs = await inputToArray((line) => line.split(" | ")[1].split(" "));

  let tot = 0;
  outputs.forEach((line) =>
    line.forEach((seq) => {
      if ([2, 3, 4, 7].includes(seq.length)) tot++;
    })
  );
  console.log(tot);
}

processing();
