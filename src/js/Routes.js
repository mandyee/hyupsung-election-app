import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Main from './Main'
import Home from './Home'
import Admin from './Admin'
import Voter from './Voter'

class Routes extends React.Component {
  render() {
    return (
      <div className='Router'>
        <Router>
          <Main />
          <Route exact path='/' component={Home} />
          <Route path='/admin' component={Admin} />
          <Route path='/voter'
            render={ () =>
              <Voter
                account={this.props.account}
                candidates={this.props.candidates}
                hasVoted={this.props.hasVoted}
                castVote={this.props.castVote}
              />
            }
          />
        </Router>
      </div>
    )
  }
}

export default Routes
