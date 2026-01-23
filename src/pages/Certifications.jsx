import React from "react";
import { motion } from "framer-motion";
import { Award, Trophy, CheckCircle2, ExternalLink } from "lucide-react";

function CertificateCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-skin-card rounded-2xl p-8 border border-skin-border-base hover:border-yellow-500/50 transition-colors duration-300 h-full flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl text-black shadow-lg shadow-yellow-500/20">
            {item.icon}
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-skin-inverted/5 rounded-full border border-skin-border-base/60">
            <CheckCircle2 size={14} className="text-green-500" />
            <span className="text-xs font-bold text-skin-text-base/80 uppercase tracking-wider">
              Verified
            </span>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-skin-text-base mb-2 leading-tight">
          {item.title}
        </h3>
        <p className="text-skin-text-base/60 font-medium mb-6">{item.event}</p>

        <div className="mt-auto pt-6 border-t border-skin-border-base/60 flex justify-between items-center">
          <span className="text-xs text-skin-text-base/60 font-mono">
            ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </span>
          <button className="text-yellow-500 hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm font-bold">
            View Credential <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Certifications() {
  const achievements = [
    {
      title: '2nd Place - "Turn Data into Stories"',
      event: "InterConnect Project Exhibition",
      icon: <Trophy size={32} />,
    },
    {
      title: "2nd Place - GENAI Project Exhibition",
      event: "“From Queries to Creativity - MongoDB & GenAI” for EduGenie",
      icon: <Trophy size={32} />,
    },
    {
      title: "Juniper Networks Certified Associate",
      event: "Cloud (JNCIA-Cloud)",
      icon: <Award size={32} />,
    },
    {
      title: "Data Visualisation: Empowering Business",
      event: "Forage",
      icon: <Award size={32} />,
    },
  ];

  return (
    <div className="min-h-screen bg-skin-base text-skin-text-base py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-skin-text-base mb-6 tracking-tighter">
            CREDENTIALS<span className="text-yellow-500">.</span>
          </h1>
          <p className="text-xl text-skin-text-base/70 max-w-2xl mx-auto">
            Verified achievements and professional certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((item, index) => (
            <CertificateCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Certifications;
