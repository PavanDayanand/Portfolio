import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 sm:px-6 lg:px-8 pb-8 pt-12 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Card - Matches the "Blue Portfolio Box" aesthetic */}
        <div className="relative overflow-hidden rounded-[32px] md:rounded-[48px] bg-[#0055FF] text-white p-6 md:p-24 mb-6 transition-transform duration-500 hover:scale-[1.01]">
          {/* Background Decor - Abstract large text/shapes to match home page vibe */}
          <div className="absolute -top-20 -right-20 opacity-10 pointer-events-none">
            <span className="text-[20rem] font-black leading-none">FT</span>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div>
              <p className="font-medium text-blue-100 mb-4 tracking-wide uppercase">
                What's Next?
              </p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-2">
                LET'S WORK <br /> TOGETHER.
              </h2>
            </div>

            <div className="flex flex-col items-center md:items-end gap-6">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-[#0055FF] rounded-full text-xl font-bold hover:bg-opacity-90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <span>Start a Project</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-blue-100/80 font-medium">
                pavan.radapa@gmail.com
              </p>
            </div>
          </div>

          {/* Scribble/Arrow Decoration - Matches home page "scribbles" */}
          <svg
            className="absolute bottom-10 left-10 w-32 h-32 text-white/20 -rotate-12 pointer-events-none"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10 50 Q 25 25 50 50 T 90 50" />
            <path d="M80 40 L 90 50 L 80 60" />
          </svg>
        </div>

        {/* Bottom Bar - Clean & Simple */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-skin-card/60 backdrop-blur-2xl border border-skin-border-base/50 rounded-[32px] p-8">
          {/* Left: Copyright */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-6 text-skin-text-base/60 text-sm font-medium text-center md:text-left">
            <span className="font-bold text-skin-text-base text-lg">
              PAVAN D.
            </span>
            <span className="hidden md:inline text-skin-border-base">|</span>
            <span>© {currentYear} All rights reserved.</span>
          </div>

          {/* Right: Socials */}
          <div className="flex justify-center md:justify-end gap-6">
            <SocialLink
              href="https://github.com/PavanDayanand"
              icon={<Github size={20} />}
            />
            <SocialLink
              href="https://www.linkedin.com/in/pavan-d-856231259/"
              icon={<Linkedin size={20} />}
            />
            <SocialLink
              href="mailto:pavan.radapa@gmail.com"
              icon={<Mail size={20} />}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-skin-base border border-skin-border-base text-skin-text-base/60 hover:text-[#0055FF] hover:border-[#0055FF] transition-colors"
  >
    {icon}
  </a>
);

export default Footer;
