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
      <div>
        <h4> 후보자 추가하기 </h4>

        { this.props.adding ?
          <div> Loading... </div>
          :
          <form onSubmit={this.handleSubmit}>
            <div class='form-group'>
              <div>
                <div> 정 입후보자 </div>
                <div> 이름
                  <input
                    value={this.state.presidentName}
                    onChange={this.handleField}
                    name="presidentName"
                  />
                </div>
                <div> 학과
                  <input
                    value={this.state.presidentDept}
                    onChange={this.handleField}
                    name="presidentDept"
                  />
                </div>
              </div>
              <div>
                <div> 부 입후보자 </div>
                <div> 이름
                  <input
                    value={this.state.vpresidentName}
                    onChange={this.handleField}
                    name="vpresidentName"
                  />
                </div>
                <div> 학과
                  <input
                    value={this.state.vpresidentDept}
                    onChange={this.handleField}
                    name="vpresidentDept"
                  />
                </div>
              </div>
              <div>
                <div> 공약 </div>
                <textarea
                  value={this.state.pledges}
                  onChange={this.handleField}
                  name="pledges">
                </textarea>
              </div>
            </div>
            <button type='submit' class='btn btn-primary'>Add</button>
            <hr />
          </form>
        }
      </div>
    )
  }
}

export default AddCandidate
