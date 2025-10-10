import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import img from '../pics/21.jpg';
import img2 from '../pics/18.jpg';
import img3 from '../pics/1.png';
import img4 from '../pics/9.jpg';
import img5 from '../pics/3.jpg';
import img6 from '../pics/14.jpg';
import Footer from './footer';

const Home = ({ isLoggedIn }) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const eventsData = {
      upcomingEvents: [
        {
          id: 1,
          title: 'Wedding Expo',
          date: 'August 15, 2024',
          description: 'Join us for the biggest wedding expo of the year.',
          image: img,
        },
        {
          id: 2,
          title: 'Dance Party ',
          date: 'September 10, 2024',
          description: 'Join us for an unforgettable night of music, dance, and fun!',
          image: img2
        },        
        {
          id: 3,
          title: 'Music Festival',
          date: 'October 5, 2024',
          description: 'Experience an unforgettable music festival.',
          image: img3,
        },
      ],
      featuredEvents: [
        {
          id: 1,
          title: 'Charity Gala',
          date: 'November 20, 2024',
          description: 'A night of elegance and philanthropy.',
          image: img4,
        },
        {
          id: 2,
          title: 'Tech Conference',
          date: 'December 5, 2024',
          description: 'Explore the latest in technology.',
          image: img5,
        },
        {
          id: 3,
          title: 'Food Festival',
          date: 'January 12, 2025',
          description: 'A culinary journey you won\'t forget.',
          image: img6,
        },
      ],
    };

    setUpcomingEvents(eventsData.upcomingEvents);
    setFeaturedEvents(eventsData.featuredEvents);
  }, []);

  const handleCardClick = () => {
    if (isLoggedIn) {
      navigate('/events');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-management">
      <div className="hero-image">
        <div className="hero-text">
          <h1>Create Your Unforgettable Memories with Us</h1>
        </div>
      </div>
      <div className="content">
        <h2>Welcome to Eventora!</h2>
        <p>
          At Eventora, we specialize in creating unforgettable memories for all your events. 
          From weddings to corporate gatherings, our team is dedicated to ensuring your event is 
          a memorable success.
        </p>
      </div>
      <div className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-cards">
          {upcomingEvents.map(event => (
            <div key={event.id} className="event-card" onClick={handleCardClick}>
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="events-section">
        <h2>Featured Events</h2>
        <div className="events-cards">
          {featuredEvents.map(event => (
            <div key={event.id} className="event-card" onClick={handleCardClick}>
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="quotes-section">
        <h2>Thoughts to Inspire</h2>
        <div className="quotes">
          <blockquote>
            "The best way to predict the future is to create it." - Peter Drucker
          </blockquote>
          <blockquote>
            "Life is either a daring adventure or nothing at all." - Helen Keller
          </blockquote>
          <blockquote>
            "In the end, we will remember not the words of our enemies, but the silence of our friends." - Martin Luther King Jr.
          </blockquote>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
