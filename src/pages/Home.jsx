import React from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import TechMarquee from "../components/ui/TechMarquee";

const Home = () => {
  return (
    <div className="relative bg-skin-base min-h-screen">
      {/* Noise Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <Hero />
      <TechMarquee />

      <div className="my-20">
        <About />
      </div>

      {/* Quick Links Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        <Link to="/projects">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="group relative overflow-hidden rounded-[32px] bg-skin-inverted p-8 md:p-12 text-skin-text-inverted h-full"
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-2">Selected Works</h3>
                <p className="text-skin-text-inverted/60">
                  Explore my latest projects and experiments.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-8 text-skin-accent font-bold">
                View Projects{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                />
              </div>
            </div>
            {/* Abstract Circle Decoration */}
            <motion.div
              className="absolute -bottom-20 -right-20 w-64 h-64 bg-skin-accent/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </Link>

        <Link to="/contact">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="group relative overflow-hidden rounded-[32px] bg-skin-card p-8 md:p-12 text-skin-text-base h-full border border-skin-border-base"
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-2">Let's Talk</h3>
                <p className="text-skin-text-base/60">
                  Have an idea? Let's build something amazing together.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-8 font-bold">
                Get in Touch{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                />
              </div>
            </div>
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-skin-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </Link>
      </section>
    </div>
  );
};

export default Home;
