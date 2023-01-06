import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore"; 
import { db } from "../fire";
import Post from "../components/Post";

export default function Posts({ user }) {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const querySnapshot = await getDocs(query(collection(db, "posts"), orderBy("timestamp", "desc")));
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
    <div className="app__posts">
      {
        posts.map((data) => (
          <Post
            key = {data.id}
            postId = {data.id}
            username = {data.post.username}
            currentUser = {user}
            imageUrl = {data.post.imageUrl}
            description = {data.post.description}
          />))
      }
    </div>
  )
};
