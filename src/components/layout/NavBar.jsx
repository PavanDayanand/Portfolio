import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, Ruler } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import { useArchitect } from "../../context/ArchitectContext";

function NavBar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Certifications", path: "/certifications" },
    { name: "Arcade", path: "/arcade" },
    { name: "Timeline", path: "/timeline" },
    { name: "Contact", path: "/contact" },
  ];

  const { isArchitectMode, setIsArchitectMode } = useArchitect();

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-40 mx-auto max-w-fit px-4">
        <div className="flex items-center gap-2 rounded-full bg-skin-base/80 px-3 py-2 shadow-lg backdrop-blur-md border border-skin-border-base/20">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-skin-inverted text-skin-text-inverted mr-2 hover:scale-105 transition-transform"
          >
            <span className="font-bold text-xl">P</span>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                    isActive
                      ? "text-skin-text-inverted"
                      : "text-skin-text-base/60 hover:text-skin-text-base hover:bg-skin-card"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute inset-0 bg-skin-inverted rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          {/* Architect Mode Toggle */}
          <button
            onClick={() => setIsArchitectMode(!isArchitectMode)}
            className={`architect-toggle hidden md:flex items-center justify-center w-10 h-10 rounded-full ml-4 transition-all ${
              isArchitectMode
                ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                : "hover:bg-skin-card text-skin-text-base/60 hover:text-skin-text-base"
            }`}
            title="Toggle Architect Mode"
          >
            <Ruler size={18} />
          </button>

          {/* Theme Toggle (Desktop) */}
          <div className="hidden md:block ml-2 border-l border-skin-border-base/20 pl-2">
            <ThemeToggle />
          </div>

          {/* Download Resume Button (Desktop) */}
          <a
            href="/Pavan D MAIN .pdf"
            download="Pavan_D_Resume.pdf"
            className="hidden md:flex items-center gap-2 ml-2 px-4 py-2 bg-skin-accent text-skin-text-accent rounded-full text-sm font-bold hover:opacity-90 transition-opacity shadow-sm"
          >
            <Download size={16} />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-skin-text-base hover:bg-skin-card rounded-full transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-skin-base z-50 md:hidden shadow-2xl border-l border-skin-border-base flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-skin-border-base">
                <span className="text-xl font-black text-skin-text-base tracking-tight">
                  NAVIGATION
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-skin-card text-skin-text-base rounded-full hover:bg-skin-inverted hover:text-skin-text-inverted transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {links.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between p-4 rounded-2xl transition-all ${
                        isActive
                          ? "bg-skin-inverted text-skin-text-inverted"
                          : "text-skin-text-base hover:bg-skin-card"
                      }`}
                    >
                      <span className="text-2xl font-bold">{link.name}</span>
                    </NavLink>
                  );
                })}
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-skin-border-base space-y-4 bg-skin-card/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-skin-text-base">
                    Appearance
                  </span>
                  <ThemeToggle />
                </div>

                <a
                  href="/Pavan D MAIN .pdf"
                  download="Pavan_D_Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-skin-accent text-skin-text-accent rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
                >
                  <Download size={20} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;
