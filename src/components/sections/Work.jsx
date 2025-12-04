import React from "react";
import BentoCard from "../ui/BentoCard";

const Work = () => {
  const projects = [
    { title: "Project One", image: "/clarity.png", tag: "Branding" },
    { title: "Project Two", image: "/diabetes.png", tag: "UI/UX" },
    { title: "Project Three", image: "/edugenie.png", tag: "App Design" },
    { title: "Project Four", image: "/interconnect.png", tag: "Web Design" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <BentoCard
          key={index}
          className="!p-0 overflow-hidden group min-h-[300px]"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="text-sm opacity-80">{project.tag}</p>
            </div>
          </div>
        </BentoCard>
      ))}
    </div>
  );
};

export default Work;
