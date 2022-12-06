import React from 'react'
import '../App.css'
import logo from '../assets/logo.png';
import AvatarMenu from './AvatarMenu';


function Header({loggedIn}) {
  return (
    <div className="app__header">
        <a href="/">
          <img src={logo} alt="" className="app__headerLogo" />
        </a>
        {loggedIn && (<AvatarMenu />)}
    </div>
  )
}

export default Header