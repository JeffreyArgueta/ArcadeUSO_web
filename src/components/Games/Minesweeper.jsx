import { useState } from "react";
import MinesweeperInstructions from "@/components/PixelModal/instrucciones-minesweeper";
import { useMinesweeper } from "@/hooks/useMinesweeper";
import clouds from "@/assets/gachapon/Nubes.gif";
import coins from "@/assets/uso_coins.png";
import bomb from "@/assets/buscaminas/bomba.png";
import styles from "./Minesweeper.module.css";

const Minesweeper = ({ user, setUser }) => {
  const { board, gameOver, usoCoins, handleClick, resetGame } = useMinesweeper(user, setUser);
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <div className={styles.Content}>
      {showInstructions && (
        <MinesweeperInstructions onClose={() => setShowInstructions(false)} />
      )}

      <img className={`${styles.nubes} ${styles['nubes-izquierda']}`} src={clouds} alt="Nubes izquierda" draggable={false} />
      <img className={`${styles.nubes} ${styles['nubes-derecha']}`} src={clouds} alt="Nubes derecha" draggable={false} />

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
                  disabled={cell.revealed}
                >
                  {cell.revealed ? (
                    cell.value === 'B'
                      ? <img src={bomb} alt="Bomba" style={{ width: 40, height: 40 }} />
                      : <img src={coins} alt="Uso Coin" style={{ width: 40, height: 40 }} />
                  ) : null}
                </button>
              ))}
            </div>
          ))}
        </div>

        <button
          onClick={resetGame}
          className={styles.resetButton}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default Minesweeper;
