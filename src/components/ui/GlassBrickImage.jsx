import React, { useState, useEffect, useRef } from "react";

const GlassBrickImage = ({ src, alt, className = "" }) => {
  const [columns, setColumns] = useState(10);
  const [rows, setRows] = useState(10);
  const containerRef = useRef(null);

  // Calculate grid size based on container dimensions
  useEffect(() => {
    const calculateGrid = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const cellSize = 100; // Increased cell size for performance
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      setColumns(cols);
      setRows(rows);
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-105"
      />

      {/* Glass Brick Overlay */}
      <div
        className="absolute inset-0 z-10 grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: columns * rows }).map((_, i) => (
          <GlassCell key={i} />
        ))}
      </div>
    </div>
  );
};

const GlassCell = () => {
  return (
    <div className="relative w-full h-full border-[0.5px] border-white/10 transition-all duration-300 hover:backdrop-blur-none hover:bg-transparent bg-white/5 backdrop-blur-[10px]" />
  );
};

export default GlassBrickImage;
