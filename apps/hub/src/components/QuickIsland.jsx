import { useState } from "preact/hooks";

export default function QuickIsland() {
  const [count, setCount] = useState(0);

  return (
    <div className="island-panel">
      <p className="island-text">
        Island ativo no cliente. Clique para testar hidratacao no browser.
      </p>
      <button
        type="button"
        className="island-button"
        onClick={() => setCount((value) => value + 1)}
      >
        Clicks: {count}
      </button>
    </div>
  );
}
