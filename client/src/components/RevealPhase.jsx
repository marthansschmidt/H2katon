import { motion } from 'motion/react';
import { Swords, Zap } from 'lucide-react';
import MagicRings from './MagicRings';

export default function RevealPhase({ answers, currentRound, battlePlayers }) {
  const isBattle = currentRound === 2;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-game relative overflow-hidden">
      <MagicRings />
      <div className="w-full max-w-[600px] relative z-10">
        {/* Battle Banner */}
        {isBattle && battlePlayers && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center mb-8 py-8 sm:py-10 px-4 sm:px-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Swords className="w-12 h-12 text-[#fda085] mx-auto mb-4" />
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-normal py-2 px-1">{battlePlayers[0]?.name}</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gradient"
              >VS</motion.span>
              <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-normal py-2 px-1">{battlePlayers[1]?.name}</span>
            </div>
          </motion.div>
        )}

        {!isBattle && (
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
            <Zap className="w-10 h-10 text-[#f093fb] mx-auto mb-2" />
            <h2 className="text-3xl font-black text-gradient">Vastused</h2>
          </motion.div>
        )}

        {/* Answer Cards */}
        <div className="space-y-5">
          {answers.map((a, i) => (
            <motion.div
              key={i}
              initial={{ x: i % 2 === 0 ? -80 : 80, opacity: 0, rotateY: 90 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ delay: i * 0.4, type: 'spring', stiffness: 80 }}
              className="glass rounded-3xl p-6 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: i === 0
                    ? 'linear-gradient(135deg, rgba(245,87,108,0.2), transparent)'
                    : 'linear-gradient(135deg, rgba(240,147,251,0.2), transparent)',
                }}
              />
              <div className="relative z-10">
                <p className="text-2xl font-bold text-white mb-2">{a.text}</p>
                {a.playerName && (
                  <p className="text-sm text-white/40">{'\u2014'} {a.playerName}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
