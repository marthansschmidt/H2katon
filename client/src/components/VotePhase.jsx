import { useState } from 'react';
import { motion } from 'motion/react';
import { ThumbsUp, Flame, Star, Swords } from 'lucide-react';
import MagicRings from './MagicRings';

export default function VotePhase({ answers, playerId, timer, votedCount, expectedVoters, onVote, onSubmitMedals, currentRound, battlePlayers }) {
  const [selectedId, setSelectedId] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [medalChoices, setMedalChoices] = useState({});

  const isMedalRound = currentRound === 3;
  const isBattle = currentRound === 2;
  const isBattlePlayer = isBattle && battlePlayers?.some((bp) => bp.id === playerId);
  const isLowTime = timer <= 10;

  const handleVote = (id) => {
    if (id === playerId || hasVoted || isBattlePlayer) return;
    setSelectedId(id); setHasVoted(true); onVote(id);
  };

  const handleMedalClick = (answerId, medal) => {
    if (answerId === playerId || hasVoted) return;
    const nc = { ...medalChoices };
    Object.keys(nc).forEach((k) => { if (nc[k] === medal) delete nc[k]; });
    if (medalChoices[answerId] === medal) delete nc[answerId]; else nc[answerId] = medal;
    setMedalChoices(nc);
  };

  const handleSubmitMedals = () => {
    const choices = Object.entries(medalChoices).map(([pid, m]) => ({ playerId: pid, medal: m }));
    if (choices.length === 0) return;
    setHasVoted(true); onSubmitMedals(choices);
  };

  const timerColor = isLowTime ? 'text-[#d4183d]' : 'text-[#f093fb]';

  // Filter out user's own answer
  const filteredAnswers = answers.filter(a => a.playerId !== playerId);

  // Battle player waiting screen
  if (isBattlePlayer) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-game relative overflow-hidden">
        <MagicRings />
        <div className="w-full max-w-[600px] text-center relative z-10 flex flex-col items-center justify-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full">
            <Swords className="w-16 h-16 text-[#fda085] mx-auto mb-6" />
            <h2 className="text-4xl font-black text-gradient mb-6">Lahing!</h2>
            <motion.div
              animate={isLowTime ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: isLowTime ? Infinity : 0 }}
              className="inline-block mb-8 w-full px-6 py-3 rounded-2xl"
              style={{
                border: '2px solid rgba(240,147,251,0.4)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span className={`text-6xl font-black block ${timerColor}`}>{timer}s</span>
            </motion.div>
            <motion.div className="space-y-6 w-full">
              <p className="text-white/70 font-bold text-lg">Sa osaled lahingus!</p>
              <p className="text-white/60 text-base animate-pulse">Oota, kuni teised hääletavad...</p>
              <motion.div
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="pt-4"
              >
                <p className="text-sm font-semibold px-4 py-3 rounded-xl" style={{
                  background: 'linear-gradient(135deg, rgba(240,147,251,0.2), rgba(245,87,108,0.2))',
                  border: '1px solid rgba(240,147,251,0.4)',
                  color: '#f093fb'
                }}>
                  Hääletanud: <span className="font-black text-lg">{votedCount} / {expectedVoters}</span>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Medal round (R3)
  if (isMedalRound) {
    const medals = [['gold', '\uD83E\uDD47', 'Kuld'], ['silver', '\uD83E\uDD48', 'Hõbe'], ['bronze', '\uD83E\uDD49', 'Pronks']];
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-game relative overflow-hidden">
        <MagicRings />
        <div className="w-full max-w-[600px] relative z-10">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">{'\uD83C\uDFC5'}</span>
              <h1 className="text-4xl font-black text-gradient">Vali TOP 3!</h1>
            </div>
            <motion.div
              animate={isLowTime ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: isLowTime ? Infinity : 0 }}
              className="inline-block mt-2 px-6 py-3 rounded-2xl"
              style={{
                border: '2px solid rgba(240,147,251,0.4)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span className={`text-5xl font-black block ${timerColor}`}>{timer}s</span>
            </motion.div>
          </motion.div>

          {!hasVoted ? (
            <>
              <p className="text-white/40 text-xs text-center mb-4">Määra medalid parimatele vastustele</p>
              <div className="space-y-4 mb-6">
                {filteredAnswers.map((a, i) => {
                  const assigned = medalChoices[a.playerId] || null;
                  const medalBackgrounds = {
                    gold: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,165,0,0.1))',
                    silver: 'linear-gradient(135deg, rgba(192,192,192,0.12), rgba(169,169,169,0.08))',
                    bronze: 'linear-gradient(135deg, rgba(205,127,50,0.15), rgba(184,115,51,0.1))',
                  };
                  const medalBorders = {
                    gold: '2px solid rgba(255,215,0,0.5)',
                    silver: '2px solid rgba(192,192,192,0.4)',
                    bronze: '2px solid rgba(205,127,50,0.4)',
                  };
                  const medalShadows = {
                    gold: '0 8px 32px rgba(255,215,0,0.3)',
                    silver: '0 8px 32px rgba(192,192,192,0.2)',
                    bronze: '0 8px 32px rgba(205,127,50,0.2)',
                  };
                  return (
                    <motion.div
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-3xl p-5 transition-all"
                      style={{
                        background: assigned ? medalBackgrounds[assigned] : 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(12px)',
                        border: assigned ? medalBorders[assigned] : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: assigned ? medalShadows[assigned] : '0 8px 32px rgba(0,0,0,0.37)',
                      }}
                    >
                      <p className="text-lg font-bold text-white mb-1">{a.text}</p>
                      <div className="flex gap-2 mt-2">
                        {medals.map(([key, emoji, label]) => {
                          const medalColors = {
                            gold: { unselected: 'rgba(255,255,255,0.08)', selected: 'linear-gradient(135deg, #FFD700, #FFA500)', border: 'rgba(255,215,0,0.6)', shadow: 'rgba(255,215,0,0.4)' },
                            silver: { unselected: 'rgba(255,255,255,0.08)', selected: 'linear-gradient(135deg, #E8E8E8, #C0C0C0)', border: 'rgba(192,192,192,0.6)', shadow: 'rgba(192,192,192,0.3)' },
                            bronze: { unselected: 'rgba(255,255,255,0.08)', selected: 'linear-gradient(135deg, #CD7F32, #B87333)', border: 'rgba(205,127,50,0.6)', shadow: 'rgba(205,127,50,0.4)' },
                          };
                          const colors = medalColors[key];
                          const isSelected = assigned === key;
                          return (
                            <button key={key} onClick={() => handleMedalClick(a.playerId, key)}
                              className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
                              style={{
                                background: isSelected ? colors.selected : colors.unselected,
                                border: isSelected ? `2px solid ${colors.border}` : '1px solid rgba(255,255,255,0.1)',
                                color: isSelected && key !== 'silver' ? '#000000' : 'white',
                                transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                                boxShadow: isSelected ? `0 8px 32px ${colors.shadow}` : 'none',
                              }}
                            >
                              {emoji} {label}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitMedals}
                disabled={Object.keys(medalChoices).length === 0}
                className="w-full min-h-[56px] px-8 py-4 rounded-2xl font-black text-xl uppercase tracking-wide text-white transition-all disabled:opacity-40 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #38ef7d 0%, #11998e 100%)',
                  boxShadow: '0 10px 40px rgba(56,239,125,0.4)',
                  border: '2px solid rgba(255,255,255,0.2)',
                }}
              >
                <span className="relative z-10">Saada medalid</span>
              </motion.button>
            </>
          ) : (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center glass rounded-3xl p-8">
              <span className="text-5xl block mb-4">{'\u2728'}</span>
              <p className="text-white/60 font-bold">Medalid saadetud! Ootame teisi...</p>
            </motion.div>
          )}
          <p className="text-center text-white/40 text-xs mt-4">Hääletanud: {votedCount} / {expectedVoters}</p>
        </div>
      </div>
    );
  }

  // Normal voting (R1, R2)
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-game relative overflow-hidden">
      <MagicRings />
      <div className="w-full max-w-[600px] relative z-10">
        {/* Header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className="w-8 h-8 text-[#fda085]" />
            <h1 className="text-4xl font-black uppercase text-gradient">Hääletamine</h1>
            <Flame className="w-8 h-8 text-[#f093fb]" />
          </div>
          <motion.div
            animate={isLowTime ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: isLowTime ? Infinity : 0 }}
            className="inline-block mt-2 px-6 py-3 rounded-2xl"
            style={{
              border: '2px solid rgba(240,147,251,0.4)',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span className={`text-5xl font-black block ${timerColor}`}>{timer}s</span>
          </motion.div>
          <p className="text-white/60 text-sm mt-2">{hasVoted ? '' : 'Vali parim vastus!'}</p>
        </motion.div>

        {/* Voting Cards */}
        <div className="space-y-6 mb-8">
          {filteredAnswers.map((a, index) => {
            const isSelected = a.playerId === selectedId;
            const isOtherSelected = hasVoted && a.playerId !== selectedId;

            return (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={!hasVoted ? { y: -8 } : {}}
              >
                <button
                  onClick={() => handleVote(a.playerId)}
                  disabled={hasVoted}
                  className="w-full p-6 rounded-3xl text-left transition-all relative overflow-hidden group disabled:cursor-default"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(245,87,108,0.2), rgba(240,147,251,0.2))'
                      : isOtherSelected ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(12px)',
                    border: isSelected
                      ? '2px solid rgba(240,147,251,0.6)'
                      : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: isSelected
                      ? '0 8px 32px 0 rgba(240,147,251,0.4), 0 0 40px rgba(245,87,108,0.2)'
                      : '0 8px 32px 0 rgba(0,0,0,0.37)',
                    opacity: isOtherSelected ? 0.5 : 1,
                    transform: isSelected ? 'scale(1.02)' : isOtherSelected ? 'scale(0.98)' : 'scale(1)',
                  }}
                >
                  {/* Hover glow */}
                  {!hasVoted && (
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"
                      style={{ background: 'radial-gradient(circle at 50% 50%, rgba(240,147,251,0.15), transparent 70%)' }}
                    />
                  )}

                  {/* Selected star */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Star className="w-8 h-8 fill-[#fda085] text-[#fda085]" />
                      </motion.div>
                    </motion.div>
                  )}

                  <div className="relative z-10">
                    <p className="text-2xl font-bold mb-4" style={{ color: isSelected ? '#ffffff' : '#e0e0e0' }}>
                      {a.text}
                    </p>
                    <div className="flex items-center gap-2">
                      <div
                        className="px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
                        style={{
                          background: isSelected ? 'linear-gradient(135deg, #f5576c, #f093fb)' : 'rgba(255,255,255,0.1)',
                        }}
                      >
                        <ThumbsUp className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#f093fb]'}`} />
                        <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-white/60'}`}>
                          {isSelected ? 'Valitud!' : 'Hääleta'}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Status */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center">
          {hasVoted ? (
            <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-white/80 font-bold">
              {'\u2728'} Sinu hääl on registreeritud!
            </motion.p>
          ) : (
            <p className="text-white/40 text-sm">Kliki kaardil, et hääletada...</p>
          )}
          <p className="text-white/40 text-xs mt-2">Hääletanud: {votedCount} / {expectedVoters}</p>
        </motion.div>
      </div>
    </div>
  );
}
