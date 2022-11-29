import React from 'react';
import './Splash.css';
import logo from '../assets/logo.png';

export default function Splash() {
  return (
    <section>
        <main>
            <div className="splash__login">
              <img src={logo} alt="Logo" className="splash__logo" />
              <form>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Log in </button>
              </form>
            </div>
            <div className="splash__prompt">
              Don't have an account? Sign up
            </div>
        </main>
        <footer>
            footer
        </footer>
    </section>
  )
}
