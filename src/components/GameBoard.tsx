interface IGameBoard {
  board: number[][];
}

const GameBoard = ({ board }: IGameBoard) => {
  return (
    <div className="">
      <div className="grid grid-cols-10 grid-rows-20 ">
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`h-6 ${cell !== 0 ? "bg-blue-500" : "bg-gray-300"}`}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
