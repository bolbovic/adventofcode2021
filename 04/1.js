const inputToArray = require("../utils/inputToArray");

const bingo = (a) => a.filter((num) => num.includes("x")).length === 5;

async function processing() {
  const input = await inputToArray((line) => line);
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
  const allBoards = boards.concat(vertBoards);
  let solution = 0;
  for (let i = 0; i < draws.length && solution === 0; i++) {
    for (let j = 0; j < allBoards.length && solution === 0; j++) {
      for (let k = 0; k < allBoards[j].length && solution === 0; k++) {
        const line = allBoards[j][k];
        if (line.includes(draws[i])) {
          line[line.indexOf(draws[i])] += "x";
          if (bingo(line)) {
            const unmarkedSum = allBoards[j]
              .flat()
              .filter((num) => !num.includes("x"))
              .reduce((p, v) => p + parseInt(v), 0);
            solution = parseInt(draws[i]) * unmarkedSum;
          }
        }
      }
    }
  }
  console.log(solution);
}

processing();
