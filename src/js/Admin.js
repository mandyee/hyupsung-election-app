import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import AdminList from '../json/AdminList'
import Add from './contents/Add'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLogin: null,
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

    window.localStorage.clear()
    this.setState({ username: '', password: '', isLogin: null })
  }

  render() {
    return (
      <Router>
        <div>
          { !window.localStorage.getItem('isLogin') ?
            // 로그인 되지 않았을 때
            <div>
              <h2> 선거관리위원회 홈페이지입니다. </h2>

              <form onSubmit={this.handleSubmit}>
                <div>
                  <span>Username</span>
                  <input
                    placeholder='사용자 이름을 입력하세요'
                    value={this.state.username}
                    onChange={this.handleUsername}
                  />
                </div>
                <div>
                  <span>Password</span>
                  <input
                    placeholder='비밀번호를 입력하세요'
                    value={this.state.password}
                    onChange={this.handlePassword}
                    type='password'
                  />
                </div>
                <div>
                  <button type='submit'> Login </button>
                </div>
              </form>
            </div>
            :
            // 선관위 로그인 완료했을 때
            <div>
              <h2> 선거관리위원회님, 환영합니다! </h2>

              <div>
                <button onClick={this.logout}> Logout </button>
              </div>
              <hr/>
              <div>
                <Add
                  addCandidate={this.props.addCandidate}
                  adding={this.props.adding}
                />
              </div>
            </div>
          }
        </div>
      </Router>
    )
  }
}

export default Admin
