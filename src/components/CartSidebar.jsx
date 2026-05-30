import React from 'react';
import { useCart } from '../CartContext';
import './CartSidebar.css';

export default function CartSidebar() {
  const { cart, removeFromCart, cartOpen, setCartOpen, total, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    clearCart();
    setCartOpen(false);
    window.alert('Checkout complete! Thank you for your order.');
  };

  return (
    <>
      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)} />}
      
      <div className={`cart-sidebar ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Selection</h3>
          <i className="fa-solid fa-xmark" onClick={() => setCartOpen(false)} />
        </div>

        <div className="cart-items-container">
          {cart.length === 0 ? (
            <p className="cart-empty">Your selection is empty.</p>
          ) : (
            cart.map((item, index) => (
              // Using a combining key strategy for rendering unique items safely
              <div className="cart-item" key={`${item.name}-${index}`}>
                <img src={item.img} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  
                  <div className="price-qty-row">
                    <span className="item-price">{item.price}</span>
                    {/* UPDATED: Displays quantities nicely if they are greater than 1 */}
                    <span className="item-quantity">Qty: {item.quantity || 1}</span>
                  </div>

                  {/* FIXED: Passing item.name instead of index matching our updated context */}
                  <button className="remove-btn" onClick={() => removeFromCart(item.name)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="total-price">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout} disabled={cart.length === 0}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}