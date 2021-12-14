const inputToArray = require("../utils/inputToArray");

const has2SmallItems = (a) => {
  let nb = 0;
  a.forEach((item, idx) => {
    if (item === item.toLowerCase() && a.indexOf(item) !== idx) {
      nb++;
    }
  });
  return nb > 1;
};

async function processing() {
  const raw = await inputToArray((line) => line.split("-"));
  const pos = raw.reduce(
    (obj, line) => ({
      ...obj,
      [line[0]]: (obj[line[0]] || []).concat([line[1]]),
      [line[1]]: (obj[line[1]] || []).concat([line[0]]),
    }),
    {}
  );

  const paths = [];
  const buildPaths = (current) => {
    pos[current[0]].forEach((item) => {
      if (item === "start" || has2SmallItems(current)) return;
      if (item === "end") {
        paths.push(current.join(","));
        return;
      }
      buildPaths([item, ...current]);
    });
  };
  buildPaths(["start"]);
  console.log(paths.length);
}

processing();
