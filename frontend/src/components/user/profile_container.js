import {connect} from 'react-redux';
import {fetchUserDoodles} from '../../actions/doodle_actions';
import Profile from './profile';

const selectDoodles = (doodles) => {
  return Object.keys(doodles).map(title => doodles[title]);
};

const mapStateToProps = (state) => {
  return {
    doodles: selectDoodles(state.doodles),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserDoodles: (creatorId) => dispatch(fetchUserDoodles(creatorId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);