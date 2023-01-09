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
import spinner from "./assets/spinner.gif";
import Account from "./components/Account";

function App() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    }
  }, [user]);

  return (
    <>
      <div className="app">
      <Header setOpen={setOpen} loggedIn={!!user} username={user?.displayName} photo={user?.photoURL} />
      <CreatePost username={user?.displayName} open={open} setOpen={setOpen} />
      {loading ? (
        <div style={{ height: "50vh", display: "flex" }}>
          <img style={{ margin: "auto", width: "50px" }} src={spinner} alt="" />
        </div>
      ) :
        (user ? (
          <Routes>
            <Route path="/" element={<Posts user={user} setLoading={setLoading} />} />
            <Route path="/accounts" element={<Account user={user} />} />
          </Routes>
        ) :
          (
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/accounts/signup" element={<Signup />} />
            </Routes>
          ))}
      </div>
      <footer>
        © 2022 Instagram clone by Jake Felice
      </footer>
      </>
  );
}

export default App;
