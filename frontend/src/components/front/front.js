import React from 'react';
import FrontCanvas from './front-canvas';
import styles from './front.module.css';
import NavbarContainer from '../nav/navbar-container';

class Front extends React.Component {

  render() {
    return (
      <div className={styles['frontBodyContainer']}>
          <NavbarContainer />
        <div className={styles['frontBodyContentContainer']}>
        
          <FrontCanvas />
          <div className={styles['frontFooterContainer']}>
            <p>This component only shows up if user is not logged in</p>
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
