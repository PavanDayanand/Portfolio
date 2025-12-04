import React, { useState } from "react";
import { motion } from "framer-motion";

const CardStack = ({ category, items, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-[400px] w-full max-w-[300px] mx-auto perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Title (Visible when stacked) */}
      <motion.div
        className="absolute -top-12 left-0 right-0 text-center z-50"
        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -20 : 0 }}
      >
        <h3 className="text-2xl font-black text-brand-dark">{category}</h3>
        <p className="text-sm text-gray-400">Hover to reveal</p>
      </motion.div>

      {/* The Stack */}
      <div className="relative w-full h-full flex items-center justify-center">
        {items.map((item, index) => {
          // Calculate fan position
          const rotation = isHovered
            ? (index - (items.length - 1) / 2) * 10
            : 0;
          const yOffset = isHovered
            ? (index - (items.length - 1) / 2) * -40
            : -index * 2;
          const scale = isHovered ? 1 : 1 - index * 0.05;
          const zIndex = items.length - index;

          return (
            <motion.div
              key={item}
              layoutId={`card-${item}`}
              onClick={() => onSelect(item)}
              className="absolute w-64 h-80 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-blue hover:text-white transition-colors group"
              style={{
                zIndex,
                transformOrigin: "bottom center",
              }}
              animate={{
                rotate: rotation,
                y: yOffset,
                scale: scale,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="text-xl font-bold group-hover:scale-110 transition-transform">
                {item}
              </div>
              <div className="mt-2 text-xs text-gray-400 group-hover:text-blue-100 opacity-0 group-hover:opacity-100 transition-opacity">
                Click for details
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CardStack;
