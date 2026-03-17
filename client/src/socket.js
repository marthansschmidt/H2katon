// ============================================
// Socket.IO ühenduse haldamine
// ============================================

import { io } from 'socket.io-client';

// Määra backend URL keskkonna järgi
const backendUrl = import.meta.env.VITE_API_URL || (() => {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  // Dev: localhost:3001, Prod: sama host mis frontend aga eri port või path
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//localhost:3001`;
  }
  // Prod: sama origin, server jookseb ühes kohast
  return `${protocol}//${window.location.host}`;
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
