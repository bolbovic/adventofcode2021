const inputToArray = require("../utils/inputToArray");

const newGrid = (x, y) => {
  const grid = new Array(y).fill([]);
  grid.forEach((_, idx) => {
    grid[idx] = new Array(x).fill(false);
  });
  return grid;
};
async function processing() {
  const raw = await inputToArray((line) => line);
  const coords = [];
  let maxX = 0;
  let maxY = 0;
  for (let last = raw.shift(); last !== ""; last = raw.shift()) {
    const coord = last.split(",").map((c) => parseInt(c));
    if (coord[0] > maxX) maxX = coord[0];
    if (coord[1] > maxY) maxY = coord[1];
    coords.push(coord);
  }
  const orders = raw.map((line) => line.split(" along ")[1].split("="));
  const grid = newGrid(maxX + 1, maxY + 1);

  coords.forEach((coord) => {
    grid[coord[1]][coord[0]] = true;
  });

  const fold = (grid, order) => {
    const line = parseInt(order[1]);
    if (order[0] === "y") {
      const ng = newGrid(grid[0].length, line);
      for (let y = 1; y <= line; y++) {
        for (let x = 0; x < grid[0].length; x++) {
          ng[line - y][x] = grid[line - y][x] || grid[line + y][x];
        }
      }
      return ng;
    } else if (order[0] === "x") {
      const ng = newGrid(line, grid.length);
      for (let x = 1; x <= line; x++) {
        for (let y = 0; y < grid.length; y++) {
          ng[y][line - x] = grid[y][line - x] || grid[y][line + x];
        }
      }
      return ng;
    }
  };
  const ng = fold(grid, orders[0]);

  let nb = 0;
  ng.forEach((g) => {
    g.forEach((val) => {
      if (val) nb++;
    });
  });

  console.log(nb);
}

processing();
