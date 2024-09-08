import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ConfettiProps {
  count?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ count = 100 }) => {
  const [confetti, setConfetti] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
      "#ffa500",
      "#800080",
      "#ffc0cb",
      "#40e0d0",
      "#ff69b4",
      "#1e90ff",
    ];
    const newConfetti = Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: "fixed",
          top: "-20px",
          left: `${Math.random() * 100}vw`,
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          borderRadius: Math.random() > 0.5 ? "50%" : "0%",
          zIndex: 9999,
        }}
        initial={{ y: -20, opacity: 1, scale: 0 }}
        animate={{
          y: "110vh",
          opacity: [1, 1, 0],
          rotate: Math.random() * 720 - 360,
          scale: [0, 1, 1, 0.5],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          ease: [0.23, 0.98, 0.36, 1],
        }}
      />
    ));
    setConfetti(newConfetti);

    const timer = setTimeout(() => {
      setConfetti([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}>
      {confetti}
    </div>
  );
};

export default Confetti;
