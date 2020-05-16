import React from 'react'

import App from './App'
import Table from './contents/Table'
import Form from './contents/Form'
import Home from './Home_voter'

class Voter extends React.Component {
  render() {
    return (
      <div className='Voter'>
        { this.props.isVoter ?  // 테스트용으로 !를 뺀 것임. 원래는 앞에 ! 있어야 함
          <div>
            <Home />

            <form onSubmit={(event) => {
              event.preventDefault()
              this.props.authVoter()  // 유권자 인증이 되면 isVoter의 값을 true로 변경
            }}>
              <input type="text" name="name" />
              <button type='submit' class='btn btn-primary'>유권자인증</button>
              <hr />
            </form>

            <hr/>
          </div>
          :
          <div>
            <Table candidates={this.props.candidates} />
            <hr/>
            { !this.props.hasVoted ?
              <Form
                candidates={this.props.candidates}
                castVote={this.props.castVote}
              />
              :
              <div> 이미 투표한 계정입니다. <hr/> </div>
            }
          </div>
        }
      </div>
    )
  }
}

export default Voter
