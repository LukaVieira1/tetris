export const GamePauseModal = ({ onContinue }: { onContinue: () => void }) => {
  const handleContinue = () => {
    onContinue();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Pausado!</h2>
        <p className="text-gray-700 mb-6 max-w-xs">
          Para retomar o jogo, pressione a tecla P ou clique no botão Continuar
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleContinue}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
