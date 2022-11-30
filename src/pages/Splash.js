import { React, useState } from 'react';
import './Splash.css';
import logo from '../assets/logo.png';

export default function Splash() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const formValid = !!(form.email && form.password.length > 3);
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
                <img src={logo} alt="Logo" className="splash__logo" />
                <form>
                  <input onChange={handleInput} value={form.email} type="email" name="email" placeholder="Email"/>
                  <input onChange={handleInput} value={form.password} type="password" name="password" placeholder="Password" />
                  <button disabled={!formValid}type="submit">Log in </button>
                </form>
              </div>
              <div className="splash__prompt">
                <p>Don't have an account? <a href='/'>Sign up</a></p>
              </div>
            </div>
        </main>
        <footer>
          © 2022 Instagram clone by Jake Felice
        </footer>
    </section>
  )
}
