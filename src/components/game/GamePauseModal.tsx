import Swal from "sweetalert2";

export const GamePauseModal = ({
  onContinue,
  onBackToMenu,
}: {
  onContinue: () => void;
  onBackToMenu: () => void;
}) => {
  const handleContinue = () => {
    onContinue();
  };

  const handleBackToMenu = () => {
    Swal.fire({
      title: "Tem certeza que deseja voltar ao menu?",
      text: "Você perderá o progresso atual do jogo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, voltar ao menu",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "bg-gray-800 text-white",
        confirmButton:
          "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2",
        cancelButton:
          "bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded",
        title: "text-yellow-400",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        onBackToMenu();
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gradient-to-b from-gray-700 to-gray-900 p-8 rounded-xl shadow-2xl text-center border border-gray-600 max-w-md w-full mx-4">
        <div className="bg-gray-800/50 rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-yellow-400 tracking-wider">
              Pausado
            </h2>
            <p className="text-gray-400 text-lg">
              Para retomar o jogo, pressione a tecla P ou clique no botão abaixo
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
              text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 
              shadow-lg hover:shadow-blue-500/25 border border-blue-600/50"
              onClick={handleContinue}
            >
              Continuar
            </button>
            <button
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
              text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 
              shadow-lg hover:shadow-red-500/25 border border-red-600/50"
              onClick={handleBackToMenu}
            >
              Voltar ao menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};