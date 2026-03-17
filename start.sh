#!/bin/bash
# ============================================
# Käivita mõlemad serverid
# ============================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🎮 Käivitan mänguserveri..."
cd "$SCRIPT_DIR/server" && node index.js &
SERVER_PID=$!

echo "🌐 Käivitan frontendi..."
cd "$SCRIPT_DIR/client" && ./node_modules/.bin/vite --host --port 5173 &
CLIENT_PID=$!

echo ""
echo "✅ Mõlemad serverid töötavad!"
echo "   Backend:  http://localhost:3001"
echo "   Frontend: http://localhost:5173"
echo ""
echo "   Vajuta Ctrl+C, et peatada."
echo ""

# Oota, kuni kasutaja vajutab Ctrl+C
trap "kill $SERVER_PID $CLIENT_PID 2>/dev/null; echo '👋 Serverid peatatud.'; exit" INT TERM
wait
