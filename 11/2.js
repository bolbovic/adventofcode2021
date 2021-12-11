const inputToArray = require("../utils/inputToArray");

async function processing() {
  const grid = await inputToArray((line) => line.split(""));
  let exploded = [];
  let tot = 0;
  const inc = (x, y) => {
    if (!grid[y] || grid[y][x] === undefined) return;
    if (exploded.indexOf(`${x}-${y}`) === -1) {
      grid[y][x]++;
    }
    if (grid[y][x] > 9) {
      exploded.push(`${x}-${y}`);
      grid[y][x] = 0;
      tot++;
      [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
      ].forEach((xy) => inc(xy[0], xy[1]));
    }
  };
  let i = 0;
  for (; exploded.length !== grid.length * grid[0].length; i++) {
    exploded = [];
    grid.forEach((line, y) => {
      line.forEach((_, x) => inc(x, y));
    });
  }
  console.log(i);
}

processing();
