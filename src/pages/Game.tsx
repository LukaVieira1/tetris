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
} from "../utils/gameRules";

// Components
import { GameBoard } from "../components/game/GameBoard";
import { GameOverModal } from "../components/game/GameOverModal";
import { GameLevel } from "../components/game/GameLevel";
import { ScoreBoard } from "../components/game/ScoreBoard";
import { NextPieces } from "../components/game/NextPieces";
import { GamePauseModal } from "../components/game/GamePauseModal";

// Types
import { ITetrisPages } from "../App";

export default function Game({ onNavigate }: ITetrisPages) {
  // board state
  const [board, setBoard] = useState(createBoard(10, 15));
  const [currentPiece, setCurrentPiece] = useState(getRandomPiece());
  const [piecePosition, setPiecePosition] = useState({ x: 4, y: -2 });
  const [nextPieces, setNextPieces] = useState([
    getRandomPiece(),
    getRandomPiece(),
    getRandomPiece(),
  ]);

  // game state
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(1000);
  const [linesCleared, setLinesCleared] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [clearedLines, setClearedLines] = useState<number[]>([]);

  useEffect(() => {
    if (isGameOver || isPaused) return;
    const timer = setInterval(() => {
      const newPosition = { x: piecePosition.x, y: piecePosition.y + 1 };
      if (!checkCollision(currentPiece.shape, newPosition, board)) {
        setPiecePosition((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y + 1,
        }));
      }
    }, speed);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, isGameOver, score, level, speed, linesCleared, isPaused]);

  useEffect(() => {
    if (!checkCollision(currentPiece.shape, piecePosition, board)) return;

    const { board: newBoard, isGameOver } = fixPieceToBoard(
      board,
      currentPiece,
      piecePosition
    );

    if (isGameOver) {
      setIsGameOver(true);
      saveScoreBoard(score);
      return;
    }

    const { linesToClear } = clearLines(newBoard);

    if (linesToClear.length > 0) {
      setBoard(newBoard);

      setClearedLines(linesToClear);

      setTimeout(() => {
        const { board: clearedBoard } = clearLines(newBoard);
        setClearedLines([]);
        setBoard(clearedBoard);
        setScore(score + calculateScore(linesToClear.length));

        const { level: newLevel, speed: newSpeed } = updateLevel(
          linesCleared + linesToClear.length,
          level,
          speed
        );

        setLevel(newLevel);
        setSpeed(newSpeed);
        setLinesCleared(linesCleared + linesToClear.length);
      }, 500);
    } else {
      setBoard(newBoard);
    }

    setCurrentPiece(nextPieces[0]);
    setNextPieces((prev) => [...prev.slice(1), getRandomPiece()]);
    setPiecePosition({ x: 4, y: -2 });
  }, [
    board,
    isGameOver,
    score,
    level,
    speed,
    linesCleared,
    currentPiece,
    piecePosition,
    nextPieces,
  ]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isGameOver) return;
      if (event.key === "ArrowLeft") {
        setPiecePosition(
          movePiece([-1, 0], piecePosition, currentPiece.shape, board)
        );
      } else if (event.key === "ArrowRight") {
        setPiecePosition(
          movePiece([1, 0], piecePosition, currentPiece.shape, board)
        );
      } else if (event.key === "ArrowDown") {
        setPiecePosition(
          movePiece([0, 1], piecePosition, currentPiece.shape, board)
        );
      } else if (event.key === " ") {
        setPiecePosition(dropPiece(piecePosition, currentPiece.shape, board));
      } else if (event.key === "ArrowUp") {
        setCurrentPiece({
          shape: rotatePiece(piecePosition, currentPiece.shape, board),
          color: currentPiece.color,
        });
      } else if (event.key === "p" || event.key === "P") {
        setIsPaused(!isPaused);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [piecePosition, board, currentPiece, isGameOver, isPaused]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleReset = () => {
    const { board, piecePosition, isGameOver } = resetGame();
    setBoard(board);
    setNextPieces([getRandomPiece(), getRandomPiece(), getRandomPiece()]);
    setLevel(1);
    setSpeed(1000);
    setLinesCleared(0);
    setPiecePosition(piecePosition);
    setIsGameOver(isGameOver);
    setScore(0);
  };

  const handleContinue = () => {
    setIsPaused(false);
  };

  return (
    <div className="relative flex flex-col lg:flex-row items-start justify-center gap-4 lg:gap-6 p-2 lg:p-4 min-h-screen">
      <div className="flex flex-col items-center gap-4 lg:gap-6 order-2 lg:order-1 lg:mt-8">
        <ScoreBoard />
        <GameLevel score={score} level={level} linesCleared={linesCleared} />
      </div>

      <div className="flex items-start justify-center order-1 lg:order-2 lg:mt-8">
        <GameBoard
          board={board}
          currentPiece={currentPiece}
          piecePosition={piecePosition}
          clearedLines={clearedLines}
        />
      </div>

      <div className="flex items-center justify-center order-3 lg:mt-8">
        <NextPieces nextPieces={nextPieces} />
      </div>

      {isGameOver && <GameOverModal onReset={handleReset} />}
      {isPaused && (
        <GamePauseModal
          onContinue={handleContinue}
          onBackToMenu={() => onNavigate("menu")}
        />
      )}
    </div>
  );
}
