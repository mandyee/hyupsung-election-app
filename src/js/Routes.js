import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Home from './Home'
import Admin from './Admin'
import Voter from './Voter'
import Result from './Result'

class Routes extends React.Component {
  render() {
    return (
      <div className='Router'>
        <Router>
          <Route exact path='/' component={Home} />
          <Route path='/admin'
            render={ () =>
              <Admin
                addCandidate={this.props.addCandidate}
                adding={this.props.adding}
              />
            }
          />
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
          {/*<Route exact path='/turnout' component={Turnout} />*/}
          <Route exact path='/result'
            render={ () =>
              <Result
                candidates={this.props.candidates}
              />
            }
          />
        </Router>
      </div>
    )
  }
}

export default Routes
