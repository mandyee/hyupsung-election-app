pragma solidity >=0.4.21 <0.7.0;

contract Election {

  struct Candidate {  // 후보자
    uint candidateId;
    uint electionId;  // 소속 선거
    uint voteCount; // 득표수

    // 정 입후보자 정보
    string presidentName;
    string presidentDept;

    // 부 입후보자 정보
    string vpresidentName;
    string vpresidentDept;

    string pledges; // 공약
  }

  struct ElectionUhs {  // 생성자와 구분하기 위해 Uhs를 덧붙임
    uint electionId;
    string electionName;  // 선거 이름 (ex. 총학생회 선거)
    bool isStarted;
  }

  struct Voter {
    uint studentId; // 학번
    uint[] votedElection; // 투표 완료한 선거들 (배열로 수정하기)
  }

  Candidate[] public candidateList;
  ElectionUhs[] public electionList;
  Voter[] public voterList;

  // 나머지 정보들도 반드시 넣기
  function addCandidate(uint _electionId, string memory _presidentName,
    string memory _vpresidentName) public {
    candidateList.length += 1;
    uint index = candidateList.length - 1;
    candidateList[index].candidateId = index;
    candidateList[index].electionId = _electionId;
    candidateList[index].voteCount = 0;
    candidateList[index].presidentName = _presidentName;
    candidateList[index].vpresidentName = _vpresidentName;
  }

  function getCandidateCount() public view returns(uint) {
    return candidateList.length;
  }

  function addElection(string memory _electionName) public {
    electionList.length += 1;
    uint index = electionList.length - 1;
    electionList[index].electionId = index;
    electionList[index].electionName = _electionName;
    electionList[index].isStarted = false;
  }

  function getElectionCount() public view returns(uint) {
    return electionList.length;
  }

  function addVoter(uint _studentId) public {
    voterList.length += 1;
    uint index = voterList.length - 1;
    voterList[index].studentId = _studentId;
  }

  // checkVoted == false일 때만 실행
  function vote(uint _studentId, uint _candidateId) public {
    uint electionId = candidateList[_candidateId].electionId;

    for(uint i=0; i<voterList.length; i++) {
      if(voterList[i].studentId == _studentId) {
        voterList[i].votedElection.push(electionId); // 투표한 선거장 기록
        candidateList[_candidateId].voteCount += 1; // 후보자는 득표함
      }
    }

    emit votedEvent(_candidateId);
  }

  // 투표 여부 확인
  function checkVoted(uint _studentId, uint _electionId) public view returns(bool) {
    for(uint i=0; i<voterList.length; i++) {
      if(voterList[i].studentId == _studentId) {
        for(uint j=0; j<voterList[i].votedElection.length; j++) {
          if(voterList[i].votedElection[j] == _electionId) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function startVote(uint _electionId) public {  // 선거 시작
    electionList[_electionId].isStarted = true;
  }

  function endVote(uint _electionId) public {  // 선거 종료
    electionList[_electionId].isStarted = false;
  }

  // 현재 진행중인 선거인지 확인
  function getElectionState(uint _electionId) public view returns(bool) {
    return electionList[_electionId].isStarted;
  }

  // 후보자 득표 수 리턴
  function getCount(uint _index) public view returns(uint, uint, uint) {
    // _index의 값은 1~candidateCount이다. 모든 후보자를 검사하는 것.
    return (candidateList[_index].electionId, candidateList[_index].candidateId,
      candidateList[_index].voteCount);
  }

  // 투표 이벤트
  event votedEvent (
    uint indexed _candidateId
  );

  constructor () public {
    addVoter(20170001);
    addVoter(20170002);

    addElection("총학생회 선거");
    addElection("컴퓨터공학과 학생회 선거");

    addCandidate(0, "홍길동", "한다연");
    addCandidate(0, "김철수", "백경문");
    addCandidate(1, "김뫄뫄", "이뫄뫄");
  }
}
