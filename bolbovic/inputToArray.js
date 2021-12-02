const lineReader = require("line-reader");
const util = require("util");

const eachLine = util.promisify(lineReader.eachLine);

module.exports = async function inputToArray(
  fileName = "input.txt",
  ftc = (line) => parseInt(line)
) {
  const array = [];
  await eachLine(fileName, (line) => array.push(ftc(line)));
  return array;
};
