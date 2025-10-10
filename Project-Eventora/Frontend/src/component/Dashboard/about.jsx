import React, { useEffect } from 'react';
import './about.css';

import img1 from '../pics/mission.png';
import img2 from '../pics/vision.jpg';
import img3 from '../pics/value.jpg';

const About = () => {
  const cardData = [
    {
      title: 'Our Mission',
      description: 'At Eventora, our mission is to connect people through unforgettable experiences, providing seamless and innovative event management solutions.',
      imgUrl: img1,
    },
    {
      title: 'Our Vision',
      description: 'We envision a world where event management is effortless and efficient, enabling organizers to focus on crafting memorable events.',
      imgUrl: img2,
    },
    {
      title: 'Our Values',
      description: 'Integrity, Innovation, and Inclusion are the core values that drive our commitment to delivering exceptional service.',
      imgUrl: img3,
    },
  ];

  return (
    <div className="about-container">
      <h1>About Eventora</h1>
      <p>
        Welcome to Eventora, your ultimate partner in event management. Whether you're planning a small gathering or a large-scale conference, Eventora offers a comprehensive suite of tools to make your event a success. Our platform is designed to cater to the unique needs of event organizers, helping them streamline their processes and enhance attendee experiences.
      </p>
      <div className="card-container">
        {cardData.map((card, index) => (
          <div key={index} className="about-card">
            <img src={card.imgUrl} alt={card.title} className="card-image" />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default About;
