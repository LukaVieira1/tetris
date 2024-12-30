export const NextPieces = ({
  nextPieces,
}: {
  nextPieces: { shape: number[][]; color: string }[];
}) => {
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
                  gridTemplateRows: `repeat(${piece.shape.length}, 1fr)`,
                  gridTemplateColumns: `repeat(${piece.shape[0].length}, 1fr)`,
                }}
              >
                {piece.shape.map((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${y}-${x}`}
                      className={`w-4 h-4 ${
                        cell !== 0 ? piece.color : "bg-transparent"
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
