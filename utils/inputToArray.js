const lineReader = require("line-reader");
const path = require("path");
const util = require("util");

const eachLine = util.promisify(lineReader.eachLine);
const getPathInputPath = (path) =>
  path.split("/").length > 1
    ? path.split("/").slice(0, -1).join("/")
    : process.cwd();

module.exports = async function inputToArray(ftc = (line) => parseInt(line)) {
  const array = [];
  const dir = getPathInputPath(process.argv[1]);
  await eachLine(dir + "/input.txt", (line) => array.push(ftc(line)));
  return array;
};
