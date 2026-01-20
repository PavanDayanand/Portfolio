import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TestimonialsSection() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Quotes
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch("https://dummyjson.com/quotes");
        const data = await res.json();
        // Set first 15 quotes
        setQuotes(data.quotes.slice(0, 15));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
        // Fallback quotes
        setQuotes([
          { quote: "Comfort is the enemy of ambition.", author: "Unknown" },
          { quote: "Stay hungry, stay foolish.", author: "Steve Jobs" },
        ]);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  // Cycle Quotes
  useEffect(() => {
    if (loading || quotes.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 10000); // 10 seconds

    return () => clearInterval(timer);
  }, [loading, quotes]);

  // Loading State
  if (loading) return null;

  const currentQuote = quotes[currentIndex];

  return (
    <section className="py-24 md:py-32 overflow-hidden relative min-h-[50vh] flex flex-col justify-center">
      <div className="container mx-auto px-6 md:px-12 text-center relative z-10 w-full">
        <div className="relative min-h-[300px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{
                opacity: 0,
                filter: "blur(10px)",
                clipPath: "inset(0 100% 0 0)", // Reveal from left
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                clipPath: "inset(0 0% 0 0)", // Fully revealed
              }}
              exit={{
                opacity: 0,
                filter: "blur(10px)",
                clipPath: "inset(0 0 0 100%)", // Wipe away to right
              }}
              transition={{
                duration: 1.5,
                ease: [0.4, 0, 0.2, 1], // Custom bezier for premium feel
              }}
              className="flex flex-col items-center max-w-6xl mx-auto px-4"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold italic tracking-tight text-skin-text-base leading-tight mb-8">
                "{currentQuote.quote}"
              </h2>

              <cite className="not-italic text-lg md:text-xl font-medium text-skin-text-base/70">
                — {currentQuote.author}
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Background is now fully transparent (removed the blob) */}
    </section>
  );
}

export default TestimonialsSection;
