export const NextPieces = ({
  nextPieces,
}: {
  nextPieces: { shape: number[][]; color: string }[];
}) => {
  return (
    <div className="px-6 py-4 text-2xl font-bold text-center bg-gradient-to-b from-gray-700 to-gray-900 flex flex-col gap-3 rounded-xl shadow-lg border border-gray-600">
      <h2 className="text-2xl font-bold text-yellow-400 tracking-wider">
        🎲 Próximas
      </h2>
      <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-3">
        <div className="flex flex-col gap-4 items-center justify-start w-full">
          {nextPieces.map((piece, index) => (
            <div
              key={index}
              className="grid bg-gray-800/30 p-5 rounded-lg w-full"
              style={{
                gridTemplateRows: `repeat(${piece.shape.length}, 1fr)`,
                gridTemplateColumns: `repeat(${piece.shape[0].length}, 1fr)`,
                justifyContent: "center",
              }}
            >
              {piece.shape.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    style={{
                      backgroundColor: cell !== 0 ? piece.color : "",
                    }}
                    key={`${y}-${x}`}
                    className={`size-5 rounded-sm ${
                      cell !== 0
                        ? `border border-black/20 shadow-md`
                        : "bg-transparent"
                    }`}
                  />
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NextPieces;
