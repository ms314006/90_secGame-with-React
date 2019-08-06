import React, { useEffect, useRef } from 'react';
import Runner from '../../lib/Runner';
import styles from './index.scss';

const Main = () => {
  const canvas = useRef(null);
  useEffect(() => {
    const runner = new Runner(canvas.current);
    runner.loadImages();
  }, []);
  return (
    <div className={styles.mainBlock}>
      <div id="chrome-dino" ref={canvas} />
    </div>
  );
};

export default Main;
