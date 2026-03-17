import { useEffect, useRef } from 'react';

export default function ClickSpark() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e) => {
      const spark = document.createElement('div');
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      spark.style.position = 'fixed';
      spark.style.left = x + 'px';
      spark.style.top = y + 'px';
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '9999';

      const sparkSize = Math.random() * 8 + 4;
      const colors = ['#ff00ff', '#f093fb', '#fda085', '#f5576c', '#38ef7d'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      spark.innerHTML = `
        <div style="
          width: ${sparkSize}px;
          height: ${sparkSize}px;
          background: ${color};
          border-radius: 50%;
          box-shadow: 0 0 ${sparkSize * 2}px ${color};
          opacity: 1;
          animation: sparkleAnimation 0.8s ease-out forwards;
        "></div>
        <style>
          @keyframes sparkleAnimation {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0);
              opacity: 0;
            }
          }
        </style>
      `;

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 800);
    };

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }} />;
}
