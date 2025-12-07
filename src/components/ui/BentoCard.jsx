import React from "react";
import { motion } from "framer-motion";

function BentoCard({
  children,
  className = "",
  title,
  dark = false,
  delay = 0,
  gradient = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut", delay: delay }}
      className={`
        relative overflow-hidden rounded-[32px] p-6 group/bento
        ${dark ? "bg-[#1C1C1E] text-white" : "bg-white text-brand-dark"}
        shadow-sm hover:shadow-md transition-shadow duration-300
        ${className}
      `}
    >
      {/* Gradient Border Flow - Optional */}
      {gradient && (
        <div className="absolute inset-0 p-[2px] rounded-[32px] pointer-events-none overflow-hidden">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#00C6FF_350deg,#0072FF_360deg)] animate-spin-slow opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
        </div>
      )}
      {/* Inner Mask to hide gradient center - Only needed if gradient is active */}
      {gradient && (
        <div
          className={`absolute inset-[1px] rounded-[31px] ${
            dark ? "bg-[#1C1C1E]" : "bg-white"
          } z-0`}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full">
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">{title}</h3>
            {/* Optional icon or indicator could go here */}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
}

export default BentoCard;
