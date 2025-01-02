import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ITetrisPages } from "../App";

export default function Splash({ onNavigate }: ITetrisPages) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        onNavigate("menu");
      }}
    >
      {isVisible && (
        <motion.div
          className="min-h-screen flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.6,
              }}
              className="grid grid-cols-3 gap-1 mb-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="grid grid-cols-3 gap-1"
              >
                <div className="w-8 h-8 bg-white rounded-sm" />
                <div className="w-8 h-8 bg-white rounded-sm" />
                <div className="w-8 h-8 bg-white rounded-sm" />
                <div className="w-8 h-8 invisible" />
                <div className="w-8 h-8 bg-white rounded-sm" />
                <div className="w-8 h-8 invisible" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                lukavieira.tech
              </h1>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
