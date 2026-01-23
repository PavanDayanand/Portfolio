import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const GlassBrickImage = ({ src, alt, className = "" }) => {
  const [columns, setColumns] = useState(10);
  const [rows, setRows] = useState(10);
  const containerRef = useRef(null);

  // Calculate grid size based on container dimensions
  useEffect(() => {
    const calculateGrid = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const cellSize = 60; // Desired cell size in pixels
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setTimeout(() => setIsHovered(false), 300)} // Delay reset for "tail" effect
      animate={{
        backdropFilter: isHovered ? "blur(0px)" : "blur(10px)",
        backgroundColor: isHovered
          ? "rgba(255, 255, 255, 0)"
          : "rgba(255, 255, 255, 0.05)",
        // borderColor: isHovered
        //   ? "rgba(255, 255, 255, 0)"
        //   : "rgba(255, 255, 255, 0.1)",
      }}
      transition={{ duration: 0.4 }}
      className="relative w-full h-full border-[0.5px] border-white/10"
    />
  );
};

export default GlassBrickImage;
