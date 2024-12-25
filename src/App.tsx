import { useEffect, useState } from "react";
import {
  checkCollision,
  clearLines,
  createBoard,
  dropPiece,
  fixPieceToBoard,
  getRandomPiece,
  movePiece,
  rotatePiece,
} from "./utils/gameRules";
import GameBoard from "./components/GameBoard";
import { GameOverModal } from "./components/GameOverModal";
function App() {
  const [board, setBoard] = useState(createBoard(10, 20));
  const [currentPiece, setCurrentPiece] = useState(getRandomPiece());
  const [piecePosition, setPiecePosition] = useState({ x: 0, y: 4 });
  const [isGameOver, setIsGameOver] = useState(false);
  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      const newPosition = { x: piecePosition.x, y: piecePosition.y + 1 };
      if (!checkCollision(currentPiece, newPosition, board)) {
        setPiecePosition((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y + 1,
        }));
      } else {
        const { board: newBoard, isGameOver } = fixPieceToBoard(
          board,
          currentPiece,
          piecePosition
        );
        setBoard(newBoard);
        if (isGameOver) {
          setIsGameOver(true);
        }
        setCurrentPiece(getRandomPiece());
        setPiecePosition({ x: 4, y: 0 });

        const { board: clearedBoard, linesCleared } = clearLines(newBoard);
        if (linesCleared > 0) {
          setBoard(clearedBoard);
        }
      }
    }, 500);

    return () => clearInterval(timer);
  }, [piecePosition, board, currentPiece, isGameOver]);

  useEffect(() => {}, [board]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isGameOver) return;
      if (event.key === "ArrowLeft") {
        setPiecePosition(
          movePiece([-1, 0], piecePosition, currentPiece, board)
        );
      } else if (event.key === "ArrowRight") {
        setPiecePosition(movePiece([1, 0], piecePosition, currentPiece, board));
      } else if (event.key === "ArrowDown") {
        setPiecePosition(movePiece([0, 1], piecePosition, currentPiece, board));
      } else if (event.key === " ") {
        setPiecePosition(dropPiece(piecePosition, currentPiece, board));
      } else if (event.key === "ArrowUp") {
        setCurrentPiece(rotatePiece(piecePosition, currentPiece, board));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [piecePosition, board, currentPiece, isGameOver]);

  return (
    <div>
      <GameBoard
        board={board}
        currentPiece={currentPiece}
        piecePosition={piecePosition}
      />
      {isGameOver && <GameOverModal />}
    </div>
  );
}

export default App;
