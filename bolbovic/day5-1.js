const inputToArray = require("./inputToArray");

async function processing() {
  let max = 0;
  const input = (
    await inputToArray("input-day5.txt", (line) =>
      line.split(" -> ").map((coord) => {
        const a = coord.split(",").map((c) => parseInt(c));
        if (a[0] > max) max = a[0];
        if (a[1] > max) max = a[1];
        return a;
      })
    )
  ).filter((c) => c[0][0] === c[1][0] || c[0][1] === c[1][1]);
  const grid = new Array(max + 1).fill([]);
  grid.forEach((_, idx) => {
    grid[idx] = new Array(max + 1).fill(0);
  });
  let sum = 0;
  input.forEach((c) => {
    let p1 = c[0];
    let p2 = c[1];
    if (p1[0] === p2[0]) {
      const from = p1[1] < p2[1] ? p1[1] : p2[1];
      const to = p1[1] < p2[1] ? p2[1] : p1[1];
      const x = p1[0];
      sum += to - from + 1;
      for (let y = from; y <= to; y++) {
        grid[x][y] = grid[x][y] + 1;
        console.log(from, to, x, y, grid[x][y]);
      }
    } else {
      const from = p1[0] < p2[0] ? p1[0] : p2[0];
      const to = p1[0] < p2[0] ? p2[0] : p1[0];
      const y = p1[1];
      sum += to - from + 1;
      for (let x = from; x <= to; x++) grid[x][y] = grid[x][y] + 1;
    }
  });
  const sol = grid
    .flat()
    .reduce((tot, point) => (point >= 2 ? tot + 1 : tot), 0);
  console.log(sol);
}

processing();
