import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import styles from './navbar.module.css';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div>
                <Link to={'/tweets'}>All Tweets</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/new_tweet'}>Write a Tweet</Link>
                <button onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div className={styles['navbuttonContainer']}>
              <Link className={styles['buttonSignup']} to={'/signup'}>Signup</Link>
              <Link className={styles['buttonLogin']} to={'/login'}>Login</Link>
            </div>
        );
      }
  }

  render() {
      return (
        <div>
          <div className={styles['navbarContainer']}>
              <h1 className={styles['appName']}>CatsCradle.io</h1>
              { this.getLinks() }
          </div>
        </div>
      );
  }
}

export default NavBar;
