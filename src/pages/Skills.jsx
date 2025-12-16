import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Marquee from "../components/ui/Marquee";
import { ExternalLink, ArrowRight } from "lucide-react";

const skillData = {
  // Core Stack
  Python: {
    desc: "A versatile language I use for everything from data analysis to backend development.",
    docs: "https://www.python.org/doc/",
  },
  JavaScript: {
    desc: "The language of the web. I use ES6+ features to build dynamic and interactive user interfaces.",
    docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  TypeScript: {
    desc: "A superset of JavaScript that adds static types, making code more robust and maintainable.",
    docs: "https://www.typescriptlang.org/",
  },
  "React.js": {
    desc: "My primary library for building component-based UIs. I love its ecosystem and flexibility.",
    docs: "https://react.dev/",
  },
  FastAPI: {
    desc: "A modern, fast (high-performance) web framework for building APIs with Python.",
    docs: "https://fastapi.tiangolo.com/",
  },

  // Data Science

  Pandas: {
    desc: "The backbone of my data preprocessing and EDA workflows. Essential for structured data.",
    docs: "https://pandas.pydata.org/",
  },
  "Scikit-learn": {
    desc: "Simple and efficient tools for predictive data analysis. My go-to for classical ML algorithms.",
    docs: "https://scikit-learn.org/",
  },
  LLMs: {
    desc: "Experience with Large Language Models (GPT, Gemini, Llama) for generative AI applications.",
    docs: "#",
  },

  // Frontend
  "Tailwind CSS": {
    desc: "A utility-first CSS framework that speeds up styling significantly and ensures consistency.",
    docs: "https://tailwindcss.com/",
  },

  Redux: {
    desc: "A predictable state container for JS apps. Useful for managing complex global state.",
    docs: "https://redux.js.org/",
  },
  Figma: {
    desc: "The interface design tool I use to prototype layouts before writing a single line of code.",
    docs: "https://www.figma.com/",
  },

  // Tools & DevOps
  Git: {
    desc: "Distributed version control system. I use it for tracking changes and collaborating.",
    docs: "https://git-scm.com/",
  },
  
  "VS Code": {
    desc: "My daily driver code editor. Highly customized for productivity.",
    docs: "https://code.visualstudio.com/",
  },
  Jupyter: {
    desc: "Interactive computing environment. Perfect for data experimentation and visualization.",
    docs: "https://jupyter.org/",
  },

  // Analytics
  PowerBI: {
    desc: "Interactive data visualization tool for converting data into rich dashboards.",
    docs: "https://learn.microsoft.com/en-us/power-bi/",
  },
  Tableau: {
    desc: "Visual analytics platform transforming the way we use data to solve problems.",
    docs: "https://www.tableau.com/",
  },
  SQL: {
    desc: "Standard language for storing, manipulating and retrieving data in databases.",
    docs: "https://dev.mysql.com/doc/",
  },
  Excel: {
    desc: "The classic spreadsheet tool. Still unbeatable for quick analysis and data viewing.",
    docs: "https://www.microsoft.com/en-us/microsoft-365/excel",
  },
};

const skillCategories = [
  {
    title: "Core Stack",
    id: "core",
    skills: ["Python", "JavaScript", "TypeScript", "React.js", "FastAPI"],
  },
  {
    title: "Data Science",
    id: "ds",
    skills: ["PyTorch", "TensorFlow", "Pandas", "Scikit-learn", "LLMs"],
  },
  {
    title: "Frontend",
    id: "frontend",
    skills: ["Tailwind CSS", "Redux", "Figma"],
  },
  {
    title: "Tools & DevOps",
    id: "tools",
    skills: ["Git", "VS Code", "Jupyter"],
  },
  {
    title: "Analytics",
    id: "analytics",
    skills: ["PowerBI", "Tableau", "SQL", "Excel"],
  },
];

function Skills() {
  const [activeCategory, setActiveCategory] = useState("core");

  // Intersection Observer for Scroll Spy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is near top of viewport
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    skillCategories.forEach((cat) => {
      const element = document.getElementById(cat.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const allSkills = Object.keys(skillData);

  return (
    <div className="min-h-screen pb-20 bg-skin-base">
      {/* Marquee Header */}
      <div className="relative py-12 mb-20 bg-skin-inverted text-skin-text-inverted border-b-4 border-skin-accent shadow-2xl z-0">
        <Marquee speed={120} className="mb-4 opacity-50">
          {allSkills.map((skill) => (
            <span key={skill} className="text-4xl font-black mx-8">
              {skill}
            </span>
          ))}
        </Marquee>
        <div className="max-w-7xl mx-auto px-4 mt-8 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-skin-text-inverted tracking-tighter">
            SKILLS<span className="text-skin-accent">.</span>
          </h1>
          <p className="text-skin-text-inverted/60 mt-4 max-w-2xl mx-auto text-lg">
            A detailed breakdown of my technical arsenal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12 relative">
        {/* Left Sidebar - Sticky Navigation */}
        <div className="lg:w-1/4 hidden lg:block">
          <div className="sticky top-32 space-y-2">
            <h3 className="text-xs font-bold text-skin-text-base/40 uppercase tracking-wider mb-4 pl-4">
              Categories
            </h3>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-skin-inverted text-skin-text-inverted shadow-lg translate-x-2"
                    : "text-skin-text-base/60 hover:bg-skin-card hover:text-skin-text-base"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content - Skill Lists */}
        <div className="lg:w-3/4 space-y-24">
          {skillCategories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-32"
            >
              <div className="flex items-center gap-4 mb-8 border-b border-skin-border-base pb-4">
                <h2 className="text-4xl font-black text-skin-text-base">
                  {category.title}
                </h2>
                <div className="h-1 flex-1 bg-skin-card rounded-full" />
              </div>

              <div className="grid gap-8">
                {category.skills.map((skillName) => {
                  const skill = skillData[skillName];
                  return (
                    <motion.div
                      key={skillName}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group flex gap-6 p-6 rounded-2xl hover:bg-skin-card transition-colors border border-transparent hover:border-skin-border-base"
                    >
                      {/* Square Bullet */}
                      <div className="shrink-0 mt-2">
                        <div className="w-3 h-3 bg-skin-accent rounded-sm shadow-sm group-hover:scale-125 transition-transform" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-3xl font-black text-skin-text-base">
                            {skillName}
                          </h3>
                          <a
                            href={skill?.docs || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-skin-text-base/40 hover:text-skin-accent"
                            title="View Documentation"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>

                        <p className="text-skin-text-base/70 leading-relaxed max-w-2xl">
                          {skill?.desc ||
                            "Proficient in using this technology for building scalable solutions."}
                        </p>

                        <div className="pt-2">
                          <a
                            href={skill?.docs || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-skin-accent hover:underline"
                          >
                            Documentation <ArrowRight size={12} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
