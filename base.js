export function initiateSquares() {
  const squares = [
    MT, MT, MT,
    MT, MT, MT,
    MT, MT, MT
  ];
  return squares;
}

export function initiateMovesList() {
  const movesList = { [X]: [], [O]: [] };
  return movesList;
}

export function getMoves(player, movesList, chase = true) {
  const limit = chase ? -3 : 0;
  return movesList[player].slice(limit).sort();
}

export function getSquares(xPositions, oPositions) {
  const squares = initiateSquares();
  !xPositions?.length || xPositions.forEach((position) => { squares[position] = X; });
  !oPositions?.length || oPositions.forEach((position) => { squares[position] = O; });
  return squares;
}

export const MT = null;
export const X = 'X';
export const O = 'O';

export const winConditions = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6]
];

export function checkPositionsForWin(positions) {
  if (!positions?.length) {
    return false;
  }

  return winConditions.some((winCondition) =>
    winCondition.every((point) => positions.indexOf(point) >= 0)
  );
}

export function whoWins(xPositions, oPositions) {
  if (checkPositionsForWin(xPositions)) {
    return 'X wins';
  }

  if (checkPositionsForWin(oPositions)) {
    return 'O wins';
  }

  return '';
}
