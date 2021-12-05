const inputToArray = require("./inputToArray");

const bingo = (a) => a.filter((num) => num.includes("x")).length === 5;

async function processing() {
  const input = await inputToArray("input-day4.txt", (line) => line);
  const draws = input.shift().split(",");
  input.shift();
  let board = [];
  const boards = [];
  input.forEach((row) => {
    if (row === "") {
      boards.push(board);
      board = [];
    } else {
      board.push(row.split(" ").filter((n) => n != ""));
    }
  });
  const vertBoards = [];
  boards.forEach((board) =>
    vertBoards.push(
      board.map((_, idx) => [
        board[0][idx],
        board[1][idx],
        board[2][idx],
        board[3][idx],
        board[4][idx],
      ])
    )
  );
  let lastBoard = null;
  let lastDraw = "0";
  let i = 0;
  for (; i < draws.length && boards.length > 0; i++) {
    lastDraw = draws[i];
    for (let j = 0; j < boards.length; j++) {
      let found = false;
      for (let k = 0; !found && k < boards[j].length; k++) {
        const lineH = boards[j][k];
        const lineV = vertBoards[j][k];
        if (lineH.includes(lastDraw)) {
          lineH[lineH.indexOf(lastDraw)] += "x";
          if (bingo(lineH)) {
            found = true;
            lastBoard = JSON.parse(JSON.stringify(boards[j]));
          }
        }
        if (!found && lineV.includes(lastDraw)) {
          lineV[lineV.indexOf(lastDraw)] += "x";
          if (bingo(lineV)) {
            found = true;
            lastBoard = JSON.parse(JSON.stringify(vertBoards[j]));
          }
        }
        if (found) {
          boards.splice(j, 1);
          vertBoards.splice(j, 1);
          j--;
        }
      }
    }
  }
  const unmarkedSum = lastBoard
    .flat()
    .filter((num) => !num.includes("x"))
    .reduce((p, v) => p + parseInt(v), 0);
  const solution = parseInt(lastDraw) * unmarkedSum;

  console.log(lastDraw, unmarkedSum, solution, lastBoard);
}

processing();
