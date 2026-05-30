import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('PERFUME_CART')) || [];
    } catch { 
      return []; 
    }
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('PERFUME_CART', JSON.stringify(cart));
  }, [cart]);

  // FIXED: Group items by checking product.name or product.id, and managing a quantity property
  const addToCart = (product) => {
    setCart(prev => {
      // Check if item already exists in the cart using a reliable field like name or id
      const existingItem = prev.find(item => item.name === product.name);

      if (existingItem) {
        // If it exists, map through and bump its quantity count
        return prev.map(item =>
          item.name === product.name
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      // If it's a completely new item, append it with an initial quantity counter of 1
      return [...prev, { ...product, quantity: 1 }];
    });
    
    setCartOpen(true);
  };

  // UPDATED: Standardized item deletion using item identification instead of index array splicing
  const removeFromCart = (productName) => {
    setCart(prev => prev.filter(item => item.name !== productName));
  };

  const clearCart = () => {
    setCart([]);
  };

  // FIXED: Calculates total dynamically by taking quantity into account safely
  const total = cart.reduce((sum, item) => {
    const numericPrice = parseFloat(item.price.replace('$', '')) || 0;
    const itemQuantity = item.quantity || 1;
    return sum + (numericPrice * itemQuantity);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartOpen, setCartOpen, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}