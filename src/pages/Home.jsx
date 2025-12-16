import React from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// import TechMarquee from "../components/ui/TechMarquee";
import LogoLoop from "../components/ui/LogoLoop";
import HomeWidgets from "../components/home/HomeWidgets";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiDocker,
  SiFigma,
  SiGit,
  SiPostgresql,
  SiGraphql,
  SiJavascript,
  SiFastapi,
  SiPandas,
  SiScikitlearn,
  SiOpenai,
  SiRedux,
  SiJupyter,
  SiTableau,
  SiMysql,
} from "react-icons/si";

import { useTheme } from "../context/ThemeContext";

function Home() {
  const { isBlueMode } = useTheme();

  return (
    <div className="relative bg-skin-base min-h-screen">
      {/* Noise Texture Overlay (Dark Mode Only) */}
      {isBlueMode && (
        <div
          className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <Hero />

      {/* Skills Loop */}
      <div className="py-10">
        <LogoLoop
          logos={[
            // Core Stack
            {
              node: <SiPython />,
              title: "Python",
              href: "https://www.python.org",
            },
            {
              node: <SiJavascript />,
              title: "JavaScript",
              href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
            },
            {
              node: <SiTypescript />,
              title: "TypeScript",
              href: "https://www.typescriptlang.org",
            },
            { node: <SiReact />, title: "React.js", href: "https://react.dev" },
            {
              node: <SiNextdotjs />,
              title: "Next.js",
              href: "https://nextjs.org",
            },
            {
              node: <SiFastapi />,
              title: "FastAPI",
              href: "https://fastapi.tiangolo.com",
            },

            // Data Science
            {
              node: <SiPandas />,
              title: "Pandas",
              href: "https://pandas.pydata.org",
            },
            {
              node: <SiScikitlearn />,
              title: "Scikit-learn",
              href: "https://scikit-learn.org",
            },
            {
              node: <SiOpenai />,
              title: "LLMs",
              href: "https://openai.com",
            },

            // Frontend
            {
              node: <SiTailwindcss />,
              title: "Tailwind CSS",
              href: "https://tailwindcss.com",
            },
            {
              node: <SiRedux />,
              title: "Redux",
              href: "https://redux.js.org",
            },
            {
              node: <SiFigma />,
              title: "Figma",
              href: "https://www.figma.com",
            },

            // Tools & DevOps & Analytics
            { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
            {
              node: <SiDocker />,
              title: "Docker",
              href: "https://www.docker.com",
            },
            {
              node: <SiJupyter />,
              title: "Jupyter",
              href: "https://jupyter.org",
            },
            {
              node: <SiTableau />,
              title: "Tableau",
              href: "https://www.tableau.com",
            },
            {
              node: <SiMysql />,
              title: "SQL",
              href: "https://dev.mysql.com/doc",
            },
          ]}
          speed={20}
          direction="left"
          logoHeight={40}
          gap={60}
          hoverSpeed={5} // Slow down on hover (not full stop) to allow clicking
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="var(--color-bg-base)"
        />
      </div>

      <div className="my-20">
        <About />
      </div>

      {/* Premium Widgets Section */}
      <section className="mb-6">
        <HomeWidgets />
      </section>

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
}

export default Home;
