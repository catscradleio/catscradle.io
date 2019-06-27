import React from 'react';
import DoodlesIndexItem from './doodles_index_item';

class DoodlesIndex extends React.Component {

  componentDidMount(){
    this.props.fetchDoodles();
  }

  render() {
    return(
      <div>
        <ul>
          {this.props.doodles.map((doodle) => {
            return <li>
              <DoodlesIndexItem doodle={doodle}/>
            </li>
          })}
        </ul>
      </div>
    )
  }

}


export default DoodlesIndex;