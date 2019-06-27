import React from 'react';
import UserDoodleItem from './user_doodle_item';
import NavbarContainer from '../nav/navbar-container';
import styles from './profile.module.css';

class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchUserDoodles(this.props.currentUser.id);
  }

  render() {
    return (
      <div className={styles['profileBodyContainer']}>
        <NavbarContainer />
        <h3>User's Doodles</h3>
        {this.props.doodles.map(doodle => (
          <UserDoodleItem doodle={doodle} />
        ))}
      </div>
    )
  }
}


export default Profile;
