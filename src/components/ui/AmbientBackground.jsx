import React from "react";
import { motion } from "framer-motion";

function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
      {/* Orb 1: Primary Accent (Blue-ish) */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-[-10%] w-[70vw] h-[70vw] bg-skin-accent/10 rounded-full blur-[120px] mix-blend-screen"
      />

      {/* Orb 2: Secondary (Purple/Pink tone if possible, or just variant) */}
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen"
      />

      {/* Orb 3: Bottom Center (Cyan/Teal) */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute bottom-[-10%] left-[20%] w-[80vw] h-[80vw] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen"
      />
    </div>
  );
}

export default AmbientBackground;
