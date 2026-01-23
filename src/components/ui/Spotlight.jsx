import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

function Spotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isActive, setIsActive] = useState(true);

  // Smooth spring animation for the spotlight
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia("(max-width: 768px)");

    const updateState = () => {
      setIsActive(!(reduceMotion.matches || smallScreen.matches));
    };

    updateState();
    reduceMotion.addEventListener("change", updateState);
    smallScreen.addEventListener("change", updateState);

    return () => {
      reduceMotion.removeEventListener("change", updateState);
      smallScreen.removeEventListener("change", updateState);
    };
  }, []);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX - 160); // Center the spotlight circle
      mouseY.set(clientY - 160);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isActive, mouseX, mouseY]);

  if (!isActive) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-[320px] h-[320px] bg-skin-accent/10 rounded-full blur-[80px] pointer-events-none z-[50] mix-blend-screen"
      style={{ x, y }}
    />
  );
}

export default Spotlight;
