import * as React from 'react';
import './index.css';

import controller from '../../Assets/game-controller.png'

export const Header = () => {
  return (
    <nav className="navbar">
      <ul className='header-list'>
        <li className='list-item_logo'>
          <img src={controller} alt="" className='game-logo' />
          <p>Game</p>
          <p>Center</p>
        </li>
      </ul>
    </nav>
  );
};
