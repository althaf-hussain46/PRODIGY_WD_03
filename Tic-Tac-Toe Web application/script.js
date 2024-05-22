// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let game
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        if (board[cellIndex] !== null || !gameActive) {
            return;
        }

        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            status.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (board.every(cell => cell !== null)) {
            status.textContent = "It's a draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `It's ${currentPlayer}'s turn`;
    }

    function checkWin() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return board[a] !== null && board[a] === board[b] && board[a] === board[c];
        });
    }

    function restartGame() {
        board = Array(9).fill(null);
        gameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = '');
        status.textContent = `It's ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    status.textContent = `It's ${currentPlayer}'s turn`;
});
