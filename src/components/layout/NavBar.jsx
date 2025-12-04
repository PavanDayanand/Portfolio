import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

const NavBar = () => {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Certifications", path: "/certifications" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-4 z-40 mx-auto max-w-fit px-4"
    >
      <div className="flex items-center gap-2 rounded-full bg-skin-base/80 px-3 py-2 shadow-lg backdrop-blur-md border border-skin-border-base/20">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-skin-inverted text-skin-text-inverted mr-2 hover:scale-105 transition-transform"
        >
          <span className="font-bold text-xl">P</span>
        </NavLink>

        {/* Links */}
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
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {link.name}
              </NavLink>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <div className="ml-2 border-l border-skin-border-base/20 pl-2">
          <ThemeToggle />
        </div>

        {/* Download Resume Button */}
        <a
          href="/Pavan D MAIN .pdf"
          download="Pavan_D_Resume.pdf"
          className="hidden md:flex items-center gap-2 ml-2 px-4 py-2 bg-skin-accent text-skin-text-accent rounded-full text-sm font-bold hover:opacity-90 transition-opacity shadow-sm"
        >
          <Download size={16} />
          <span>Resume</span>
        </a>

        {/* Mobile Menu Button (Simple placeholder for now) */}
        <div className="md:hidden pr-2 text-skin-text-base">
          <span className="text-sm font-bold">Menu</span>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
