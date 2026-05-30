import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../CartContext';
import CartSidebar from '../components/CartSidebar';
import './Items.css';

const allPerfumes = [
    { brand: 'Boss', name: 'The Scent Magnetic', price: '$145', img: '/mag.jpg' },
        { brand: 'Boss', name: 'Bottled Night', price: '$120', img: '/night.jpg' },
        { brand: 'Boss', name: 'Bottled Infinite', price: '$115', img: '/infinite.jpg' },
        { brand: 'Boss', name: 'The Scent Absolute', price: '$135', img: '/intense.jpg' },
        { brand: 'Boss', name: 'The Scent Private', price: '$150', img: '/scent-perfum.jpg' },
        { brand: 'Boss', name: 'Boss Bottled Eau', price: '$110', img: '/tonic.jpg' },
        { brand: 'Boss', name: 'The Scent Elixir', price: '$165', img: '/elixer.jpg' },
        { brand: 'Boss', name: 'Hugo Man Extreme', price: '$95', img: '/beyond.jpg' },
        // --- DIOR ---
        { brand: 'Dior', name: 'Sauvage Elixir', price: '$180', img: '/sauvage-elixer.jpg' },
        { brand: 'Dior', name: 'Homme Intense', price: '$150', img: '/intense.jpeg' },
        { brand: 'Dior', name: 'Sauvage Parfum', price: '$165', img: '/kk.jpg' },
        { brand: 'Dior', name: 'Fahrenheit Intense', price: '$110', img: '/fah.jpg' },
        { brand: 'Dior', name: 'Dior Dune', price: '$125', img: '/dune.jpg' },
        { brand: 'Dior', name: 'Dior Poison', price: '$135', img: '/poison.jpg' },
        { brand: 'Dior', name: 'Miss Dior Rose', price: '$140', img: '/miss.jpg' },
        { brand: 'Dior', name: 'Jadore Parfum', price: '$170', img: '/jadore.jpg' },
        // --- CHANEL ---
        { brand: 'Chanel', name: 'Bleu Parfum', price: '$160', img: '/exclusif.jpg' },
        { brand: 'Chanel', name: 'Allure Sport', price: '$130', img: '/sport.jpg'},
        { brand: 'Chanel', name: 'Bleu EDP', price: '$145', img: '/edp.jpg' },
        { brand: 'Chanel', name: 'Platinum Égoïste', price: '$125', img: '/platinum.jpg' },
        { brand: 'Chanel', name: 'No. 5 Parfum', price: '$180', img: '/nb5.jpg' },
        { brand: 'Chanel', name: 'Coco Mademoiselle', price: '$165', img: '/coco.jpg' },
        { brand: 'Chanel', name: 'Chance Tendre', price: '$140', img: '/tendre.jpg' },
        { brand: 'Chanel', name: 'Gabrielle Chanel', price: '$155', img: '/gabrielle.jpg' },
        // --- JEAN PAUL ---
        { brand: 'JeanPaul', name: 'Scandal Pour Homme', price: '$130', img: '/gaultier.jpg' },
        { brand: 'JeanPaul', name: 'Le Male Elixir', price: '$145', img: '/male.jpg' },
        { brand: 'JeanPaul', name: 'Scandal Le Parfum', price: '$135', img: '/leparfum.jpg' },
        { brand: 'JeanPaul', name: 'Ultra Male', price: '$120', img: '/ultra.jpg' },
        { brand: 'JeanPaul', name: 'Le Beau Parfum', price: '$140', img: '/beau.jpg' },
        { brand: 'JeanPaul', name: 'La Belle Paradise', price: '$150', img: '/paradise.jpg' },
        { brand: 'JeanPaul', name: 'Scandal Gold', price: '$160', img: '/gold.jpg' },
        { brand: 'JeanPaul', name: 'Scandal gaultier', price: '$115', img: '/scandalher.jpg' }
    ];

const bgMap = {
  boss:     '/Boss.jpg',
  dior:     '/Dior.jpg',
  chanel:   '/Chanel.jpg',
  jeanpaul: '/Jean-paul.jpg',
};

function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="product-card">
      <div className="product-img-box">
        <img src={product.img} alt={product.name} />
        <div className="quick-view add-btn" onClick={() => addToCart(product)}>Add to Cart</div>
      </div>
      <div className="product-details">
        <span className="brand-name">{product.brand.toUpperCase()}</span>
        <div className="name-price">
          <h3>{product.name}</h3>
          <span className="price">{product.price}</span>
        </div>
      </div>
    </div>
  );
}

function ItemsContent() {
  const { cart, setCartOpen } = useCart();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const brandParam = searchParams.get('brand') || '';

  const bgImage = bgMap[brandParam.toLowerCase()] || '';
  const bgStyle = bgImage
    ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88)), url('${bgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }
    : {};

  const filtered = useMemo(() => {
    return allPerfumes.filter(p => {
      const matchBrand = brandParam ? p.brand.toLowerCase() === brandParam.toLowerCase() : true;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchBrand && matchSearch;
    });
  }, [brandParam, search]);

  // Calculate total items in the cart for the badge count
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <div className="items-page" style={bgStyle}>
      <header className="shop-nav">
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass" />
          <input 
            type="text" 
            placeholder="Search perfumes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          <Link to="/" className="back-home-btn">Home</Link>
          <div className="cart-icon-wrapper" onClick={() => setCartOpen(true)}>
            <i className="fa-solid fa-bag-shopping" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </header>

      <main className="items-container">
        <h1 className="brand-title">
          {brandParam ? `${brandParam.toUpperCase()} COLLECTION` : 'ALL FRAGRANCES'}
        </h1>
        
        <div className="products-grid">
          {filtered.length > 0 ? (
            filtered.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p className="no-results">No perfumes found matching your search.</p>
          )}
        </div>
      </main>

      <CartSidebar />
    </div>
  );
}

export default function Items() {
  return (
    
      <ItemsContent />
   
  );
}