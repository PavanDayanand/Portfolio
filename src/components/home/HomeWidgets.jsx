import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2, History, Trophy, TrendingUp, Star } from "lucide-react";

// --- Premium Arcade Card ---
function ArcadeWidget() {
  return (
    <Link to="/arcade" className="block h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative h-full min-h-[300px] overflow-hidden rounded-[32px] bg-skin-card border border-skin-border-base"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgb(var(--color-text-base))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--color-text-base))_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-between h-full p-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md">
              <Gamepad2 size={16} className="text-cyan-400" />
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">
                Game Zone
              </span>
            </div>
            {/* Live Indicator */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-[10px] font-bold text-cyan-500/80 uppercase">
                Online
              </span>
            </div>
          </div>

          {/* Center Graphic (Neon Circle) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/20 rounded-full blur-[80px] group-hover:bg-cyan-400/30 transition-colors duration-500" />

          <div className="text-center relative z-20 mt-8 group-hover:scale-110 transition-transform duration-500">
            <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-skin-text-base to-skin-text-base/40 tracking-tighter">
              ARCADE
            </h3>
            <p className="text-cyan-400 font-mono text-sm mt-1 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              INSERT COIN
            </p>
          </div>

          {/* Footer Stats similar to game stats */}
          <div className="grid grid-cols-2 gap-2 mt-auto">
            <div className="bg-skin-base/5 backdrop-blur-md rounded-xl p-3 border border-skin-border-base group-hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <Trophy size={14} className="text-yellow-400" />
                <span className="text-[10px] uppercase text-skin-text-base/40 font-bold">
                  Best Score
                </span>
              </div>
              <span className="text-lg font-mono font-bold text-white">
                99,999
              </span>
            </div>
            <div className="bg-skin-base/5 backdrop-blur-md rounded-xl p-3 border border-skin-border-base group-hover:border-purple-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <Star size={14} className="text-purple-400" />
                <span className="text-[10px] uppercase text-skin-text-base/40 font-bold">
                  Games
                </span>
              </div>
              <span className="text-lg font-mono font-bold text-skin-text-base">
                03
              </span>
            </div>
          </div>
        </div>

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </Link>
  );
}

// --- Premium Timeline Card ---
function TimelineWidget() {
  return (
    <Link to="/timeline" className="block h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative h-full min-h-[300px] overflow-hidden rounded-[32px] bg-skin-card border border-skin-border-base"
      >
        {/* Animated Gradient Blob */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/30 rounded-full blur-[100px] group-hover:bg-violet-500/40 transition-colors duration-700" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] group-hover:bg-blue-500/30 transition-colors duration-700" />

        <div className="relative z-10 flex flex-col justify-between h-full p-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-skin-base/5 border border-skin-border-base backdrop-blur-md">
              <History size={16} className="text-violet-300" />
              <span className="text-xs font-bold text-violet-300 uppercase tracking-widest">
                Journey
              </span>
            </div>
          </div>

          {/* The "Timeline" Viz */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity duration-500">
            {/* Abstract Wave Line using inline SVG */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 300 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M-50 150 C 50 150, 100 50, 150 50 C 200 50, 250 150, 350 150"
                stroke="url(#gradient-line)"
                strokeWidth="4"
                strokeLinecap="round"
                className="drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]"
              />
              <defs>
                <linearGradient
                  id="gradient-line"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.2)" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Center Text */}
          <div className="relative z-20 mt-4">
            <h3 className="text-3xl font-bold text-skin-text-base mb-2 leading-tight">
              My Professional <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                Evolution
              </span>
            </h3>
            <p className="text-skin-text-base/40 text-sm max-w-[200px] leading-relaxed group-hover:text-skin-text-base/60 transition-colors">
              From first line of code to full-stack mastery.
            </p>
          </div>

          {/* Bottom Action */}
          <div className="mt-8 flex items-center gap-2 text-sm font-bold text-violet-300 group-hover:translate-x-2 transition-transform duration-300">
            Explore Timeline <TrendingUp size={16} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// --- Main Export Widget ---
function HomeWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
      <ArcadeWidget />
      <TimelineWidget />
    </div>
  );
}

export default HomeWidgets;
