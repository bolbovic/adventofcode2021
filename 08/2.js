const inputToArray = require("../utils/inputToArray");

const order = (arr) => arr.map((c) => c.split("").sort());
const includeNum = (ref, nb) =>
  ref.reduce((bool, i) => nb.includes(i) && bool, true);

async function processing() {
  let outputs = await inputToArray((line) =>
    line.split(" | ").map((line) => line.split(" "))
  );

  let tot = 0;
  outputs.forEach((line) => {
    const [input, output] = line.map(order);
    input.sort((a, b) => a.length - b.length);
    const tab = new Array(10);
    tab[1] = input.shift();
    tab[7] = input.shift();
    tab[4] = input.shift();
    tab[8] = input.pop();
    const zerothreenine = input.filter((nb) => includeNum(tab[1], nb));
    tab[3] = input.splice(input.indexOf(zerothreenine.shift()), 1)[0];
    tab[9] = input.splice(
      input.indexOf(zerothreenine.filter((nb) => includeNum(tab[4], nb))[0]),
      1
    )[0];

    tab[0] = zerothreenine.filter((nb) => ![tab[3], tab[9]].includes(nb))[0];
    tab[6] = input.filter(
      (nb) => ![tab[0], tab[9]].includes(nb) && nb.length === 6
    )[0];
    tab[5] = input.filter((nb) => includeNum(nb, tab[6]))[0];
    tab[2] = input.filter((nb) => !tab.includes(nb))[0];

    const strs = tab.map((num) => num.join(""));
    tot += parseInt(output.map((nb) => strs.indexOf(nb.join(""))).join(""));
  });
  console.log(tot);
}

processing();
