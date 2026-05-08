// ============================================
// Socket.IO ühenduse haldamine
// ============================================

import { io } from 'socket.io-client';

// Määra backend URL keskkonna järgi
export const backendUrl = (() => {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }

  // Dev: localhost:3001
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3001';
  }
  
  // Prod: Render backend (separate service)
  return 'https://suumadin-backend.onrender.com';
})();

console.log('[Socket] Backend URL:', backendUrl);

// Loo Socket.IO ühendus serveriga
const socket = io(backendUrl, {
  autoConnect: true,
  transports: ['websocket', 'polling'],
});

socket.on('connect', () => {
  console.log('[Socket] ✓ Ühendatud serveriga:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('[Socket] ✗ Ühenduse viga:', err.message, err);
});

socket.on('disconnect', () => {
  console.log('[Socket] ⚠ Ühendus serveriga katkes');
});

export default socket;
