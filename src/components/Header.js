import React from 'react'
import '../App.css'
import logo from '../assets/logo.png';

function Header() {
  return (
    <div className="app__header">
        <a href="/">
          <img src={logo} alt="" className="app__headerLogo" />
        </a>
    </div>
  )
}

export default Header