# 🧩 Sudoku Solver

An interactive, web-based Sudoku Solver that clears up even the most frustrating puzzles in milliseconds. Built to run directly in your browser via GitHub Pages.

🔗 **[Live Demo](https://trietminh799.github.io/sudoku_solver.github.io/)**

---

## 🚀 Features

* **Instant Solving:** Leverages an efficient backtracking algorithm to solve boards instantly.
* **Interactive Grid:** Easily click and input numbers into the 9x9 grid.
* **Visual Feedback:** Clear indications for invalid inputs or unsolvable boards.
* **Responsive Design:** Works smoothly on both desktop and mobile browsers.
* **One-Click Reset:** Clear the entire board to start fresh instantly.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Deployment:** GitHub Pages

---

## 🧠 How the Algorithm Works

This solver utilizes a **Backtracking Algorithm**, which is a depth-first search approach:
1. It searches for an empty cell on the board.
2. It attempts to place digits from 1 to 9 in that cell.
3. It checks if the digit is valid according to classic Sudoku rules (unique in its row, column, and 3x3 sub-grid).
4. If valid, it recursively repeats the process for the next empty cell.
5. If a dead-end is reached (no digit fits), it backtracks, erases the previous choice, and tries the next number.

---

## 💻 Getting Started

To run this project locally, you don't need to install any heavy dependencies. Just follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/TrietMinh799/sudoku_solver.github.io.git](https://github.com/TrietMinh799/sudoku_solver.github.io.git)