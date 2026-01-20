import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

function Spotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the spotlight
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX - 200); // Center the 400px circle
      mouseY.set(clientY - 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[400px] h-[400px] bg-skin-accent/10 rounded-full blur-[100px] pointer-events-none z-[50] mix-blend-screen"
      style={{ x, y }}
    />
  );
}

export default Spotlight;
