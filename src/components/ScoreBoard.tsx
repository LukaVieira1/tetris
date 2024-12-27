import { getScoreBoard } from "../utils/gameRules";

export const ScoreBoard = () => {
  const scores = getScoreBoard();
  return (
    <div className="px-4 py-2 text-2xl font-bold text-center border-2 border-black mt-11 flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Suas pontuações</h1>
      <ul className="flex flex-col items-center justify-center">
        {scores.map((score, index) => (
          <li key={index} className="text-lg">
            {index + 1}º - {score}
          </li>
        ))}
      </ul>
    </div>
  );
};
