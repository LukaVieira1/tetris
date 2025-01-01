import { ITetrisPages } from "../App";

export default function Menu({ onNavigate }: ITetrisPages) {
  return (
    <div>
      <button onClick={() => onNavigate("game")}>Start Game</button>
    </div>
  );
}
