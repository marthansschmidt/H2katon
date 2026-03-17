import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function HomePage({ onCreateRoom, onJoinRoom, error }) {
  const [view, setView] = useState('main');
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (playerName.trim().length < 1) return;
    onCreateRoom(playerName.trim());
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (playerName.trim().length < 1 || roomCode.trim().length < 4) return;
    onJoinRoom(playerName.trim(), roomCode.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-game">
      <div className="w-full max-w-[600px] text-center">
        {/* Logo/Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-black uppercase mb-4 tracking-tight text-gradient">
            Suumadin
          </h1>
          <p className="text-white/70 text-lg">Kõige kiiremate vastuste mäng</p>
        </motion.div>

        {view === 'main' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* How to play card */}
            <div className="glass p-8 rounded-3xl mb-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-[#f093fb]" />
                <h2 className="text-2xl font-bold text-white">Kuidas mängida?</h2>
                <Sparkles className="w-6 h-6 text-[#f5576c]" />
              </div>
              <div className="space-y-4 text-left text-white/80">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#f5576c] to-[#f093fb] flex items-center justify-center font-bold text-white text-sm">1</span>
                  <p>Sisesta vastus küsimusele nii kiiresti kui võimalik</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#f093fb] to-[#fda085] flex items-center justify-center font-bold text-white text-sm">2</span>
                  <p>Teised mängijad hääletavad parimate vastuste poolt</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#fda085] to-[#38ef7d] flex items-center justify-center font-bold text-white text-sm">3</span>
                  <p>Koguge punkte ja saage võitjaks!</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setView('create')}
                className="w-full min-h-[56px] px-8 py-4 rounded-2xl font-black text-xl uppercase tracking-wide text-white btn-primary transition-all relative overflow-hidden"
              >
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Loo ruum
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setView('join')}
                className="w-full px-8 py-4 rounded-2xl font-bold text-white/60 hover:text-white transition-all btn-secondary"
              >
                Liitu ruumiga
              </motion.button>
            </div>
          </motion.div>
        )}

        {view === 'create' && (
          <motion.form
            onSubmit={handleCreate}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Loo ruum</h2>
            <label className="text-sm text-white/60 uppercase tracking-wider block mb-2">Sinu nimi</label>
            <input
              className="w-full px-6 py-5 rounded-2xl text-white text-lg font-medium placeholder:text-white/40 mb-6 input-glass"
              type="text"
              placeholder="Sisesta oma nimi"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
              autoFocus
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full min-h-[56px] px-8 py-4 rounded-2xl font-black text-xl uppercase tracking-wide text-white btn-primary transition-all disabled:opacity-40 relative overflow-hidden"
              type="submit"
              disabled={playerName.trim().length < 1}
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
              />
              <span className="relative z-10">Alusta</span>
            </motion.button>
            <button className="mt-4 text-sm text-white/40 hover:text-white transition-colors" type="button" onClick={() => setView('main')}>
              Tagasi
            </button>
          </motion.form>
        )}

        {view === 'join' && (
          <motion.form
            onSubmit={handleJoin}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Liitu ruumiga</h2>
            <label className="text-sm text-white/60 uppercase tracking-wider block mb-2">Sinu nimi</label>
            <input
              className="w-full px-6 py-5 rounded-2xl text-white text-lg font-medium placeholder:text-white/40 mb-4 input-glass"
              type="text"
              placeholder="Sisesta oma nimi"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
              autoFocus
            />
            <label className="text-sm text-white/60 uppercase tracking-wider block mb-2">Ruumikood</label>
            <input
              className="w-full px-6 py-5 rounded-2xl text-white text-2xl font-black placeholder:text-white/40 mb-6 input-glass text-center tracking-[0.3em] uppercase"
              type="text"
              placeholder="ABCD"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength={4}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full min-h-[56px] px-8 py-4 rounded-2xl font-black text-xl uppercase tracking-wide text-white btn-primary transition-all disabled:opacity-40"
              type="submit"
              disabled={playerName.trim().length < 1 || roomCode.trim().length < 4}
            >
              Liitu
            </motion.button>
            <button className="mt-4 text-sm text-white/40 hover:text-white transition-colors" type="button" onClick={() => setView('main')}>
              Tagasi
            </button>
          </motion.form>
        )}

        {error && (
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[#d4183d] font-semibold text-sm mt-4"
          >
            {error}
          </motion.p>
        )}
      </div>
    </div>
  );
}
