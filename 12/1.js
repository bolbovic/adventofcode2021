const inputToArray = require("../utils/inputToArray");

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
  console.log(pos);

  const paths = [];
  const buildPaths = (current) => {
    pos[current[0]].forEach((item) => {
      if (item === item.toLowerCase() && current.indexOf(item) !== -1) return;
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
