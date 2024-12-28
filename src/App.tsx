// React
import { useEffect, useState } from "react";

// Utils
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
  updateLevel,
  saveScoreBoard,
} from "./utils/gameRules";

// Components
import GameBoard from "./components/GameBoard";
import { GameOverModal } from "./components/GameOverModal";
import { GameLevel } from "./components/GameLevel";
import { ScoreBoard } from "./components/ScoreBoard";

function App() {
  // board state
  const [board, setBoard] = useState(createBoard(10, 15));
  const [currentPiece, setCurrentPiece] = useState(getRandomPiece());
  const [piecePosition, setPiecePosition] = useState({ x: 4, y: 0 });

  // game state
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(1000);
  const [linesCleared, setLinesCleared] = useState(0);

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
          saveScoreBoard(score);
        }
        setCurrentPiece(getRandomPiece());
        setPiecePosition({ x: 4, y: 0 });

        const { board: clearedBoard, linesCleared: newLinesCleared } =
          clearLines(newBoard);

        if (newLinesCleared > 0) {
          setBoard(clearedBoard);
          setScore(score + calculateScore(newLinesCleared));
          const { level: newLevel, speed: newSpeed } = updateLevel(
            linesCleared + newLinesCleared,
            level,
            speed
          );
          setLevel(newLevel);
          setSpeed(newSpeed);
          setLinesCleared(linesCleared + newLinesCleared);
        }
      }
    }, speed);

    return () => clearInterval(timer);
  }, [
    piecePosition,
    board,
    currentPiece,
    isGameOver,
    score,
    level,
    speed,
    linesCleared,
  ]);

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
    <div className="w-full h-screen flex items-center gap-10 justify-center pt-5">
      <div className="flex flex-col items-center gap-10 justify-start h-full">
        <GameLevel score={score} level={level} linesCleared={linesCleared} />
        <ScoreBoard />
      </div>
      <div className="flex h-full items-start">
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
