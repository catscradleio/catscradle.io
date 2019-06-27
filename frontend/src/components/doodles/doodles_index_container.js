import {connect} from 'react-redux';
import {fetchDoodles} from '../../actions/doodle_actions';
import DoodlesIndex from './doodles_index';

const selectDoodles = (doodles) => {
  return Object.keys(doodles).map(title => doodles[title]);
};

const mapStateToProps = (state) => {
  return {
  doodles: selectDoodles(state.doodles)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  fetchDoodles: () => dispatch(fetchDoodles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoodlesIndex);