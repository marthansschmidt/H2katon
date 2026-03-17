import { motion } from 'motion/react';
import { Trophy, Medal, Award, Star, TrendingUp } from 'lucide-react';
import MagicRings from './MagicRings';
import ClickSpark from './ClickSpark';

export default function ScoresPhase({ players, answers, currentRound, currentSubRound, totalSubRounds, medals, mode }) {
  const isResults = mode === 'results';
  const sorted = [...players].sort((a, b) => b.score - a.score);

  const medalEmoji = { gold: '\uD83E\uDD47', silver: '\uD83E\uDD48', bronze: '\uD83E\uDD49' };
  const rankIcons = [
    <Trophy className="w-6 h-6 text-yellow-400" />,
    <Medal className="w-6 h-6 text-gray-300" />,
    <Award className="w-6 h-6 text-amber-600" />,
  ];

  const rankGradients = [
    'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,165,0,0.1))',
    'linear-gradient(135deg, rgba(192,192,192,0.1), rgba(169,169,169,0.08))',
    'linear-gradient(135deg, rgba(205,127,50,0.1), rgba(184,115,51,0.08))',
  ];

  // Helper: medals from server is an object { playerId: { gold: N, silver: N, bronze: N } }
  const getMedalList = (playerId) => {
    if (!medals || typeof medals !== 'object') return [];
    const pm = medals[playerId];
    if (!pm) return [];
    const list = [];
    if (pm.gold) for (let g = 0; g < pm.gold; g++) list.push('gold');
    if (pm.silver) for (let s = 0; s < pm.silver; s++) list.push('silver');
    if (pm.bronze) for (let b = 0; b < pm.bronze; b++) list.push('bronze');
    return list;
  };

  // Results mode - show answers with votes/medals
  if (isResults && answers) {
    const isMedalRound = currentRound === 3;
    const sortedAnswers = isMedalRound
      ? [...answers].sort((a, b) => {
          const am = getMedalList(a.playerId);
          const bm = getMedalList(b.playerId);
          const aScore = am.filter(m => m === 'gold').length * 3 + am.filter(m => m === 'silver').length * 2 + am.filter(m => m === 'bronze').length;
          const bScore = bm.filter(m => m === 'gold').length * 3 + bm.filter(m => m === 'silver').length * 2 + bm.filter(m => m === 'bronze').length;
          return bScore - aScore;
        })
      : [...answers].sort((a, b) => (b.votes || 0) - (a.votes || 0));

    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-game relative overflow-hidden">
        <ClickSpark />
        <MagicRings />
        <div className="w-full max-w-[600px] relative z-10">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
            <Star className="w-10 h-10 text-[#fda085] mx-auto mb-2" />
            <h1 className="text-3xl font-black text-gradient">{isMedalRound ? 'Medalid' : 'Tulemused'}</h1>
          </motion.div>

          <div className="space-y-4 mb-6">
            {sortedAnswers.map((a, i) => {
              const isWinner = i === 0 && ((a.votes || 0) > 0 || getMedalList(a.playerId).length > 0);
              const playerMedalList = getMedalList(a.playerId);

              return (
                <motion.div
                  key={i}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.15 }}
                  className="rounded-3xl p-5 relative overflow-hidden"
                  style={{
                    background: isWinner
                      ? 'linear-gradient(135deg, rgba(245,87,108,0.15), rgba(240,147,251,0.15))'
                      : 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(12px)',
                    border: isWinner ? '2px solid rgba(240,147,251,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: isWinner ? '0 8px 32px rgba(240,147,251,0.3)' : '0 8px 32px rgba(0,0,0,0.37)',
                  }}
                >
                  {isWinner && <div className="absolute inset-0 shimmer" />}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-lg font-bold text-white flex-1">{a.text}</p>
                      {!isMedalRound && (
                        <span className="flex-shrink-0 ml-3 text-2xl font-black" style={{
                          background: 'linear-gradient(135deg, #f5576c, #f093fb)',
                          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>
                          {a.votes || 0} {'\u2764\uFE0F'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/50">{'\u2014'} {a.playerName}</p>

                    {playerMedalList.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {playerMedalList.map((m, j) => (
                          <span key={j} className="text-xl">{medalEmoji[m]}</span>
                        ))}
                      </div>
                    )}

                    {isWinner && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: 'rgba(56,239,125,0.15)', color: '#38ef7d' }}
                      >
                        <Trophy className="w-3 h-3" /> Võitja!
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Scoreboard mode
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-game relative overflow-hidden">
      <ClickSpark />
      <MagicRings />
      <div className="w-full max-w-[600px] relative z-10">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <TrendingUp className="w-10 h-10 text-[#f093fb] mx-auto mb-2" />
          <h1 className="text-3xl font-black text-gradient">Punktitabel</h1>
        </motion.div>

        <div className="space-y-3">
          {sorted.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-4 flex items-center gap-4"
              style={{
                background: i < 3 ? rankGradients[i] : 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                border: i === 0 ? '2px solid rgba(255,215,0,0.4)' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: i === 0 ? '0 8px 32px rgba(255,215,0,0.2)' : 'none',
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center">
                {i < 3 ? rankIcons[i] : (
                  <span className="text-white/40 font-bold text-lg">#{i + 1}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span className="font-bold text-white truncate block">{p.name}</span>
              </div>

              <div className="flex-shrink-0">
                <span className="text-2xl font-black" style={{
                  background: 'linear-gradient(135deg, #f5576c, #f093fb)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{p.score}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
