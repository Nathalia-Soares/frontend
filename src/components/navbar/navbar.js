import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/perfil');
  };

  return (
    <div className="header-container">
      <div className="menu-icon">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className="profile-picture" onClick={handleProfileClick}>
        <img src="" alt="Profile" />
      </div>
    </div>
  );
}

export default Navbar;