import React from 'react'
import Modal from 'react-awesome-modal'

class ShowCandidates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pledgesOn: false,
      pledges: '',
    }
  }

  openPledges = e => { // 공약 보기 버튼 클릭 이벤트
    e.preventDefault()

    this.setState({
      pledgesOn: true,
      pledges: e.target.getAttribute('pledges')
    })
  }

  closePledges = e => { // 공약 창에서 닫기 클릭 이벤트
    e.preventDefault()

    this.setState({
      pledgesOn: false,
      pledges: ''
    })
  }

  render() {
    return (
      <div>
        <h3> 후보자 목록 </h3> <br/>
        <div id="candidatesRow" class="row">
          {this.props.candidates.map((candidate) => {
            return(
              <div>
                <div id="candidateTemplate">
                  <div class="panel panel-default panel-candidate"
                  style={{margin:"10px", width:"220px"}}>
                    <div class="panel-heading">
                      <h3 class="panel-title">기호 {candidate.candidateId.toNumber()}번</h3>
                    </div>
                    <div class="panel-body">
                      <strong> 정 입후보자 </strong> <br/>
                      <strong> 이름 </strong>: {candidate.presidentName} <br/>
                      <strong> 학과 </strong>: {candidate.presidentDept} <br/>
                      <hr/>
                      <strong> 부 입후보자 </strong> <br/>
                      <strong> 이름 </strong>: {candidate.vpresidentName} <br/>
                      <strong> 학과 </strong>: {candidate.vpresidentDept} <br/>
                      <hr/>
                      <button class="btn btn-dark btn-detail" type="button"
                      onClick={this.openPledges} pledges={candidate.pledges}>
                        공약 보기
                      </button>
                    </div>
                  </div>
                </div>

                {/* 후보자 공약 보기 모달 */}
                <Modal visible={this.state.pledgesOn}
                width="400" height="300" effect="fadeInDown"
                onClickAway={this.closePledges}>
                  <div class="container text-center">
                    {/* new line을 화면에 정상적으로 출력하기 위함 */}
                    {this.state.pledges.split("\n").map(function(item, idx) {
                      return (
                        <span key={idx}>
                          {item} <br/>
                        </span>
                      )
                    })}
                    <hr/>
                    <input value="닫기" class="btn btn-dark btn-detail"
                    type='button' onClick={this.closePledges}/>
                  </div>
                </Modal>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default ShowCandidates
