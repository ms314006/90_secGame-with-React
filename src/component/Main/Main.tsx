import React, { useEffect, useRef } from 'react';
import Game from '../../lib/Game';

const Main = () => {
  const canvas = useRef(null);
  useEffect(() => {
    const game = new Game(canvas.current);
    game.loadImages();
  }, []);
  return (
    <div id="chrome-dino" ref={canvas} />
  );
};

export default Main;
