import React from 'react';
import Bande from '../../components/Bande/Bande';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Home.css';
import heart from '../../assets/heart.png';
import hand from '../../assets/hand.png';
import med from '../../assets/med.png';
import Card from '../../components/Card/Card';
import like from '../../assets/like.png';
import back from '../../assets/back.jpg';
import back1 from '../../assets/back1.jpg';
import instagram from '../../assets/instagrambig.png';
import linkedin from '../../assets/linkedinbig.png';
import facebook from '../../assets/facebookbig.png';

function Home() {
  return (
    <div className="home_container">
      <Bande />
      <Header col="accueil" />
      <div className="home_block">
        <div className="home_first_section">
          {/* Home screen image*/}
          <div className="home_backgroundScreen" />
          {/** Home screen top content */}
          <div className="home_content">
            <h1 className="home_title">Bienvenue à MedApp</h1>
            <p className="home_description">
              L'application qui va vous faciliter la prise de rendez-vous et la
              gestion de vos dossiers médicaux.
            </p>
            <button className="home_button">Prenez un rendez-vous</button>
          </div>
          {/** Home screen shadow on top of the image */}
          <div className="home_shadow" />
        </div>

         {/** cards with an icon, title and a description */}
        <div className="home_cards">
          <Card
            logo={heart}
            title="La priorité est vous"
            description="une bonne santé es notre objectif. 
            Votre santé est notre priorité."
          />
          <Card
            logo={hand}
            title="Facile à utiliser"
            description="vous pouvez prendre un rendez-vous 
            facilement et gratuitement. Payement le jour de consultation"
          />
          <Card
            logo={med}
            title="Equipe Professionnelle"
            description="Notre équipe est formée d’un staff 
            competent et professionnel"
          />
        </div>

        <div className='home_second_section'>
            <div>
                <div className='home_leftSide_top'>
                    <div className='home_top_icon_container'>
                        <img src={like} alt="like" />
                    </div>
                    <h2>Un bon service</h2>
                </div>
                <div>
                    <img src={back} alt="back" className='home_bottom_img' />
                </div>
            </div>
            <div>
                <img src={back1} alt="back1" className='homme_right_img' />
            </div>
        </div>

        <div className='home_third_section'>
            <div className='home_third_leftSide'>
                <p>Restez connecter avec nous</p>
            </div>
            <div className='home_third_rightSide'>
                <img src={linkedin} alt="linkedin" className='home_third_icon' />
                <img src={instagram} alt="instagram" className='home_third_icon' />
                <img src={facebook} alt="facebook" className='home_third_icon' />
            </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Home;
