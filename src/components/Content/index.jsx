import { useState } from "react";
import Minesweeper from "@/components/games/Minesweeper";
import TikTakToe from "@/components/games/TikTakToe";
import Gachapon from "@/components/games/Gachapon";
import styles from "./Content.module.css";

const Content = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className={styles.contentContainer}>
      {!selectedGame ? (
        <div className={styles.gameSelection}>
          <button onClick={() => setSelectedGame("minesweeper")} className={styles.gameButton}>
            <span>Juego 1</span>
          </button>
          <button onClick={() => setSelectedGame("tiktaktoe")} className={styles.gameButton}>
            <span>Juego 2</span>
          </button>
          <button onClick={() => setSelectedGame("gachapon")} className={styles.gameButton}>
            <span>Juego 3</span>
          </button>
        </div>
      ) : (
        <div className={styles.gameContainer}>
          {selectedGame === "minesweeper" && <Minesweeper />}
          {selectedGame === "tiktaktoe" && <TikTakToe />}
          {selectedGame === "gachapon" && <Gachapon />}
          <button onClick={() => setSelectedGame(null)} className={styles.backButton}>Volver al menú</button>
        </div>
      )}
    </div>
  );
};

export default Content;
