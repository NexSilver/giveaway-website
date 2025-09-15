import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const KonamiCode = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const pattern = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let currentIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === pattern[currentIndex]) {
        currentIndex++;
        if (currentIndex === pattern.length) {
          triggerEasterEgg();
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    const triggerEasterEgg = () => {
      // 🎉 CONFETTI RAIN - Optimized (less laggy)
      const duration = 2500;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 80, // much lower
          spread: 80,
          startVelocity: 30,
          gravity: 1,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          zIndex: 9999,
          ticks: 150,
          scalar: 0.8,
          colors: ["#06b6d4", "#a855f7", "#ffffff"],
        });
        if (Date.now() < end) {
          setTimeout(() => requestAnimationFrame(frame), 100); // small delay = smoother, less CPU
        }
      })();

      // Play Local Sound
      const audio = new Audio("/konami-sound.mp3");
      audio.volume = 0.8;
      audio.play();

      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 4000);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {showOverlay && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9998]">
          <div className="text-center scale-90 animate-[zoomIn_0.5s_ease-out_forwards]">
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]">
              KONAMI CODE UNLOCKED!
            </h2>
            <p className="mt-4 text-gray-300 text-lg md:text-xl">
              You're officially a pro gamer! 💜💙
            </p>
          </div>
        </div>
      )}

      {/* Zoom-in keyframes */}
      <style>{`
        @keyframes zoomIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default KonamiCode;
