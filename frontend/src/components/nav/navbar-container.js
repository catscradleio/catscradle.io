import { connect } from 'react-redux';
import { logout } from '../../actions/session-actions';
import { withRouter } from 'react-router';

import NavBar from './navbar';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

export default withRouter(connect(
  mapStateToProps,
  { logout }
)(NavBar));
