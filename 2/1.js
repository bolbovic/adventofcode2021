const inputToArray = require("../utils/inputToArray");

async function processing() {
  let horizontal = 0;
  let depth = 0;
  (
    await inputToArray((line) => {
      const [action, number] = line.split(" ");
      return number ? { action, number: parseInt(number) } : {};
    })
  ).forEach((line) => {
    switch (line.action) {
      case "down":
        depth += line.number;
        break;
      case "up":
        depth -= line.number;
        break;
      case "forward":
        horizontal += line.number;
        break;
      default:
        break;
    }
  });
  console.log(horizontal, depth, depth * horizontal);
}

processing();
