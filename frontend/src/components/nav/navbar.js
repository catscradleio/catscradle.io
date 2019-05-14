import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import styles from './navbar.module.css';
import SessionModal from '../front/session-modal';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.showModal = this.showModal.bind(this);

    this.state = {
      modal: false,
      formType: true
    };
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  showModal(){ 
    let modal = document.getElementsByClassName('sessionModalContainer');
    modal.style.display = 'block';
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
              <div 
                  onClick={() => this.setState({modal: true, formType: false})}
                  className={styles['buttonSignup']}>Signup</div>
            <div onClick={() => this.setState({ modal: true, formType: true })}
              className={styles['buttonLogin']}>Login</div>
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
            <SessionModal formType={this.state.formType} modal={this.state.modal}/>
        </div>
      );
  }
}

export default NavBar;
