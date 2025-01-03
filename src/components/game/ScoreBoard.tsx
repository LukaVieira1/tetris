import { useTranslation } from "react-i18next";
import { getScoreBoard } from "../../utils/gameRules";

export const ScoreBoard = () => {
  const { t } = useTranslation();
  const scores = getScoreBoard();

  return (
    <div
      data-cy="score-board"
      className="px-6 py-4 text-2xl font-bold text-center bg-gradient-to-b from-gray-700 to-gray-900 mt-11 flex flex-col gap-3 rounded-xl shadow-lg border border-gray-600"
    >
      <h1 className="text-2xl font-bold text-yellow-400 tracking-wider">
        🏆 {t("game.scoreBoard.title")}
      </h1>
      <ul className="flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-3 space-y-2">
        {scores.length > 0 ? (
          scores.map((score, index) => (
            <li
              key={index}
              className={`
                ${index === 0 ? "text-yellow-300 scale-105" : ""}
                ${index === 1 ? "text-gray-300" : ""}
                ${index === 2 ? "text-amber-600" : ""}
                ${index > 2 ? "text-gray-400" : ""}
                w-full px-4 py-2 text-lg font-semibold
                bg-gray-800/30 rounded-lg
                transition-all hover:scale-102 hover:bg-gray-800/50
                flex items-center justify-between
              `}
            >
              <span className="flex items-center gap-2">
                {t("game.scoreBoard.position", { position: index + 1 })} -{" "}
                {score} {t("game.scoreBoard.points")}
              </span>
            </li>
          ))
        ) : (
          <div className="text-center text-gray-500">
            {t("game.scoreBoard.noRecords")}
          </div>
        )}
      </ul>
    </div>
  );
};
