import './App.css';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import LogMessageMove from './components/LogMessageMove.jsx';
import { useState } from 'react';
import { COMBINATIONS_WIN } from './win.js';
import GameOver from './components/GameOver.jsx';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePLayer(gameTurns) {
  let currentPLayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPLayer = 'O';
  }

  return currentPLayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of COMBINATIONS_WIN) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdsSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdsSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = JSON.parse(JSON.stringify(initialGameBoard));
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]); //array which contains object: square(row, col index), player: x or o

  const activePlayer = deriveActivePLayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns(prevGameTurns => {
      const currentPLayer = deriveActivePLayer(prevGameTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPLayer }, ...prevGameTurns];
      console.log(updatedTurns)
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(players => {
      return {
        ...players,
        [symbol]: newName
      };
    });

    console.log(players);
  }

  return (
    <div id='game-container'>
      <ol id='players' className='highlight-player'>
        <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
        <Player initialName={PLAYERS.O} symbol="Y" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      <LogMessageMove turns={gameTurns} />
    </div>
  );
}

export default App;
