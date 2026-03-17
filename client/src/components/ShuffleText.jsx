import { motion } from 'motion/react';
import { useState, useCallback } from 'react';

export default function ShuffleText({ text = 'SUUMADIN', colorFrom = '#f5576c', colorTo = '#fda085' }) {
  const [isShuffling, setIsShuffling] = useState(false);

  const chars = text.split('');
  const shuffleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const handleShuffle = useCallback(() => {
    if (isShuffling) return;
    setIsShuffling(true);
    setTimeout(() => setIsShuffling(false), 800);
  }, [isShuffling]);

  const ShuffleChar = ({ char, index }) => {
    const [displayChar, setDisplayChar] = useState(char);

    const handleAnimationStart = () => {
      if (!isShuffling) return;

      let currentIndex = 0;
      const interval = setInterval(() => {
        setDisplayChar(shuffleChars[Math.floor(Math.random() * shuffleChars.length)]);
        currentIndex++;

        if (currentIndex > 8) {
          setDisplayChar(char);
          clearInterval(interval);
        }
      }, 30);
    };

    return (
      <motion.span
        onAnimationStart={handleAnimationStart}
        animate={isShuffling ? { y: [0, -20, 0] } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.05,
          type: 'spring',
          stiffness: 100,
        }}
        onMouseEnter={() => {
          if (!isShuffling) handleShuffle();
        }}
        className="inline-block cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${colorFrom} 0%, ${colorTo} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: 'clamp(3.5rem, 12vw, 8rem)',
          fontWeight: 900,
          lineHeight: 1,
          filter: 'drop-shadow(0 0 20px rgba(245, 87, 108, 0.5))',
          minWidth: '0.5em',
        }}
      >
        {displayChar}
      </motion.span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center mb-8 px-4 cursor-pointer select-none"
      onClick={handleShuffle}
    >
      <div className="relative inline-block w-full max-w-2xl">
        {/* Glow background */}
        <motion.div
          className="absolute inset-0 blur-3xl opacity-50 -z-10"
          style={{
            background: `linear-gradient(135deg, ${colorFrom}, #f093fb, ${colorTo})`,
            left: '-30px',
            right: '-30px',
            top: '-30px',
            bottom: '-30px',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Shuffle text */}
        <div className="relative z-10 flex gap-1 sm:gap-2 justify-center items-center whitespace-nowrap">
          {chars.map((char, idx) => (
            <ShuffleChar key={idx} char={char} index={idx} />
          ))}
        </div>

        {/* Hint text */}
        {!isShuffling && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="text-xs sm:text-sm text-white/40 mt-4"
          >
            Kliki või suru hiirega peale, et segada
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
