export const NextPieces = ({
  nextPieces,
}: {
  nextPieces: { shape: number[][]; color: string }[];
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-black text-lg font-bold mb-4">Próximas peças</h2>
      <div className="relative w-40 border-2 border-black flex flex-col items-center p-4 bg-gray-300">
        <div className="flex flex-col gap-4 items-center justify-start w-full">
          <div className="flex flex-col gap-1 items-center justify-start w-full">
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
                      style={{
                        backgroundColor: cell !== 0 ? piece.color : "",
                      }}
                      key={`${y}-${x}`}
                      className={`size-4 rounded-[0.25rem] ${
                        cell !== 0
                          ? `border border-black shadow-lg`
                          : "bg-gray-300 "
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
