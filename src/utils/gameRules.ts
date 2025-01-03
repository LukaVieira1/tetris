export const createBoard = (boardWidth: number, boardHeight: number) => {
  return Array.from({ length: boardHeight }, () =>
    Array.from({ length: boardWidth }, () => ({ value: 0, color: "" }))
  );
};

export const getRandomPiece = () => {
  const keys = Object.keys(SHAPES) as Array<keyof typeof SHAPES>;
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const piece = SHAPES[randomKey];

  const rotations = Math.floor(Math.random() * 4);
  for (let i = 0; i < rotations; i++) {
    piece.shape = rotateMatrix(piece.shape);
  }

  return {
    shape: piece.shape,
    color: piece.color,
  };
};

const SHAPES = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#3B82F6",
  },
  J: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
    color: "#4F46E5",
  },
  L: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#F97316",
  },
  O: {
    shape: [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    color: "#FBBF24",
  },
  S: {
    shape: [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#22C55E",
  },
  T: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#A855F7",
  },
  Z: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    color: "#EF4444",
  },
};

export const checkCollision = (
  piece: number[][],
  position: { x: number; y: number },
  board: { value: number; color: string }[][]
) => {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x] === 1) {
        const newX = x + position.x;
        const newY = y + position.y;

        if (newX < 0 || newX >= board[0].length || newY >= board.length) {
          return true;
        }

        if (board[newY] && board[newY][newX].value !== 0) {
          return true;
        }
      }
    }
  }
  return false;
};

export const fixPieceToBoard = (
  board: { value: number; color: string }[][],
  piece: { shape: number[][]; color: string },
  position: { x: number; y: number }
) => {
  if (position.y <= 0) {
    return { board: board, isGameOver: true };
  }

  const newBoard = board.map((row) => [...row]);

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        const boardY = position.y + y - 1;
        const boardX = position.x + x;

        if (
          boardY >= 0 &&
          boardY < newBoard.length &&
          boardX >= 0 &&
          boardX < newBoard[0].length
        ) {
          newBoard[boardY][boardX] = { value, color: piece.color };
        }
      }
    });
  });

  return { board: newBoard, isGameOver: false };
};

export const movePiece = (
  direction: number[],
  piecePosition: { x: number; y: number },
  currentPiece: number[][],
  board: { value: number; color: string }[][]
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
  board: { value: number; color: string }[][]
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
  board: { value: number; color: string }[][]
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
  board: { value: number; color: string | null }[][],
  piece: { shape: number[][]; color: string },
  position: { x: number; y: number },
  isShadow: boolean = false
) => {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        const newX = position.x + x;
        const newY = position.y + y;

        if (newBoard[newY] && newBoard[newY][newX] !== undefined) {
          newBoard[newY][newX] = isShadow
            ? { value: -1, color: piece.color }
            : { value, color: piece.color };
        }
      }
    });
  });

  return newBoard;
};

export const clearLines = (board: { value: number; color: string }[][]) => {
  const linesToClear = board
    .map((row, index) => (row.every((cell) => cell.value === 1) ? index : -1))
    .filter((index) => index !== -1);

  if (linesToClear.length === 0) {
    return { board, linesToClear: [], linesCleared: 0 };
  }

  const newBoard = board.filter((_, index) => !linesToClear.includes(index));
  const emptyLines = Array(linesToClear.length)
    .fill(null)
    .map(() => Array(board[0].length).fill({ value: 0, color: "" }));

  return {
    board: [...emptyLines, ...newBoard],
    linesToClear,
    linesCleared: linesToClear.length,
  };
};

export const resetGame = () => {
  return {
    board: createBoard(10, 15),
    piecePosition: { x: 4, y: -2 },
    isGameOver: false,
  };
};

export const calculateScore = (linesCleared: number) => {
  const pointsPerLine = {
    1: 100,
    2: 300,
    3: 500,
    4: 800,
  };

  let score = pointsPerLine[linesCleared as keyof typeof pointsPerLine] || 0;

  if (linesCleared > 4) {
    score += (linesCleared - 4) * 100;
  }

  return score;
};

export const saveScoreBoard = (score: number) => {
  const scores = JSON.parse(localStorage.getItem("scores") || "[]") as number[];

  if (scores.length < 3 || score > Math.min(...scores)) {
    if (scores.length < 3 && !scores.includes(score)) {
      scores.push(score);
    } else if (
      scores.length === 3 &&
      score > Math.min(...scores) &&
      !scores.includes(score)
    ) {
      scores[scores.length - 1] = score;
    }
  }

  scores.sort((a, b) => b - a);

  while (scores.length < 3) {
    scores.push(0);
  }

  localStorage.setItem("scores", JSON.stringify(scores));
};

export const getScoreBoard = () => {
  const scores = JSON.parse(localStorage.getItem("scores") || "[]") as number[];
  return scores;
};

export const updateLevel = (
  linesCleared: number,
  level: number,
  speed: number
) => {
  const linesPerLevel = 10;
  if (linesCleared >= level * linesPerLevel) {
    level += 1;
    speed = Math.max(100, speed - 100);
  }
  return { level, speed };
};

export const calculateFinalPosition = (
  piece: number[][],
  position: { x: number; y: number },
  board: { value: number; color: string }[][]
): { x: number; y: number } => {
  const dropPosition = { ...position };

  while (
    !checkCollision(piece, { x: dropPosition.x, y: dropPosition.y + 1 }, board)
  ) {
    dropPosition.y += 1;
  }

  return dropPosition;
};
