import React from "react";
import BentoCard from "./BentoCard";
import { useTheme } from "../../context/ThemeContext";

function NowWidget() {
  const { isBlueMode } = useTheme();
  return (
    <BentoCard
      dark={isBlueMode}
      className="md:col-span-1 md:row-span-1 flex flex-col justify-between h-full min-h-[180px]"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
          Now
        </h3>
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 mb-1">Currently Working</span>
          <span className="font-medium text-sm text-skin-text-base">
            Internship at Elvi (Full Stack Developer)
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 mb-1">Upcoming</span>
          <span className="font-medium text-sm text-skin-text-base">
            Exams till Jan 15 2026
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 mb-1">Leetcoding</span>
          <span className="font-medium text-sm text-skin-text-base">
            Graphs & DP
          </span>
        </div>
      </div>
    </BentoCard>
  );
}

export default NowWidget;
