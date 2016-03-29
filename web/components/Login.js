import React from 'react';
import meldio from '../meldio';

class Login extends React.Component {
  _handleLogin(provider) {
    meldio.loginWithOAuthPopup(provider)
      .catch(error => console.error('Login failed: ', error) );
  }

  render() {
    return (
      <div>
        <section className="todoapp">
          <div className="login-container">
            <div className="login-button">
              <a className="btn-auth btn-facebook large"
                 href="#"
                 onClick={this._handleLogin.bind(this, 'facebook')}>
                  Sign in with <b>Facebook</b>
              </a>
            </div>
            <div className="login-button">
              <a className="btn-auth btn-google large"
                 href="#"
                 onClick={this._handleLogin.bind(this, 'google')}>
                  Sign in with <b>Google</b>
              </a>
            </div>
            <div className="login-button">
              <a className="btn-auth btn-github large"
                 href="#"
                 onClick={this._handleLogin.bind(this, 'github')}>
                  Sign in with <b>GitHub</b>
              </a>
            </div>
          </div>
        </section>
        <footer className="info">
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default Login;
