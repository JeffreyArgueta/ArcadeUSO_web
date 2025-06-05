import { useState } from "react";
// import Minesweeper from "@/components/games/Minesweeper";
// import TikTakToe from "@/components/games/TikTakToe";
// import Gachapon from "@/components/games/Gachapon";
import MinesweeperInstructions from "@/components/PixelModal/instrucciones-minesweeper";
import styles from "./Gachapon.module.css";

const Minesweeper = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <>
      <h1>Hola desde Minesweeper</h1>
      <div className={styles.Content}>
        {showInstructions && (
          <MinesweeperInstructions onClose={() => setShowInstructions(false)} />
        )}
      </div >
    </>
  );
};

export default Minesweeper;
