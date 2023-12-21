import React from 'react';
import './about.css';
const About = () => {
  return (
    <div className="about-us">
      <div className='back-img'>
        <div className='us'>
          <br></br>
          <h2>About Vehicle Service Portal</h2>
          <p className='para'>
            Welcome to Vehicle Service Portal, your trusted partner in vehicle maintenance and care.
            Our mission is to provide a seamless and efficient platform for vehicle owners and service
            providers to connect, ensuring that your vehicle stays in top-notch condition.
          </p>

          <h2 className='head'>Our Mission</h2>
          <p className='para'>
          At Vehicle Service Portal, we are committed to simplifying the process of vehicle service
          registration and creating a user-friendly experience for both vehicle owners and service
          providers. We aim to enhance the overall vehicle service ecosystem by leveraging
          technology and innovation.
          </p>

          <h2 className='head'>Why Choose Us?</h2>
          <p className='para'>
            - Convenient Service Registration: Easily register and manage your vehicle services online.
          </p>
          <p className='para'>
            - Trusted Service Providers: Connect with certified and reliable service providers in your
            area.
          </p>
          <p className='para'>
            - User-Friendly Interface: Our portal is designed for simplicity and ease of use, ensuring a
            smooth experience for all users.
          </p>

          <h2 className='head'>Our Team</h2>
          <p className='para'>
            Meet the dedicated individuals behind Vehicle Service Portal. Our team is comprised of
            experienced professionals in the automotive and technology industries. We are passionate
            about delivering high-quality service and making a positive impact on the vehicle service
            landscape.
          </p>

          <h2 className='head'>Contact Us</h2>
          <p className='para'>
            Have questions or feedback? We'd love to hear from you. Reach out to us at{' '}
            <a href="mailto:@vehicleserviceportal.com">@vehicleserviceportal.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
