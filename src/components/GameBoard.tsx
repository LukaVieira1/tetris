import {
  calculateFinalPosition,
  mergePieceWithBoard,
} from "../utils/gameRules";

interface IGameBoard {
  board: { value: number; color: string }[][];
  currentPiece: { shape: number[][]; color: string };
  piecePosition: { x: number; y: number };
}

export const GameBoard = ({
  board,
  currentPiece,
  piecePosition,
}: IGameBoard) => {
  const finalPosition = calculateFinalPosition(
    currentPiece.shape,
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

  return (
    <div className="grid grid-cols-[repeat(10,minmax(0,45px))] grid-rows-[repeat(15,minmax(0,45px))] border-2 border-black bg-gray-800 rounded-lg p-1">
      {finalBoard.map((row, y) =>
        row.map((cell, x) => (
          <div
            style={{
              border: cell.value === -1 ? `2px solid ${cell.color}` : "",
              backgroundColor: cell?.value === 1 ? `${cell.color}` : "",
            }}
            key={`${x}-${y}`}
            className={`size-11 rounded-lg transition-transform duration-200 ${
              cell.value === 0
                ? "bg-black"
                : cell.value === 1
                ? `border border-black shadow-lg`
                : `bg-black shadow-lg`
            }`}
          ></div>
        ))
      )}
    </div>
  );
};
