import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function BentoCard({
  children,
  className = "",
  title,
  dark = false,
  delay = 0,
  gradient = false,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isInteractive, setIsInteractive] = useState(true);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia("(max-width: 768px)");

    const updateState = () => {
      setIsInteractive(!(reduceMotion.matches || smallScreen.matches));
    };

    updateState();
    reduceMotion.addEventListener("change", updateState);
    smallScreen.addEventListener("change", updateState);

    return () => {
      reduceMotion.removeEventListener("change", updateState);
      smallScreen.removeEventListener("change", updateState);
    };
  }, []);

  const cardStyle = isInteractive
    ? {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }
    : undefined;

  const contentStyle = isInteractive
    ? { transform: "translateZ(30px)" }
    : undefined;
  const borderStyle = isInteractive
    ? { transform: "translateZ(20px)" }
    : undefined;
  const baseColorClasses = dark
    ? "bg-skin-card text-skin-text-base"
    : "bg-skin-inverted text-skin-text-inverted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut", delay: delay }}
      onMouseMove={isInteractive ? handleMouseMove : undefined}
      onMouseLeave={isInteractive ? handleMouseLeave : undefined}
      style={cardStyle}
      className={`
        relative overflow-hidden rounded-[32px] p-6 group/bento perspective-[1000px]
        ${baseColorClasses}
        shadow-sm hover:shadow-2xl transition-shadow duration-300
        ${className}
      `}
    >
      {/* Gradient Border Flow - Optional */}
      {gradient && (
        <div
          className="absolute inset-0 p-[2px] rounded-[32px] pointer-events-none overflow-hidden"
          style={borderStyle}
        >
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#00C6FF_350deg,#0072FF_360deg)] animate-spin-slow opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
        </div>
      )}
      {/* Inner Mask to hide gradient center - Only needed if gradient is active */}
      {gradient && (
        <div
          className={`absolute inset-[1px] rounded-[31px] ${
            dark ? "bg-skin-card" : "bg-skin-inverted"
          } z-0`}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full" style={contentStyle}>
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">{title}</h3>
            {/* Optional icon or indicator could go here */}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
}

export default BentoCard;
