const gameBoard = {
    currentGameBoard: []
};

const gameControl = {};

const playerOne = {
    name: "player1",
    mark: "X",
    score: 0
};

const playerTwo = {
    name: "player2",
    mark: "O",
    score: 0
};

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