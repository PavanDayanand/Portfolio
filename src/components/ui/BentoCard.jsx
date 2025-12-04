import React from "react";
import { motion } from "framer-motion";

const BentoCard = ({
  children,
  className = "",
  title,
  dark = false,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut", delay: delay }}
      className={`
        relative overflow-hidden rounded-[32px] p-6
        ${dark ? "bg-[#1C1C1E] text-white" : "bg-white text-brand-dark"}
        shadow-sm hover:shadow-md transition-shadow duration-300
        ${className}
      `}
    >
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          {/* Optional icon or indicator could go here */}
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default BentoCard;
