import React from 'react'

import App from './App'
import VoteForm from './contents/VoteForm'
import ShowCandidates from './contents/ShowCandidates'

import NavVoter from './contents/NavVoter'

class Voter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authcode: '',
      isVoter: null,
    }
  }

  handleAuthcode = e => { // 인증 코드 입력 필드 관리
    this.setState({
      authcode: e.target.value
    })
  }

  handleSubmit = e => { // 투표소 입장 버튼 클릭 이벤트
    e.preventDefault()

    window.localStorage.setItem('isVoter', true)
    this.setState({ isVoter: true })
  }

  exit = e => { // 투표소 퇴장 버튼 클릭 이벤트
    e.preventDefault()

    window.localStorage.removeItem('isVoter')
    this.setState({ authcode: '', isVoter: null })
  }

  render() {
    return (
      <div>
        { !window.localStorage.getItem('isVoter') ?
          // 유권자 인증을 하지 않았을 때
          <div class="container" style={{width:"900px"}}>
            <h2> 유권자 홈페이지입니다. </h2>
            <NavVoter />
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="name" />
              <button type='submit' class='btn btn-primary'> 투표소 입장하기 </button>
            </form>
            <hr/>
          </div>
          :
          // 유권자 인증 완료했을 때
          <div class="container" style={{width:"900px"}}>
            <ShowCandidates candidates={this.props.candidates} />
            <hr/>
            { !this.props.hasVoted ?
              // 투표를 하지 않은 유권자일 때
              <VoteForm
                candidates={this.props.candidates}
                castVote={this.props.castVote}
              />
              :
              // 이미 투표한 유권자일 때
              <div> 이미 투표한 계정입니다. <hr/> </div>
            }
            <div>
              <button class='btn btn-primary' onClick={this.exit}> 투표소 퇴장하기 </button>
            </div>
            <hr/>
          </div>
        }
      </div>
    )
  }
}

export default Voter
