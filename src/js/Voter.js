import React from 'react'

import App from './App'
import Table from './contents/Table'
import Form from './contents/Form'

class Voter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVoter: false,
    }
  }

  authVoter() {  // 유권자 인증이 되었을 때 실행
    this.setState({ isVoter: true })
  }

  render() {
    return (
      <div className='Voter'>
        { !this.state.isVoter ?
          // 유권자 인증을 하지 않았을 때
          <div>
            <h2> 유권자 홈페이지입니다. </h2>

            <form onSubmit={(event) => {
              event.preventDefault()
              this.authVoter()  // 유권자 인증이 되면 isVoter의 값을 true로 변경
            }}>
              <input type="text" name="name" />
              <button type='submit' class='btn btn-primary'> 투표소 입장하기 </button>
            </form>
            <hr/>
          </div>
          :
          // 유권자 인증 완료했을 때
          <div>
            <Table candidates={this.props.candidates} />
            <hr/>
            { !this.props.hasVoted ?
              // 투표를 하지 않은 유권자일 때
              <Form
                candidates={this.props.candidates}
                castVote={this.props.castVote}
              />
              :
              // 이미 투표한 유권자일 때
              <div> 이미 투표한 계정입니다. <hr/> </div>
            }
          </div>
        }
      </div>
    )
  }
}

export default Voter
