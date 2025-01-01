interface IGameLevel {
  score: number;
  level: number;
  linesCleared: number;
}

export const GameLevel = ({ score, level, linesCleared }: IGameLevel) => {
  return (
    <div className="px-12 py-4 text-2xl font-bold text-center bg-gradient-to-b from-gray-700 to-gray-900 flex flex-col gap-2 rounded-xl shadow-lg border border-gray-600">
      <div className="flex flex-col gap-1">
        <span className="text-gray-400 text-xl">Score</span>
        <span className="text-yellow-300 font-mono text-4xl">{score}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-400 text-xl">Level</span>
        <span
          className={`
            font-mono text-4xl
            ${level >= 10 ? "text-yellow-300" : ""}
            ${level >= 5 && level < 10 ? "text-gray-300" : ""}
            ${level >= 3 && level < 5 ? "text-amber-600" : ""}
            ${level < 3 ? "text-gray-400" : ""}
          `}
        >
          {level}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-400 text-xl">Linhas</span>
        <span className="text-blue-400 font-mono text-4xl">{linesCleared}</span>
      </div>
    </div>
  );
};
