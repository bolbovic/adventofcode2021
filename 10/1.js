const inputToArray = require("../utils/inputToArray");

async function processing() {
  let lines = await inputToArray((line) => line.split(""));
  const values = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
  const openings = ["(", "[", "{", "<"];
  const closings = Object.keys(values);
  let tot = 0;
  lines.forEach((line) => {
    const chunk = [];
    for (let i = 0; i < line.length; i++) {
      const key = openings.indexOf(line[i]);
      if (key !== -1) {
        chunk.push(openings[key]);
      } else {
        const expectation = chunk.pop();
        if (openings.indexOf(expectation) !== closings.indexOf(line[i])) {
          tot += values[line[i]];
          break;
        }
      }
    }
  });
  console.log(tot);
}

processing();
