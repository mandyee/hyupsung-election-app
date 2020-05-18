import React from 'react'

class VoteForm extends React.Component {
  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        this.props.castVote(this.candidateId.value)
      }}>
        <div class='form-group'>
          <label>후보자를 선택하세요.</label>
          <select ref={(input) => this.candidateId = input} class='form-control'>
            {this.props.candidates.map((candidate) => {
              return <option value={candidate.candidateId}>
                기호 {candidate.candidateId.toNumber()}번 :
                {candidate.presidentName}, {candidate.vpresidentName}
              </option>
            })}
          </select>
        </div>
        <button type='submit' class='btn btn-primary'>Vote</button>
        <hr />
      </form>
    )
  }
}

export default VoteForm
