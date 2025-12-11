import React from "react";
import GlassPanel from "../components/ui/GlassPanel";
import MagneticButton from "../components/ui/MagneticButton";

const DesignSystem = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-white p-20 space-y-20">
      <div>
        <h1 className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
          Project Design System
        </h1>
        <p className="text-white/60">
          Verification of Phase 1: Foundation (Glassmorphism & Magnetism)
        </p>
      </div>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold border-b border-white/10 pb-4">
          1. Glass Panels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassPanel
            variant="standard"
            className="p-10 h-64 flex items-center justify-center"
          >
            <span className="text-xl font-medium">Standard Glass</span>
          </GlassPanel>
          <GlassPanel
            variant="heavy"
            className="p-10 h-64 flex items-center justify-center"
          >
            <span className="text-xl font-medium">Heavy Glass</span>
          </GlassPanel>
          <GlassPanel
            variant="light"
            className="p-10 h-64 flex items-center justify-center"
          >
            <span className="text-xl font-medium">Light Glass</span>
          </GlassPanel>
          <GlassPanel
            variant="neo"
            className="p-10 h-64 flex items-center justify-center"
          >
            <span className="text-xl font-medium text-neon-blue drop-shadow-[0_0_15px_rgba(46,134,255,0.5)]">
              Neo Glass
            </span>
          </GlassPanel>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold border-b border-white/10 pb-4">
          2. Magnetic Buttons
        </h2>
        <div className="flex flex-wrap gap-8 items-center">
          <MagneticButton className="bg-neon-blue text-white hover:bg-neon-blue/80">
            Standard Pull
          </MagneticButton>

          <MagneticButton
            strength={2}
            className="bg-neon-purple text-white hover:bg-neon-purple/80"
          >
            Strong Pull
          </MagneticButton>

          <MagneticButton className="border border-white/20 hover:bg-white/10 transition-colors">
            Ghost Button
          </MagneticButton>
        </div>
      </section>
    </div>
  );
};

export default DesignSystem;
