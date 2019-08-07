import React, { useEffect, useRef } from 'react';
import Runner from '../../lib/Runner';

const Main = () => {
  const canvas = useRef(null);
  useEffect(() => {
    const runner = new Runner(canvas.current);
    runner.loadImages();
  }, []);
  return (
    <div id="chrome-dino" ref={canvas} />
  );
};

export default Main;
