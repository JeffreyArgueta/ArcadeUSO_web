import { useState } from "react";
import { createMinesweeperGame } from "@/services/minesweeper";
import { updateUser } from "@/services/api";

export const useMinesweeper = (user, setUser) => {
  const ROWS = 5;
  const COLS = 5;
  const NUM_BOMBS = 5;

  const [board, setBoard] = useState(generateBoard(ROWS, COLS, NUM_BOMBS));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  // const [usoCoins, setUsoCoins] = useState(user?.uso_coins || 0);
  const [usoCoins, setUsoCoins] = useState(0);
  const [usoCoinsAccumulated, setUsoCoinsAccumulated] = useState(0); // Uso Coins obtenidos en el juego

  // Generar el tablero
  function generateBoard(rows, cols, numBombs) {
    const board = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ revealed: false, value: "D" }))
    );

    let placedBombs = 0;
    while (placedBombs < numBombs) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (board[r][c].value !== "B") {
        board[r][c].value = "B";
        placedBombs++;
      }
    }
    return board;
  }

  // Manejo de clics en celdas
  const handleClick = async (row, col) => {
    if (gameOver || board[row][col].revealed) return;

    const newBoard = board.map(r => r.slice());
    newBoard[row][col].revealed = true;

    let won = false;

    if (newBoard[row][col].value === "B") {
      setGameOver(true);
      revealAll(newBoard);
      await saveGameToAPI(false); // Guardar partida como derrota
    } else {
      setScore(prevScore => prevScore + 10);
      setUsoCoinsAccumulated(prev => prev + 1);

      if (usoCoinsAccumulated + 1 >= 5) {
        setUsoCoins(prev => prev + 1);


        const response = await updateUser(user.id_user, { uso_coins: user.uso_coins + 1 });


        if (response) { setUser(response); }

        setUsoCoinsAccumulated(0);
      }

      if (checkWinCondition(newBoard)) {
        won = true;
        setGameOver(true);
        await saveGameToAPI(true); // Guardar partida como victoria
      }
    }

    setBoard(newBoard);
  };

  // Función para verificar si el usuario ha ganado
  const checkWinCondition = (board) => {
    return board.every(row => row.every(cell => cell.revealed || cell.value === "B"));
  };

  // Guardar la partida en la API
  const saveGameToAPI = async (won) => {
    try {
      const id_user = user?.id_user;
      const uso_coins_earned = usoCoins;

      if (!id_user || uso_coins_earned == null || won == null) {
        console.error("❌ Datos inválidos al enviar la partida:", { id_user, uso_coins_earned, won });
        return;
      }

      await createMinesweeperGame({ id_user, uso_coins_earned, won });

      setUsoCoinsAccumulated(0); // Reseteamos el acumulador solo si se registró en la base de datos
      setUsoCoins(0);

    } catch (error) {
      console.error("❌ Error guardando la partida:", error);
    }
  };


  // Revelar todas las celdas al perder
  const revealAll = (board) => {
    board.forEach(row => row.forEach(cell => (cell.revealed = true)));
  };

  // Reiniciar el juego sin límite de intentos
  const resetGame = () => {
    setBoard(generateBoard(ROWS, COLS, NUM_BOMBS));
    setGameOver(false);
    setScore(0);
    setUsoCoinsAccumulated(0);
  };

  return {
    board,
    score,
    gameOver,
    usoCoins,
    handleClick,
    resetGame,
  };
};
