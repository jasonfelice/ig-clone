import React from 'react'
import './Post.css';
import { Avatar } from '@mui/material';

function Post({postId, username, imageUrl, description}) {
  return (
    <div className="post">
        <div className="post__header">
          <Avatar
            className= "post__avatar"
            src= "static/images/avatar/1.jpg"
            alt= {username}
          />
          <h3>{username}</h3>
        </div>

        <img className="post__image" src={imageUrl} alt="" />

        <h4 className="post__description"><strong>{username}</strong>: {description}</h4>
    </div>
  )
}

export default Post