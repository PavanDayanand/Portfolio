import React from "react";
import BentoCard from "../ui/BentoCard";

function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "JavaScript (ES6+)", "TypeScript", "SQL (MySQL)"],
    },
    {
      title: "Frontend Development",
      skills: ["React.js", "React Router", "Redux Toolkit", "Tailwind CSS"],
    },
    {
      title: "Data Science & ML",
      skills: [
        "Data Preprocessing",
        "EDA",
        "Feature Engineering",
        "ETL",
        "Supervised & Unsupervised Learning",
        "Reinforcement Learning",
        "Generative AI",
        "LLMs",
      ],
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "LangChain",
        "FastAPI",
        "Matplotlib",
        "Seaborn",
      ],
    },
    {
      title: "BI & Visualization",
      skills: ["Tableau", "PowerBI", "MS Excel (PivotTables, XLOOKUP)"],
    },
    {
      title: "Tools",
      skills: [
        "VS Code",
        "Google Antigravity",
        "Jupyter Notebook",
        "MiniConda",
        "Git",
        "Figma",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skillCategories.map((category, index) => (
        <BentoCard key={index} className="flex flex-col h-full">
          <h3 className="text-xl font-bold mb-4 text-brand-blue">
            {category.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </BentoCard>
      ))}
    </div>
  );
}

export default SkillsSection;
