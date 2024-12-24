import { mergePieceWithBoard } from "../utils/gameRules";

interface IGameBoard {
  board: number[][];
  currentPiece: number[][];
  piecePosition: { x: number; y: number };
}

const GameBoard = ({ board, currentPiece, piecePosition }: IGameBoard) => {
  const displayBoard = mergePieceWithBoard(board, currentPiece, piecePosition);

  return (
    <div className="grid grid-cols-10 grid-rows-20">
      {displayBoard.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={`h-6 ${cell !== 0 ? "bg-blue-500" : "bg-gray-300"}`}
          ></div>
        ))
      )}
    </div>
  );
};

export default GameBoard;
