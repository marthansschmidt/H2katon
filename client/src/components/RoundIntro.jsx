const data = {
  1: { emoji: '🎤', name: 'Nimekas voor', desc: 'Kõik vastavad, kõik hääletavad! Promptimängija saab rohkem punkte.' },
  2: { emoji: '⚔️', name: '1 vs 1 lahing', desc: 'Kaks mängijat võistlevad, teised hääletavad!' },
  3: { emoji: '🏅', name: 'TOP 3 medalivoor', desc: 'Kõik vastavad, kõik valivad kulla, hõbeda ja pronksi!' },
};

export default function RoundIntro({ currentRound }) {
  const r = data[currentRound] || data[1];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-4 animate-bounce-in">
      <span className="text-6xl">{r.emoji}</span>
      <h1 className="text-3xl font-black text-gradient">{r.name}</h1>
      <p className="text-muted-foreground text-center max-w-xs">{r.desc}</p>
      <p className="text-sm text-muted-foreground animate-pulse mt-2">Algab kohe...</p>
    </div>
  );
}
