import React from 'react';
import './Contact.css';
import logo from '../../assets/logowhite.png';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  return (
    <div className="contact_container">
      <div className="contact_logo" onClick={() => navigate('/')}>
        <img src={logo} alt="logo" />
        <h2>MedApp</h2>
      </div>
      <div className="contact_content">
        <h1 className='contact_title'>Contactez-nous</h1>
        <div className="contact_sides">
          <div className="contact_leftSide">
            <div className="contact_input_container">
              <label htmlFor="name" className="contact_label">
                Nom complet
              </label>
              <input type="text" className="contact_input" />
            </div>
            <div className="contact_input_container">
              <label htmlFor="email" className="contact_label">
                Email
              </label>
              <input type="email" className="contact_input" />
            </div>
            <div className="contact_input_container">
              <label htmlFor="sujet" className="contact_label">
                Sujet
              </label>
              <input type="text" className="contact_input" />
            </div>
          </div>
          <div className="contact_rightSide">
            <label htmlFor="message" className="contact_label">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              cols="60"
              rows="20"
              className="contact_message"
              placeholder='write your message here'
            >
            </textarea>
            <button className="contact_button">Envoyer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
