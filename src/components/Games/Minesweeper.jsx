import React, { useState, useEffect } from 'react';
import styles from './Minesweeper.module.css';
import PantallaCarga from '@/components/pantallaCarga/pantalla-carga';
import InstruccionesModal from '@/components/modal/instrucciones-modal';
import nubesGif from "../../assets/animacion/nubes.gif";
import usoIcon from '../../assets/uso_coins.png';
import bomImg from '../../assets/bomba.png';

const ROWS = 5;
const COLS = 5;
const NUM_BOMBS = 5;
const TOTAL_ATTEMPTS = 5;
const USED_IN_TICTACTOE = 0; // Simulando que usó algunos intentos en otro juego

// Función para generar el tablero
function generateBoard(rows, cols, numBombs) {
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      revealed: false,
      value: 'D', // Por defecto todas son "diamantes"
    }))
  );
  let placedBombs = 0;
  while (placedBombs < numBombs) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (board[r][c].value !== 'B') {
      board[r][c].value = 'B';
      placedBombs++;
    }
  }
  return board;
}

const Minesweeper = () => {
  const [board, setBoard] = useState(generateBoard(ROWS, COLS, NUM_BOMBS));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [usoCoins, setUsoCoins] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  const remainingAttempts = TOTAL_ATTEMPTS - USED_IN_TICTACTOE - gamesPlayed;

  useEffect(() => {
    setTimeout(() => setShowInstructions(true), 100);
  }, []);

  const handleClick = (row, col) => {
    if (gameOver || board[row][col].revealed || remainingAttempts <= 0) return;

    // Crear copia del tablero
    const newBoard = board.map(r => r.slice());
    newBoard[row][col].revealed = true;

    if (newBoard[row][col].value === 'B') {
      setGameOver(true);
      revealAll(newBoard);
    } else {
      const newScore = score + 10;
      setScore(newScore);
      if (newScore % 50 === 0) {
        setUsoCoins(prev => prev + 1);
      }
    }
    setBoard(newBoard);
  };

  const revealAll = (board) => {
    board.forEach(row => row.forEach(cell => cell.revealed = true));
  };

  const resetGame = () => {
    if (remainingAttempts <= 0) return;
    setBoard(generateBoard(ROWS, COLS, NUM_BOMBS));
    setGameOver(false);
    setScore(0);
    setGamesPlayed(prev => prev + 1);
  };

  return (
    <PantallaCarga>
      {showInstructions && (
        <InstruccionesModal onClose={() => setShowInstructions(false)} />
      )}
      {/* Nubes decorativas */}
      <img className={`${styles.nubes} ${styles['nubes-izquierda']}`} src={nubesGif} alt="Nubes izquierda" draggable={false} />
      <img className={`${styles.nubes} ${styles['nubes-derecha']}`} src={nubesGif} alt="Nubes derecha" draggable={false} />

      {/* Contenedor del juego centrado */}
      <div className={styles.contenido}>
        {gameOver && <p className={styles.gameOver}>💥 ¡Perdiste! 💥</p>}
        <div className={styles.board}>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, colIndex) => (
                <button
                  key={colIndex}
                  className={styles.cell}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  disabled={remainingAttempts <= 0 || cell.revealed}
                >
                  {cell.revealed ? (
                    cell.value === 'B'
                      ? <img src={bomImg} alt="Bomba" style={{ width: 40, height: 40 }} />
                      : <img src={usoIcon} alt="Uso Coin" style={{ width: 40, height: 40 }} />
                  ) : null}
                </button>
              ))}
            </div>
          ))}
        </div>
        <button
          onClick={resetGame}
          className={styles.resetButton}
          disabled={remainingAttempts <= 0}
        >
          Reiniciar
        </button>
      </div>
    </PantallaCarga>
  );
};

export default Minesweeper;
