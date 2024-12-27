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
  resetGame,
  calculateScore,
} from "./utils/gameRules";
import GameBoard from "./components/GameBoard";
import { GameOverModal } from "./components/GameOverModal";

function App() {
  const [board, setBoard] = useState(createBoard(10, 20));
  const [currentPiece, setCurrentPiece] = useState(getRandomPiece());
  const [piecePosition, setPiecePosition] = useState({ x: 0, y: 4 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

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
          setScore(score + calculateScore(linesCleared));
        }
      }
    }, 500);

    return () => clearInterval(timer);
  }, [piecePosition, board, currentPiece, isGameOver, score]);

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

  const handleReset = () => {
    const { board, currentPiece, piecePosition, isGameOver } = resetGame();
    setBoard(board);
    setCurrentPiece(currentPiece);
    setPiecePosition(piecePosition);
    setIsGameOver(isGameOver);
    setScore(0);
  };

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-center gap-10">
      <div className="px-4 py-2 text-2xl font-bold text-center border-2 border-black mt-11">
        Score Board
        <div className="text-4xl font-bold"> Atual: {score}</div>
        <div className="text-4xl font-bold"> Melhor: {score}</div>
      </div>
      <div className="flex justify-center items-center">
        <GameBoard
          board={board}
          currentPiece={currentPiece}
          piecePosition={piecePosition}
        />
      </div>
      {isGameOver && <GameOverModal onReset={handleReset} />}
    </div>
  );
}

export default App;
