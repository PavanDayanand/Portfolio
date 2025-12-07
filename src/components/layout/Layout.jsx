import React from "react";
import NavBar from "./NavBar";
import CommandPalette from "../ui/CommandPalette";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-skin-base text-skin-text-base transition-colors duration-1000">
      <CommandPalette />
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {children}
      </main>
    </div>
  );
}

export default Layout;
