import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

const ScrambleText = ({
  text,
  delay = 0,
  duration = 1,
  className = "",
  trigger = true,
}) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!trigger) return;

    let startTime = Date.now();
    let interval;

    const update = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed < delay) {
        interval = requestAnimationFrame(update);
        return;
      }

      const progress = Math.min((elapsed - delay) / duration, 1);

      const scrambled = text
        .split("")
        .map((char, i) => {
          if (progress >= 1) return char;
          if (i / text.length < progress) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(scrambled);

      if (progress < 1) {
        interval = requestAnimationFrame(update);
      }
    };

    interval = requestAnimationFrame(update);
    return () => cancelAnimationFrame(interval);
  }, [text, delay, duration, trigger]);

  return <span className={className}>{display}</span>;
};

const EntryScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence Timer
    const timers = [
      setTimeout(() => setStep(1), 500), // Creative
      setTimeout(() => setStep(2), 1500), // Developer
      setTimeout(() => setStep(3), 2000), // Designer
      setTimeout(() => setStep(4), 3000), // Split
      setTimeout(() => setStep(5), 3500), // Pavan D
      setTimeout(() => onComplete(), 5000), // Exit
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const containerVariants = {
    exit: {
      clipPath: "circle(0% at 50% 50%)",
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      exit="exit"
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center text-white overflow-hidden font-mono"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* 1. CREATIVE */}
        <div className="h-16 md:h-24 flex items-center mb-4">
          <ScrambleText
            text="CREATIVE"
            trigger={step >= 1}
            className="text-4xl md:text-6xl font-bold text-gray-500 tracking-widest"
          />
        </div>

        {/* 2. DEVELOPER & DESIGNER (Split Container) */}
        <div className="relative h-16 md:h-24 w-full flex items-center justify-center">
          {/* Developer - Moves Left */}
          <motion.div
            animate={{ x: step >= 4 ? -280 : 0, opacity: step >= 2 ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="absolute"
          >
            <ScrambleText
              text="DEVELOPER"
              trigger={step >= 2}
              className="text-3xl md:text-5xl font-bold text-gray-300 tracking-wider"
            />
          </motion.div>

          {/* Designer - Moves Right */}
          <motion.div
            animate={{ x: step >= 4 ? 280 : 0, opacity: step >= 3 ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="absolute"
          >
            <ScrambleText
              text="DESIGNER"
              trigger={step >= 3}
              className="text-3xl md:text-5xl font-bold text-gray-300 tracking-wider"
            />
          </motion.div>

          {/* 3. PAVAN D (Center Reveal) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: step >= 5 ? 1 : 0, opacity: step >= 5 ? 1 : 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="absolute z-10"
          >
            <ScrambleText
              text="PAVAN D"
              trigger={step >= 5}
              className="text-5xl md:text-8xl font-black text-brand-blue tracking-tighter"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default EntryScreen;
