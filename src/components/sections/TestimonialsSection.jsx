import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fallbackQuotes = [
  { quote: "Comfort is the enemy of ambition.", author: "Unknown" },
  { quote: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  {
    quote: "Build boldly, but refine relentlessly.",
    author: "Pavan D Portfolio",
  },
];

function TestimonialsSection() {
  const [quotes, setQuotes] = useState(fallbackQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch Quotes
  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://dummyjson.com/quotes");
        const data = await res.json();
        // Set first 15 quotes
        setQuotes(data.quotes.slice(0, 15));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
        setQuotes(fallbackQuotes);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  // Cycle Quotes
  useEffect(() => {
    if (quotes.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 10000); // 10 seconds

    return () => clearInterval(timer);
  }, [quotes]);

  const currentQuote = quotes[currentIndex];
  const sideQuotes = useMemo(() => {
    if (quotes.length === 0) return [];
    return [-1, 1].map((offset) => {
      const index = (currentIndex + offset + quotes.length) % quotes.length;
      return quotes[index];
    });
  }, [quotes, currentIndex]);

  return (
    <section className="py-24 md:py-32 overflow-hidden relative min-h-[60vh] flex flex-col justify-center">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-30 blur-3xl"
        style={{
          background:
            "linear-gradient(120deg, rgba(0,51,255,0.25), rgba(182,32,224,0.25), rgba(0,255,240,0.2))",
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-skin-base via-skin-base/70 to-transparent" />
      <div className="container mx-auto px-6 md:px-12 text-center relative z-10 w-full">
        <div className="relative min-h-[340px] flex flex-col items-center justify-center perspective-1000">
          {/* Side Deck */}
          {sideQuotes.map((quote, idx) => (
            <motion.div
              key={`${quote.quote}-${idx}`}
              className={`absolute hidden md:block top-1/2 -translate-y-1/2 w-full max-w-3xl rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl px-12 py-10`}
              style={{
                transformOrigin: idx === 0 ? "left center" : "right center",
              }}
              initial={false}
              animate={{
                scale: 0.92,
                rotateY: idx === 0 ? 14 : -14,
                translateX: idx === 0 ? -40 : 40,
                opacity: 0.25,
              }}
            >
              <p className="text-xl text-white/60 italic">"{quote.quote}"</p>
            </motion.div>
          ))}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full max-w-4xl mx-auto"
            >
              <motion.div
                whileHover={{ rotateX: -2, rotateY: 2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="rounded-[38px] border border-white/15 bg-gradient-to-br from-white/15 via-white/5 to-white/10 text-white px-8 sm:px-14 py-12 shadow-2xl backdrop-blur-3xl relative overflow-hidden"
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_60%)]" />
                  <motion.div
                    initial={{ x: "-120%" }}
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "linear",
                    }}
                    className="absolute -inset-y-8 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-6"
                  />
                </div>

                <h2 className="relative text-3xl md:text-5xl font-bold italic tracking-tight leading-tight mb-8">
                  "{currentQuote.quote}"
                </h2>
                <cite className="relative not-italic text-lg md:text-xl font-semibold text-white/80">
                  — {currentQuote.author}
                </cite>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
