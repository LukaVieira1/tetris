import { useState } from "react";
import Game from "./pages/Game";
import Menu from "./pages/Menu";

const pages = {
  game: Game,
  menu: Menu,
};

export interface ITetrisPages {
  onNavigate: (page: "game" | "menu") => void;
}

function App() {
  const [page, setPage] = useState<"game" | "menu">("menu");

  const CurrentPageComponent = pages[page];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/bg-grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="relative">
        <CurrentPageComponent onNavigate={setPage} />
      </div>
    </div>
  );
}

export default App;
