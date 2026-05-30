import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer" id="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>SEPHORA</h3>
          <p>Bringing the world's most luxurious scents to your doorstep since 1976.</p>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><i className="fa-solid fa-envelope" /> contact@sephora-luxury.com</li>
            <li><i className="fa-solid fa-phone" /> +33 1 23 45 67 89</li>
            <li><i className="fa-solid fa-location-dot" /> 70 Av. des Champs-Élysées, Paris</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#"><i className="fa-brands fa-instagram" /></a>
            <a href="#"><i className="fa-brands fa-facebook-f" /></a>
            <a href="#"><i className="fa-brands fa-pinterest" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Sephora Luxury Fragrance. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;