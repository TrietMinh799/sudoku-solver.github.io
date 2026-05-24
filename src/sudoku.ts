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

function findAvailable(arr: number[][], row: number, col: number) : number[] {
  const available: number[] = [];
  const used: boolean[] = new Array(10).fill(false);

  for(let i = 0; i < 9; ++i) {
    if (arr[row][i] !== 0) {
      used[arr[row][i]] = true;
    }
    if (arr[i][col] !== 0) {
      used[arr[i][col]] = true;
    }
  }
  
  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (arr[startRow + i][startCol + j] !== 0) {
        used[arr[startRow + i][startCol + j]] = true;
      }
    }
  }

  for (let num = 1; num <= 9; ++num) {
    if (!used[num]) {
      available.push(num);
    }
  }
  return available || [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
        let availableNumbers = findAvailable(arr, i, j);
        for (let num of availableNumbers) {
            arr[i][j] = num;

            if (solve(arr)) {
              return true;
            }
            arr[i][j] = 0;
        }
        return false;
      }
    }
  }
  return true;
}
