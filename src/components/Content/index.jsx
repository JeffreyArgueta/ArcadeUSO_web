import { useCallback } from "react";
import { useSound } from "@/context/soundContext";
import Minesweeper from "@/components/games/Minesweeper";
import TikTakToe from "@/components/games/TikTakToe";
import Gachapon from "@/components/games/Gachapon";
import "./index.css";

// Aquí debe añadir todas las imagenes de miniatura para los juegos
// Luego los añades al botón así " <img src={nombredelImport}/> "
import imgGachapon from "@/assets/Gachapon/Inserte Moneda.gif";

const Content = ({ selectedGame, setSelectedGame }) => {
  const { sounds } = useSound();
  const { playGame } = sounds;

  const handleClick = useCallback((game) => {
    playGame.play();
    setTimeout(() => setSelectedGame(game), 150);
  }, [setSelectedGame]);

  return (
    <div className="contentContainer">
      {!selectedGame ? (
        <>
          <h1 className="title">Selecciona un juego</h1>

          <div className="gameSelection">
            <button onClick={() => handleClick("minesweeper")} className="gameButton">
              <span className="nameGame">Buscaminas</span>
            </button>
            <button onClick={() => handleClick("gachapon")} className="gameButton">
              <img src={imgGachapon} />
              <span className="nameGame">Gachapon</span>
            </button>
            <button onClick={() => handleClick("tiktaktoe")} className="gameButton">
              <span className="nameGame">Tic Tac Toe</span>
            </button>

          </div>
        </>
      ) : (
        <div className="gameContainer">
          {selectedGame === "minesweeper" && <Minesweeper />}
          {selectedGame === "tiktaktoe" && <TikTakToe />}
          {selectedGame === "gachapon" && <Gachapon />}
        </div>
      )}
    </div>
  );
};

export default Content;
