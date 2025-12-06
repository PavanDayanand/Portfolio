import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

import DateTime from "../ui/DateTime";

const Hero = () => {
  const { setCommandPaletteOpen, isBlueMode } = useTheme();
  const tags = [
    "#Data_Science",
    "#Machine_Learning",
    "#React",
    "#Python",
    "#Generative_AI",
    "#Full_Stack",
  ];

  const textVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 relative">
      {/* Left Column: Arrow & Tags */}
      <div className="lg:col-span-4 flex flex-col justify-between min-h-[400px]">
        <div className="flex-1 flex flex-col items-center justify-center lg:justify-start p-8">
          <motion.div
            initial={{ rotate: -180, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
            whileHover={{ rotate: 45, scale: 1.1 }}
          >
            <ArrowDownRight
              size={120}
              className="text-skin-text-base"
              strokeWidth={3}
            />
          </motion.div>

          <Link
            to="/contact"
            className={`group relative flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer mb-6 overflow-hidden hover:scale-105 ${
              isBlueMode
                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                : "bg-skin-card text-skin-text-base border border-skin-border-base shadow-sm hover:border-skin-border-base/80"
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium">Available for Work</span>
          </Link>

          <DateTime />
        </div>

        <div className="flex flex-wrap gap-2 p-4">
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 + 0.5, type: "spring" }}
              whileHover={{
                scale: 1.1,
                rotate: -2,
                backgroundColor: "var(--color-bg-accent)",
                color: "var(--color-text-accent)",
              }}
              className="px-3 py-1.5 bg-skin-base rounded-full text-sm font-medium text-skin-text-base/70 border border-skin-border-base shadow-sm cursor-default transition-colors"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Right Column: Blue Portfolio Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: [0, -15, 0], // Continuous float
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: { duration: 0.8 },
          opacity: { duration: 0.8 },
        }}
        className="lg:col-span-8 bg-skin-accent rounded-[40px] p-8 sm:p-12 relative overflow-hidden min-h-[400px] flex flex-col justify-between group perspective-1000"
      >
        {/* Handwritten Prompt (Inside Card) */}
        <div className="absolute top-8 left-8 z-20 hidden md:block">
          <div className="flex flex-col gap-4">
            <div
              className="text-5xl lg:text-6xl text-white/90 -rotate-6 origin-bottom-left leading-none"
              style={{ fontFamily: '"Caveat", cursive' }}
            >
              <motion.p
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05, delayChildren: 1.5 },
                  },
                }}
              >
                {Array.from("Want to access").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, pathLength: 0 },
                      visible: { opacity: 1, pathLength: 1 },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
              <motion.p
                className="ml-12"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05, delayChildren: 2.2 },
                  },
                }}
              >
                {Array.from("command palette?").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, pathLength: 0 },
                      visible: { opacity: 1, pathLength: 1 },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, duration: 0.5, type: "spring" }}
              className="relative pl-12"
            >
              <svg
                className="absolute -top-8 left-8 w-16 h-16 text-white/80 rotate-12"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.2))" }}
              >
                <path d="M10,10 Q50,50 90,90" />
                <path d="M90,90 L70,85 M90,90 L85,70" />
              </svg>

              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="bg-white text-skin-accent px-8 py-4 rounded-full text-2xl font-bold shadow-xl hover:scale-105 transition-transform -rotate-3 mt-4"
                style={{ fontFamily: '"Caveat", cursive' }}
              >
                Click here to try it!
              </button>
            </motion.div>
          </div>
        </div>

        {/* Download Button on Card */}
        <div className="self-end relative z-10">
          <motion.a
            href="/Pavan D MAIN .pdf"
            download="Pavan_D_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-skin-text-accent rounded-full font-bold transition-all border border-white/20 overflow-hidden relative group/btn"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            <Download size={20} className="relative z-10" />
            <span className="relative z-10">Download CV</span>
          </motion.a>
        </div>

        {/* Staggered Text Animation */}
        <div className="text-white leading-none font-black tracking-tighter text-right select-none mt-auto relative z-10">
          <div className="text-[15vw] lg:text-[180px] flex flex-col items-end overflow-hidden">
            <div className="flex overflow-hidden">
              {["P", "O", "R"].map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="flex overflow-hidden -mt-[0.2em]">
              {["T", "F", "O"].map((char, i) => (
                <motion.span
                  key={i}
                  custom={i + 3}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="flex overflow-hidden -mt-[0.2em]">
              {["L", "I", "O"].map((char, i) => (
                <motion.span
                  key={i}
                  custom={i + 6}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-4xl lg:text-6xl font-bold mt-4 flex justify-between w-full"
          >
            <span>2025</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
