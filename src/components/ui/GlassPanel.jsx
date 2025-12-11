import React from "react";

// If cn utility is missing, we can implement it or just use template literals.
// I'll check for utils, but for now I'll create it inline if needed or stick to standard template literals to be safe
// until I verify utils existence.
// Actually, I should verify utils first. But often it's in @src/lib/utils.
// Let's stick to template literals for safety if I haven't seen the utils file, or I can create a simple one.
// Looking at the file list, I didn't see a 'lib' folder in 'src' yet in previous `list_dir`.
// Let's see... `list_dir src` showed components, context, data, pages, assets. No lib.
// So I will standardise on `clsx` and `tailwind-merge` if they exist, or just simple string concatenation.
// The package.json didn't list clsx or tailwind-merge either.
// I will just use standard template literals for now to be safe.

const GlassPanel = ({
  children,
  className = "",
  variant = "standard",
  ...props
}) => {
  const baseStyles =
    "relative overflow-hidden transition-all duration-300 border";

  const variants = {
    standard: "bg-white/5 backdrop-blur-md border-white/10 shadow-lg",
    heavy: "bg-brand-dark/40 backdrop-blur-xl border-white/5 shadow-xl",
    light: "bg-white/10 backdrop-blur-sm border-white/20 shadow-md",
    neo: "bg-brand-dark/80 backdrop-blur-2xl border-white/5 shadow-2xl ring-1 ring-white/5",
  };

  return (
    <div
      className={`${baseStyles} ${
        variants[variant] || variants.standard
      } ${className}`}
      {...props}
    >
      {/* Noise Texture Overlay for that premium texture feel */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dynamic Shine Effect (can be animated later) */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassPanel;
