import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../images/Ylogo.webp';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({ name: 'Usuario', email: 'Usuario123' });

  const logoutUser = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setUser({ name: '', email: '' });
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        {isLoggedIn ? (
          <span className="welcome-message">Olá, {user.name}</span>
        ) : (
          <span className="welcome-message">Bem-vindo ao Y</span>
        )}
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to="/Conta">Conta</Link></li>
            <li><button onClick={logoutUser}>Sair</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
