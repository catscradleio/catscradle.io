import {connect} from 'react-redux';
import {fetchUserCradles} from '../../actions/cradle_actions';
import Profile from './profile';

const selectCradles = (cradles) => {
  return Object.keys(cradles).map(title => cradles[title]);
};

const mapStateToProps = (state) => {
  return {
    cradles: selectCradles(state.cradles),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserCradles: (creatorId) => dispatch(fetchUserCradles(creatorId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);