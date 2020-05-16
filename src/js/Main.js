import React from 'react'
import { Link } from 'react-router-dom'

function Main() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/admin'>선관위 페이지</Link>
        </li>
        <li>
          <Link to='/voter'>유권자 페이지</Link>
        </li>
      </ul>
    </div>
  );
}

export default Main
