const inputToArray = require("../utils/inputToArray");

async function processing() {
  let lines = await inputToArray((line) => line.split(""));
  const values = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
  const openings = ["(", "[", "{", "<"];
  const closings = Object.keys(values);
  let completions = [];
  lines.forEach((line) => {
    const chunk = [];
    let broke = false;
    for (let i = 0; i < line.length; i++) {
      const key = openings.indexOf(line[i]);
      if (key !== -1) {
        chunk.push(openings[key]);
      } else {
        if (openings.indexOf(chunk.pop()) !== closings.indexOf(line[i])) {
          broke = true;
          break;
        }
      }
    }
    if (!broke) {
      chunk.reverse();
      completions.push(
        chunk.reduce((tot, sign) => tot * 5 + openings.indexOf(sign) + 1, 0)
      );
    }
  });
  completions.sort((a, b) => a - b);
  console.log(completions[(completions.length - 1) / 2]);
}

processing();
