import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'; 
import { db } from '../fire';
import Post from '../components/Post';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Posts({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
      setPosts(snapshot.docs.map(doc => (
        {
          id: doc.id,
          post: doc.data(),
        }
        )));
        setLoading(false);
    });
  };
    
  useEffect(() => {
      getPosts();
  }, []);
  return (
    <div className="app__posts">
      {loading && (
          <Stack spacing={1}>
         <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
         <Skeleton variant="circular" width={40} height={40} />
         <Skeleton variant="rectangular" sx={{ width: '93vw', height: '200px', maxWidth: '800px'}} />
         <Skeleton variant="rounded" sx={{ width: '93vw', height: '200px', maxWidth: '800px'}} />
       </Stack>
      )}
      {!loading &&
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
