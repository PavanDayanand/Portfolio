import React, { useState } from "react";
import { motion } from "framer-motion";

const LogoLoop = ({
  logos,
  speed = 100,
  direction = "left",
  logoHeight = 48,
  gap = 40,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = true,
  fadeOutColor = "var(--color-bg-base)",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Create a seamless loop by doubling the content
  // We use two identical customized lists sliding next to each other
  const loopItems = [...logos];

  return (
    <div
      className="relative w-full overflow-hidden flex items-center flex-nowrap"
      style={{
        height: logoHeight * 2,
        gap: `${gap}px`, // Add gap between the two loop blocks
        maskImage: fadeOut
          ? `linear-gradient(to right, transparent, black 20%, black 80%, transparent)`
          : "none",
        WebkitMaskImage: fadeOut
          ? `linear-gradient(to right, transparent, black 20%, black 80%, transparent)`
          : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* First Loop */}
      <motion.div
        className="flex shrink-0 items-center"
        style={{ gap: `${gap}px` }}
        animate={{
          x: direction === "left" ? "-100%" : "0%",
        }}
        initial={{
          x: direction === "left" ? "0%" : "-100%",
        }}
        transition={{
          duration: isHovered ? speed * 3 : speed, // Slow down on hover
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loopItems.map((logo, index) => (
          <LogoItem
            key={`a-${index}`}
            logo={logo}
            logoHeight={logoHeight}
            scaleOnHover={scaleOnHover}
            gap={gap}
          />
        ))}
      </motion.div>

      {/* Second Loop (Follower) */}
      <motion.div
        className="flex shrink-0 items-center"
        style={{ gap: `${gap}px` }}
        animate={{
          x: direction === "left" ? "-100%" : "0%",
        }}
        initial={{
          x: direction === "left" ? "0%" : "-100%",
        }}
        transition={{
          duration: isHovered ? speed * 3 : speed, // Slow down on hover
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loopItems.map((logo, index) => (
          <LogoItem
            key={`b-${index}`}
            logo={logo}
            logoHeight={logoHeight}
            scaleOnHover={scaleOnHover}
            gap={gap}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Helper component for individual logo items to keep main component clean
const LogoItem = ({ logo, logoHeight, scaleOnHover, gap }) => (
  <a
    href={logo.href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center shrink-0 transition-all duration-300 relative z-20 cursor-pointer"
    style={{
      fontSize: logoHeight,
      color: "var(--color-text-base)",
      opacity: 0.6,
    }}
    onMouseEnter={(e) => {
      if (scaleOnHover) e.currentTarget.style.transform = "scale(1.2)";
      e.currentTarget.style.opacity = "1";
      e.currentTarget.style.color = "var(--color-theme-accent)";
    }}
    onMouseLeave={(e) => {
      if (scaleOnHover) e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.opacity = "0.6";
      e.currentTarget.style.color = "var(--color-text-base)";
    }}
    aria-label={logo.title}
  >
    {logo.node}
  </a>
);

export default LogoLoop;
