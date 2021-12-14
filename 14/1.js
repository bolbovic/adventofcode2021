const inputToArray = require("../utils/inputToArray");

async function processing() {
  const raw = await inputToArray((line) => line);
  let line = raw.shift();
  raw.shift();
  const transfos = raw.reduce(
    (obj, val) => ({ ...obj, [val.split(" -> ")[0]]: val.split(" -> ")[1] }),
    {}
  );

  for (let i = 0; i < 10; i++) {
    const res = {};
    line.split("").forEach((c) => {
      res[c] = res[c] !== undefined ? res[c] + 1 : 1;
    });
    line = line.split("").reduce((nl, char, idx) => {
      if (line[idx + 1] && transfos[char + line[idx + 1]]) {
        return nl + char + transfos[char + line[idx + 1]];
      } else if (!line[idx + 1]) {
        return nl + char;
      } else {
        return nl;
      }
    }, "");
  }
  const res = {};
  line.split("").forEach((c) => {
    res[c] = res[c] !== undefined ? res[c] + 1 : 1;
  });
  const nums = Object.values(res).sort();
  console.log(nums[nums.length - 1], nums[0], nums[nums.length - 1] - nums[0]);
}

processing();
