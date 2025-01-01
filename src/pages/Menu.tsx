import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { ITetrisPages } from "../App";
import { useTranslation } from "react-i18next";

export default function Menu({ onNavigate }: ITetrisPages) {
  const { t, i18n } = useTranslation();

  const menuItems = [
    {
      title: t("menu.startGame"),
      onClick: () => onNavigate("game"),
    },
    {
      title: t("menu.howToPlay"),
      onClick: () => onNavigate("howToPlay"),
    },
  ];

  // const handleLanguageChange = (language: string) => {
  //   i18n.changeLanguage(language);
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text tracking-tight">
          {t("menu.title")}
        </h1>
        <p className="text-gray-400 mt-2 text-lg">{t("menu.subtitle")}</p>
      </div>

      <div className="bg-gradient-to-b from-gray-700 to-gray-900 p-8 rounded-xl shadow-2xl border border-gray-600 max-w-md w-full">
        <div className="bg-gray-800/50 rounded-lg p-6 space-y-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
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

        {/* <div className="flex justify-center gap-1 mt-6">
          <button
            onClick={() => handleLanguageChange("en-US")}
            className={`p-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-gray-300 hover:text-white flex items-center gap-2 ${
              i18n.language === "en-US" ? "bg-gray-600" : ""
            }`}
          >
            <img src="/en-us.svg" alt="EN-US" className="w-8 h-8" />
          </button>
          <button
            onClick={() => handleLanguageChange("pt-BR")}
            className={`p-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-gray-300 hover:text-white flex items-center gap-2 ${
              i18n.language === "pt-BR" ? "bg-gray-600" : ""
            }`}
          >
            <img src="/pt-br.svg" alt="PT-BR" className="w-8 h-8" />
          </button>
        </div> */}
      </div>

      <div className="mt-8 text-gray-500 text-sm flex items-center gap-2">
        <a
          href="https://github.com/LukaVieira1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/lukaviera/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn size={20} />
        </a>
      </div>
    </div>
  );
}
