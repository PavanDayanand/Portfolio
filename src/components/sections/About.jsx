import React from "react";
import BentoCard from "../ui/BentoCard";
import NowWidget from "../ui/NowWidget";
import { Mail, Linkedin, Globe, Github } from "lucide-react";

function About() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
      {/* Profile Card - Tall */}
      <BentoCard
        className="md:col-span-1 md:row-span-2 !p-0 group relative h-full min-h-[400px]"
        dark
      >
        <img
          src="/pavana.png"
          alt="Profile"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <p className="text-gray-300 text-sm mb-1">Hello,</p>
          <h2 className="text-3xl font-bold leading-tight">
            My name
            <br />
            is Pavan D
          </h2>
          <p className="text-xs text-gray-400 mt-4 max-w-[200px]">
            Computer Science & Data Science Student
          </p>
        </div>
      </BentoCard>

      {/* Introduction Card - Wide */}
      <BentoCard className="md:col-span-2 lg:col-span-2 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4">
              CS & Data Science Student based in Bangalore
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Highly motivated Computer Science & Data Science student skilled
              in Machine Learning, AI-driven applications, and modern frontend
              development. Experienced in building predictive models,
              interactive dashboards, and full-stack solutions using Python,
              SQL, React, TypeScript, and Redux Toolkit. Strong ability to turn
              complex data into practical, user-focused products.
            </p>
          </div>
          <div className="w-32 h-32 shrink-0">
            {/* Placeholder illustration or icon */}
            <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-4xl">
              🚀
            </div>
          </div>
        </div>
      </BentoCard>

      {/* Now Widget */}
      <NowWidget />

      {/* Contact Cards - Small Squares */}
      <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <a href="mailto:pavan.radapa@gmail.com" className="contents">
          <BentoCard className="!bg-[#1C1C1E] !text-white flex flex-col justify-between aspect-square sm:aspect-auto sm:h-40 hover:scale-[1.02] active:scale-95 hover:shadow-xl hover:brightness-110 transition-all duration-300 cursor-pointer p-6">
            <Mail size={32} />
            <div className="mt-auto pt-4">
              <p className="text-xs text-gray-400 mb-1 tracking-wide uppercase">
                Email
              </p>
              <p className="font-medium text-sm truncate">
                pavan.radapa@gmail.com
              </p>
            </div>
          </BentoCard>
        </a>

        <a
          href="https://www.linkedin.com/in/pavan-d-856231259/"
          target="_blank"
          rel="noopener noreferrer"
          className="contents"
        >
          <BentoCard className="!bg-[#0077B5] !text-white flex flex-col justify-between aspect-square sm:aspect-auto sm:h-40 hover:scale-[1.02] active:scale-95 hover:shadow-xl hover:brightness-110 transition-all duration-300 cursor-pointer p-6">
            <Linkedin size={32} />
            <div className="mt-auto pt-4">
              <p className="text-xs text-blue-200 mb-1 tracking-wide uppercase">
                LinkedIn
              </p>
              <p className="font-medium text-sm">Connect with me</p>
            </div>
          </BentoCard>
        </a>

        <a
          href="https://github.com/PavanDayanand"
          target="_blank"
          rel="noopener noreferrer"
          className="contents"
        >
          <BentoCard className="!bg-[#333] !text-white flex flex-col justify-between aspect-square sm:aspect-auto sm:h-40 hover:scale-[1.02] active:scale-95 hover:shadow-xl hover:brightness-110 transition-all duration-300 cursor-pointer p-6">
            <Github size={32} />
            <div className="mt-auto pt-4">
              <p className="text-xs text-gray-400 mb-1 tracking-wide uppercase">
                GitHub
              </p>
              <p className="font-medium text-sm">PavanDayanand</p>
            </div>
          </BentoCard>
        </a>
      </div>
    </section>
  );
}

export default About;
