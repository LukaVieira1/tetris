export const createBoard = (boardWidth: number, boardHeight: number) => {
  return Array.from({ length: boardHeight }, () => Array(boardWidth).fill(0));
};

export const getRandomPiece = () => {
  const keys = Object.keys(SHAPES) as Array<keyof typeof SHAPES>;
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  let piece = SHAPES[randomKey];

  const rotations = Math.floor(Math.random() * 4);
  for (let i = 0; i < rotations; i++) {
    piece = rotateMatrix(piece);
  }

  return piece;
};

const SHAPES = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ],
  L: [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  T: [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  Z: [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
};

export const checkCollision = (
  piece: number[][],
  position: { x: number; y: number },
  board: number[][]
) => {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x] !== 0) {
        const newX = x + position.x;
        const newY = y + position.y;

        if (newX < 0 || newX >= board[0].length || newY >= board.length) {
          return true;
        }

        if (board[newY] && board[newY][newX] !== 0) {
          return true;
        }
      }
    }
  }
  return false;
};

export const fixPieceToBoard = (
  board: number[][],
  piece: number[][],
  position: { x: number; y: number }
) => {
  if (position.y === 0) {
    return { board: board, isGameOver: true };
  }

  const newBoard = [...board];
  piece.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        newBoard[position.y + y][position.x + x] = value;
      }
    });
  });

  return { board: newBoard, isGameOver: false };
};

export const movePiece = (
  direction: number[],
  piecePosition: { x: number; y: number },
  currentPiece: number[][],
  board: number[][]
) => {
  const newPosition = {
    x: piecePosition.x + direction[0],
    y: piecePosition.y + direction[1],
  };

  if (!checkCollision(currentPiece, newPosition, board)) {
    return newPosition;
  }
  return piecePosition;
};

export const rotatePiece = (
  piecePosition: { x: number; y: number },
  currentPiece: number[][],
  board: number[][]
) => {
  const rotatedPiece = rotateMatrix(currentPiece);

  if (!checkCollision(rotatedPiece, piecePosition, board)) {
    return rotatedPiece;
  }
  return currentPiece;
};

const rotateMatrix = (matrix: number[][]) => {
  return matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());
};

export const dropPiece = (
  piecePosition: { x: number; y: number },
  currentPiece: number[][],
  board: number[][]
) => {
  const newPosition = { ...piecePosition };

  while (
    !checkCollision(
      currentPiece,
      { ...newPosition, y: newPosition.y + 1 },
      board
    )
  ) {
    newPosition.y += 1;
  }

  return newPosition;
};

export const mergePieceWithBoard = (
  board: number[][],
  piece: number[][],
  position: { x: number; y: number }
) => {
  const newBoard = board.map((row) => [...row]);

  piece.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        const newX = position.x + x;
        const newY = position.y + y;

        if (newBoard[newY] && newBoard[newY][newX] !== undefined) {
          newBoard[newY][newX] = value;
        }
      }
    });
  });

  return newBoard;
};

export const clearLines = (board: number[][]) => {
  const clearedBoard = board.filter((row) => row.some((cell) => cell === 0));
  const linesCleared = board.length - clearedBoard.length;

  while (clearedBoard.length < board.length) {
    clearedBoard.unshift(new Array(board[0].length).fill(0));
  }

  return { board: clearedBoard, linesCleared };
};

export const resetGame = () => {
  return {
    board: createBoard(10, 20),
    currentPiece: getRandomPiece(),
    piecePosition: { x: 4, y: 0 },
    score: 0,
    isGameOver: false,
  };
};
