import React from 'react'
import { Link } from 'react-router-dom'

function NavVoter() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/turnout'>투표율 보기</Link>
        </li>
        <li>
          <Link to='/result'>투표 결과 보기</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavVoter
