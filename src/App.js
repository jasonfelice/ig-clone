import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { db } from './fire';
import { collection, getDocs } from "firebase/firestore"; 

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    setPosts(querySnapshot.docs.map(doc => doc.data()));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerLogo" />
      </div>
      {
        posts.map((post) => (
          <Post
            username = {post.username}
            imageUrl = {post.imageUrl}
            description = {post.description}
          />
        ))
      }
    </div>
  );
}

export default App;
