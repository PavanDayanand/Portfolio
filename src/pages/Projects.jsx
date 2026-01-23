import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Library, LayoutTemplate } from "lucide-react";
import { projects } from "../data/projects";

// --- ARCHIVE VIEW COMPONENTS (Book Rack) ---

const ProjectBook = ({ project, index, isActive, onClick }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative h-[60vh] lg:h-[75vh] cursor-pointer overflow-hidden border-r border-skin-border-base bg-skin-card group transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${
          isActive
            ? "flex-[15]"
            : "flex-[1] hover:bg-skin-base hover:flex-[1.5]"
        }`}
    >
      {/* Spine Content (Visible when collapsed) */}
      {!isActive && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-between py-10 opacity-100 transition-opacity duration-300">
          <span className="text-xl font-mono text-skin-text-base/50">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Vertical Project Name (Top to Bottom, Sideways) */}
          <div className="flex-1 flex items-center justify-center py-4">
            <h2
              className="text-2xl md:text-3xl font-black text-skin-text-base uppercase tracking-widest whitespace-nowrap drop-shadow-lg"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              {project.title}
            </h2>
          </div>

          <span
            className="text-xs font-mono text-skin-accent uppercase tracking-wider"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            {project.category}
          </span>

          {/* Stronger overlay for contrast */}
          <div className="absolute inset-0 z-[-1] bg-skin-base/80" />
          <div className="absolute inset-0 z-[-2] opacity-40 group-hover:opacity-60 transition-opacity">
            <img
              src={project.image}
              alt=""
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
          </div>
        </div>
      )}

      {/* Expanded Split-View Content */}
      <AnimatePresence mode="popLayout">
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col"
          >
            <div className="flex-[1.5] relative overflow-hidden group/image">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover/image:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-skin-base to-transparent pointer-events-none z-20" />
            </div>

            <div className="flex-1 bg-skin-base p-8 md:p-12 flex flex-col justify-start relative z-30 border-t border-skin-border-base/70">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-skin-accent font-bold tracking-wider uppercase text-xs block mb-2">
                    {project.category}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black text-skin-text-base leading-none tracking-tight">
                    {project.title}
                  </h2>
                </div>
                <span className="text-8xl font-black text-skin-text-base/5 select-none leading-none -mt-4 hidden md:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="text-skin-text-base/70 leading-relaxed mb-8 font-medium text-lg max-w-3xl">
                {project.details}
              </p>

              <div className="mt-auto flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-skin-base text-skin-text-base rounded-full text-xs font-bold border border-skin-border-base uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.githubLink && project.githubLink !== "#" && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-skin-inverted text-skin-text-inverted rounded-full font-bold hover:opacity-90 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={18} /> Source
                    </a>
                  )}
                  {project.liveLink && project.liveLink !== "#" && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 border border-skin-border-base text-skin-text-base rounded-full font-bold hover:bg-skin-card transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- GALLERY VIEW COMPONENTS (Creative Scroll) ---

const GalleryItem = ({ project, index }) => {
  return (
    <div className="w-full flex items-center justify-center py-8 md:py-12 perspective-1000">
      {/* Max-width container for the split layout */}
      <div
        className={`w-full max-w-7xl mx-auto bg-skin-card border border-skin-border-base overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px] group`}
      >
        {/* LEFT: Text Content */}
        <div className="flex-1 p-10 md:p-14 flex flex-col justify-between bg-skin-base/80 backdrop-blur-md relative z-20">
          <div>
            <span className="text-skin-accent font-bold tracking-widest uppercase text-xs mb-3 block">
              {project.category}
            </span>
            <h3 className="text-4xl md:text-6xl font-black text-skin-text-base mb-6 leading-[0.9] tracking-tighter uppercase">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-skin-base text-skin-text-base/70 rounded-full text-[10px] font-bold border border-skin-border-base uppercase tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-skin-text-base/70 leading-relaxed font-medium text-sm md:text-base max-w-lg mb-8">
              {project.details}
            </p>
          </div>

          <div className="flex gap-4">
            {project.githubLink && project.githubLink !== "#" && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-skin-inverted text-skin-text-inverted rounded-full font-bold hover:opacity-90 transition-opacity text-xs uppercase tracking-wide"
              >
                <Github size={16} /> Code
              </a>
            )}
            {project.liveLink && project.liveLink !== "#" && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-skin-border-base text-skin-text-base rounded-full font-bold hover:bg-skin-card transition-colors text-xs uppercase tracking-wide"
              >
                <ExternalLink size={16} /> Demo
              </a>
            )}
          </div>

          {/* Large Index Watermark */}
          <div className="absolute bottom-6 right-6 text-[100px] font-black text-skin-text-base/5 leading-none select-none pointer-events-none">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* RIGHT: Image Section (Clean & Premium) */}
        <div className="flex-[1.3] relative overflow-hidden bg-skin-base p-8 flex items-center justify-center">
          {/* 3D Container Wrapper - Subtle */}
          <div className="relative w-full h-full perspective-1000 group-hover:scale-[1.02] transition-transform duration-700 ease-out">
            {/* Ambient Glow Background - Clean, No Grain */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
              <img
                src={project.image}
                alt=""
                className="w-full h-full object-cover blur-3xl opacity-40 scale-125"
              />
            </div>

            {/* Main Image - Clean */}
            <div className="relative z-10 w-full h-full transform transition-transform duration-500 ease-out group-hover:rotate-y-2 group-hover:rotate-x-2 group-hover:translate-z-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const [viewMode, setViewMode] = useState("archive"); // "archive" | "gallery"
  const isArchiveView = viewMode === "archive";

  return (
    <div
      className={`bg-skin-base pt-24 md:pt-28 ${
        isArchiveView ? "min-h-screen flex flex-col" : "min-h-screen pb-32"
      }`}
    >
      {/* Header with Switcher */}
      <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-skin-text-base tracking-tighter mb-4">
            WORKS<span className="text-skin-accent">.</span>
          </h1>
          <p className="text-lg md:text-xl text-skin-text-base/70 max-w-3xl mx-auto">
            Select a layout to browse the same builds either as an immersive
            archive or a polished gallery.
          </p>
        </div>

        {/* View Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center bg-skin-card/70 border border-skin-border-base/80 p-1 rounded-full shadow-inner shadow-black/20">
            <button
              onClick={() => setViewMode("archive")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                isArchiveView
                  ? "bg-skin-inverted text-skin-text-inverted shadow-lg shadow-black/20"
                  : "text-skin-text-base/70 hover:text-skin-text-base"
              }`}
            >
              <Library size={14} /> Archive
            </button>
            <button
              onClick={() => setViewMode("gallery")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                viewMode === "gallery"
                  ? "bg-skin-inverted text-skin-text-inverted shadow-lg shadow-black/20"
                  : "text-skin-text-base/70 hover:text-skin-text-base"
              }`}
            >
              <LayoutTemplate size={14} /> Gallery
            </button>
          </div>
        </div>
      </div>

      {/* Render View */}
      {isArchiveView ? (
        /* --- BOOK RACK LAYOUT --- */
        <div className="flex-1 flex gap-[1px] p-4 md:p-8 overflow-x-auto lg:overflow-y-hidden">
          {projects.map((project, index) => (
            <ProjectBook
              key={project.id}
              project={project}
              index={index}
              isActive={activeId === project.id}
              onClick={() => setActiveId(project.id)}
            />
          ))}
        </div>
      ) : (
        /* --- CREATIVE GALLERY LAYOUT --- */
        <div className="container mx-auto px-4 md:px-8 space-y-0">
          {projects.map((project, index) => (
            <GalleryItem key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
