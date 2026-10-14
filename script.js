
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const playerX = document.getElementById("playerX");
const playerO = document.getElementById("playerO");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = Number(cell.dataset.index);

    if (board[index] !== "" || !gameActive) {
      return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
      statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
      gameActive = false;
      return;
    }

    if (board.every((value) => value !== "")) {
      statusText.textContent = "🤝 It's a Draw!";
      gameActive = false;
      playerX.classList.remove("active");
      playerO.classList.remove("active");
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    updateActivePlayer();
  });
});

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      combination.forEach((index) => {
        cells[index].classList.add("winner");
      });

      playerX.classList.remove("active");
      playerO.classList.remove("active");

      return true;
    }
  }

  return false;
}

function updateActivePlayer() {
  playerX.classList.toggle("active", currentPlayer === "X");
  playerO.classList.toggle("active", currentPlayer === "O");
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o", "winner");
  });

  statusText.textContent = "Player X's turn";
  updateActivePlayer();
}

restartBtn.addEventListener("click", restartGame);
