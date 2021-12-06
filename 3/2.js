const inputToArray = require("../utils/inputToArray");

async function processing() {
  let oxArray = await inputToArray((line) => {
    const obj = {};
    line.split("").forEach((bit, idx) => (obj[idx] = bit));
    return obj;
  });
  let co2Array = JSON.parse(JSON.stringify(oxArray));
  for (let i = 0; oxArray.length > 1; i++) {
    const numberOfOnes = oxArray.reduce(
      (tot, obj) => tot + parseInt(obj[i]),
      0
    );
    const biggerNumber = numberOfOnes >= oxArray.length / 2 ? "1" : "0";
    oxArray = oxArray.filter((obj) => obj[i] === biggerNumber);
  }

  for (let i = 0; co2Array.length > 1; i++) {
    const numberOfOnes = co2Array.reduce(
      (tot, obj) => tot + parseInt(obj[i]),
      0
    );
    const biggerNumber = numberOfOnes >= co2Array.length / 2 ? "0" : "1";
    co2Array = co2Array.filter((obj) => obj[i] === biggerNumber);
  }

  const oxygenGenerator = Object.values(oxArray[0]).join("");
  const co2Scrubber = Object.values(co2Array[0]).join("");
  console.log(
    oxygenGenerator,
    co2Scrubber,
    parseInt(oxygenGenerator, 2) * parseInt(co2Scrubber, 2)
  );
}

processing();
