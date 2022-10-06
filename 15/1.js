const inputToArray = require("../utils/inputToArray");

async function processing() {
  const grid = await inputToArray((line) =>
    line.split("").map((c) => parseInt(c))
  );

  let best = 100000000000;
  const buildPaths = (current) => {
    //console.log(current);
    const [x, y] = current.path[0].split("-").map((c) => parseInt(c));
    const nextPossible = [];
    if (grid[y] && grid[y][x + 1]) nextPossible.push([x + 1, y]);
    if (grid[y] && grid[y][x - 1]) nextPossible.push([x - 1, y]);
    //if (grid[y + 1] && grid[y + 1][x]) nextPossible.push([x, y + 1]);
    //if (grid[y - 1] && grid[y - 1][x]) nextPossible.push([x, y - 1]);
    //if (best !== 100000000000)
    nextPossible.sort((a, b) => grid[a[1]][a[0]] - grid[b[1]][b[0]]);
    process.stdout.write(
      `best: ${best} - path: ${current.path.length} - ${x},${y}                             \r`
    );
    nextPossible.forEach((coord) => {
      const [x, y] = coord;
      if (
        //    !grid[coord[1]] ||
        //      !grid[coord[1]][coord[0]] ||
        current.path.length > 300 ||
        current.path.includes(coord.join("-")) ||
        current.nb > best
      )
        return;
      if (y === grid.length - 1 && x === grid[0].length - 1) {
        best = current.nb;
      } else {
        buildPaths({
          path: [coord.join("-")].concat(current.path),
          nb: current.nb + grid[y][x],
        });
      }
    });
  };
  buildPaths({ path: ["0-0"], nb: 1 });

  console.log(best);
}

processing();
