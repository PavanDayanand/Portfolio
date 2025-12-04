import React from "react";
import BentoCard from "../ui/BentoCard";
import { Circle, CheckCircle2 } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      role: "Graphic Designer (Logo, Brand Identity)",
      company: "Freelance",
      period: "2022-Present",
      description:
        "Working with diverse clients to create impactful brand identities.",
      current: true,
    },
    {
      role: "Seller (Watercolor Illustrations)",
      company: "Etsy",
      period: "2022-Present",
      description:
        "Creating and selling digital assets and merchandise templates.",
      current: true,
    },
    {
      role: "Junior Staff Of Industrial Engineering",
      company: "PT Kanaan Global Indonesia",
      period: "2021-2022",
      description: "Assisted in process optimization and layout planning.",
      current: false,
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-6">Experience</h3>
      {experiences.map((exp, index) => (
        <BentoCard key={index} className="!p-6 relative group">
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 bg-brand-blue text-white text-xs font-bold rounded-full">
              {exp.period}
            </span>
            {exp.current ? (
              <div className="animate-pulse">
                <Circle size={16} className="text-brand-blue fill-brand-blue" />
              </div>
            ) : (
              <CheckCircle2 size={16} className="text-gray-400" />
            )}
          </div>

          <div className="mb-2">
            <p className="text-xs text-gray-500 mb-1">{exp.company}</p>
            <h4 className="text-lg font-bold leading-tight">{exp.role}</h4>
          </div>

          {/* Timeline bar visual */}
          <div className="mt-6 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full bg-brand-dark rounded-full transition-all duration-1000 ease-out`}
              style={{ width: exp.current ? "70%" : "100%" }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>Start</span>
            <span>{exp.current ? "Present" : "End"}</span>
          </div>
        </BentoCard>
      ))}
    </div>
  );
};

export default Experience;
