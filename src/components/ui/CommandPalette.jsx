import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Home,
  Code,
  Briefcase,
  Mail,
  Moon,
  Sun,
  Copy,
  Download,
  Github,
  Linkedin,
  ArrowRight,
  Command,
  Gamepad2,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const CommandPalette = () => {
  const { isDark, toggleTheme, isCommandPaletteOpen, setCommandPaletteOpen } =
    useTheme();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Toggle with Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setCommandPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);

  const commands = [
    {
      category: "Navigation",
      items: [
        {
          icon: <Home size={18} />,
          label: "Home",
          action: () => navigate("/"),
        },
        {
          icon: <Code size={18} />,
          label: "Projects",
          action: () => navigate("/projects"),
        },
        {
          icon: <Briefcase size={18} />,
          label: "Skills",
          action: () => navigate("/skills"),
        },
        {
          icon: <Mail size={18} />,
          label: "Contact",
          action: () => navigate("/contact"),
        },
      ],
    },
    {
      category: "Actions",
      items: [
        {
          icon: isDark ? <Sun size={18} /> : <Moon size={18} />,
          label: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
          action: toggleTheme,
        },
        {
          icon: <Copy size={18} />,
          label: "Copy Email",
          action: () => {
            navigator.clipboard.writeText("pavan.radapa@gmail.com");
            // Could add a toast here
          },
        },
        {
          icon: <Download size={18} />,
          label: "Download Resume",
          action: () => {
            const link = document.createElement("a");
            link.href = "/Pavan D MAIN .pdf";
            link.download = "Pavan_D_Resume.pdf";
            link.click();
          },
        },
      ],
    },
    {
      category: "Socials",
      items: [
        {
          icon: <Github size={18} />,
          label: "GitHub",
          action: () =>
            window.open("https://github.com/PavanDayanand", "_blank"),
        },
        {
          icon: <Linkedin size={18} />,
          label: "LinkedIn",
          action: () =>
            window.open(
              "https://www.linkedin.com/in/pavan-d-856231259/",
              "_blank"
            ),
        },
      ],
    },
    {
      category: "Arcade",
      items: [
        {
          icon: <Gamepad2 size={18} />,
          label: "Play Super Raj Adventure",
          action: () => navigate("/arcade"),
        },
        {
          icon: <Gamepad2 size={18} />,
          label: "Play Apex Switcher",
          action: () => navigate("/arcade"),
        },
        {
          icon: <Gamepad2 size={18} />,
          label: "Play Neon Breaker",
          action: () => navigate("/arcade"),
        },
      ],
    },
  ];

  // Filter commands
  const filteredCommands = commands
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  // Flatten for keyboard navigation
  const flatItems = filteredCommands.flatMap((group) => group.items);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isCommandPaletteOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < flatItems.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (flatItems[selectedIndex]) {
          flatItems[selectedIndex].action();
          setCommandPaletteOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, flatItems, selectedIndex, setCommandPaletteOpen]);

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setCommandPaletteOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl bg-skin-base border border-skin-border-base rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center px-4 py-4 border-b border-skin-border-base/50">
              <Search className="text-skin-text-base/50 mr-3" size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="flex-1 bg-transparent text-lg text-skin-text-base placeholder-skin-text-base/40 outline-none"
              />
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-skin-inverted/10 rounded text-xs font-medium text-skin-text-base/60">
                <span className="text-xs">ESC</span>
              </div>
            </div>

            {/* List */}
            <div className="overflow-y-auto p-2 scrollbar-hide">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-skin-text-base/50">
                  No results found.
                </div>
              ) : (
                filteredCommands.map((group, groupIndex) => (
                  <div key={group.category} className="mb-2">
                    <div className="px-3 py-2 text-xs font-semibold text-skin-text-base/40 uppercase tracking-wider">
                      {group.category}
                    </div>
                    {group.items.map((item, itemIndex) => {
                      // Calculate global index for selection
                      let globalIndex = 0;
                      for (let i = 0; i < groupIndex; i++) {
                        globalIndex += filteredCommands[i].items.length;
                      }
                      globalIndex += itemIndex;

                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <motion.button
                          key={item.label}
                          onClick={() => {
                            item.action();
                            setCommandPaletteOpen(false);
                          }}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors duration-200 ${
                            isSelected
                              ? "bg-skin-accent text-white"
                              : "text-skin-text-base hover:bg-skin-inverted/5"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`${
                                isSelected
                                  ? "text-white"
                                  : "text-skin-text-base/60"
                              }`}
                            >
                              {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {isSelected && (
                            <motion.div
                              layoutId="enter-icon"
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-white/80"
                            >
                              <ArrowRight size={16} />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-skin-inverted/5 border-t border-skin-border-base/50 flex items-center justify-between text-xs text-skin-text-base/40">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <Command size={12} /> <span className="font-mono">K</span> to
                  open
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-mono">↑↓</span> to navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-mono">↵</span> to select
                </span>
              </div>
              <div className="font-medium opacity-50">Pavan D Portfolio</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
