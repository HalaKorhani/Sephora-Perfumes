import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Items from './pages/Items';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { CartProvider } from './CartContext';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/items" element={<Items />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}