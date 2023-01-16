/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './Splash.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import logo from '../assets/logo.png';
import spinner from '../assets/spinner.gif';
import { auth } from '../fire';
import errorHandler from '../errorHandler';

export default function Splash({ setWarning }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { email, password } = form;
  const formValid = !!(email && password.length > 3);

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
        setWarning(errorHandler(error.code));
      });
  };
  return (
    <section>
      <main>
        <div className="splash_main">
          <div className="splash__login">
            <div className="splash__head-wrapper">
              <img src={logo} alt="Logo" className="splash__logo" />
            </div>
            <form>
              <input onChange={handleInput} value={email} type="email" name="email" placeholder="Email" />
              <input onChange={handleInput} value={password} type="password" name="password" placeholder="Password" />
              <button onClick={handleSubmit} disabled={(!formValid || loading)} type="submit">
                {
                      loading ? (<img src={spinner} alt="spinner" />) : 'Log in'
                    }
              </button>
            </form>
          </div>
          <div className="splash__prompt">
            <p>
              Don&apos;t have an account?
              {' '}
              <Link to="/accounts/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
}
