import { connect } from 'react-redux';
import { login } from '../../actions/session-actions';
import LoginForm from './login-form';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: user => dispatch(login(user))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
