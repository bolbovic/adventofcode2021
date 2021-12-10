const inputToArray = require("../utils/inputToArray");

async function processing() {
  let grid = await inputToArray((line) =>
    line.split("").map((num) => parseInt(num))
  );

  const getNextPoints = (y, x) =>
    [
      grid[y][x + 1],
      grid[y][x - 1],
      (grid[y + 1] || [])[x],
      (grid[y - 1] || [])[x],
    ].filter((num) => num !== undefined);
  let tot = 0;
  grid.forEach((line, y) =>
    line.forEach((num, x) => {
      const lowest = getNextPoints(y, x).reduce(
        (lowest, ad) => ad > num && lowest,
        true
      );
      tot += lowest ? num + 1 : 0;
    })
  );
  console.log(tot);
}

processing();
