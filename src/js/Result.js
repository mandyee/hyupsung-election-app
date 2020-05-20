import React from 'react'

import App from './App'
import ShowResult from './contents/ShowResult'

class Result extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container">
            <a class="navbar-brand" style={{color:"white"}}>Hyupsung Election App</a>
          </div>
        </nav>

        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h1 class="my-4"> 투표 결과 <small>Results</small> </h1>
              <br/>
              <ShowResult candidates={this.props.candidates} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Result
