import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ArcadeCoin = () => {
  return (
    <div className="w-full h-full flex items-center justify-center perspective-[1000px]">
      <motion.div
        className="relative preserve-3d w-32 h-32"
        animate={{
          rotateY: 360,
          y: [0, -10, 0], // Floating effect
        }}
        transition={{
          rotateY: {
            duration: 6,
            ease: "linear",
            repeat: Infinity,
          },
          y: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          },
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          y: 200, // Drop down effect on hover
          rotateX: 60, // Tilt slightly as if entering a slot
          scale: 0.8,
          transition: { duration: 0.5, ease: "backIn" },
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 rounded-full flex items-center justify-center backface-hidden border-[6px] border-yellow-400 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]"
          style={{ transform: "translateZ(5px)" }}
        >
          <div className="w-full h-full rounded-full border border-yellow-200/50 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/gold-scale.png')] bg-cover">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-yellow-200/60 flex items-center justify-center bg-yellow-400/20 backdrop-blur-sm">
              <Star
                size={40}
                className="text-yellow-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                fill="currentColor"
              />
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 rounded-full flex items-center justify-center backface-hidden border-[6px] border-yellow-400 bg-gradient-to-bl from-yellow-300 via-yellow-500 to-yellow-600 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]"
          style={{ transform: "translateZ(-5px) rotateY(180deg)" }}
        >
          <div className="w-full h-full rounded-full border border-yellow-200/50 flex items-center justify-center">
            <div className="text-yellow-100 font-black text-xl tracking-widest drop-shadow-md">
              100K
            </div>
          </div>
        </div>

        {/* Side/Edge Layer (Simulating thickness) */}
        {/* We create "ribs" to simulate a cylinder side */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[16px] h-full bg-yellow-600 left-1/2 -top-[1.2px]"
            style={{
              transform: `translateX(-50%) rotateY(${
                i * 18
              }deg) translateZ(4.8px) rotateX(90deg)`,
              height: "10px", // Thickness
              width: "16.8px", // Circumference segment
            }}
          />
        ))}

        {/* Shine Overlay */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent pointer-events-none mix-blend-overlay"
          style={{ transform: "translateZ(6px)" }}
        />
      </motion.div>

      {/* Shadow */}
      <motion.div
        className="absolute bottom-[-40px] w-32 h-8 bg-black/40 rounded-[100%] blur-xl"
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default ArcadeCoin;
