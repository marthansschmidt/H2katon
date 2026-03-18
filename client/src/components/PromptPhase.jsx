import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Swords, Eye, Sparkles } from 'lucide-react';
import MagicRings from './MagicRings';

export default function PromptPhase({ prompt, currentRound, currentSubRound, totalSubRounds, timer, answeredCount, expectedAnswers, onSubmitAnswer, battlePlayers, playerId }) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setAnswer(''); setSubmitted(false); }, [currentSubRound, currentRound]);

  const handleSubmit = (e) => { e.preventDefault(); if (answer.trim().length < 1 || submitted) return; onSubmitAnswer(answer.trim()); setSubmitted(true); };

  const isBattle = currentRound === 2;
  const isBattlePlayer = isBattle && battlePlayers?.some((bp) => bp.id === playerId);
  const isSpectator = isBattle && !isBattlePlayer;
  const isLowTime = timer <= 10;

  // Parse prompt ja eralda suuremalt näidatavad osad (nimed)
  const renderPrompt = (text) => {
    if (!text) return text;
    // Otsime nimed - sõnad, mis algavad suurega ja järgneb teisele suurega algusega sõnale
    // Näiteks "Masina-Mari", "Anna-Liisa" - kaheosalised nimed
    const parts = text.split(/(\b[A-Z][a-zäöü]*(?:-[A-Z][a-zäöü]*)+\b|\b[A-Z][a-zäöü]+\b(?=\s+[A-Z]))/);
    let skipNext = false;
    return parts.map((part, i) => {
      if (!part) return null;
      // Kui eelmises osas oli nimi, siis järgmine suurega sõna on ka osa nimest
      if (skipNext && /^[A-Z][a-zäöü]+$/.test(part)) {
        skipNext = false;
        return <span key={i} className="text-2xl font-black text-[#f093fb]">{part}</span>;
      }
      skipNext = false;
      // Kui osa on nimi (kaheosaline või järgneb suurele sõnale)
      if (/^[A-Z][a-zäöü]*(?:-[A-Z][a-zäöü]*)+$/.test(part)) {
        skipNext = true;
        return <span key={i} className="text-2xl font-black text-[#f093fb]">{part}</span>;
      }
      // Kui sõna algab suurega JA järgneb veel üks suure algusega sõna
      if (/^[A-Z][a-zäöü]+$/.test(part) && i + 1 < parts.length && /^[A-Z][a-zäöü]+$/.test(parts[i + 1])) {
        skipNext = true;
        return <span key={i} className="text-2xl font-black text-[#f093fb]">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-game relative overflow-hidden">
      <MagicRings />
      <div className="w-full max-w-[600px] relative z-10">
        {/* Header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-6">
          <motion.div
            animate={isLowTime ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.5, repeat: isLowTime ? Infinity : 0 }}
            className="inline-block px-6 py-3 rounded-2xl"
            style={{
              border: '2px solid rgba(240,147,251,0.4)',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span className={`text-6xl font-black block ${isLowTime ? 'text-[#d4183d]' : 'text-[#f093fb]'}`}>
              {timer}s
            </span>
          </motion.div>
        </motion.div>

        {/* Battle banner */}
        {isBattle && battlePlayers?.length === 2 && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center justify-center gap-4 mb-6">
            <span className="px-4 py-2 rounded-xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #f5576c, #f093fb)' }}
            >{battlePlayers[0].name}</span>
            <div className="flex items-center gap-1">
              <Swords className="w-5 h-5 text-[#fda085]" />
              <span className="text-xl font-black text-gradient">VS</span>
            </div>
            <span className="px-4 py-2 rounded-xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #f093fb, #fda085)' }}
            >{battlePlayers[1].name}</span>
          </motion.div>
        )}

        {/* Question card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-6 mb-6 text-center"
        >
          <Sparkles className="w-6 h-6 text-[#f093fb] mx-auto mb-3" />
          <p className="text-xl font-bold text-white leading-relaxed">{renderPrompt(prompt)}</p>
        </motion.div>

        {/* Spectator view */}
        {isSpectator ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center">
            <Eye className="w-10 h-10 text-[#fda085] mx-auto mb-2" />
            <p className="text-white/60 text-sm">Sa oled pealtvaataja. Oota, kuni v\u00f5istlejad vastavad...</p>
          </motion.div>
        ) : !submitted ? (
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <textarea
              className="w-full px-5 py-4 rounded-2xl text-white font-medium resize-none h-28 outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
              placeholder="Kirjuta oma vastus siia..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              maxLength={150}
              autoFocus
            />
            <motion.button
              type="submit"
              disabled={answer.trim().length < 1}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full min-h-[56px] px-8 py-4 rounded-2xl font-black text-lg uppercase tracking-wide text-white transition-all disabled:opacity-40 relative overflow-hidden"
              style={{
                background: answer.trim().length > 0
                  ? 'linear-gradient(135deg, #f5576c 0%, #f093fb 50%, #fda085 100%)'
                  : 'rgba(255,255,255,0.1)',
                boxShadow: answer.trim().length > 0 ? '0 10px 40px rgba(245,87,108,0.4)' : 'none',
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            >
              {answer.trim().length > 0 && <div className="absolute inset-0 shimmer" />}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" /> Saada vastus
              </span>
            </motion.button>
          </motion.form>
        ) : (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center glass rounded-3xl p-8">
            <span className="text-5xl block mb-3">{'\u2705'}</span>
            <p className="text-white/60 font-bold">Vastus saadetud! Ootame teisi...</p>
          </motion.div>
        )}

        {/* Status */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center text-white/40 text-xs mt-4">
          Vastanud: {answeredCount} / {expectedAnswers}
        </motion.p>
      </div>
    </div>
  );
}
