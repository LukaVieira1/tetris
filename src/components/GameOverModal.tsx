export const GameOverModal = ({ onReset }: { onReset: () => void }) => {
  const handleReset = () => {
    onReset();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gradient-to-b from-gray-700 to-gray-900 p-8 rounded-xl shadow-2xl text-center border border-gray-600 max-w-md w-full mx-4">
        <div className="bg-gray-800/50 rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-red-500 tracking-wider">
              Game Over!
            </h2>
            <p className="text-gray-400 text-lg">Sua partida acabou!</p>
          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
              text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 
              shadow-lg hover:shadow-blue-500/25 border border-blue-600/50"
            onClick={handleReset}
          >
            Jogar Novamente
          </button>
        </div>
      </div>
    </div>
  );
};
