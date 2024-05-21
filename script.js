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
    const resetButton = document.getElementsByClassName("restart");
    let currentPlayer = playerOne;
    const score1 = document.getElementsByClassName("player-1-score");
    const score2 = document.getElementsByClassName("player-2-score");

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
        cells.forEach(cell => cell.addEventListener('click', handleClick, { once: true }));
    }

    function playGame() {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', handleClick, { once: true });
        });
        resetButton.addEventListener('click', restartGame);
    }

    function handleClick(event) {
        const cell = event.target;
        const index = Array.from(cells).indexOf(cell);
        move(index);
    }


    function move(index) {
        if (gameBoard.currentGameBoard[index] !== '') {
            return;
        }

        gameBoard.currentGameBoard[index] = currentPlayer.mark;
        currentPlayer.moves.push(index);
        render();

        if (checkWin(currentPlayer)) {
            alert(currentPlayer.name + " wins!");
            currentPlayer.score++;
            updateScores();
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
        score1.textContent = playerOne.score;
        score2.textContent = playerTwo.score;
    }

    function updateScores() {
        Array.from(score1).forEach(element => element.textContent = playerOne.score);
        Array.from(score2).forEach(element => element.textContent = playerTwo.score);
    }

    playGame()
})();

displayController();
