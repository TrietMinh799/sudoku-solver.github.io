function valid(
  arr: number[][],
  row: number,
  col: number,
  num: number,
): boolean {
  for (let i = 0; i < 9; ++i) {
    if (arr[row][i] === num || arr[i][col] === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (arr[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }
  return true;
}

function shuffle(arr: number[]) {
  const len = arr.length;
  for (let i = len - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function fillBoardRandomly(arr: number[][], row: number, col: number) {
  if (row == 9) return true;
  if (col == 9) return fillBoardRandomly(arr, row + 1, 0);
  if(arr[row][col] != 0) return fillBoardRandomly(arr, row, col + 1);

  const availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(num => valid(arr, row, col, num));
  shuffle(availableNumbers);
  for (const num of availableNumbers) {
    arr[row][col] = num;
    if (fillBoardRandomly(arr, row, col + 1)) {
      return true;
    }
    arr[row][col] = 0;
  }
  return false;
}

export function randomGenerate(blankCells: number): number[][] {
  const board: number[][] = Array.from({length: 9}).map(() => Array(9).fill(0));
  fillBoardRandomly(board, 0, 0);
  
  let removed = 0;
  while(removed < blankCells) {
    const row = Math.floor(Math.random() * 9)
    const col = Math.floor(Math.random() * 9)
    if(board[row][col] != 0) {
      board[row][col] = 0;
      ++removed;
    }
  }
  return board;
}
export function solve(arr: number[][], row: number, col: number): boolean {
  if (row === 9) {
    return true;
  }

  if (col === 9) {
    return solve(arr, row + 1, 0);
  }

  if (arr[row][col] != 0) {
    return solve(arr, row, col + 1);
  }

  const availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(num => valid(arr, row, col, num));
  for (const num of availableNumbers) {
    arr[row][col] = num;

    if (solve(arr, row, col + 1)) {
      return true;
    }
    arr[row][col] = 0;
  }
  return false;
}
