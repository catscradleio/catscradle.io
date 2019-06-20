import React from 'react';
import UserCradleItem from './user_cradle_item';
import NavbarContainer from '../nav/navbar-container';
import styles from './profile.module.css';

class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchUserCradles(this.props.currentUser.id);
  }

  render() {
    return (
      <div className={styles['profileBodyContainer']}>
        <NavbarContainer />
        <h3>User's Cradles</h3>
        {this.props.cradles.map(cradle => (
          <UserCradleItem cradle={cradle} />
        ))}
      </div>
    )
  }
}


export default Profile;
