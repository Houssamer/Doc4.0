import React from 'react';
import './Login.css';
import logo from '../../assets/logowhite.png';
import { useHistory } from 'react-router-dom';
import axios from '../../axios/axios';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { LoginUser, LogoutUser } from '../../features/userSlice';

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  function signup() {
    history.push('/signup');
  }

  function login() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const body = JSON.stringify({
      email,
      password
    });

    const config = JSON.stringify({
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axios
      .post('/auth/auth.php', body, config)
      .then((res) => {
        localStorage.setItem('token', res.data[1].token);
        localStorage.setItem('email', res.data[0].email);
        dispatch(LoginUser(res.data[0]))
        history.push('/');
      })
      .catch((err) => alert(err.message));
  }
  return (
    <div className="login_container">
      <div className="login_logo" onClick={() => history.push('/')}>
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
            <input type="email" ref={emailRef} className="login_input" />
          </div>
          <div className="login_input_container">
            <label htmlFor="password" className="login_label">
              Mot de passe
            </label>
            <input type="password" ref={passwordRef} className="login_input" />
          </div>

          <button className="login_button" onClick={login}>Login</button>
          <div className="login_text_container">
            <p className="login_text">Vous n'avez pas de compte?</p>
            <p className="login_text_span" onClick={signup}>
              Créez un.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
