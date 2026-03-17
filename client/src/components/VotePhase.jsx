import { useState } from 'react';
import { motion } from 'motion/react';
import { ThumbsUp, Flame, Star, Swords } from 'lucide-react';

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

  // Battle player waiting screen
  if (isBattlePlayer) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-game">
        <div className="w-full max-w-[600px] text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Swords className="w-16 h-16 text-[#fda085] mx-auto mb-4" />
            <h2 className="text-4xl font-black text-gradient mb-4">Lahing!</h2>
            <motion.div
              animate={isLowTime ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: isLowTime ? Infinity : 0 }}
              className="inline-block mb-6"
            >
              <span className={`text-6xl font-black block ${timerColor}`}>{timer}s</span>
            </motion.div>
            <p className="text-white/60 text-sm animate-pulse">Sa osaled lahingus! Oota, kuni teised hääletavad...</p>
            <p className="text-white/40 text-xs mt-4">Hääletanud: {votedCount} / {expectedVoters}</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Medal round (R3)
  if (isMedalRound) {
    const medals = [['gold', '\uD83E\uDD47', 'Kuld'], ['silver', '\uD83E\uDD48', 'Hõbe'], ['bronze', '\uD83E\uDD49', 'Pronks']];
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-game">
        <div className="w-full max-w-[600px]">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">{'\uD83C\uDFC5'}</span>
              <h1 className="text-4xl font-black text-gradient">Vali TOP 3!</h1>
            </div>
            <motion.div
              animate={isLowTime ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: isLowTime ? Infinity : 0 }}
              className="inline-block mt-2"
            >
              <span className={`text-5xl font-black block ${timerColor}`}>{timer}s</span>
            </motion.div>
          </motion.div>

          {!hasVoted ? (
            <>
              <p className="text-white/40 text-xs text-center mb-4">Määra medalid parimatele vastustele</p>
              <div className="space-y-4 mb-6">
                {answers.map((a, i) => {
                  const isOwn = a.playerId === playerId;
                  const assigned = medalChoices[a.playerId] || null;
                  return (
                    <motion.div
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-3xl p-5 transition-all"
                      style={{
                        background: assigned ? 'linear-gradient(135deg, rgba(245,87,108,0.15), rgba(240,147,251,0.15))' : 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(12px)',
                        border: assigned ? '2px solid rgba(240,147,251,0.5)' : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: assigned ? '0 8px 32px rgba(240,147,251,0.3)' : '0 8px 32px rgba(0,0,0,0.37)',
                        opacity: isOwn ? 0.5 : 1,
                      }}
                    >
                      <p className="text-lg font-bold text-white mb-1">{a.text}</p>
                      {isOwn && <span className="text-xs text-white/40">(sinu vastus)</span>}
                      {!isOwn && (
                        <div className="flex gap-2 mt-2">
                          {medals.map(([key, emoji, label]) => (
                            <button key={key} onClick={() => handleMedalClick(a.playerId, key)}
                              className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
                              style={{
                                background: assigned === key ? 'linear-gradient(135deg, #f5576c, #f093fb)' : 'rgba(255,255,255,0.08)',
                                border: assigned === key ? '2px solid rgba(240,147,251,0.6)' : '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                transform: assigned === key ? 'scale(1.05)' : 'scale(1)',
                              }}
                            >
                              {emoji} {label}
                            </button>
                          ))}
                        </div>
                      )}
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
    <div className="min-h-screen flex items-center justify-center p-6 bg-game">
      <div className="w-full max-w-[600px]">
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
            className="inline-block mt-2"
          >
            <span className={`text-5xl font-black block ${timerColor}`}>{timer}s</span>
          </motion.div>
          <p className="text-white/60 text-sm mt-2">{hasVoted ? '' : 'Vali parim vastus!'}</p>
        </motion.div>

        {/* Voting Cards */}
        <div className="space-y-6 mb-8">
          {answers.map((a, index) => {
            const isOwn = a.playerId === playerId;
            const isSelected = a.playerId === selectedId;
            const isOtherSelected = hasVoted && a.playerId !== selectedId;

            return (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={!hasVoted && !isOwn ? { y: -8 } : {}}
              >
                <button
                  onClick={() => handleVote(a.playerId)}
                  disabled={isOwn || hasVoted}
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
                    opacity: isOtherSelected ? 0.5 : isOwn ? 0.4 : 1,
                    transform: isSelected ? 'scale(1.02)' : isOtherSelected ? 'scale(0.98)' : 'scale(1)',
                  }}
                >
                  {/* Hover glow */}
                  {!hasVoted && !isOwn && (
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
                    {isOwn && <span className="text-xs text-white/40">(sinu vastus)</span>}
                    {!isOwn && (
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
                    )}
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
              {'\u2728'} Sinu haal on registreeritud!
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
