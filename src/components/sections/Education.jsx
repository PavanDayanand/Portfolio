import React from "react";
import BentoCard from "../ui/BentoCard";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const EducationSection = () => {
  const { isBlueMode } = useTheme();
  const education = [
    {
      year: "2022 - Present",
      school: "Bangalore Institute of Technology",
      degree: "Computer Science and Engineering (Data Science)",
      details: "VV Puram, Bangalore, India",
      gpa: "8.44/10",
    },
    {
      year: "2021 - 2022",
      school: "Deeksha CFL College",
      degree: "PUC State Board",
      details: "Pre-University Course",
      gpa: "",
    },
    {
      year: "2020",
      school: "Podar International School",
      degree: "10th Grade",
      details: "Secondary Education",
      gpa: "",
    },
  ];

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <BentoCard
          key={index}
          dark={!isBlueMode} // Inverted: Dark card in Light Mode, Light card in Dark Mode
          className="flex flex-col justify-between min-h-[160px] group hover:border-brand-blue border border-white/10 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="px-4 py-1.5 bg-white text-brand-dark text-sm font-bold rounded-full">
              {edu.year}
            </span>
            <GraduationCap
              size={24}
              className="text-gray-500 group-hover:text-brand-blue transition-colors"
            />
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">{edu.school}</p>
            <h4 className="text-xl md:text-2xl font-bold mb-2">{edu.degree}</h4>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span>{edu.details}</span>
              {edu.gpa && (
                <span className="text-white font-medium">
                  • CGPA: {edu.gpa}
                </span>
              )}
            </div>
          </div>
        </BentoCard>
      ))}
    </div>
  );
};

export default EducationSection;
