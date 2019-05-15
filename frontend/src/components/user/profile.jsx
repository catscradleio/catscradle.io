import React from 'react';
import UserCradleItem from './user_cradle_item';

class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchUserCradles(this.props.currentUser.id);
  }

  render() {
    if (this.props.cradles.length === 0) {
      return ( <div>No cradles yet!</div> )
    } else {
      return (
      <div>
        <h3>User's Cradles</h3>
        {this.props.cradles.map(cradle => (
          <UserCradleItem cradle={cradle} />
        ))}
      </div>
      );
    }

  }
}

export default Profile;
