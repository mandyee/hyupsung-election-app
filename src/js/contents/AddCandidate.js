import React from 'react'

class AddCandidate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      presidentName: '',
      presidentDept: '',
      vpresidentName: '',
      vpresidentDept: '',
      pledges: '',
    }
  }

  handleField = e => { // 후보자 정보 입력 필드 관리
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => { // 후보자 추가 버튼 클릭 이벤트
    e.preventDefault()

    this.props.addCandidate(this.state.presidentName, this.state.presidentDept,
      this.state.vpresidentName, this.state.vpresidentDept, this.state.pledges)

    this.setState({ // 상태 초기화
      presidentName: '',
      presidentDept: '',
      vpresidentName: '',
      vpresidentDept: '',
      pledges: '',
    })
  }

  render() {
    return (
      <div >
        <h3> 후보자 추가하기 </h3>
        <hr/>
        { this.props.adding ?
          <div> Loading... </div>
          :
          <form onSubmit={this.handleSubmit}>
            <div class='form-group'>
              <table style={{margin:"auto"}}>
                <tbody>
                  <tr>
                    <th colspan="2">정 입후보자</th>
                  </tr>
                  <tr>
                    <th width="50px">이름</th>
                    <td width="200px">
                      <input
                        value={this.state.presidentName}
                        onChange={this.handleField}
                        name="presidentName"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>학과</th>
                    <td>
                      <input
                        value={this.state.presidentDept}
                        onChange={this.handleField}
                        name="presidentDept"
                      />
                    </td>
                  </tr>
                </tbody>
              </table> <br/>
              <table style={{margin:"auto"}}>
                <tbody>
                  <tr>
                    <th colspan="2">부 입후보자</th>
                  </tr>
                  <tr>
                    <th width="50px">이름</th>
                    <td width="200px">
                      <input
                        value={this.state.vpresidentName}
                        onChange={this.handleField}
                        name="vpresidentName"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>학과</th>
                    <td>
                      <input
                        value={this.state.vpresidentDept}
                        onChange={this.handleField}
                        name="vpresidentDept"
                      />
                    </td>
                  </tr>
                </tbody>
              </table> <br/>
              <table style={{margin:"auto"}}>
                <tbody>
                  <tr>
                    <th width="50px">공약</th>
                    <td width="200px">
                      <textarea
                        style={{resize:"none"}}
                        rows="5"
                        value={this.state.pledges}
                        onChange={this.handleField}
                        name="pledges">
                      </textarea>
                    </td>
                  </tr>
                </tbody>
              </table> <br/>
              <button type='submit' class='btn btn-secondary'>Add</button>
              <hr />
            </div>
          </form>
        }
      </div>
    )
  }
}

export default AddCandidate
