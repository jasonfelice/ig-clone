/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './fire';
import Header from './components/Header';
import Splash from './pages/Splash';
import Signup from './pages/Signup';
import CreatePost from './components/CreatePost';
import Posts from './pages/Posts';
import spinner from './assets/spinner.gif';
import Account from './pages/Account';
import Warning from './components/Warning';

function App() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    if (warning) {
      setTimeout(() => {
        setWarning(null);
      }, 4000);
    }
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
    };
  }, [user, warning]);

  return (
    <>
      <div className="app">
        <Header setOpen={setOpen} loggedIn={!!user} username={user?.displayName} photo={user?.photoURL} />
        {warning && (<Warning warning={warning} />)}
        <CreatePost setWarning={setWarning} username={user?.displayName} photo={user?.photoURL} open={open} setOpen={setOpen} />
        {loading ? (
          <div style={{ height: '50vh', display: 'flex' }}>
            <img style={{ margin: 'auto', width: '50px' }} src={spinner} alt="" />
          </div>
        )
          : (user ? (
            <Routes>
              <Route path="/" element={<Posts user={user} setLoading={setLoading} />} />
              <Route path="/accounts" element={<Account user={user} setWarning={setWarning} />} />
            </Routes>
          )
            : (
              <Routes>
                <Route path="/*" element={<Splash setWarning={setWarning} />} />
                <Route path="/accounts/signup" element={<Signup setWarning={setWarning} />} />
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
