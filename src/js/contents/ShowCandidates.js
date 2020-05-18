import React from 'react'

class ShowCandidates extends React.Component {
  render() {
    return (
      <div>
        <h3> 후보자 목록 </h3> <br/>
        <div id="candidatesRow" class="row">
          {this.props.candidates.map((candidate) => {
            return(
              <div id="candidateTemplate">
                  <div class="panel panel-default panel-candidate" style={{margin:"10px"}}>
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
                      <button class="btn btn-dark btn-detail" type="button">
                        Detail
                      </button>
                    </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default ShowCandidates
