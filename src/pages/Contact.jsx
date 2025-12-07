import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  ArrowRight,
  Copy,
  Check,
  Coffee,
} from "lucide-react";
import { useState, useEffect } from "react";

function ContactCard({ icon, title, value, link, action, colorClass }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (action === "copy") {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const Wrapper = link ? "a" : "div";
  const props = link
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : { onClick: handleCopy };

  return (
    <Wrapper
      {...props}
      className={`group relative p-8 rounded-[32px] border border-skin-border-base bg-skin-card hover:bg-skin-inverted hover:border-transparent transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[240px] ${
        link ? "" : "cursor-copy"
      }`}
    >
      <div className="relative z-10 flex justify-between items-start">
        <div className={`p-4 rounded-2xl ${colorClass} text-white`}>{icon}</div>
        {action === "copy" && (
          <div className="p-2 rounded-full bg-skin-base text-skin-text-base opacity-0 group-hover:opacity-100 transition-opacity">
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </div>
        )}
        {link && (
          <div className="p-2 rounded-full bg-skin-base text-skin-text-base opacity-0 group-hover:opacity-100 transition-opacity -rotate-45 group-hover:rotate-0 transform duration-300">
            <ArrowRight size={16} />
          </div>
        )}
      </div>

      <div className="relative z-10 mt-8">
        <h3 className="text-lg font-bold text-skin-text-base/60 group-hover:text-skin-text-inverted/60 mb-1 transition-colors">
          {title}
        </h3>
        <p className="text-2xl md:text-3xl font-black text-skin-text-base group-hover:text-skin-text-inverted transition-colors break-all">
          {value}
        </p>
      </div>

      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-skin-inverted opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" />
    </Wrapper>
  );
}

function Contact() {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("data-name", "BMC-Widget");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-id", "MacPusle");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute("data-message", "");
    script.setAttribute("data-color", "#5F7FFF");
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      const widget = document.getElementById("bmc-wbtn");
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-skin-base py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-skin-text-base tracking-tighter mb-6"
          >
            SAY <span className="text-skin-accent">HELLO.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-skin-text-base/60 max-w-2xl mx-auto"
          >
            No forms to fill. Just direct connections.
            <br />
            Choose your preferred way to reach out.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Tip Jar - First as requested */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2"
          >
            <ContactCard
              icon={
                <div className="relative">
                  <Coffee size={32} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                </div>
              }
              title="Support my work"
              value="Buy me a coffee"
              link="https://www.buymeacoffee.com/MacPusle"
              colorClass="bg-yellow-500 text-black"
            />
          </motion.div>

          {/* Email - Spans full width on mobile, 1 col on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2"
          >
            <ContactCard
              icon={<Mail size={32} />}
              title="Drop me an email"
              value="pavan.radapa@gmail.com"
              action="copy"
              colorClass="bg-blue-500"
            />
          </motion.div>

          {/* LinkedIn */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ContactCard
              icon={<Linkedin size={32} />}
              title="Connect professionally"
              value="LinkedIn"
              link="https://www.linkedin.com/in/pavan-d-856231259/"
              colorClass="bg-[#0077b5]"
            />
          </motion.div>

          {/* GitHub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ContactCard
              icon={<Github size={32} />}
              title="Check my code"
              value="GitHub"
              link="https://github.com/PavanDayanand"
              colorClass="bg-gray-800"
            />
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20 text-skin-text-base/40 text-sm font-medium"
        >
          Based in Bengaluru, India • Available for freelance & full-time roles
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
