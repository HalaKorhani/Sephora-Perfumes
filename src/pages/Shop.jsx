import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import CartSidebar from '../components/CartSidebar';
import './Shop.css';

const mostLoved = [
  { brand: 'Boss', name: 'The Scent Premium', price: '$145', img: '/scent.jpg' },
  { brand: 'Dior', name: 'Sauvage Classic', price: '$180', img: '/sauvage.jpg' },
  { brand: 'Chanel', name: 'Allure Homme Sport', price: '$155', img: '/bleu.jpg' },
  { brand: 'JeanPaul', name: 'Le Male Classic', price: '$130', img: '/le-male.jpg' },
];

const collections = [
  { name: 'Boss', brand: 'Boss', img: '/Boss.jpg', video: '/boss.mp4' }, 
  { name: 'Dior', brand: 'Dior', img: '/Dior.jpg', video: '/compres.mp4' },
  { name: 'Chanel', brand: 'Chanel', img: '/Chanel.jpg', video: '/chanel.mp4' },
  { name: 'Jean Paul', brand: 'JeanPaul', img: '/scandal.jpg', video: '/Scandal.mp4' }, 
];

function ColCard({ col }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [videoActive, setVideoActive] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setVideoActive(true);
      videoRef.current?.play().catch(()=>{});
    }, 1200); // reduced delay slightly for tighter responsiveness
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setVideoActive(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="col-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/items?brand=${col.brand}`)}
    >
      <img src={col.img} className={`card-img ${videoActive ? 'hidden' : ''}`} alt={col.name} />
      <video ref={videoRef} src={col.video} className={`card-video ${videoActive ? 'visible' : ''}`} loop muted playsInline />
      <div className="overlay-text">{col.name}</div>
    </div>
  );
}

function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="product-card">
      <div className="product-img-box">
        <img src={product.img} alt={product.name} />
        <div className="quick-view" onClick={() => addToCart(product)}>Add to Cart</div>
      </div>
      <div className="product-details">
        <span className="brand-name">{product.brand}</span>
        <div className="name-price">
          <h3>{product.name}</h3>
          <span className="price">{product.price}</span>
        </div>
      </div>
    </div>
  );
}

function ShopContent() {
  const { cart, setCartOpen } = useCart();
  const [search, setSearch] = useState('');

  const filteredCols = collections.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="shop-page" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.85),rgba(0,0,0,0.85)),url('/products.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <header className="shop-nav">
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass" />
          <input type="text" placeholder="Search brands..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Products</Link></li>
            <li><a href="/#about">About</a></li>
          </ul>
        </nav>
        <div className="shop-icons">
          <button className="cart-text" onClick={() => setCartOpen(true)}>
            Cart(<span>{cart.length}</span>)
          </button>
        </div>
      </header>

      <main>
        <h1 className="main-title">Collections</h1>
        {filteredCols.length === 0 && <div className="no-results">Brand not found.</div>}
        <div className="collections-grid">
          {filteredCols.map(col => <ColCard key={col.brand} col={col} />)}
        </div>

        <h2 className="sub-title">Most Loved Scents</h2>
        <div className="products-grid">
          {mostLoved.map(p => <ProductCard key={p.name} product={p} />)}
        </div>
      </main>
      <CartSidebar />
    </div>
  );
}

export default function Shop() {
  return ( <ShopContent /> );
}