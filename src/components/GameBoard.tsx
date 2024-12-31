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
    <div className="bg-gradient-to-b from-gray-700 to-gray-900 p-4 rounded-xl shadow-lg border border-gray-600">
      <div className="bg-gray-800/50 rounded-lg p-3">
        <div className="grid grid-cols-[repeat(10,minmax(0,45px))] grid-rows-[repeat(15,minmax(0,45px))] bg-gray-900/80 rounded-lg p-1">
          {finalBoard.map((row, y) =>
            row.map((cell, x) => (
              <div
                style={{
                  border: cell.value === -1 ? `2px solid ${cell.color}40` : "",
                  backgroundColor:
                    cell?.value === 1 ? `${cell.color}` : "rgb(17 24 39)",
                }}
                key={`${x}-${y}`}
                className={`
                  size-11 rounded-sm transition-all
                  ${
                    cell.value === 1
                      ? `
                    border border-white/10 
                    shadow-lg shadow-black/50
                    hover:brightness-110
                  `
                      : cell.value === -1
                      ? `
                    shadow-inner
                    bg-gradient-to-br from-transparent to-black/30
                  `
                      : `
                    border border-black/40
                    shadow-inner
                  `
                  }
                `}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
