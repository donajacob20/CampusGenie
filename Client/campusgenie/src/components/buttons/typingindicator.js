import React, { useState, useEffect } from 'react';
import './typingindicator.css';

const TypingIndicator = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible((prevVisible) => !prevVisible);
    }, 500); // Adjust the duration of each animation cycle here

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={`typing-indicator ${isVisible ? 'visible' : ''}`}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default TypingIndicator;
