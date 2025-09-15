import React, { useEffect, useState } from "react";

function LoadingSpinner({ duration = 2000 }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 20; // ms per tick
    const increment = 100 / (duration / interval);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#0f0f0f]/90 z-50">
      {/* Loading Text */}
      <span className="mb-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
        Loading...
      </span>

      {/* Progress Bar */}
      <div className="w-72 h-6 bg-gray-800 rounded-full overflow-hidden shadow-lg">
        <div
          className="h-6 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Percentage */}
      <span className="mt-4 text-white font-bold">{Math.floor(progress)}%</span>
    </div>
  );
}

export default LoadingSpinner;
