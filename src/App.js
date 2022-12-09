import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { auth } from "./fire";
import { onAuthStateChanged  } from "firebase/auth";
import Header from "./components/Header";
import Splash from "./pages/Splash";
import Signup from "./pages/Signup";
import CreatePost from "./components/CreatePost";
import Posts from "./pages/Posts";

function App() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

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

  return (
    <div className="app">
      <Header setOpen={setOpen} loggedIn={!!user} />
      <CreatePost username={user?.displayName} open={open} setOpen={setOpen} />
      {
        user ? (
          <Routes>
            <Route path="/" element={<Posts />} />
          </Routes>
        ) :
        (
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/accounts/signup" element={<Signup />} />
          </Routes>
        )
      }
    </div>
  );
}

export default App;
