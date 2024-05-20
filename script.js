const playerOne = {
    name: "player1",
    mark: "X",
    score: 0,
    moves: []
};

const playerTwo = {
    name: "player2",
    mark: "O",
    score: 0,
    moves: []
};

const displayController = (function() {
    const cells = document.querySelectorAll(".cell");
    const board = document.getElementsByClassName("board-container");
    const resetButton = document.getElementById("restart");
    let currentPlayer = playerOne;

    const gameBoard = {
        currentGameBoard: ['', '', '', '', '', '', '', '', '']
    };

    function checkWin(player) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], 
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], 
            [0, 4, 8],
            [2, 4, 6], 
        ];
        for (const combination of winningCombinations) {
            if (combination.every(cellIndex => player.moves.includes(cellIndex))) {
                return true; 
            }
        }
    
        return false; 
    }
    
    function restartGame() {
        gameBoard.currentGameBoard.fill('');
        playerOne.moves = [];
        playerTwo.moves = [];
        currentPlayer = playerOne;
        cells.forEach(cell => cell.textContent = "");
    }

    function playGame() {
        currentPlayer = playerOne;
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => move(index));
        });
        resetButton.addEventListener('click', restartGame);
    }

    function move(index) {
        if (gameBoard.currentGameBoard[index] !== '' || checkWin(playerOne) || checkWin(playerTwo)) {
            return;
        }

        gameBoard.currentGameBoard[index] = currentPlayer.mark;
        currentPlayer.moves.push(index);
        render();

        if (checkWin(currentPlayer)) {
            alert(currentPlayer.name + " wins!");
            restartGame();
            return;
        }
        if (gameBoard.currentGameBoard.every(cell => cell !== '')) {
            alert("It's a draw!");
            restartGame();
            return;
        }
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    function render() {
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard.currentGameBoard[index];
        });
    }
    playGame()
})();

displayController();
