import React from 'react'

class ShowResult extends React.Component {
  render() {
    return (
      <table class='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>정 입후보자</th>
            <th>부 입후보자</th>
            <th>득표수</th>
          </tr>
        </thead>
        <tbody >
          {this.props.candidates.map((candidate) => {
            return(
              <tr>
                <th>{candidate.candidateId}</th>
                <td>{candidate.presidentName}</td>
                <td>{candidate.vpresidentName}</td>
                <td>{candidate.voteCount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default ShowResult
