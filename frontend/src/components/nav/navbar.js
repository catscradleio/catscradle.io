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

    this.state = {
      modal: false,
      formType: 'login'
    };
  }

  logoutUser(e) {
      e.preventDefault();
        this.props.logout();
  }



  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
          <div className={styles['navbuttonContainer']}>
            <div className={styles['navLink']}><Link to={'/cradles'}>EXPLORE</Link></div>
            <div className={styles['navLink']}><Link to={'/profile'}>PROFILE</Link></div>
            <div className={styles['navLink']}> <Link to={'/new_cradle'}>CREATE</Link></div>
            <button className={styles['buttonLogin']}
                onClick={this.logoutUser}>LOGOUT</button>
            </div>
        );
      } else {
        return (
            <div className={styles['navbuttonContainer']}>
              <div 
                  onClick={() => this.showModalSignup()}
                  className={styles['buttonSignup']}>SIGNUP</div>
            <div onClick={() => this.showModalLogin()}
              className={styles['buttonLogin']}>SIGNIN</div>
            </div>
        );
      }
  }

  showModalSignup(){
    this.setState({ modal: true, formType: 'signup' })
    let modalBody = document.getElementById('sessionModalContainer')
    let modal = document.getElementById('modal')
    if (!modal) {
      return null
    }
    this.changeGradientOrange();
    modalBody.style.display = 'block'
    modal.style.display = 'block'

  }

  showModalLogin() {
    this.setState({ modal: true, formType: 'login' })
    let modalBody = document.getElementById('sessionModalContainer')
    let modal = document.getElementById('modal')
    if (!modal) {
      return null
    }
      this.changeGradientBlue();
      modalBody.style.display = 'block'
      modal.style.display = 'block'
  }


  changeGradientBlue() {
    let modal = document.getElementById('sessionModalContainer')
    modal.style.backgroundImage = 'linear-gradient(rgba(134, 167, 180, 0.7), rgba(10, 13, 36, 0.7))'
  }
  
  changeGradientOrange() {
    let modal = document.getElementById('sessionModalContainer')
    modal.style.backgroundImage = 'linear-gradient(rgba(231, 192, 154, 0.7), rgba(10, 13, 36, 0.7))'
  }

  render() {
      return (
        <>
          <div className={styles['navbarContainer']}>
            <div className={styles['appNameContainer']}>
              {/* <img className={styles['logo']} src="https://3.bp.blogspot.com/-XYb9-4Rk54Q/XNs5sYxbZUI/AAAAAAAABVg/B1IfGITMau0H6dg0jmqAboY7SU-PoVpqQCLcBGAs/s1600/cc_logo-05.png" /> */}
              <h1 className={styles['appName']}>CatsCradle.io</h1>
            </div>
            
              { this.getLinks() }

          </div>
          <div className={styles['modalSpacer']} ><SessionModal formType={this.state.formType} modal={this.state.modal} /></div>
        </>
      );
  }
}

export default withRouter(NavBar);
