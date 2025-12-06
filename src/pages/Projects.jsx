import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Github, ExternalLink, X } from "lucide-react";
import { projects } from "../data/projects";

const ProjectItem = ({ project }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 py-20">
      {/* Text Content */}
      <div className="w-full md:w-1/2 space-y-8">
        <div>
          <span className="text-brand-blue font-bold tracking-wider uppercase text-sm mb-2 block">
            {project.category}
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
            {project.title}
          </h2>
          <p className="text-gray-400 text-lg font-medium">{project.period}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
          {project.details}
        </p>

        <div className="flex gap-4 pt-4 flex-wrap">
          {project.githubLink && project.githubLink !== "#" && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
              <Github size={20} /> Code
            </a>
          )}
          {project.liveLink && project.liveLink !== "#" && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              <ExternalLink size={20} /> Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Image Content */}
      <div className="w-full md:w-1/2 h-[400px] md:h-[600px] rounded-3xl overflow-hidden relative group shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  );
};

const Projects = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState(null);

  // Read URL query params for "filter"
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filterParam = params.get("filter");
    if (filterParam) {
      setFilter(filterParam);
    } else {
      setFilter(null);
    }
  }, [location]);

  const clearFilter = () => {
    setFilter(null);
    navigate("/projects"); // Clear URL param
  };

  // Filter Logic
  const filteredProjects = filter
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(filter.toLowerCase()) ||
          p.tech.some((t) => t.toLowerCase().includes(filter.toLowerCase())) ||
          p.category.toLowerCase().includes(filter.toLowerCase())
      )
    : projects;

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-12">
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-4">
            WORKS<span className="text-brand-blue">.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            A selection of projects that define my journey in Code and Data.
          </p>

          {/* Active Filter Indicator */}
          {filter && (
            <div className="mt-8 flex items-center gap-4">
              <span className="text-brand-blue font-bold text-lg">
                🔍 Showing results for "{filter}"
              </span>
              <button
                onClick={clearFilter}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold transition-all"
              >
                <X size={16} /> Clear Filter
              </button>
            </div>
          )}
        </div>

        <div className="divide-y divide-white/10">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))
          ) : (
            <div className="py-20 text-center text-gray-500 text-xl">
              No projects found matching "{filter}".
              <br />
              <button
                onClick={clearFilter}
                className="mt-4 text-brand-blue underline"
              >
                View all projects
              </button>
            </div>
          )}
        </div>

        <div className="py-20 text-center">
          <h3 className="text-2xl font-bold mb-4">Want to see more?</h3>
          <a
            href="https://github.com/PavanDayanand"
            target="_blank"
            className="text-brand-blue hover:underline text-lg"
          >
            Visit my GitHub Profile &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
