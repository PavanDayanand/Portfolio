import React from "react";
import NavBar from "./NavBar";
import CommandPalette from "../ui/CommandPalette";
import Spotlight from "../ui/Spotlight";
import AmbientBackground from "../ui/AmbientBackground";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-skin-base text-skin-text-base transition-colors duration-1000 relative isolation-auto">
      <AmbientBackground />
      <Spotlight />
      <CommandPalette />
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        {children}
      </main>
    </div>
  );
}

export default Layout;
