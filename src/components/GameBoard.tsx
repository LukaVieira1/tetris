import { motion, AnimatePresence } from "framer-motion";
import {
  calculateFinalPosition,
  mergePieceWithBoard,
} from "../utils/gameRules";

interface IGameBoard {
  board: { value: number; color: string }[][];
  currentPiece: { shape: number[][]; color: string };
  piecePosition: { x: number; y: number };
  clearedLines?: number[];
}

export const GameBoard = ({
  board,
  currentPiece,
  piecePosition,
  clearedLines = [],
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
    <div className="bg-gradient-to-b from-gray-700 to-gray-900 p-3 rounded-xl shadow-lg border border-gray-600">
      <div className="bg-gray-800/50 rounded-lg p-2">
        <div className="grid grid-cols-[repeat(10,minmax(0,35px))] grid-rows-[repeat(15,minmax(0,35px))] bg-gray-900/80 rounded-lg p-1">
          <AnimatePresence>
            {finalBoard.map((row, y) =>
              row.map((cell, x) => (
                <motion.div
                  key={`${x}-${y}`}
                  animate={{
                    scale: clearedLines.includes(y) ? 0 : 1,
                    transition: {
                      duration: clearedLines.includes(y) ? 0.3 : 0,
                      delay: clearedLines.includes(y) ? x * 0.05 : 0,
                    },
                  }}
                  style={{
                    border:
                      cell.value === -1 ? `2px solid ${cell.color}40` : "",
                    backgroundColor:
                      cell?.value === 1 ? `${cell.color}` : "rgb(17 24 39)",
                  }}
                  className={`
                    size-8 sm:size-9 rounded-sm
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
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
