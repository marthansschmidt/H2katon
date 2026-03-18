const data = {
  1: { emoji: '🎤', name: 'Nimelaksuvoor', desc: 'Kõik vastavad, kõik hääletavad! Promptimängija saab rohkem punkte.' },
  2: { emoji: '⚔️', name: '1 vs 1 lahing', desc: 'Kaks mängijat võistlevad, teised hääletavad!' },
  3: { emoji: '🏅', name: 'Medalivoor', desc: 'Kõik vastavad, kõik valivad kulla, hõbeda ja pronksi!' },
};

import MagicRings from './MagicRings';

export default function RoundIntro({ currentRound }) {
  const r = data[currentRound] || data[1];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-6 animate-bounce-in relative overflow-hidden">
      <MagicRings />
      <div className="relative z-10 flex flex-col items-center justify-center gap-4">
        <span className="text-8xl sm:text-9xl">{r.emoji}</span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-gradient text-center leading-tight py-2">{r.name}</h1>
        <p className="text-muted-foreground text-center max-w-sm sm:max-w-md text-base sm:text-lg">{r.desc}</p>
        <p className="text-sm sm:text-base text-muted-foreground animate-pulse mt-4">Algab kohe...</p>
      </div>
    </div>
  );
}
