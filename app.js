import { getSquares, getMoves, initiateMovesList, X, O, whoWins } from './base.js';

game(({ squares, move, reset, done, flip, chase }) => {
  const div = document.querySelector('div');
  const buttons = div.querySelectorAll('button');
  buttons.forEach((button, index) => {
    button.innerHTML = squares[index];
    const isActive = !done && !squares[index];
    button.onclick = isActive ? () => move(index) : null;
    button.disabled = !isActive;
  });
  document.getElementById('reset').onclick = reset;
  const h = document.querySelector('h1');
  h.onclick = flip;
  h.innerHTML = done || (chase ? 'TIC TAC CHASE' : 'TIC TAC TOW');
});

function game(render) {
  const moves = initiateMovesList();
  let turn = false;
  let done = '';
  let chase = true;

  function move(position) {
    turn = !turn;
    const player = turn ? X : O;
    console.log('move ', { player, position });
    moves[player].push(position);

    rerender();
  }

  function reset() {
    console.log('reset');

    moves[X] = [];
    moves[O] = [];
    turn = false;
    done = '';

    rerender();
  }

  function flip() {
    console.log('flip');
    chase = !chase;
    rerender();
  }

  function rerender() {
    const xPositions = getMoves(X, moves, chase);
    const oPositions = getMoves(O, moves, chase);
    const squares = getSquares(xPositions, oPositions);
    done = whoWins(xPositions, oPositions);

    render({ squares, move, reset, done, flip, chase });
    done && console.log(done);
  }

  rerender();
}
