import {connect} from 'react-redux';
import {fetchCradles} from '../../actions/cradle_actions';
import CradlesIndex from './cradles_index';

const selectCradles = (cradles) => {
  return Object.keys(cradles).map(title => cradles[title]);
};

const mapStateToProps = (state) => {
  return {
  cradles: selectCradles(state.cradles)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  fetchCradles: () => dispatch(fetchCradles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CradlesIndex);