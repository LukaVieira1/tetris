// Types
import { ITetrisPages } from "../App";

// Icons
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowDown,
  FaArrowUp,
  FaKeyboard,
} from "react-icons/fa";
import { BsArrowReturnLeft } from "react-icons/bs";
import { MdSpaceBar } from "react-icons/md";

export default function HowToPlay({ onNavigate }: ITetrisPages) {
  const controls = [
    {
      icon: <FaArrowLeft size={24} />,
      description: "Move a peça para a esquerda",
    },
    {
      icon: <FaArrowRight size={24} />,
      description: "Move a peça para a direita",
    },
    {
      icon: <FaArrowDown size={24} />,
      description: "Acelera a queda da peça",
    },
    {
      icon: <FaArrowUp size={24} />,
      description: "Rotaciona a peça",
    },
    {
      icon: <MdSpaceBar size={24} />,
      description: "Faz a peça cair instantaneamente",
    },
    {
      icon: <FaKeyboard size={24} />,
      description: "Tecla P: Pausa o jogo",
    },
  ];

  const scoring = [
    {
      lines: 1,
      points: "100 pontos",
    },
    {
      lines: 2,
      points: "300 pontos",
    },
    {
      lines: 3,
      points: "500 pontos",
    },
    {
      lines: 4,
      points: "800 pontos",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-700 to-gray-900 p-8 rounded-xl shadow-2xl border border-gray-600 max-w-3xl w-full">
        <div className="bg-gray-800/50 rounded-lg p-6 space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Como Jogar
            </h1>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Controles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {controls.map((control, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700"
                >
                  <div className="bg-gray-800 p-3 rounded-lg">
                    {control.icon}
                  </div>
                  <span className="text-gray-300">{control.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              Sistema de Pontuação
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scoring.map((score, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-900/50 p-4 rounded-lg border border-gray-700"
                >
                  <span className="text-gray-300">
                    {score.lines} {score.lines === 1 ? "linha" : "linhas"}
                  </span>
                  <span className="text-yellow-400 font-bold">
                    {score.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-pink-400 mb-4">
              Sistema de Level
            </h2>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-300">
                A cada{" "}
                <span className="text-yellow-400 font-bold">10 linhas</span>{" "}
                eliminadas, você avança um nível. A velocidade do jogo aumenta a
                cada nível, tornando o desafio mais emocionante!
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => onNavigate("menu")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
              text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 
              shadow-lg hover:shadow-blue-500/25 border border-blue-600/50"
            >
              <BsArrowReturnLeft size={20} />
              Voltar ao Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
