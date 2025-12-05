import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const ArcadeCard = ({ title, description, image, onClick, comingSoon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative group cursor-pointer"
      onClick={!comingSoon ? onClick : undefined}
    >
      {/* Card Container */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-skin-card border border-skin-border-base shadow-xl">
        {/* Background Image/Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-skin-accent/20 to-purple-900/20 z-0" />
        {image && (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col gap-2">
          <h3
            className="text-3xl font-black text-white uppercase tracking-tighter"
            style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}
          >
            {title}
          </h3>
          <p className="text-sm text-white/70 line-clamp-2">{description}</p>

          {/* Action Button */}
          <div className="mt-4 flex items-center gap-3">
            {comingSoon ? (
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/50 text-xs font-bold border border-white/10 backdrop-blur-sm">
                COMING SOON
              </span>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-2 bg-skin-accent text-white rounded-full font-bold text-sm shadow-lg shadow-skin-accent/30"
              >
                <Play size={16} fill="currentColor" />
                PLAY NOW
              </motion.button>
            )}
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 border-2 border-skin-accent/0 group-hover:border-skin-accent/50 rounded-2xl transition-colors duration-300 pointer-events-none z-30" />
      </div>
    </motion.div>
  );
};

export default ArcadeCard;
