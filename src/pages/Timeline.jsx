import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, Code2 } from "lucide-react";

// Scrapbook Photo Component
function ScrapbookPhoto({ src, caption, rotation }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      className={`relative p-2 bg-white shadow-lg rotate-${rotation} transform transition-all duration-300 w-full max-w-[200px] mx-auto mt-4`}
      style={{ rotate: `${rotation}deg` }}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img src={src} alt={caption} className="w-full h-full object-cover" />
      </div>
      {caption && (
        <div className="pt-2 text-center">
          <p
            className="text-gray-800 text-lg leading-none"
            style={{ fontFamily: '"Caveat", cursive' }}
          >
            {caption}
          </p>
        </div>
      )}
      {/* Tape Effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-white/30 backdrop-blur-sm border border-white/40 shadow-sm rotate-45 transform" />
    </motion.div>
  );
}

function TimelineItem({ data, index, isLeft }) {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  });

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]),
    {
      stiffness: 100,
      damping: 30,
    }
  );

  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [isLeft ? -50 : 50, 0]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <motion.div
      ref={itemRef}
      className={`relative flex items-center justify-between md:justify-center mb-24 w-full ${
        isLeft ? "flex-row-reverse" : ""
      }`}
    >
      {/* Connector Line */}
      <div className="absolute left-4 md:left-1/2 w-0.5 h-full -top-24 bg-gradient-to-b from-transparent via-skin-accent to-transparent opacity-20" />

      {/* Content Card */}
      <motion.div
        style={{ opacity, x }}
        className={`w-[calc(100%-60px)] md:w-[45%] p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors relative group ${
          isLeft ? "md:mr-auto ml-16 md:ml-0" : "md:ml-auto ml-16"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="p-2 rounded-lg bg-skin-accent/20 text-skin-accent">
            {data.icon}
          </span>
          <span className="text-sm font-mono text-skin-accent">
            {data.year}
          </span>
        </div>
        <h3 className="text-xl font-bold text-skin-text-base mb-1">
          {data.title}
        </h3>
        <h4 className="text-sm text-skin-text-base/60 mb-3">{data.subtitle}</h4>
        <p className="text-sm text-skin-text-base/80 leading-relaxed">
          {data.description}
        </p>

        {/* Milestone Note */}
        {data.note && (
          <div className="mt-3 inline-block transform -rotate-2">
            <span
              className="text-2xl text-yellow-400 font-bold"
              style={{ fontFamily: '"Caveat", cursive' }}
            >
              {data.note}
            </span>
          </div>
        )}

        {/* Scrapbook Image */}
        {data.image && (
          <ScrapbookPhoto
            src={data.image}
            caption={data.imageCaption}
            rotation={index % 2 === 0 ? -3 : 3}
          />
        )}
      </motion.div>

      {/* Center Checkpoint */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <motion.div
          style={{ scale: scrollYProgress, opacity }}
          className="w-4 h-4 rounded-full bg-skin-accent shadow-[0_0_10px_rgba(var(--color-accent),0.5)] z-10"
        />
      </div>
    </motion.div>
  );
}

function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const timelineData = [
    {
      year: "2024 - Present",
      title: "Full Stack Developer Intern",
      subtitle: "Elvi",
      description:
        "Implementing scalable frontend architectures and backend solutions.",
      icon: <Briefcase size={16} />,
      type: "work",
      note: "Current Role! 🚀",
      // No image for this one specified, keeping it clean
    },
    {
      year: "2024 - 4th Year",
      title: "Main Project: Clarity",
      subtitle: "Final Year Project",
      description:
        "Developing a comprehensive solution for clarity in complex data structures.",
      icon: <Code2 size={16} />,
      type: "project",
    },
    {
      year: "2023 - 3rd Year",
      title: "Edu Geniw",
      subtitle: "Hackathon Project",
      description: "An educational platform generator powered by AI.",
      icon: <Trophy size={16} />,
      type: "award",
      note: "Won 2nd Prize! 🥈",
    },
    {
      year: "2023 - 2nd Year",
      title: "Diabetic Prediction",
      subtitle: "Healthcare AI",
      description:
        "Prediction model using K-Nearest Neighbors (KNN) algorithm.",
      icon: <Trophy size={16} />,
      type: "award",
      note: "Won 2nd Prize! 🥈",
      image: "/diabetic.jpg",
      imageCaption: "Team Victory",
    },
    {
      year: "2023 - National Science Day",
      title: "Interconnect (National)",
      subtitle: "National Science Exhibition",
      description: "Presented the Interconnect project at the national level.",
      icon: <Trophy size={16} />,
      type: "award",
      note: "Won 2nd Prize Again! 🥈",
      image: "/inter.jpg",
      imageCaption: "Interconnect Demo",
    },
    {
      year: "2022 - 2nd Year",
      title: "Interconnect",
      subtitle: "College Project",
      description: "A novel approach to connecting digital systems.",
      icon: <Trophy size={16} />,
      type: "award",
      note: "Won 2nd Prize! 🥈",
    },
    {
      year: "2022 - July (Sem 1)",
      title: "IOT Fraud Detection",
      subtitle: "First Major Project",
      description:
        "Automatic fraud detection system using Internet of Things sensors.",
      icon: <Trophy size={16} />,
      type: "award",
      note: "Won 2nd Prize! 🥈",
      image: "/IOT.jpg",
      imageCaption: "My First Hardware Project",
    },
    {
      year: "2022",
      title: "College Start",
      subtitle: "Bangalore Institute of Technology",
      description: "Began the journey in Computer Science & Engineering.",
      icon: <GraduationCap size={16} />,
      type: "education",
      note: "The Beginning ✨",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-24 pb-20 px-4 max-w-5xl mx-auto"
    >
      <div className="text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-skin-accent via-purple-500 to-skin-accent animate-gradient mb-6"
        >
          THE JOURNEY
        </motion.h1>
        {/* Handwritten Subtitle */}
        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: -5 }}
          transition={{ delay: 0.3 }}
          className="inline-block transform"
        >
          <span
            className="text-3xl md:text-4xl text-skin-text-base/80"
            style={{ fontFamily: '"Caveat", cursive' }}
          >
            My scrapbook of memories & code
          </span>
        </motion.div>
      </div>

      <div className="relative">
        {/* Central Progress Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-skin-base/20 transform -translate-x-1/2">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-skin-accent to-purple-500"
          />
        </div>

        {/* Timeline Items */}
        <div className="space-y-4">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              data={item}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>

      {/* End Node */}
      <div className="flex justify-center mt-12">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative z-10 px-8 py-3 rounded-full bg-skin-accent text-skin-text-accent font-bold shadow-lg shadow-skin-accent/20 cursor-pointer"
        >
          What's Next?
        </motion.div>
      </div>
    </div>
  );
}

export default Timeline;
