const lineReader = require("line-reader");
const util = require("util");

const eachLine = util.promisify(lineReader.eachLine);

module.exports = async function inputToArray() {
  const array = [];
  await eachLine("input.txt", (line) => array.push(parseInt(line)));
  return array;
};
