import { mergePieceWithBoard } from "../utils/gameRules";

interface IGameBoard {
  board: number[][];
  currentPiece: number[][];
  piecePosition: { x: number; y: number };
}

export const GameBoard = ({
  board,
  currentPiece,
  piecePosition,
}: IGameBoard) => {
  const displayBoard = mergePieceWithBoard(board, currentPiece, piecePosition);

  return (
    <div className="grid grid-cols-[repeat(10,minmax(0,45px))] grid-rows-[repeat(15,minmax(0,45px))] border-2 border-black">
      {displayBoard.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={`size-11 ${cell !== 0 ? "bg-blue-500" : "bg-gray-300"}`}
          ></div>
        ))
      )}
    </div>
  );
};
