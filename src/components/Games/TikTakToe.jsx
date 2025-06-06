import { useState } from "react";
// import Minesweeper from "@/components/games/Minesweeper";
// import TikTakToe from "@/components/games/TikTakToe";
// import Gachapon from "@/components/games/Gachapon";
import TikTakToeInstructions from "@/components/PixelModal/instrucciones-tiktaktoe";
import styles from "./Gachapon.module.css";

const TikTakToe = ({ user, setUser }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <>
      <h1>Hola desde TikTakToe</h1>
      <div className={styles.Content}>
        {showInstructions && (
          <TikTakToeInstructions onClose={() => setShowInstructions(false)} />
        )}
      </div >
    </>
  );
};

export default TikTakToe;
