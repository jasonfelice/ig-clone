import React, { useEffect, useState } from 'react'
import './Post.css';
import { doc, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../fire';
import { Avatar } from '@mui/material';

function Post({postId, username, imageUrl, description, currentUser, time}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const postComment = (e) => {
    e.preventDefault();
    setComment('');
    const postRef = doc(db, 'posts', postId);
    addDoc(collection(postRef, 'comments'), {
      comment,
      username: currentUser.displayName,
      timestamp: serverTimestamp()
    });
  };

   useEffect(() => {
    const docRef = doc(db, 'posts', postId);
    onSnapshot(query(collection(docRef, 'comments'), orderBy('timestamp', 'desc')), (snapshot) => {
       setComments(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })));
    });
  }, [postId]);
  return (
    <div className="post">
        <div className="post__header">
          <Avatar
            className= "post__avatar"
            src= "static/images/avatar/1.jpg"
            alt= {username}
          />
          <h3>{username}</h3>
          <span>{time.toString().slice(4, 15)}</span>
        </div>

        <img className="post__image" src={imageUrl} alt="" />

        <h4 className="post__description"><strong>{username}</strong>: {description}</h4>

        <div className="post__comments">
          {comments.map((comment) => (
            <div key={comment.id} className="post__comment">
              <span className="post__comment-username">{comment.username}: </span>
              <span className="post__comment-text">{comment.comment}</span>
            </div>
          ))}
        </div>

        <form onSubmit={postComment} className="post__form" action="#">
          <input value={comment} onChange={(e) => setComment(e.target.value)} name="comment" placeholder='Write a comment...' />
          {comment && (<button disabled={!comment} type="sutmit">Post</button>)}
        </form>
    </div>
  )
}

export default Post;
