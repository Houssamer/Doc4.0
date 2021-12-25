import React from 'react';
import './Login.css';
import logo from '../../assets/logowhite.png';
import { useHistory } from 'react-router-dom';

function Login() {

  const history = useHistory();

  function signup() {
    history.push("/signup");
  }
  
  function login() {}
  return (
    <div className="login_container">
      <div className='login_logo' onClick={() => history.push("/")}>
        <img src={logo} alt="logo" />
        <h2>MedApp</h2>
      </div>
      <div className="login_block">
        <h2 className="login_title">Login</h2>
        <div className="login_content">
          <div className="login_input_container">
            <label htmlFor="email" className="login_label">
              Email
            </label>
            <input type="email" className="login_input" />
          </div>
          <div className="login_input_container">
            <label htmlFor="password" className="login_label">
              Mot de passe
            </label>
            <input type="password" className="login_input" />
          </div>

          <button className="login_button">Login</button>
          <div className='login_text_container'>
            <p className="login_text">
              Vous n'avez pas de compte?
            </p>
            <p className="login_text_span" onClick={signup}>Créez un.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
