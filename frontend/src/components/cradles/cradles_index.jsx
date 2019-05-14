import React from 'react';
import CradlesIndexItem from './cradles_index_item';

class CradlesIndex extends React.Component {

  componentDidMount(){
    this.props.fetchCradles();
  }

  render() {
    return(
      <div>
        <ul>
          {this.props.cradles.map((cradle) => {
            return <li>
              <CradlesIndexItem cradle={cradle}/>
            </li>
          })}
        </ul>
      </div>
    )
  }

}


export default CradlesIndex;