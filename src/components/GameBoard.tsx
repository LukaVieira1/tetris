import {
  calculateFinalPosition,
  mergePieceWithBoard,
} from "../utils/gameRules";

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
  const finalPosition = calculateFinalPosition(
    currentPiece,
    piecePosition,
    board
  );

  const boardWithShadow = mergePieceWithBoard(
    board,
    currentPiece,
    finalPosition,
    true
  );

  const finalBoard = mergePieceWithBoard(
    boardWithShadow,
    currentPiece,
    piecePosition
  );

  console.log(finalBoard);

  return (
    <div className="grid grid-cols-[repeat(10,minmax(0,45px))] grid-rows-[repeat(15,minmax(0,45px))] border-2 border-black">
      {finalBoard.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={`size-11 ${
              cell === 0
                ? "bg-gray-300"
                : cell === 1
                ? "bg-blue-500"
                : "bg-blue-300 opacity-50"
            }`}
          ></div>
        ))
      )}
    </div>
  );
};
