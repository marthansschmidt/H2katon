import { motion } from 'motion/react';
import { RotateCcw, Sparkles, Star } from 'lucide-react';
import MagicRings from './MagicRings';
import ClickSpark from './ClickSpark';

export default function EndScreen({ players, isHost, onPlayAgain }) {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  const getMedalIcon = (i) => {
    const icons = ['🥇', '🥈', '🥉'];
    return icons[i] || null;
  };

  const getRowStyles = (i) => {
    const styles = [
      { background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.15))', border: '2px solid rgba(255,215,0,0.5)', shadow: '0 8px 32px rgba(255,215,0,0.3)' },
      { background: 'linear-gradient(135deg, rgba(192,192,192,0.15), rgba(169,169,169,0.1))', border: '2px solid rgba(192,192,192,0.4)', shadow: '0 8px 32px rgba(192,192,192,0.2)' },
      { background: 'linear-gradient(135deg, rgba(205,127,50,0.15), rgba(184,115,51,0.1))', border: '2px solid rgba(205,127,50,0.4)', shadow: '0 8px 32px rgba(205,127,50,0.2)' },
    ];
    return styles[i] || { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', shadow: 'none' };
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-game relative overflow-hidden" style={{ background: '#0a0a0c' }}>
      <ClickSpark />
      <MagicRings />
      <div className="relative z-10 w-full flex-1 flex flex-col">
        {/* Title */}
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center pt-6 mb-10">
          <h1 className="text-4xl md:text-5xl font-black mb-1" style={{
            background: 'linear-gradient(135deg, #ff00ff, #bc13fe)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Mäng läbi!</h1>
          <p className="text-white/50 text-sm">Siin on lõplikud tulemused</p>
        </motion.div>

        {/* All Players - Scrollable */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <div className="max-w-[600px] mx-auto space-y-3">
            {sorted.map((p, i) => {
              const style = getRowStyles(i);
              const medal = getMedalIcon(i);
              const isTop3 = i < 3;
              
              return (
                <motion.div
                  key={p.id}
                  initial={{ x: i % 2 === 0 ? -60 : 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 100 }}
                  className="rounded-2xl p-4 flex items-center gap-3 relative overflow-hidden group"
                  style={{
                    background: style.background,
                    backdropFilter: 'blur(12px)',
                    border: style.border,
                    boxShadow: style.shadow,
                  }}
                >
                  {isTop3 && (
                    <motion.div 
                      className="absolute inset-0" 
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                        backgroundSize: '200% 100%',
                      }}
                      animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-3 w-full">
                    <div className="flex-shrink-0 text-2xl">
                      {medal || <span className="text-white/40 font-bold">#{i + 1}</span>}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{p.name}</span>
                        {i === 0 && (
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
                            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300 flex-shrink-0" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <span className="text-xl font-black" style={{
                        background: 'linear-gradient(135deg, #f5576c, #f093fb)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      }}>{p.score}</span>
                      <span className="text-white/40 text-xs block">pts</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Play Again Button */}
        <div className="mt-auto px-2 pb-6">
          <div className="max-w-[600px] mx-auto">
            {isHost && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onPlayAgain}
                className="w-full min-h-[48px] px-6 py-3 rounded-2xl font-black text-lg uppercase tracking-wide text-white transition-all relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #38ef7d 0%, #11998e 100%)',
                  boxShadow: '0 10px 40px rgba(56,239,125,0.4)',
                  border: '2px solid rgba(255,255,255,0.2)',
                }}
              >
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  backgroundSize: '200% 100%',
                }}
                  animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <RotateCcw className="w-5 h-5" /> Mängi uuesti!
                </span>
              </motion.button>
            )}

            {!isHost && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#fda085] animate-pulse" />
                  <p className="text-white/60 font-bold text-sm">Ootame hosti otsust...</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
