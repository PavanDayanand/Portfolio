import React from "react";
import { motion } from "framer-motion";

const quotes = [
  "WOULD YOU RATHER FIT IN — OR BE NOTICED?",
  "THE ONLY WAY TO DO GREAT WORK IS TO LOVE WHAT YOU DO.",
  "STAY HUNGRY, STAY FOOLISH.",
  "YOUR TIME IS LIMITED, SO DON'T WASTE IT LIVING SOMEONE ELSE'S LIFE.",
  "INNOVATION DISTINGUISHES BETWEEN A LEADER AND A FOLLOWER.",
  "THINK DIFFERENT.",
  "MAKE IT SIMPLE, BUT SIGNIFICANT.",
  "QUALITY IS MORE IMPORTANT THAN QUANTITY.",
  "DESIGN IS NOT JUST WHAT IT LOOKS LIKE AND FEELS LIKE. DESIGN IS HOW IT WORKS.",
  "THE PEOPLE WHO ARE CRAZY ENOUGH TO THINK THEY CAN CHANGE THE WORLD ARE THE ONES WHO DO.",
];

const MotivationRibbon = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#0055FF] text-white overflow-hidden h-8 flex items-center">
      <div className="flex whitespace-nowrap w-full">
        <motion.div
          className="flex gap-8 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 200,
          }}
        >
          {[...quotes, ...quotes, ...quotes, ...quotes].map((quote, index) => (
            <span
              key={index}
              className="text-xs font-bold tracking-widest uppercase flex items-center gap-8"
            >
              {quote}
              <span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MotivationRibbon;
