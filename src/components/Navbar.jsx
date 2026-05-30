import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import ProfileSidebar from './ProfileSidebar'; // Assumes ProfileSidebar is in the same folder

const Navbar = () => {
  // 1. Get cart utilities from your global CartContext
  const { cart, setCartOpen } = useCart();

  // 2. Local state for heart active toggle and profile sidebar opening
  const [heartActive, setHeartActive] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // 3. Dynamically calculate total count of items in the cart
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <>
      <nav className="navbar">
        <div className="logo">Sephora</div>

        <ul className="nav-links">
          <li>
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop">Products</Link>
          </li>
          <li>
            {/* Navigates to the footer (About) at the bottom of the active page */}
            <a href="#footer">About</a>
          </li>
        </ul>

        <div className="nav-icons">
          {/* Profile Button */}
          <button className="icon-btn" onClick={() => setProfileOpen(true)}>
            <i className="fa-regular fa-user" />
          </button>

          {/* Cart Button with Count Badge */}
          <button className="icon-btn cart-btn" onClick={() => setCartOpen(true)}>
            Cart(<span>{cartCount}</span>)
          </button>

          {/* Heart Button */}
          <button
            className={`icon-btn heart-btn ${heartActive ? 'active' : ''}`}
            onClick={() => setHeartActive(p => !p)}
          >
            <i className={heartActive ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
          </button>
        </div>
      </nav>

      {/* 4. Render ProfileSidebar globally inside the Navbar container */}
      <ProfileSidebar open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
};

export default Navbar;