import React, { useEffect, useState } from "react";

function CommandPaletteBurst() {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const handleBurst = (event) => {
      const { x = 0, y = 0 } = event.detail || {};
      const id = crypto.randomUUID ? crypto.randomUUID() : Date.now();
      setBursts((prev) => [...prev, { id, x, y }]);

      setTimeout(() => {
        setBursts((prev) => prev.filter((burst) => burst.id !== id));
      }, 240);
    };

    window.addEventListener("command-palette-burst", handleBurst);
    return () => {
      window.removeEventListener("command-palette-burst", handleBurst);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[12000]">
      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="palette-burst"
          style={{
            left: `${burst.x}px`,
            top: `${burst.y}px`,
          }}
        />
      ))}
    </div>
  );
}

export default CommandPaletteBurst;
