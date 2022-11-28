import React from 'react';
import './Splash.css';

export default function Splash() {
  return (
    <section>
        <main>
            <div className="splash__login">
              <form>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" value="Log in" />
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
