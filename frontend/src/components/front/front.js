import React from 'react';
// import FrontCanvas from './front-canvas';
import styles from './front.module.css';
import NavbarContainer from '../nav/navbar-container';
import Canvas from '../canvas/canvas';
import Chat from '../chat/chatBoard';
import Game from '../game/game';
import PlayerBoard from '../players/playerBoard';


class Front extends React.Component {

  render() {
    return (
      <div className={styles['frontBodyContainer']}>
        <NavbarContainer />
        <div className={styles['frontBodyContentContainer']}>

          <div className={styles.contentContainer}>
            <Game />
            <div className={styles.playableContainer}>
              <PlayerBoard />
              <Canvas />
              <Chat />
            </div>
          </div>

          <div className={styles['frontFooterContainer']}>
            <footer>
              <p>Copyright &copy; 2019</p> 
            </footer>
          </div>

        </div>
      </div>
    );
  }
}

export default Front;
