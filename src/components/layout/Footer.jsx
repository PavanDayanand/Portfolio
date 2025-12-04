import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Download } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-skin-base border-t border-skin-border-base mt-20 transition-colors duration-1000">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-skin-text-base mb-2">
              PAVAN D
            </h2>
            <p className="text-skin-text-base/60 text-sm">
              © 2025 All rights reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com/PavanDayanand"
              target="_blank"
              className="text-skin-text-base/40 hover:text-skin-accent transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/pavan-d-856231259/"
              target="_blank"
              className="text-skin-text-base/40 hover:text-skin-accent transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:pavan.radapa@gmail.com"
              className="text-skin-text-base/40 hover:text-skin-accent transition-colors"
            >
              <Mail size={24} />
            </a>
            <a
              href="/Pavan D MAIN .pdf"
              download
              className="text-skin-text-base/40 hover:text-skin-accent transition-colors"
              title="Download Resume"
            >
              <Download size={24} />
            </a>
          </div>

          <div className="flex gap-8 text-sm font-medium text-skin-text-base/60">
            <Link to="/contact" className="hover:text-skin-text-base">
              Contact
            </Link>
            <Link to="/projects" className="hover:text-skin-text-base">
              Projects
            </Link>
            <Link to="/education" className="hover:text-skin-text-base">
              Education
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
