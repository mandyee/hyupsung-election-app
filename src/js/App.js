import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Election from '../../build/contracts/Election.json'
import Routes from './Routes'

import 'bootstrap/dist/css/bootstrap.css'

import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      candidates: [],
      hasVoted: false,
      loading: true,
      voting: false,
      adding: false,

      block_ids: [],
      block_hashes: [],
      block_ts: [], // block의 timestamp
      curr_block: 100,  // block 정보 최대 100개 보여줄 것
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.election = TruffleContract(Election)
    this.election.setProvider(this.web3Provider)

    this.castVote = this.castVote.bind(this)
    this.watchEvents = this.watchEvents.bind(this)

    this.web3.eth.getBlockNumber((err, rtn) => {
      if(err) return console.log(err);
      this.state.curr_block = rtn;
    })
  }

  getBlocks(curr_block_no) {
    const block_ids = this.state.block_ids.slice();
    const block_hashes = this.state.block_hashes.slice();
    const block_ts = this.state.block_ts.slice();
    var max_blocks = curr_block_no;

    // unix timestamp 형식을 yyyy-mm-dd 형식으로 바꾸기 위한 변수들
    var date, formattedTime;
    var year, month, day, hours, minutes, seconds;

    for (var i = max_blocks; i >= 0; i--) {
      this.web3.eth.getBlock(i, false, function(err, block) {
        date = new Date(block.timestamp * 1000)

        year = date.getFullYear()
        month = date.getMonth() + 1
        day = date.getDate()
        hours = date.getHours()
        minutes = date.getMinutes()
        seconds = date.getSeconds()

        // 날짜 형식에서 한 자리수일 경우 앞에 0을 채워줌
        if(month < 10) month = "0" + month
        if(day < 10) day = "0" + day
        if(hours < 10) hours = "0" + hours
        if(minutes < 10) minutes = "0" + minutes
        if(seconds < 10) seconds = "0" + seconds

        formattedTime = year + '.' + month + '.' + day
          + ' ' + hours + ':' + minutes + ':' + seconds

        block_ids.push(block.number)
        block_hashes.push(block.hash)
        block_ts.push(formattedTime)
      })
    }
    this.setState({
      block_ids: block_ids,
      block_hashes: block_hashes,
      block_ts: block_ts
    })
  }

  componentDidMount() {
    this.getBlocks(this.state.curr_block);

    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.election.deployed().then((electionInstance) => {
        this.electionInstance = electionInstance
        this.watchEvents()

        this.electionInstance.getCandidateCount().then((candidateCount) => {
          for (var i = 0; i < Number(candidateCount); i++) {
            this.electionInstance.candidateList(i).then((candidate) => {
              const candidates = [...this.state.candidates]
              candidates.push({
                candidateId: String(candidate[0]),
                electionId: String(candidate[1]),
                voteCount: String(candidate[2]),
                presidentName: String(candidate[3]),
                //presidentDept: candidate.presidentDept,
                vpresidentName: String(candidate[5]),
                //vpresidentDept: candidate.vpresidentDept,
                //pledges: String(candidate[7])
              })
              this.setState({ candidates: candidates })
            })
          }
        })
        //this.electionInstance.voters(this.state.account).then((hasVoted) => {
          this.setState({ /*hasVoted,*/ loading: false })
        //})
      })
    })
  }

  watchEvents() {
    // TODO: trigger event when vote is counted, not when component renders
    this.electionInstance.votedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ voting: false })
    })
  }

  castVote(studentId, candidateId) {
    this.setState({ voting: true })
    this.electionInstance.vote(stutentId, candidateId, { from: this.state.account }).then((result) =>
      this.setState({ hasVoted: true })
    )
  }

  addCandidate = (electionId, presidentName, vpresidentName) => {
    this.setState({ adding: true }) // 후보자 트랜잭션 승인 중... (Loading)
    this.electionInstance.addCandidate(electionId, presidentName, vpresidentName,
      { from: this.state.account }).then((result) =>
      this.setState({ adding: false })  // 후보자 트랜잭션 승인 완료
    )
  }

  render() {
    return (
      <div>
        <div>
          { this.state.loading || this.state.voting ?
            <p class='text-center'>Loading...</p>
            :
            <Routes
              account={this.state.account}
              candidates={this.state.candidates}
              hasVoted={this.state.hasVoted}
              castVote={this.castVote}
              addCandidate={this.addCandidate}
              adding={this.state.adding}
              block_ids={this.state.block_ids}
              block_hashes={this.state.block_hashes}
              block_ts={this.state.block_ts}
              curr_block={this.state.curr_block}
            />
          }
        </div>

        <table class='table'>
          <thead>
            <tr>
              <th>후보자 ID</th>
              <th>소속 선거 ID</th>
              <th>정 입후보자</th>
              <th>부 입후보자</th>
              <th>득표 수</th>
            </tr>
          </thead>
          <tbody>
            {this.state.candidates.map((candidate) => {
              return(
                <tr>
                  <td>{candidate.candidateId}</td>
                  <td>{candidate.electionId}</td>
                  <td>{candidate.presidentName}</td>
                  <td>{candidate.vpresidentName}</td>
                  <td>{candidate.voteCount}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/*
          개발 테스트용 코드
          <br/>
          <p>Your account: {this.state.account}</p>
        */}
      </div>
    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
