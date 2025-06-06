import React, { useState, useEffect } from 'react';
import Board from './board.jsx';
import { getUserData, updateCoins, submitScore, getTopPlayers } from './api.js';
import { saveGame, loadGame, deleteGame } from './gameService';
import TikTakToeInstructions from "@/components/PixelModal/instrucciones-tiktaktoe.jsx";
import './indexXO.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState(0);
  const [sessionUsoCoins, setSessionUsoCoins] = useState(0);
  const [rondas, setRondas] = useState(0);
  const [usoCoins, setUsoCoins] = useState(0);
  const [daroCoins, setDaroCoins] = useState(0);
  const [dificultad, setDificultad] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState('X');
  const [showSymbolAnimation, setShowSymbolAnimation] = useState(false);
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(true); // <-- Estado para la pantalla de carga
  const [showInstrucciones, setShowInstrucciones] = useState(true);

  const username = 'Randy';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para jugar.');
      // Redirige al login si tienes routing
      // window.location.href = '/login';
      return;
    }

    setLoading(true);
    setTimeout(() => {
      Promise.all([
        getUserData().then(data => {
          setUsoCoins(data.usoCoins);
          setDaroCoins(data.daroCoins);
          setScore(data.score);
        }),
        getTopPlayers().then(setTopPlayers),
        loadGame().then((data) => {
          if (data && data.board) {
            setBoard(data.board);
            setRondas(data.rondas);
            setPlayerSymbol(data.playerSymbol);
            setDificultad(data.dificultad);
            setSessionUsoCoins(data.sessionUsoCoins || 0);
            setShowModal(false);
          }
        })
      ])
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        // NO pongas setShowInstrucciones(true) aquí
      });
    }, 2000); // <-- 2 segundos de espera artificial
  }, []);

  useEffect(() => {
    if (!showModal && !showSymbolAnimation && rondas < 5) {
      saveGame({ board, rondas, playerSymbol, dificultad, sessionUsoCoins })
        .catch(console.error);
    }
  }, [board, rondas, playerSymbol, dificultad, sessionUsoCoins]);

  const volverAlMenu = () => {
    updateCoins({ usoCoins: usoCoins + sessionUsoCoins })
      .then(() => submitScore(score))
      .catch(console.error);

    deleteGame().catch(console.error);
    setUsoCoins(prev => prev + sessionUsoCoins);
    setShowEndGameModal(false);
    setShowModal(true);
    setBoard(initialBoard);
    setWinner(null);
    setRondas(0);
    setSessionUsoCoins(5);
    setScore(0);
  };

  const startGame = (level) => {
    // Eliminada la condición de UsoCoins para jugar
    setDificultad(level);
    setShowModal(false);
    const symbols = ['X', 'O'];
    const random = symbols[Math.floor(Math.random() * 2)];
    setPlayerSymbol(random);
    setShowSymbolAnimation(true);
    setTimeout(() => {
      setIsPlayerTurn(random === 'X');
      setShowSymbolAnimation(false);
    }, 2500);
  };

  const handleClick = (index) => {
    if (!isPlayerTurn || board[index] || winner || rondas >= 5 || showSymbolAnimation) return;
    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = (newBoard) => {
    for (const [a, b, c] of winningCombos) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return newBoard.includes(null) ? null : 'Empate';
  };

  const IAPlay = (currentBoard) => {
    const iaSymbol = playerSymbol === 'X' ? 'O' : 'X';

    if (dificultad === 'facil') {
      const empty = currentBoard.map((val, i) => val === null ? i : null).filter(i => i !== null);
      return empty[Math.floor(Math.random() * empty.length)];
    }

    const minimax = (board, isMaximizing, depth = 0, maxDepth = dificultad === 'medio' ? 2 : Infinity) => {
      const result = checkWinner(board);
      if (result === iaSymbol) return { score: 1 };
      if (result === playerSymbol) return { score: -1 };
      if (result === 'Empate') return { score: 0 };
      if (depth >= maxDepth) return { score: 0 };

      const moves = [];

      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          const newBoard = [...board];
          newBoard[i] = isMaximizing ? iaSymbol : playerSymbol;
          const result = minimax(newBoard, !isMaximizing, depth + 1, maxDepth);
          moves.push({ index: i, score: result.score });
        }
      }

      const bestMove = moves.reduce((best, move) =>
        (isMaximizing
          ? move.score > best.score
          : move.score < best.score)
          ? move : best
      );
      return bestMove;
    };

    const bestMove = minimax(currentBoard, true);
    return bestMove.index;
  };

  useEffect(() => {
    if (showSymbolAnimation) return;

    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      const win = result === playerSymbol;
      const tie = result === 'Empate';

      if (win) {
        let coinsWon = 0;
        if (dificultad === 'facil') coinsWon = 1;
        if (dificultad === 'medio') coinsWon = 2;
        if (dificultad === 'dificil') coinsWon = 3;

        setSessionUsoCoins(prev => prev + coinsWon);
        setScore(prev => prev + coinsWon);
      } else if (tie && dificultad === 'dificil') {
        setSessionUsoCoins(prev => prev + 1);
        setScore(prev => prev + 1);
      }

      if (win || tie || result === (playerSymbol === 'X' ? 'O' : 'X')) {
        setRondas(prev => {
          const newRound = prev + 1;
          if (newRound >= 5) {
            setShowEndGameModal(true);
          }
          return newRound;
        });
      }
    } else if (!isPlayerTurn && rondas < 5) {
      const index = IAPlay(board);
      if (index !== -1) {
        const newBoard = [...board];
        newBoard[index] = playerSymbol === 'X' ? 'O' : 'X';
        setTimeout(() => {
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }, 400);
      }
    }
  }, [board, isPlayerTurn]);

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setIsPlayerTurn(true);
  };

  const handleLogout = () => alert("Sesión cerrada");

 

  return (
    <div className="game-arcade">
      {showInstrucciones ? (
        <TikTakToeInstructions onClose={() => setShowInstrucciones(false)} />
      ) : showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Selecciona la dificultad</h2>
            <div className="difficulty-buttons horizontal">
              <button onClick={() => startGame('facil')}>Fácil</button>
              <button onClick={() => startGame('medio')}>Medio</button>
              <button onClick={() => startGame('dificil')}>Difícil</button>
            </div>
          </div>
        </div>
      )}

      {showSymbolAnimation && (
        <div className="modal">
          <div className="modal-content">
            <h2>Preparando partida...</h2>
            <p>Tu símbolo es:</p>
            <h1 style={{ fontSize: '64px' }}>{playerSymbol}</h1>
          </div>
        </div>
      )}

      {showEndGameModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>🎮 Fin del juego</h2>
            <p>Puntaje final: {score}</p>
            <p>UsoCoins ganadas: {sessionUsoCoins}</p>
            <button onClick={volverAlMenu}>Volver al menú</button>
          </div>
        </div>
      )}

      <div className="main-layout">
        <div className="card pixel-card left-panel">

          <p>Rondas: {rondas} / 5</p>
          <p>Puntaje: {score}</p>
          <p>Tu símbolo: {playerSymbol}</p>
          <p>UsoCoins ganadas: {sessionUsoCoins}</p>
       
        </div>

        {!showModal && !showSymbolAnimation && !showEndGameModal && (
          <div className="center-panel">
            <h1>Tic Tac Toe</h1>
            <p>Dificultad: <strong>{dificultad}</strong></p>
            <Board board={board} handleClick={handleClick} />
            {winner && rondas < 5 && (
              <>
                <h3>{winner === 'Empate' ? 'Empate' : `Ganó ${winner}`}</h3>
                <button onClick={resetGame}>Siguiente ronda</button>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default App;
