/* global React, ReactDOM */
import 'https://unpkg.com/react@18.2.0/umd/react.production.min.js';
import 'https://www.unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js';
import { getSquares, getMoves, initiateMovesList, X, O, whoWins } from '../base.js';

const root = ReactDOM.createRoot(document.body);
root.render(<MyApp />);

export function MyApp() {
  const [moves, setMoves] = React.useState(initiateMovesList);
  const [turn, setTurn] = React.useState(true);
  const [chase, setChase] = React.useState(true);

  const xPositions = getMoves(X, moves, chase);
  const oPositions = getMoves(O, moves, chase);
  const squares = getSquares(xPositions, oPositions);
  const done = whoWins(xPositions, oPositions);

  function move(position) {
    const player = turn ? X : O;
    console.log('move ', { player, position });

    moves[player].push(position);
    setMoves({ ...moves });
    setTurn(!turn);
  }

  function reset() {
    console.log('reset');

    setMoves(initiateMovesList);
    setTurn(true);
  }

  function flip() {
    console.log('flip');

    setChase(!chase);
  }

  return (
    <main>
      <h1 onClick={flip}>
        {done || (chase ? 'TIC TAC CHASE' : 'TIC TAC TOW')}
      </h1>

      <div>
        {squares.map(
          (square, index) => {
            const isActive = !square && !done;
            return (
              <button
                key={index}
                onClick={isActive && (() => move(index))}
                {...!isActive && { disabled: true }}
              >
                {square}
              </button>
            );
          }
        )}
      </div>

      <button onClick={reset} id="reset">RESET</button>
    </main>
  );
}
