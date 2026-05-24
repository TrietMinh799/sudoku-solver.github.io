import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./App.css";
import { randomGenerate, solve } from "./sudoku";

const GRID_SIZE = 9;
const boxs: number[][] = new Array(GRID_SIZE)
  .fill(0)
  .map(() => new Array(GRID_SIZE).fill(0));

function App() {
  const [grid, setGrid] = useState<number[][]>(boxs.map((row) => [...row]));
  useEffect(() => {}, []);

  const handleOnChange = (i: number, j: number, value: number) => {
    if (value < 1 || value > 9) return;
    if (isNaN(value)) value = 0;
    const newGrid = [...grid];
    newGrid[i] = [...newGrid[i]];
    newGrid[i][j] = value;
    setGrid(newGrid);
  };

  const generate = () => {
    const newGrid = randomGenerate(40);
    setGrid(newGrid);
  };

  const solveSudoku = () => {
    solve(grid, 0, 0);
    setGrid([...grid]);
  };

  return (
    <div className="app-wrapper">
      <div className="app-header">
        <h1>
          Su<span>doku</span>
        </h1>
        <p>Logic puzzle solver</p>
      </div>

      <div className="sudoku-container">
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
                  <AnimatePresence initial={false}>
                    <motion.input
                      key={num + i * GRID_SIZE + j}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      type="number"
                      value={num === 0 ? "" : num}
                      min={1}
                      max={9}
                      disabled={boxs[i][j] !== 0}
                      onChange={(e) =>
                        handleOnChange(i, j, parseInt(e.target.value))
                      }
                    />
                  </AnimatePresence>
                </div>
              );
            });
          })}
        </div>

        <div className="controls">
          <motion.button
            onClick={generate}
            whileTap={{ y: 1 }}
            className="primary"
          >
            Generate
          </motion.button>
          <motion.button onClick={solveSudoku} whileTap={{ y: 1 }}>
            Solve
          </motion.button>
          <motion.button
            onClick={() => setGrid(boxs.map((row) => [...row]))}
            whileTap={{ y: 1 }}
          >
            Reset
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default App;
