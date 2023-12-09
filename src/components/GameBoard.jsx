import Cross from '../assets/cross.png';
import Circle from '../assets/circle.png';

const GameBoard = ({ onSelectSquare, board }) => {
  return (
    <ol id='game-board'>
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null} >
                  {playerSymbol === 'X' ? <img src={Cross} alt="Cross" /> : null}
                  {playerSymbol === 'O' ? <img src={Circle} alt="Circle" /> : null}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;
