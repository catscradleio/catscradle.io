import { connect } from 'react-redux';
import { signup } from '../../actions/session-actions';
import SignupForm from './signup-form';

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isAuthenticated,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: user => dispatch(signup(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
