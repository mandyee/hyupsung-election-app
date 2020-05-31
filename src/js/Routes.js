import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Home from './Home'
import Admin from './Admin'
import Voter from './Voter'
import Turnout from './Turnout'
import Result from './Result'
import BlockInfo from './BlockInfo'


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
                block_ids={this.props.block_ids}
                block_hashes={this.props.block_hashes}
                block_ts={this.props.block_ts}
                curr_block={this.props.curr_block}
              />
            }
          />
          <Route path='/voter'
            render={ () =>
              <Voter
                account={this.props.account}

                startedElections={this.props.startedElections}
                selectElection={this.props.selectElection}
                selectedElection={this.props.selectedElection}
                selectedCandidates={this.props.selectedCandidates}

                candidates={this.props.candidates}
                hasVoted={this.props.hasVoted}
                castVote={this.props.castVote}
              />
            }
          />
          <Route exact path='/turnout'
            component={Turnout}
          />
          <Route exact path='/result'
            render={ () =>
              <Result
                candidates={this.props.candidates}
              />
            }
          />
          <Route exact path='/blockinfo'
            render={ () =>
              <BlockInfo
                block_ids={this.props.block_ids}
                block_hashes={this.props.block_hashes}
                block_ts={this.props.block_ts}
                curr_block={this.props.curr_block}
              />
            }
          />
        </Router>
      </div>
    )
  }
}

export default Routes
