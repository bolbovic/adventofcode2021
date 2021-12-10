const inputToArray = require("../utils/inputToArray");

async function processing() {
  let grid = await inputToArray((line) =>
    line.split("").map((num) => parseInt(num))
  );

  const getNextPoints = (y, x) =>
    [
      { y, x: x + 1, num: grid[y][x + 1] },
      { y, x: x - 1, num: grid[y][x - 1] },
      { y: y + 1, x, num: (grid[y + 1] || [])[x] },
      { y: y - 1, x, num: (grid[y - 1] || [])[x] },
    ].filter((c) => c.num !== undefined);
  let bassins = [];
  grid.forEach((line, y) =>
    line.forEach((num, x) => {
      const lowest = getNextPoints(y, x).reduce(
        (lowest, ad) => ad.num > num && lowest,
        true
      );
      if (lowest) bassins.push({ y, x });
    })
  );
  bassins.forEach((bassin) => {
    const pool = [`${bassin.y}-${bassin.x}`];
    for (let i = 0; i < pool.length; i++) {
      const [y, x] = pool[i].split("-").map((c) => parseInt(c));
      getNextPoints(y, x).forEach((point) => {
        const p = `${point.y}-${point.x}`;
        if (point.num !== 9 && pool.indexOf(p) === -1) pool.push(p);
      });
    }
    bassin.pool = pool;
  });
  bassins.sort((a, b) => b.pool.length - a.pool.length);
  const tot = bassins
    .slice(0, 3)
    .reduce((tot, bassin) => bassin.pool.length * tot, 1);
  console.log(tot);
}

processing();
