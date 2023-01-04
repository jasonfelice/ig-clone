import React, { useEffect, useState } from 'react'
import './Post.css';
import { doc, getDocs, getDoc, collection } from "firebase/firestore";
import { db } from "../fire";
import { Avatar } from '@mui/material';

function Post({postId, username, imageUrl, description}) {
  const [comments, setComments] = useState([]);

   useEffect(() => {
    const getComments = async () => {
      const docRef = doc(db, 'posts', postId);
      const comRef = collection(docRef, 'comments');
      const docSnap = await getDocs(comRef);
      setComments(docSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })));
    };

    getComments();
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
        </div>

        <img className="post__image" src={imageUrl} alt="" />

        <h4 className="post__description"><strong>{username}</strong>: {description}</h4>
    </div>
  )
}

export default Post