import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";

import Layout from "./components/layout/Layout";
import EntryScreen from "./components/layout/EntryScreen";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Education from "./pages/Education";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";

function App() {
  const [showEntry, setShowEntry] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {showEntry && <EntryScreen onComplete={() => setShowEntry(false)} />}
      </AnimatePresence>

      {!showEntry && (
        <Layout>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/education" element={<Education />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </Layout>
      )}
    </ThemeProvider>
  );
}

export default App;
