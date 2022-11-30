import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Post from './components/Post';
import { db } from './fire';
import { collection, getDocs } from "firebase/firestore"; 
import Header from './components/Header';
import Splash from './pages/Splash';
import Signup from './pages/Signup';

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    setPosts(querySnapshot.docs.map(doc => (
      {
        id: doc.id,
        post: doc.data(),
      }
    )));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/loggedin" element={
           posts.map((data) => (
            <Post
              key = {data.id}
              username = {data.post.username}
              imageUrl = {data.post.imageUrl}
              description = {data.post.description}
            />
        ))}/>
        <Route path="/" element={<Splash />} />
        <Route path="/accounts/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
