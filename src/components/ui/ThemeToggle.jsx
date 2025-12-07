import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Moon, Sun, Droplet } from "lucide-react";
import { motion } from "framer-motion";

function ThemeToggle() {
  const { isBlueMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-skin-card text-skin-text-base hover:bg-skin-accent hover:text-skin-text-accent transition-colors overflow-hidden group"
      title="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isBlueMode ? 180 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {isBlueMode ? (
          <Droplet size={20} className="fill-current" />
        ) : (
          <Droplet size={20} />
        )}
      </motion.div>
    </button>
  );
}

export default ThemeToggle;
