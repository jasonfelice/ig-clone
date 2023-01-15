/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import '../App.css';
import AddIcon from '@mui/icons-material/Add';
import logo from '../assets/logo.png';
import AvatarMenu from './AvatarMenu';

function Header({
  loggedIn, setOpen, username, photo,
}) {
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
  );
}

export default Header;
