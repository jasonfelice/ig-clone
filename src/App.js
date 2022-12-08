import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Post from './components/Post';
import { collection, getDocs } from "firebase/firestore"; 
import { auth, db } from './fire';
import { onAuthStateChanged  } from "firebase/auth";
import Header from './components/Header';
import Splash from './pages/Splash';
import Signup from './pages/Signup';
import CreatePost from './components/CreatePost';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    }
  }, [user]);

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
      <Header loggedIn={!!user} />
      <CreatePost />
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
