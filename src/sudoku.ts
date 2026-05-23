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

  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (arr[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }
  return true;
}

export function randomGenerate(): number[][] {
  const arr: number[][] = new Array(9).fill([]).map(() => new Array(9).fill(0));
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      if (Math.random() < 0.4) {
        const num: number = Math.floor(Math.random() * 9) + 1;
        if (valid(arr, i, j, num)) {
          arr[i][j] = num;
        }
      }
    }
  }
  return arr;
}

export function solve(arr: number[][]): boolean {
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      if (arr[i][j] === 0) {
        for (let num = 1; num <= 9; ++num) {
          if (valid(arr, i, j, num)) {
            arr[i][j] = num;

            if (solve(arr)) {
              return true;
            }
            arr[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}
