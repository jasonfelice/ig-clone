import { React, useState } from 'react';
import './Splash.css';
import logo from '../assets/logo.png';

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    fullname: "",
    username: "",
    password: ""
  });
  const formValid = !!(form.fullname && form.username && form.email && form.password.length > 3);
  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
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
                  <input onChange={handleInput} value={form.email} type="email" name="email" placeholder="Email"/>
                  <input onChange={handleInput} value={form.fullname} type="text" name="fullname" placeholder="Full Name"/>
                  <input onChange={handleInput} value={form.username} type="text" name="username" placeholder="Username"/>
                  <input onChange={handleInput} value={form.password} type="password" name="password" placeholder="Password" />
                  <button disabled={!formValid}type="submit">Sign up </button>
                </form>
              </div>
              <div className="splash__prompt">
                <p>Have an account? <a href='/'>Log in</a></p>
              </div>
            </div>
        </main>
        <footer>
          © 2022 Instagram clone by Jake Felice
        </footer>
    </section>
  )
}
