import React from 'react';

const cellStyle = {
  width: '100px',
  height: '100px',
  border: '1px solid black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '36px',
  cursor: 'pointer'
};

const rowStyle = {
  display: 'flex'
};

const Board = ({ board, handleClick }) => {
  return (
    <div className="board">
      {board.map((cell, i) => (
        <div
          key={i}
          className="cell"
          onClick={() => handleClick(i)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export default Board;

