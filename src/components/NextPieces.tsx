export const NextPieces = ({ nextPieces }: { nextPieces: number[][][] }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-black text-lg font-bold mb-4">Próximas peças</h2>
      <div className="relative w-40 h-64 border-2 border-black flex flex-col items-center p-4">
        <div className="flex flex-col gap-4 items-center justify-start w-full">
          <div className="flex flex-col gap-4 items-center justify-start w-full">
            {nextPieces.map((piece, index) => (
              <div
                key={index}
                className="grid"
                style={{
                  gridTemplateRows: `repeat(${piece.length}, 1fr)`,
                  gridTemplateColumns: `repeat(${piece[0].length}, 1fr)`,
                }}
              >
                {piece.map((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${y}-${x}`}
                      className={`w-4 h-4 ${
                        cell !== 0 ? "bg-blue-500" : "bg-transparent"
                      }`}
                    />
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextPieces;