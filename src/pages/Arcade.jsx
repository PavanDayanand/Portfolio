import React, { useState } from "react";
import { motion } from "framer-motion";
import ArcadeCard from "../components/ui/ArcadeCard";
import ArchitectMode from "../components/arcade/ArchitectMode";
import SuperRajAdventure from "../components/arcade/SuperRajAdventure";
import ApexSwitcher from "../components/arcade/ApexSwitcher";
import NeonBreaker from "../components/arcade/NeonBreaker";
import { X } from "lucide-react";

function Arcade() {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    {
      id: "architect",
      title: "The Architect",
      description:
        "Enter the 3D realm. Explore a developer's desk in an immersive WebGL experience.",
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "super-raj",
      title: "Super Raj Adventure",
      description:
        "A Desi-style platformer! Avoid chillies, collect rupees, and blow horn!",
      image:
        "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=800", // Placeholder India image
    },
    {
      id: "apex-switcher",
      title: "Apex Switcher",
      description:
        "High-speed racing. Switch between Car and Bike to survive the neon highway.",
      image:
        "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800", // Neon car image
    },
    {
      id: "neon-breaker",
      title: "Neon Breaker",
      description:
        "Smash bricks in style. A synthwave-infused arcade classic with explosive visuals.",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800", // Neon lights image
    },
    {
      id: "code-breaker",
      title: "Code Breaker",
      description:
        "Solve algorithmic puzzles to unlock hidden portfolio secrets.",
      comingSoon: true,
    },
    {
      id: "space-invaders",
      title: "Bug Invaders",
      description:
        "Defend your codebase from incoming bugs in this classic shooter.",
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-skin-accent via-purple-500 to-skin-accent bg-[length:200%_auto] animate-gradient tracking-tighter mb-4"
        >
          ARCADE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-skin-text-base/60 max-w-2xl mx-auto"
        >
          Experimental features, games, and immersive experiences.
          <br />
          <span className="text-sm opacity-50">
            (Warning: May contain high levels of awesomeness)
          </span>
        </motion.p>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <ArcadeCard {...game} onClick={() => setActiveGame(game.id)} />
          </motion.div>
        ))}
      </div>

      {/* Active Game Modal/Overlay */}
      {activeGame === "architect" && (
        <div className="fixed inset-0 z-[100] bg-black">
          <button
            onClick={() => setActiveGame(null)}
            className="absolute top-8 right-8 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
          >
            <X size={24} />
          </button>
          <ArchitectMode />
        </div>
      )}

      {activeGame === "super-raj" && (
        <SuperRajAdventure onClose={() => setActiveGame(null)} />
      )}

      {activeGame === "apex-switcher" && (
        <ApexSwitcher onClose={() => setActiveGame(null)} />
      )}

      {activeGame === "neon-breaker" && (
        <NeonBreaker onClose={() => setActiveGame(null)} />
      )}
    </div>
  );
}

export default Arcade;
