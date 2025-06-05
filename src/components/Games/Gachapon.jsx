import { useState } from "react";
// import Minesweeper from "@/components/games/Minesweeper";
// import TikTakToe from "@/components/games/TikTakToe";
// import Gachapon from "@/components/games/Gachapon";
import GachaponInstructions from "@/components/PixelModal/instrucciones-gachapon";
// import example from "../PixelModal/example";

import styles from "./Gachapon.module.css";

const Gachapon = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <>
      <h1>Hola desde Gachapon</h1>
      <div className={styles.Content}>
        {showInstructions && (
          <GachaponInstructions onClose={() => setShowInstructions(false)} />
        )}
      </div >
    </>
  );
};

export default Gachapon;
