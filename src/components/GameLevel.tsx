interface IGameLevel {
  score: number;
  level: number;
  linesCleared: number;
}

export const GameLevel = ({ score, level, linesCleared }: IGameLevel) => {
  return (
    <div className="px-4 py-2 text-2xl font-bold text-center border-2 border-black mt-11 flex flex-col gap-2">
      <div className="text-4xl font-bold flex flex-col">
        Score:
        <span>{score}</span>
      </div>
      <div className="text-4xl font-bold flex flex-col">
        {" "}
        Level:
        <span>{level}</span>
      </div>
      <div className="text-4xl font-bold flex flex-col">
        {" "}
        Linhas:
        <span>{linesCleared}</span>
      </div>
    </div>
  );
};
