import React from 'react'

import App from './App'
import ShowResult from './contents/ShowResult'

class Result extends React.Component {
  render() {
    return (
      <div>
        <h3> 투표 결과 </h3> <br/>
        <div>
          <ShowResult candidates={this.props.candidates} />
        </div>
      </div>
    )
  }
}

export default Result
