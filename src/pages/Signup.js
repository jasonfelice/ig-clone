import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Splash.css';
import logo from '../assets/logo.png';
import spinner from '../assets/spinner.gif';
import { auth } from '../fire';
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import errorHandler from '../errorHandler';

export default function Signup({ setWarning }) {
  const [form, setForm] = useState({
    email: "",
    fullname: "",
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, fullname , password } = form;
  let formValid = !!(fullname && email && password.length > 3);

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
        updateProfile(user, {
          displayName: fullname
        }).then(() => {
          setLoading(false);
          navigate('/');
        });
      })
    .catch((error) => {
      setLoading(false);
      setWarning(errorHandler(error.code));
      // ..
    });
  };

  return (
    <section>
        <main>
            <div className="splash_main">
              <div className="splash__login">
                <div className="splash__head-wrapper">
                  <img src={logo} alt="Logo" className="splash__logo" />
                  <p>Sign up to see photos from your friends.</p>
                </div>
                <form>
                  <input onChange={handleInput} value={form.fullname} type="text" name="fullname" placeholder="Full Name"/>
                  <input onChange={handleInput} value={form.email} type="email" name="email" placeholder="Email"/>
                  <input onChange={handleInput} value={form.password} type="password" name="password" placeholder="Password" />
                  <button onClick={(handleSubmit)} disabled={(!formValid || loading)} type="submit">
                    {
                      loading ? (<img src={spinner} alt="spinner" />) : "Sign up"
                    }
                  </button>
                </form>
              </div>
              <div className="splash__prompt">
                <p>Have an account? <Link to='/'>Log in</Link></p>
              </div>
            </div>
        </main>
    </section>
  )
}
