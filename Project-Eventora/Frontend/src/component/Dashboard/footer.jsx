import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:info@eventora.com">info@eventora.com</a></p>
          <p>Phone: <a href="tel:+1234567890">123-456-7890</a></p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <p><a href="https://facebook.com/eventora" target="_blank" rel="noopener noreferrer">Facebook</a></p>
          <p><a href="https://twitter.com/eventora" target="_blank" rel="noopener noreferrer">Twitter</a></p>
          <p><a href="https://instagram.com/eventora" target="_blank" rel="noopener noreferrer">Instagram</a></p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <p><a href="/">Home</a></p>
          <p><a href="/events">Events</a></p>
          <p><a href="/about">About Us</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Eventora. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
