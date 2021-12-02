const inputToArray = require("./inputToArray");

async function processing() {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  (
    await inputToArray("input-day2.txt", (line) => {
      const [action, number] = line.split(" ");
      return number ? { action, number: parseInt(number) } : {};
    })
  ).forEach((line) => {
    switch (line.action) {
      case "down":
        aim += line.number;
        break;
      case "up":
        aim -= line.number;
        break;
      case "forward":
        horizontal += line.number;
        depth += aim * line.number;
        break;
      default:
        break;
    }
  });
  console.log(horizontal, depth, depth * horizontal);
}

processing();
