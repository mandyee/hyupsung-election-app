import React from 'react'
import Modal from 'react-awesome-modal'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import AdminList from '../json/AdminList'
import AddCandidate from './contents/AddCandidate'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLogin: null,
      addCandidateOn: false,
    }
  }

  handleUsername = e => { // username 입력 필드 관리
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = e => { // password 입력 필드 관리
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = e => { // 로그인 버튼 클릭 이벤트
    e.preventDefault()

    const user = AdminList.find(  // username과 password가 유효한 값인지 검사
      (user) => user.username === this.state.username
      && user.password === this.state.password
    )

    if (user === undefined) { // 유효하지 않은 user일 때
      alert('username 혹은 password가 올바르지 않습니다.')
    }
    else {  // 유효한 user일 때
      window.localStorage.setItem('isLogin', true)
      this.setState({ isLogin: true })
    }
  }

  logout = e => { // 로그아웃 버튼 클릭 이벤트
    e.preventDefault()

    window.localStorage.removeItem('isLogin')
    this.setState({ username: '', password: '', isLogin: null })
  }

  openAddCandidate = e => { // 후보자 추가 버튼 클릭 이벤트
    e.preventDefault()

    this.setState({
      addCandidateOn: true,
    })
  }

  closeAddCandidate = e => { // 후보자 추가 창 닫기 클릭 이벤트
    e.preventDefault()

    this.setState({
      addCandidateOn: false,
    })
  }

  render() {
    return (
      <Router>
        { !window.localStorage.getItem('isLogin') ?
          // 로그인 되지 않았을 때
          <div>
            <div class="overlay">
              <img src="img/vote-by-mail-concern.png" width="100%" height="100%"></img>
            </div>
            <div class='masthead'>
              <div class='masthead-bg'></div>
              <div class="container h-100">
                <div class="row h-100">
                  <div class="col-12 my-auto">
                    <div class="masthead-content text-white py-5 py-md-0">
                      <h1 class="mb-3">Welcome!</h1>
                      <p class="mb-5">협성대학교 선거관리위원회 페이지입니다.</p>
                      <div class="input-group input-group-newsletter">
                        <form onSubmit={this.handleSubmit}>
                          <div>
                            <span>Username</span>
                            <input
                              class="form-control"
                              placeholder='Username 입력...'
                              value={this.state.username}
                              onChange={this.handleUsername}
                            />
                          </div>
                          <div>
                            <span>Password</span>
                            <input
                              class="form-control"
                              placeholder='Password 입력...'
                              value={this.state.password}
                              onChange={this.handlePassword}
                              type='password'
                            />
                          </div> <br/>
                          <div>
                            <button class="btn btn-secondary" type='submit'>
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          // 선관위 로그인 완료했을 때
          <div class="container" style={{width:"900px"}}>
            <div class="col-lg-12">
              <h2> 선거관리위원회님, 환영합니다! </h2>
              <div>
                <button onClick={this.logout}> Logout </button>
              </div>
              <hr/>
              <div>
                <button class="btn btn-dark btn-detail" type="button">
                  선거 관리
                </button>
                <hr/>
                <button class="btn btn-dark btn-detail" type="button"
                onClick={this.openAddCandidate}>
                  후보자 추가
                </button>

                {/* 후보자 추가 모달*/}
                <Modal visible={this.state.addCandidateOn}
                width="400" height="500" effect="fadeInDown"
                onClickAway={this.closeAddCandidate}>
                  <div class="container text-center">
                    <AddCandidate
                      addCandidate={this.props.addCandidate}
                      adding={this.props.adding}
                    />
                    <input value="닫기" class="btn btn-dark btn-detail"
                    type='button' onClick={this.closeAddCandidate}/>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        }
      </Router>
    )
  }
}

export default Admin
