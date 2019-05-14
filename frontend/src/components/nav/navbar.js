import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import styles from './navbar.module.css';
import SessionModal from '../front/session-modal';
import { withRouter } from 'react-router';

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
                <Link to={'/tweets'}>All Cradles</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/new_tweet'}>Code a Cradle</Link>
                <button onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div className={styles['navbuttonContainer']}>
              <div 
                  onClick={() => this.showModalSignup()}
                  className={styles['buttonSignup']}>Signup</div>
            <div onClick={() => this.showModalLogin()}
              className={styles['buttonLogin']}>Login</div>
            </div>
        );
      }
  }

  showModalSignup(){
    this.setState({ modal: true, formType: 'signup' })
    let modal = document.getElementById('sessionModalContainer')
    if (!modal) {
      return null
    }
    modal.style.display = 'block'

  }

  showModalLogin() {
    this.setState({ modal: true, formType: 'login' })
    let modal = document.getElementById('sessionModalContainer')
    if (!modal) {
      return null
    }
      modal.style.display = 'block'
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

export default withRouter(NavBar);
