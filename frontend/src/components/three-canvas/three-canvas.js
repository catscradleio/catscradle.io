import React, { useEffect, useRef } from 'react';
import { initializeCanvas, destroyCanvas } from '../../util/canvas-util';
import { createCatsCradle, createThreeObjectsGroupFromCradle } from '../../util/cradle-util';
import styles from '../front/canvas.module.css';

const ThreeCanvas = ({ cradle }) => {
  const ref = useRef(null);

  useEffect(() => {
    const cradle = createThreeObjectsGroupFromCradle({ cradle: createCatsCradle() });
    const data = { element: ref.current, cradle };
    initializeCanvas(data);
    return () => destroyCanvas(data);
  }, []);

  return (
    <div ref={ref} className={styles['canvas']}></div>
  );
};

export default ThreeCanvas;
