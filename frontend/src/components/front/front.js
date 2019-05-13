import React from 'react';
import Canvas from './canvas';
import styles from './front.module.css';

class Front extends React.Component {

  render() {
    return (
      <div className={styles['frontBodyContainer']}>
        <h1>Front Page!</h1>
        <div><Canvas /></div>
        <p>This component only shows up if user is not logged in</p>
        <footer>
          Copyright &copy; 2019
        </footer>
      </div>
    );
  }
}

export default Front;
