import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartProvider, useCart } from '../CartContext';
import CartSidebar from '../components/CartSidebar';
import ProfileSidebar from '../components/ProfileSidebar';
import './Home.css';

// SYNCHRONIZED SCHEMA: Matches the brand, name, price, and 'img' convention used in Items.jsx
const PERFUME_COLLECTION = [
  { id: 1, brand: "JeanPaul", name: "Le Male Elixir", price: "$145", img: "/gold.jpg", tag: "Premium" },
  { id: 2, brand: "Boss", name: "Bottled Tonic", price: "$115", img: "/tonic.jpg", tag: "Fresh" },
  { id: 3, brand: "Chanel", name: "Chance Tendre", price: "$140", img: "/tendre.jpg", tag: "Elegant" },
  { id: 4, brand: "Chanel", name: "Allure Homme Sport", price: "$130", img: "/sport.jpg", tag: "Active" },
  { id: 5, brand: "Boss", name: "The Scent Private", price: "$150", img: "/scent-perfum.jpg", tag: "Intense" },
  { id: 6, brand: "JeanPaul", name: "Scandal For Her", price: "$115", img: "/scandalher.jpg", tag: "Sensual" },
  { id: 7, brand: "Dior", name: "Sauvage Original", price: "$165", img: "/sauvage.jpg", tag: "Trending" },
  { id: 8, brand: "Dior", name: "Dior Hypnotic Poison", price: "$135", img: "/poison.jpg", tag: "Bold" },
  { id: 9, brand: "Chanel", name: "Platinum Égoïste", price: "$125", img: "/platinum.jpg", tag: "Classic" },
  { id: 10, brand: "JeanPaul", name: "La Belle Paradise", price: "$150", img: "/paradise.jpg", tag: "Exotic" },
  { id: 11, brand: "Boss", name: "Bottled Night", price: "$120", img: "/night.jpg", tag: "Midnight" },
  { id: 12, brand: "Chanel", name: "No. 5 Parfum", price: "$180", img: "/nb5.jpg", tag: "Timeless" },
  { id: 13, brand: "Dior", name: "Miss Dior Rose", price: "$140", img: "/miss.jpg", tag: "Romantic" },
  { id: 14, brand: "JeanPaul", name: "Le Male Le Parfum", price: "$125", img: "/male.jpg", tag: "Signature" },
  { id: 15, brand: "Dior", name: "Jadore Parfum", price: "$170", img: "/jadore.jpg", tag: "Luxury" },
  { id: 16, brand: "JeanPaul", name: "Ultra Male", price: "$120", img: "/ultra.jpg", tag: "Best Seller" },
  { id: 17, brand: "JeanPaul", name: "Le Male Classic", price: "$120", img: "/le-male.jpg", tag: "Iconic" },
  { id: 18, brand: "JeanPaul", name: "Scandal Le Parfum", price: "$135", img: "/leparfum.jpg", tag: "Intense" },
  { id: 19, brand: "JeanPaul", name: "Gaultier Divine", price: "$160", img: "/gaultier.jpg", tag: "New" },
  { id: 20, brand: "Dior", name: "Homme Intense", price: "$150", img: "/intense.jpg", tag: "Exclusive" },
  { id: 21, brand: "Boss", name: "The Scent Absolute", price: "$135", img: "/intense.jpeg", tag: "Deep" }
];

function HomeContent() {
  const { cart, addToCart, setCartOpen } = useCart(); // Added addToCart here
  const [heartActive, setHeartActive] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Safely calculate accurate count from quantity values
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <div className="home-page">
     

      {/* Hero */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${process.env.PUBLIC_URL}/sephora.jpg)`,
        }}
      >
        <div className="hero-content">
          <p className="established">ESTABLISHED 1976 — PARIS</p>
          <h1 className="main-title">
            <span className="first-letter">S</span>eph<span>o</span>ra
          </h1>
          <p className="tagline">The Essence of Elegance</p>
          <Link to="/shop" className="btn-discover">Discover the Collection</Link>
        </div>
      </section>

      {/* About */}
      <section className="about-section" id="about">

        <div className="about-container">
          <div className="about-text">
          <div className="title-underline"></div>
            <Link to="/shop" className="btn-read-more">Explore Collection</Link>

          </div>
        </div>
      </section>

      
      <CartSidebar />
      <ProfileSidebar open={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}

export default function Home() {
  return (

      <HomeContent />
   
  );
}