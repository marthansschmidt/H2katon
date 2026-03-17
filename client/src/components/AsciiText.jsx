import { motion } from 'motion/react';

export default function AsciiText({ text = 'SUUMADIN' }) {
  const chars = text.toUpperCase().split('');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center mb-8 px-4"
    >
      <div className="relative inline-block w-full max-w-2xl">
        {/* Glow background */}
        <motion.div
          className="absolute inset-0 blur-3xl opacity-50 -z-10"
          style={{
            background: 'linear-gradient(135deg, #f5576c, #f093fb, #fda085)',
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

        {/* Main text with responsive sizing */}
        <div className="relative z-10 flex flex-wrap gap-1 sm:gap-2 justify-center items-center">
          {chars.map((char, idx) => (
            <motion.div
              key={idx}
              animate={{ y: [0, -16, 0] }}
              transition={{
                duration: 2.5,
                delay: idx * 0.08,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-block"
            >
              <div
                className="font-black leading-none"
                style={{
                  background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 50%, #fda085 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 0 20px rgba(245, 87, 108, 0.5))',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                }}
              >
                {char}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
