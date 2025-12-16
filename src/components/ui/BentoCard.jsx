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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut", delay: delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`
        relative overflow-hidden rounded-[32px] p-6 group/bento perspective-[1000px]
        ${dark ? "bg-[#1C1C1E] text-white" : "bg-white text-brand-dark"}
        shadow-sm hover:shadow-2xl transition-shadow duration-300
        ${className}
      `}
    >
      {/* Gradient Border Flow - Optional */}
      {gradient && (
        <div
          className="absolute inset-0 p-[2px] rounded-[32px] pointer-events-none overflow-hidden"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#00C6FF_350deg,#0072FF_360deg)] animate-spin-slow opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
        </div>
      )}
      {/* Inner Mask to hide gradient center - Only needed if gradient is active */}
      {gradient && (
        <div
          className={`absolute inset-[1px] rounded-[31px] ${
            dark ? "bg-[#1C1C1E]" : "bg-white"
          } z-0`}
        />
      )}

      {/* Content */}
      <div
        className="relative z-10 h-full"
        style={{ transform: "translateZ(30px)" }}
      >
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
