import { useEffect, useState } from "react";
import "./App.css";
import { randomGenerate, solve } from "./sudoku";

const GRID_SIZE = 9;
const boxs: number[][] = new Array(GRID_SIZE)
  .fill(0)
  .map(() => new Array(GRID_SIZE).fill(0));

function App() {
  const [grid, setGrid] = useState<number[][]>(boxs.map((row) => [...row]));
  useEffect(() => { }, []);

  const handleOnChange = (i: number, j: number, value: number) => {
    if (value < 1 || value > 9) return;
    if (isNaN(value)) value = 0;
    const newGrid = [...grid];
    newGrid[i] = [...newGrid[i]];
    newGrid[i][j] = value;
    setGrid(newGrid);
  };

  const generate = () => {
    const newGrid = randomGenerate();
    setGrid(newGrid);
  }

  const solveSudoku = () => {
    solve(grid);
    setGrid([...grid]);
  }

  return (
    <div>
      <h1>Sudoku solver</h1>
      <div className="sudoku">
        {grid.map((row, i) => {
          return row.map((num, j) => {
            const isThirdCol = (j + 1) % 3 === 0;
            const isThirdRow = Math.floor(i + 1) % 3 === 0;
            const classes = ["box"];
            if (isThirdCol) classes.push("third-col");
            if (isThirdRow) classes.push("third-row");

            return (
              <div key={i * GRID_SIZE + j} className={classes.join(" ")}>
                <input
                  type="number"
                  value={num == 0 ? "" : num}
                  min={1}
                  max={9}
                  disabled={boxs[i][j] !== 0}
                  onChange={(e) =>
                    handleOnChange(i, j, parseInt(e.target.value))
                  }
                />
              </div>
            );
          });
        })}
      </div>
      <button onClick={generate}>Generate</button>
      <button onClick={solveSudoku}>Solve</button>
      <button onClick={() => setGrid(boxs.map((row) => [...row]))}>Reset</button>
    </div>
  );
}

export default App;
