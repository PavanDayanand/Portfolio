import React from "react";
import { motion } from "framer-motion";

const Marquee = ({
  children,
  direction = "left",
  speed = 20,
  className = "",
}) => {
  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="flex shrink-0 gap-8 py-4"
        initial={{ x: 0 }}
        animate={{ x: direction === "left" ? "-100%" : "100%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {children}
        {children}
        {children}
        {children}
      </motion.div>
      <motion.div
        className="flex shrink-0 gap-8 py-4"
        initial={{ x: 0 }}
        animate={{ x: direction === "left" ? "-100%" : "100%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
};

export default Marquee;
