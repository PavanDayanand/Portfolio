import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "CLARITY",
    category: "AI Healthcare",
    image: "/clarity.png",
    period: "April 2025 - November 2025",
    tech: [
      "React",
      "FastAPI",
      "Python",
      "DenseNet121",
      "ResNet152",
      "Grad-CAM",
    ],
    description:
      "A hospital-ready AI system for chest X-ray diagnosis integrating CNN, RNN, and Generative AI models.",
    details: `Developed a hospital-ready AI system for chest X-ray diagnosis integrating CNN, RNN, and Generative AI models.
    Implemented dual-model inference (DenseNet121 & ResNet152) with Grad-CAM explainability and automated report generation.
    Built a full-stack solution using React and FastAPI, producing clinician-grade PDF reports.
    Achieved 93% accuracy and AUC above 0.83 on the NIH ChestX-ray14 dataset with 112k+ images.`,
    liveLink: "https://clarity-project.netlify.app/",
    githubLink: "https://github.com/PavanDayanand/Clarity-FrontEnd",
  },
  {
    id: 2,
    title: "EduGenie",
    category: "Generative AI",
    image: "/edugenie.png",
    period: "March 2025 - May 2025",
    tech: [
      "Gemini API",
      "LangChain",
      "LLMs",
      "Tailwind CSS",
      "PyMuPDF",
      "FastAPI",
    ],
    description:
      "Generative AI-powered application to deliver intelligent academic insights from educational documents.",
    details: `Engineered a Generative AI-powered application to deliver intelligent academic insights from educational documents.
    The system uses an OCR pipeline built with PyMuPDF to automate data extraction, which reduced manual data entry efforts by 60%.
    Integrated Google Gemini API and LangChain with a FastAPI backend to process user queries, providing personalized feedback to students.`,
    liveLink: "#", // Not yet published
    githubLink: "https://github.com/harshakl03/EduGenie",
  },
  {
    id: 3,
    title: "Diabetes Risk Prediction",
    category: "Machine Learning",
    image: "/diabetes.png",
    period: "November 2024 - December 2024",
    tech: ["Python", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
    description: "Efficient Diabetes Risk Prediction Using KNR Models.",
    details: `Built a machine learning-based diabetes risk prediction system using Random Forest and KNN, achieving 84% accuracy and F1-score of 0.80.
    Applied feature engineering, data preprocessing, and class imbalance handling.
    Implemented with Python, Scikit-learn, and Pandas for early healthcare diagnostics.`,
    liveLink:
      "https://drive.google.com/drive/folders/1WcwnOQjC_kCf3QtBbdu10tXQp75lHlHc?usp=sharing", // Demo files
    githubLink: "#", // No GitHub link provided
  },
  {
    id: 4,
    title: "InterConnect",
    category: "Data Analytics",
    image: "/interconnect.png",
    period: "October 2024 - December 2024",
    tech: ["ETL", "Google BigQuery", "Power BI", "Google Forms"],
    description:
      "Interactive Power BI dashboard analyzing opinion gaps between students, faculty, and clubs.",
    details: `Managed data design and storytelling to build an interactive Power BI dashboard that analyzed opinion gaps between students, faculty, and clubs.
    Contributed to the data collection using Google Forms and performed ETL processing using BigQuery to clean and structure the data for analysis.
    The project was awarded 2nd place among 22 teams in a technical competition.`,
    liveLink:
      "https://drive.google.com/drive/folders/15mC4JnLKT4pJb5Dqf_wJ0H94SixWsBR0?usp=drive_link", // Assets
    githubLink: "#", // No GitHub link provided
  },
];

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

        <div className="flex gap-4 pt-4">
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
        </div>

        <div className="divide-y divide-white/10">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
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
