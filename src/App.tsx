import { useEffect, useState } from "react";
import {
  checkCollision,
  createBoard,
  fixPieceToBoard,
  getRandomPiece,
  movePiece,
} from "./utils/gameRules";
import GameBoard from "./components/GameBoard";

function App() {
  const [board, setBoard] = useState(createBoard(10, 20));
  const [currentPiece, setCurrentPiece] = useState(getRandomPiece());
  const [piecePosition, setPiecePosition] = useState({ x: 0, y: 4 });

  useEffect(() => {
    const timer = setInterval(() => {
      const newPosition = { x: piecePosition.x, y: piecePosition.y + 1 };
      if (!checkCollision(currentPiece, newPosition, board)) {
        console.log("newPosition", newPosition);
        setPiecePosition((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y + 1,
        }));
      } else {
        const newBoard = fixPieceToBoard(board, currentPiece, piecePosition);
        setBoard(newBoard);
        setCurrentPiece(getRandomPiece());
        setPiecePosition({ x: 4, y: 0 });
      }
    }, 500); // Velocidade de descida (1 segundo)

    return () => clearInterval(timer);
  }, [piecePosition, board, currentPiece]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setPiecePosition(movePiece(-1, piecePosition, currentPiece, board));
      } else if (event.key === "ArrowRight") {
        setPiecePosition(movePiece(1, piecePosition, currentPiece, board));
      } else if (event.key === "ArrowDown") {
        // dropPiece();
      } else if (event.key === "ArrowUp") {
        // rotatePiece();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [piecePosition, board, currentPiece]);

  return (
    <div>
      <GameBoard board={board} />
    </div>
  );
}

export default App;
