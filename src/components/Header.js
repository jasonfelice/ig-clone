import React from 'react'
import '../App.css'
import logo from '../assets/logo.png';
import { signOut } from "firebase/auth";
import { auth } from '../fire';


function Header({loggedIn}) {
  return (
    <div className="app__header">
        <a href="/">
          <img src={logo} alt="" className="app__headerLogo" />
        </a>
        {loggedIn && (<button onClick={() => signOut(auth)} type="button">Logout</button>)}
    </div>
  )
}

export default Header