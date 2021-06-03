import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketballBall} from '@fortawesome/free-solid-svg-icons';

function Header() {

  return (
    <div id="header">
      <FontAwesomeIcon icon={faBasketballBall} />
      <span>NBA Scores</span>
      <div></div>
    </div>
  )
}

export default Header