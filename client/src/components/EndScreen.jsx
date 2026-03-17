import { motion } from 'motion/react';
import { Trophy, Medal, Award, RotateCcw, Sparkles, Star } from 'lucide-react';

export default function EndScreen({ players, isHost, onPlayAgain }) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const podiumIcons = [
    <Trophy className="w-10 h-10 text-yellow-400" />,
    <Medal className="w-8 h-8 text-gray-300" />,
    <Award className="w-8 h-8 text-amber-600" />,
  ];

  const podiumGradients = [
    'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.15))',
    'linear-gradient(135deg, rgba(192,192,192,0.15), rgba(169,169,169,0.1))',
    'linear-gradient(135deg, rgba(205,127,50,0.15), rgba(184,115,51,0.1))',
  ];

  const podiumBorders = [
    '2px solid rgba(255,215,0,0.5)',
    '2px solid rgba(192,192,192,0.4)',
    '2px solid rgba(205,127,50,0.4)',
  ];

  const podiumShadows = [
    '0 8px 32px rgba(255,215,0,0.3)',
    '0 8px 32px rgba(192,192,192,0.2)',
    '0 8px 32px rgba(205,127,50,0.2)',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-game">
      <div className="w-full max-w-[600px]">
        {/* Title */}
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-10">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <span className="text-6xl">{'\uD83C\uDFC6'}</span>
          </motion.div>
          <h1 className="text-5xl font-black text-gradient mb-2">Mäng läbi!</h1>
          <p className="text-white/60">Siin on lõplikud tulemused</p>
        </motion.div>

        {/* Podium */}
        <div className="space-y-4 mb-8">
          {top3.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ x: i % 2 === 0 ? -60 : 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.3, type: 'spring', stiffness: 100 }}
              className="rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden"
              style={{
                background: podiumGradients[i],
                backdropFilter: 'blur(12px)',
                border: podiumBorders[i],
                boxShadow: podiumShadows[i],
              }}
            >
              {i === 0 && (
                <motion.div className="absolute inset-0 shimmer" />
              )}

              <div className="relative z-10 flex items-center gap-4 w-full">
                <div className="flex-shrink-0">
                  <motion.div
                    animate={i === 0 ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {podiumIcons[i]}
                  </motion.div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-white">#{i + 1}</span>
                    <span className="text-xl font-bold text-white truncate">{p.name}</span>
                    {i === 0 && (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0 text-right">
                  <span className="text-3xl font-black" style={{
                    background: 'linear-gradient(135deg, #f5576c, #f093fb)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{p.score}</span>
                  <span className="text-white/40 text-xs block">punkti</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rest of players */}
        {rest.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="glass rounded-3xl p-5 mb-8"
          >
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">Ülejäänud</h3>
            <div className="space-y-2">
              {rest.map((p, i) => (
                <div key={p.id} className="flex items-center justify-between px-4 py-2 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 font-bold text-sm">#{i + 4}</span>
                    <span className="font-bold text-white/80">{p.name}</span>
                  </div>
                  <span className="font-bold text-[#f093fb]">{p.score}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Play Again */}
        {isHost && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onPlayAgain}
            className="w-full min-h-[56px] px-8 py-4 rounded-2xl font-black text-xl uppercase tracking-wide text-white transition-all relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #38ef7d 0%, #11998e 100%)',
              boxShadow: '0 10px 40px rgba(56,239,125,0.4)',
              border: '2px solid rgba(255,255,255,0.2)',
            }}
          >
            <div className="absolute inset-0 shimmer" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <RotateCcw className="w-6 h-6" /> Mängi uuesti!
            </span>
          </motion.button>
        )}

        {!isHost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-center">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#fda085] animate-pulse" />
              <p className="text-white/60 font-bold">Ootame hosti otsust...</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
