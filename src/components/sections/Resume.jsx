import React from "react";
import Experience from "./Experience";
import Skills from "./Skills";
import Education from "./Education";

function Resume() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Experience />
      </div>
      <div className="md:col-span-1">
        <Skills />
      </div>
      <div className="md:col-span-1">
        <Education />
      </div>
    </div>
  );
}

export default Resume;
