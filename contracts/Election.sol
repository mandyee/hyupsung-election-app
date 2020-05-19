pragma solidity >=0.4.21 <0.7.0;

contract Election {

  struct Candidate {  // 후보자
    uint candidateId; // 기호

    // 정 입후보자 정보
    string presidentName;
    string presidentDept;

    // 부 입후보자 정보
    string vpresidentName;
    string vpresidentDept;

    string pledges; // 공약
    uint voteCount; // 득표수
  }

  // 유권자의 투표 여부 저장
  mapping(address => bool) public voters;

  // 후보자 저장
  mapping(uint => Candidate) public candidates;
  // 후보자 수 저장
  uint public candidatesCount;

  // 투표 이벤트
  event votedEvent (
    uint indexed _candidateId
  );

  constructor () public {
    addCandidate("홍길동", "컴퓨터공학과", "한다연", "경영학과", "1. 공약1입니다.\n2. 공약2입니다.");
    addCandidate("김철수", "경영학과", "백경문", "컴퓨터공학과", "1. 적극적 소통\n2. 강의실 환경 개선");
  }

  function addCandidate (string memory _presidentName, string memory _presidentDept,
    string memory _vpresidentName, string memory _vpresidentDept,
    string memory _pledges) public {
    // require(msg.sender == "admin 계정 주소");

    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount,
      _presidentName, _presidentDept, _vpresidentName, _vpresidentDept,
      _pledges, 0);
  }

  function vote (uint _candidateId) public {
    // 투표를 하지 않은 유권자여야 함
    require(!voters[msg.sender]);

    // 유효한 후보자에게 투표해야 함
    require(_candidateId > 0 && _candidateId <= candidatesCount);

    // 투표 여부를 참으로 변경
    voters[msg.sender] = true;

    // 후보자는 득표함
    candidates[_candidateId].voteCount ++;

    // 투표 이벤트 발생
    emit votedEvent(_candidateId);
  }
}
