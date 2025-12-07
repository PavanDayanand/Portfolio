import React from "react";
import { motion } from "framer-motion";

const techs = [
  "Python",
  "React",
  "Tailwind CSS",
  "SQL",
  "Scikit-Learn",
  "TensorFlow",
  "PowerBI",
  "TypeScript",
  "Node.js",
  "Git",
  "PostgreSQL",
  "Framer Motion",
];

function TechMarquee() {
  return (
    <div className="relative flex overflow-hidden py-8 bg-skin-base border-y border-skin-border-base/50">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-skin-base to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-skin-base to-transparent" />

      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1035] }} // Adjust based on content width
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {[...techs, ...techs, ...techs].map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-xl font-bold text-skin-text-base/40 uppercase tracking-widest select-none"
          >
            {/* Optional: Add simple dot or icon here if needed */}
            <span>{tech}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default TechMarquee;
