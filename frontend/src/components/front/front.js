import React from 'react';

class Front extends React.Component {

  render() {
    return (
      <div>
        <h1>Front Page!</h1>
        <p>This component only shows up if user is not logged in</p>
        <footer>
          Copyright &copy; 2019
        </footer>
      </div>
    );
  }
}

export default Front;
