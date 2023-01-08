import React from 'react'
import '../App.css'
import logo from '../assets/logo.png';
import AvatarMenu from './AvatarMenu';
import AddIcon from '@mui/icons-material/Add';



function Header({loggedIn, setOpen, username, photo}) {
  return (
    <div className="app__header">
        <a href="/">
          <img src={logo} alt="" className="app__headerLogo" />
        </a>
        {loggedIn && (
          <div className="app__header-control">
            <i onClick={() => setOpen(true)} className="app__create-post-button">
              <AddIcon />
            </i>
            <AvatarMenu username={username} profilePicture={photo} />
          </div>
        )}
    </div>
  )
}

export default Header