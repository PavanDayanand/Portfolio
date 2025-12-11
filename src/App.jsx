import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ArchitectProvider } from "./context/ArchitectContext";
import Layout from "./components/layout/Layout";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Education from "./pages/Education";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import Arcade from "./pages/Arcade";
import Timeline from "./pages/Timeline";
import DesignSystem from "./pages/DesignSystem";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <ThemeProvider>
      <ArchitectProvider>
        <Layout>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/education" element={<Education />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/arcade" element={<Arcade />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/design-system" element={<DesignSystem />} />
          </Routes>
          <Footer />
        </Layout>
      </ArchitectProvider>
    </ThemeProvider>
  );
}

export default App;
