import React, { useEffect, useState } from "react";

function AmbientBackground() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia("(max-width: 768px)");

    const updateVisibility = () => {
      // Completely hide on small screens for performance
      setIsVisible(!smallScreen.matches);
    };

    updateVisibility();
    smallScreen.addEventListener("change", updateVisibility);

    return () => {
      smallScreen.removeEventListener("change", updateVisibility);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  // Static or very simple CSS-only background to save GPU
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
      <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] bg-skin-accent/5 rounded-full blur-[100px] opacity-40 mix-blend-screen" />
      <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/5 rounded-full blur-[100px] opacity-40 mix-blend-screen" />
    </div>
  );
}

export default AmbientBackground;
