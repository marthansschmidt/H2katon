import { useEffect, useState } from 'react';
import './CircularText.css';

const CircularText = ({ text = 'SUUMADIN', spinDuration = 30, className = '' }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationId;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newRotation = (elapsed / (spinDuration * 1000)) * 360;
      setRotation(newRotation % 360);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [spinDuration]);

  return (
    <div className={`circular-text-container ${className}`}>
      <svg width="380" height="380" viewBox="0 0 380 380">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff00ff" />
            <stop offset="100%" stopColor="#bc13fe" />
          </linearGradient>
          <path id="textPath" d="M 190, 190 m -130, 0 a 130,130 0 1,1 260,0 a 130,130 0 1,1 -260,0" fill="none" />
        </defs>
        
        <g transform={`rotate(${rotation} 190 190)`}>
          <text fill="url(#grad1)" fontSize="18" fontWeight="900" letterSpacing="2">
            <textPath href="#textPath" startOffset="0%" textAnchor="start">
              {text}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default CircularText;
