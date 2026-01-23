import React, { useEffect, useState } from "react";

function ScrollBlurOverlay() {
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const normalized = Math.min(1, scrollY / 1400);
      setIntensity(normalized);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const blurValue = 12 * intensity;
  const highlightSheen = 0.14 * intensity;
  const coolSheen = 0.1 * intensity;

  return (
    <div
      className="fixed inset-x-0 top-0 h-[20vh] pointer-events-none z-30"
      style={{
        backdropFilter: `blur(${blurValue}px)`,
        WebkitBackdropFilter: `blur(${blurValue}px)`,
        background: `linear-gradient(120deg, rgba(255,255,255,${highlightSheen}) 0%, rgba(255,255,255,0) 35%),
          linear-gradient(280deg, rgba(96,165,250,${coolSheen}) 10%, transparent 55%),
          linear-gradient(180deg, rgba(2,6,23,0.35) 0%, rgba(2,6,23,0))`,
        opacity: Math.min(0.6, intensity * 0.9 + 0.05),
        transition: "opacity 250ms ease, backdrop-filter 250ms ease",
        maskImage:
          "linear-gradient(180deg, black 0%, black 70%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, black 0%, black 70%, transparent 100%)",
      }}
    />
  );
}

export default ScrollBlurOverlay;
