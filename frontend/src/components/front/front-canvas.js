import React from 'react';
import styles from './canvas.module.css';
import ThreeCanvas from '../three-canvas/three-canvas';

const FrontCanvas = () => {
  return (
  <div className={styles['canvasBodyContainer']}>
    <div className={styles['canvasContainer']}> 
    <h2 className={styles["cradleTitle"]}>Untitled demo</h2>
    <h6 className={styles["cradleAuthor"]}>A CRADLE BY ANONYMOUS</h6>
    <ThreeCanvas />
    </div>
  </div>
  );
};

export default FrontCanvas;
