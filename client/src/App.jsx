import { useState, useEffect, useCallback } from 'react';
import socket from './socket';
import HomePage from './components/HomePage';
import Lobby from './components/Lobby';
import RoundIntro from './components/RoundIntro';
import PromptPhase from './components/PromptPhase';
import RevealPhase from './components/RevealPhase';
import VotePhase from './components/VotePhase';
import ScoresPhase from './components/ScoresPhase';
import EndScreen from './components/EndScreen';

export default function App() {
  const [playerId, setPlayerId] = useState(null);
  const [roomCode, setRoomCode] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on('game-state', (s) => setGameState(s));
    socket.on('timer-update', (t) => setTimer(t));
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('answer-count', (d) =>
      setGameState((p) => p ? { ...p, answeredCount: d.answeredCount, expectedAnswers: d.expectedAnswers } : p)
    );
    socket.on('vote-count', (d) =>
      setGameState((p) => p ? { ...p, votedCount: d.votedCount, expectedVoters: d.expectedVoters } : p)
    );
    return () => {
      socket.off('game-state');
      socket.off('timer-update');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('answer-count');
      socket.off('vote-count');
    };
  }, []);

  const handleCreateRoom = useCallback((name) => {
    setError('');
    socket.emit('create-room', { playerName: name }, (r) => {
      if (r.success) { setPlayerId(r.playerId); setRoomCode(r.roomCode); }
      else setError(r.error || 'Viga ruumi loomisel');
    });
  }, []);

  const handleJoinRoom = useCallback((name, code) => {
    setError('');
    socket.emit('join-room', { roomCode: code, playerName: name }, (r) => {
      if (r.success) { setPlayerId(r.playerId); setRoomCode(r.roomCode); }
      else setError(r.error || 'Viga ruumiga liitumisel');
    });
  }, []);

  const handleStartGame = useCallback(() => {
    socket.emit('start-game', null, (r) => {
      if (r && !r.success) setError(r.error || 'Viga alustamisel');
    });
  }, []);

  const handleSubmitAnswer = useCallback((text) => socket.emit('submit-answer', { text }), []);
  const handleVote = useCallback((id) => socket.emit('submit-vote', { votedForPlayerId: id }), []);
  const handleSubmitMedals = useCallback((choices) => socket.emit('submit-medals', { choices }), []);
  const handlePlayAgain = useCallback(() => socket.emit('play-again'), []);

  if (!roomCode || !gameState) {
    if (!isConnected) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ background: '#0a0a0c' }}>
          <div className="text-center relative z-10">
            <p className="text-white text-2xl font-bold mb-2">Ühendamine serveriga...</p>
            <p className="text-white/60 text-sm animate-pulse">[Socket] Backend URL: http://localhost:3001</p>
          </div>
        </div>
      );
    }
    return <HomePage onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} error={error} />;
  }

  const isHost = playerId === gameState.hostId;

  if (gameState.state === 'lobby')
    return <Lobby roomCode={roomCode} players={gameState.players} isHost={isHost} onStartGame={handleStartGame} error={error} />;

  if (gameState.state === 'end' || gameState.roundPhase === 'final')
    return <EndScreen players={gameState.players} isHost={isHost} onPlayAgain={handlePlayAgain} medals={gameState.medals} />;

  const rp = gameState.roundPhase;
  if (rp === 'intro') return <RoundIntro currentRound={gameState.currentRound} />;

  if (rp === 'prompt')
    return (
      <PromptPhase prompt={gameState.currentPrompt} currentRound={gameState.currentRound}
        currentSubRound={gameState.currentSubRound} totalSubRounds={gameState.totalSubRounds}
        timer={timer} answeredCount={gameState.answeredCount} expectedAnswers={gameState.expectedAnswers}
        onSubmitAnswer={handleSubmitAnswer} battlePlayers={gameState.battlePlayers} playerId={playerId} />
    );

  // Skip reveal phase, go directly to voting
  if (rp === 'reveal' || rp === 'vote')
    return (
      <VotePhase answers={gameState.answers} playerId={playerId} timer={timer}
        votedCount={gameState.votedCount} expectedVoters={gameState.expectedVoters}
        onVote={handleVote} onSubmitMedals={handleSubmitMedals}
        currentRound={gameState.currentRound} battlePlayers={gameState.battlePlayers} />
    );

  if (rp === 'results')
    return (
      <ScoresPhase players={gameState.players} answers={gameState.answers} currentRound={gameState.currentRound}
        currentSubRound={gameState.currentSubRound} totalSubRounds={gameState.totalSubRounds}
        medals={gameState.medals} mode="results" />
    );

  if (rp === 'scoreboard')
    return (
      <ScoresPhase players={gameState.players} answers={gameState.answers} currentRound={gameState.currentRound}
        currentSubRound={gameState.currentSubRound} totalSubRounds={gameState.totalSubRounds}
        medals={gameState.medals} mode="scoreboard" />
    );

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ background: '#0a0a0c' }}>
      <p className="text-white/60 animate-pulse text-lg relative z-10">Laadin...</p>
    </div>
  );
}
