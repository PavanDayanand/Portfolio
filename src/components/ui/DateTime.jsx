import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function DateTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Get local timezone abbreviation (e.g., EST, PST, IST)
  const timeZone = date
    .toLocaleTimeString("en-us", { timeZoneName: "short" })
    .split(" ")[2];

  const month = date.toLocaleDateString("en-US", { month: "long" });
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.toLocaleDateString("en-US", { day: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="mt-8 flex flex-col items-center lg:items-start text-skin-text-base"
    >
      {/* Time */}
      <div className="font-black tracking-tighter text-4xl lg:text-5xl leading-none flex items-baseline gap-2">
        {timeString}
        <span className="text-lg lg:text-xl font-medium text-skin-text-base/60 tracking-normal">
          ({timeZone})
        </span>
      </div>

      {/* Date */}
      <div className="flex flex-col items-center lg:items-start mt-2">
        <span className="text-2xl font-bold text-skin-text-base/80">
          {month}
        </span>
        <div className="flex items-baseline gap-2 leading-none">
          <span className="text-2xl font-bold text-skin-text-base/80">
            {weekday}
          </span>
          <span className="text-4xl font-black text-skin-accent">{day}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default DateTime;
