import { useState } from "react";
import Minesweeper from "@/components/games/Minesweeper";
import TikTakToe from "@/components/games/TikTakToe";
import Gachapon from "@/components/games/Gachapon";
import "./index.css";

// Aquí debe añadir todas las imagenes de miniatura para los juegos
// Luego los añades al botón así " <img src={nombredelImport}/> "
import imgGachapon from "../../assets/Gachapon/Inserte Moneda.gif";

const Content = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="contentContainer">
      <h1>Games</h1>
      {!selectedGame ? (
        <div className="gameSelection">
          <button onClick={() => setSelectedGame("minesweeper")} className="gameButton">
            <span className="nameGame">Buscaminas</span>
          </button>
          <button onClick={() => setSelectedGame("gachapon")} className="gameButton">
            <img src={imgGachapon}/>
            <span className="nameGame">Gachapon</span>
          </button>
          <button onClick={() => setSelectedGame("tiktaktoe")} className="gameButton">
            <span className="nameGame">Tic Tac Toe</span>
          </button>
        </div>
      ) : (
        <div className="gameContainer">
          {selectedGame === "minesweeper" && <Minesweeper />}
          {selectedGame === "tiktaktoe" && <TikTakToe />}
          {selectedGame === "gachapon" && <Gachapon />}
          <button onClick={() => setSelectedGame(null)} className="backButton">Volver al menú</button>
        </div>
      )}
    </div>
  );
};

export default Content;
