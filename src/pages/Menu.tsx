import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { ITetrisPages } from "../App";

export default function Menu({ onNavigate }: ITetrisPages) {
  const menuItems = [
    {
      title: "Iniciar Jogo",
      onClick: () => onNavigate("game"),
    },
    {
      title: "Como Jogar",
      onClick: () => onNavigate("howToPlay"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text tracking-tight">
          TETRIS
        </h1>
        <p className="text-gray-400 mt-2 text-lg">Clássico dos anos 80</p>
      </div>

      <div className="bg-gradient-to-b from-gray-700 to-gray-900 p-8 rounded-xl shadow-2xl border border-gray-600 max-w-md w-full">
        <div className="bg-gray-800/50 rounded-lg p-6 space-y-6">
          {menuItems.map((item) => (
            <button
              onClick={item.onClick}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
            text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 
            shadow-lg hover:shadow-blue-500/25 border border-blue-600/50
            flex items-center justify-center gap-3 text-lg"
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* <div className="flex justify-center gap-1">
          <button className="p-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-gray-300 hover:text-white flex items-center gap-2">
            <img src="/en-us.svg" alt="EN-US" className="size-full" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-gray-300 hover:text-white flex items-center gap-2">
            <img src="/pt-br.svg" alt="PT-BR" className="size-full" />
          </button>
        </div> */}
      </div>

      <div className="mt-8 text-gray-500 text-sm flex items-center gap-2">
        <a href="https://github.com/LukaVieira1" target="_blank">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/lukaviera/" target="_blank">
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
}
