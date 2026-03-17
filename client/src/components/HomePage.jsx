import { useState } from 'react';
import { motion } from 'motion/react';
import ShuffleText from './ShuffleText';

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
    <div className="min-h-screen flex items-center justify-center p-4 py-12 relative overflow-hidden" style={{ background: '#0a0a0c' }}>
      {/* Background blur circles - inspired by Stitch design */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-600 to-transparent opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500 to-transparent opacity-10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.img
            src="/suumadin_logo.png"
            alt="SUUMADIN"
            className="mx-auto mb-8 w-96 h-72 drop-shadow-[0_0_30px_rgba(255,0,255,0.6)]"
            whileHover={{ scale: 1.1 }}
          />
          <ShuffleText text="SUUMADIN" colorFrom="#ff00ff" colorTo="#bc13fe" />
          <p className="text-lg md:text-xl font-bold text-cyan-300 tracking-widest uppercase mt-4">
            Kõige kiiremate vastuste mäng
          </p>
        </motion.div>

        {view === 'main' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Primary Action Button - LOO RUUM */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(255, 0, 255, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView('create')}
              className="w-full py-6 px-8 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl text-2xl font-black text-white transition-all duration-200 cursor-pointer hover:shadow-[0_0_30px_rgba(188,19,254,0.5)]"
            >
              LOO RUUM
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-grow bg-white/20" />
              <span className="text-white/40 font-bold">VÕI</span>
              <div className="h-px flex-grow bg-white/20" />
            </div>

            {/* Join Room Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-3xl backdrop-blur-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <h2 className="text-center text-cyan-400 font-black mb-6 tracking-wider text-lg">
                LIITU RUUMIGA
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="KOOD"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  maxLength={6}
                  className="w-full bg-black/40 border-2 border-white/20 rounded-xl py-4 text-center text-3xl font-black tracking-widest focus:border-cyan-400 focus:outline-none text-white placeholder:text-white/20 transition-colors"
                />
                <button
                  onClick={() => setView('join')}
                  className="w-full py-4 px-8 border-2 border-cyan-400 text-cyan-400 rounded-xl text-xl font-black hover:bg-cyan-400 hover:text-black transition-all duration-300 cursor-pointer"
                >
                  LIITU
                </button>
              </div>
            </motion.div>

            {/* Instructions Section */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-16 pt-8 border-t border-white/10"
            >
              <h3 className="text-3xl font-black text-center mb-12 italic text-white/90">
                Kuidas mängida?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { num: 1, text: 'Sisesta vastus küsimusele nii kiiresti kui võimalik.', color: 'from-pink-600 to-pink-500' },
                  { num: 2, text: 'Teised mängijad hääletavad parimate vastuste poolt.', color: 'from-purple-600 to-purple-500' },
                  { num: 3, text: 'Kogu punkte ja võida!', color: 'from-cyan-600 to-cyan-500' }
                ].map((step) => (
                  <motion.div
                    key={step.num}
                    className="p-8 rounded-2xl backdrop-blur-md border border-white/10 bg-white/5 text-center hover:bg-white/10 transition-all group"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${step.color} text-white rounded-full flex items-center justify-center font-black text-2xl mx-auto mb-6`}
                      style={{
                        boxShadow: `0 0 15px rgba(188, 19, 254, 0.6)`
                      }}
                    >
                      {step.num}
                    </div>
                    <p className="text-lg font-bold leading-tight">
                      {step.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>
        )}

        {/* Create Room Form */}
        {view === 'create' && (
          <motion.form
            onSubmit={handleCreate}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-8 rounded-3xl backdrop-blur-md border border-white/10 bg-white/5 space-y-6"
          >
            <h2 className="text-2xl font-black text-white mb-6">Loo ruum</h2>
            <input
              type="text"
              placeholder="Sisesta oma nimi"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
              className="w-full px-6 py-5 rounded-2xl text-white text-lg font-medium placeholder:text-white/40 bg-black/40 border-2 border-white/20 focus:border-pink-500 focus:outline-none"
              autoFocus
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={playerName.trim().length < 1}
              className="w-full py-4 px-8 rounded-2xl font-black text-xl uppercase tracking-wide text-white bg-gradient-to-r from-pink-600 to-purple-600 transition-all disabled:opacity-40 cursor-pointer"
              style={{
                boxShadow: playerName.trim().length > 0 ? '0 0 30px rgba(188, 19, 254, 0.5)' : 'none'
              }}
            >
              Alusta
            </motion.button>
            <button
              type="button"
              onClick={() => setView('main')}
              className="w-full text-white/40 hover:text-white transition-colors font-bold"
            >
              Tagasi
            </button>
          </motion.form>
        )}

        {/* Join Room Form */}
        {view === 'join' && (
          <motion.form
            onSubmit={handleJoin}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-8 rounded-3xl backdrop-blur-md border border-white/10 bg-white/5 space-y-6"
          >
            <h2 className="text-2xl font-black text-white mb-6">Liitu ruumiga</h2>
            <input
              type="text"
              placeholder="Sisesta oma nimi"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
              className="w-full px-6 py-5 rounded-2xl text-white text-lg font-medium placeholder:text-white/40 bg-black/40 border-2 border-white/20 focus:border-pink-500 focus:outline-none"
              autoFocus
            />
            <input
              type="text"
              placeholder="KOOD"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength={4}
              className="w-full px-6 py-5 rounded-2xl text-white text-3xl font-black text-center tracking-widest placeholder:text-white/40 bg-black/40 border-2 border-white/20 focus:border-cyan-400 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={playerName.trim().length < 1 || roomCode.trim().length < 4}
              className="w-full py-4 px-8 rounded-2xl font-black text-xl uppercase tracking-wide text-white bg-gradient-to-r from-cyan-600 to-blue-600 transition-all disabled:opacity-40 cursor-pointer"
            >
              Liitu
            </motion.button>
            <button
              type="button"
              onClick={() => setView('main')}
              className="w-full text-white/40 hover:text-white transition-colors font-bold"
            >
              Tagasi
            </button>
          </motion.form>
        )}

        {error && (
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-red-400 font-semibold text-sm mt-4 text-center"
          >
            {error}
          </motion.p>
        )}

        {/* Footer */}
        <footer className="mt-20 py-8 opacity-40 text-sm font-medium tracking-widest uppercase text-center">
          © 2024 SUUMADIN Party Games
        </footer>
      </div>
    </div>
  );
}
