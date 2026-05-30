import React, { useState, useEffect } from 'react';
import './ProfileSidebar.css';

export default function ProfileSidebar({ open, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // FIXED: Only reload values from localStorage when the sidebar is explicitly opened
  useEffect(() => {
    if (open) {
      setName(localStorage.getItem('userName') || '');
      setEmail(localStorage.getItem('userEmail') || '');
    }
  }, [open]);

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      alert('Please fill in both name and email fields.');
      return;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address (e.g., name@example.com)');
      return;
    }
    
    localStorage.setItem('userName', name.trim());
    localStorage.setItem('userEmail', email.trim());
    
    alert(`Welcome to Sephora, ${name.trim()}! Your profile has been saved.`);
    onClose();
  };

  return (
    <>
      {open && <div className="profile-overlay" onClick={onClose} />}
      
      <div className={`profile-sidebar ${open ? 'open' : ''}`}>
        <div className="profile-header">
          <h3>My Profile</h3>
          <i className="fa-solid fa-xmark" onClick={onClose} />
        </div>
        
        <div className="profile-form">
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          
          <button className="save-btn" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </>
  );
}