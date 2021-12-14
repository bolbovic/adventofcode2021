const inputToArray = require("../utils/inputToArray");

async function processing() {
  const raw = await inputToArray((line) => line);
  let line = raw.shift();
  raw.shift();
  const transfos = raw.reduce(
    (obj, val) => ({ ...obj, [val.split(" -> ")[0]]: val.split(" -> ")[1] }),
    {}
  );

  let res = {};
  line.split("").forEach((l, idx) => {
    if (line[idx + 1]) {
      res[l + line[idx + 1]] = res[l + line[idx + 1]]
        ? res[l + line[idx + 1]] + 1
        : 1;
    }
  });
  for (let i = 0; i < 40; i++) {
    res = Object.keys(res).reduce((obj, val) => {
      const first = val[0] + transfos[val];
      const second = transfos[val] + val[1];
      if (!obj[first]) obj[first] = 0;
      if (!obj[second]) obj[second] = 0;
      obj[first] += res[val];
      obj[second] += res[val];
      return obj;
    }, {});
  }

  const letters = Object.keys(res).reduce(
    (obj, val) => ({
      ...obj,
      [val[0]]: (obj[val[0]] || 0) + res[val],
    }),
    { [line[line.length - 1]]: 1 }
  );
  const nums = Object.values(letters).sort();
  console.log(nums[nums.length - 1], nums[0], nums[nums.length - 1] - nums[0]);
}

processing();
