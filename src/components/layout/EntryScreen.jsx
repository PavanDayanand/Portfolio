import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = ["DESIGNER", "DEVELOPER", "CREATIVE", "PAVAN D"];
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

const EntryScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let interval;
    let currentWord = words[wordIndex];
    let iteration = 0;

    const scramble = () => {
      interval = setInterval(() => {
        setText((prev) =>
          currentWord
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return currentWord[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );

        if (iteration >= currentWord.length) {
          clearInterval(interval);
          // Wait a bit before next word or finishing
          setTimeout(() => {
            if (wordIndex < words.length - 1) {
              setWordIndex((prev) => prev + 1);
              iteration = 0;
            } else {
              // Finished
              setTimeout(onComplete, 1000);
            }
          }, 1000);
        }

        iteration += 1 / 3;
      }, 30);
    };

    scramble();

    return () => clearInterval(interval);
  }, [wordIndex, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-brand-dark flex items-center justify-center text-white"
      exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="text-4xl md:text-8xl font-black tracking-tighter font-mono">
        {text}
      </div>
    </motion.div>
  );
};

export default EntryScreen;
