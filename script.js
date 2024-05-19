const gameBoard = {
    currentGameBoard: ['', '', '', '', '', '', '', '', '']
};
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

const playGame = (function() {
    let currentPlayer = playerOne;


    function checkWin(moves) {
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
    }

    function restartGame() {
        gameBoard.currentGameBoard.fill('');
        playerOne.moves = [];
        playerTwo.moves = [];
        currentPlayer = playerOne;
    }

})();

