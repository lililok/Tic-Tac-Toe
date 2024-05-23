const playerOne = {
    name: "Player 1",
    mark: '<img class="x" src="icons/bacon-svgrepo-com.svg" alt="bacon-mark-x">',
    score: 0,
    moves: [],
    current: true
};

const playerTwo = {
    name: "Player 2",
    mark: '<img class="o" src="icons/egg-svgrepo-com.svg" alt="egg-mark-o">',
    score: 0,
    moves: [], 
    current: false
};

const playGame = (function() {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.querySelector(".restart");
    let currentPlayer = playerOne;
    const score1 = document.querySelector(".player-1-score");
    const score2 = document.querySelector(".player-2-score");
    const turn1 = document.querySelector(".player-1-turn");
    const turn2 = document.querySelector(".player-2-turn");

    const gameBoard = {
        currentGameBoard: ['', '', '', '', '', '', '', '', '']
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', handleClick, { once: true });
    });
    resetButton.addEventListener('click', restartGame);

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
        turn1.textContent = 'Your turn';
        turn2.textContent = '';
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
            currentPlayer.score++;
            updateScores();
            setTimeout(() => {
                alert(currentPlayer.name + " wins!");
                restartGame();
            }, 100);
            return;
        }
        if (gameBoard.currentGameBoard.every(cell => cell !== '')) {
            setTimeout(() => {
                alert("It's a draw!");
                restartGame();
            }, 100);
            return;
        }
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        updateTurns();
    }

    function render() {
        cells.forEach((cell, index) => {
            cell.innerHTML = gameBoard.currentGameBoard[index];
        });
    }

    function updateScores() {
        score1.textContent = playerOne.score;
        score2.textContent = playerTwo.score;
    }

    function updateTurns() {
        if (currentPlayer === playerOne) {
            turn1.textContent = 'Your turn';
            turn2.textContent = '';
        } else {
            turn1.textContent = '';
            turn2.textContent = 'Your turn';
        }
    }
})();


